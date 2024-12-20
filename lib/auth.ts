import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserHashedPassword, setGoogleUser } from "./db";
import { prisma } from './prisma';
import { generateToken } from "./utils";

import { sendVerificationEmail } from "@/app/api/auth/sendVerificationEmail";

export const { handlers, signIn, signOut, auth } = NextAuth({ 
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    },
    pages: {
        signIn: '/auth/signIn',
    },
    providers: [ 
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials){
                try{
                    if(credentials){
                        if (!credentials?.email || !credentials?.password) {
                            throw new Error("Email and Password Required");
                        }
                        const { email, password } = credentials;

                        const user = await getUserByEmail(email as string);

                        if (!user) {
                            throw new Error("Invalid credentials");
                        }
                        const hashedPassword = await getUserHashedPassword(email as string);
                        
                        if(hashedPassword){
                            const isPasswordValid = await bcrypt.compare(password as string, hashedPassword);
                            if(isPasswordValid)
                            {
                                if(!user.isVerified){
                                    // This code sends another verification email if the user is not verified through email
                                    // User have to login again after verification
                                    const token = generateToken({ userId: user.id });
                                    // Send verification email
                                    await sendVerificationEmail(email as string, token);

                                    return null;
                                }
                                return user;
                            }
                        }

                        throw new Error("Failed to validate password");
                    }
                    throw new Error("No credentials");
                }
                catch(error){
                    throw new Error(`Error: ${error}`);
                }
            }
        }) ,
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    scope: "openid profile email", // Ensure this is correct
                },
            },
        })
    ],
    cookies: { 
        // Needed as I was  getting MissingCSRF error
        csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
                httpOnly: true,
                sameSite: 'strict', // Or 'lax' if needed, but 'strict' is recommended for security
                path: '/',
                secure: process.env.NODE_ENV === 'production', // Use "secure" in production
            }
        },
        sessionToken: {
            // Renaming this caused problem in middleware,
            // So had to use cookieName option
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            }
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            }
        },
    },
    callbacks: {
        async jwt({ token, user }){
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        
        },
        async session({ session, token }) {
            if (token) {
              session.user.id = token.id as string;
              session.user.email = token.email as string;
            }
            
            // console.log("Session (auth.ts)", session);
            return session;
        },
        async signIn({ user, account, profile }){
            try{
                if(account?.provider === 'google'){
                    if(profile && user){
                        // console.log("Profile (auth.js):", profile);
                        await setGoogleUser(user.email, profile.email_verified, user.image, user.name);
                        return profile.email_verified ? profile.email_verified : false;
                    }
                }

                return true;

            }catch(error){
                throw new Error(`SignIn Error: ${error}`)
            }
        }
    }
});