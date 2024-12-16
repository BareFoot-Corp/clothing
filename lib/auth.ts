import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserHashedPassword } from "./db";
import { generateToken } from "./utils";
import { sendVerificationEmail } from "@/app/api/auth/sendVerificationEmail";

export const { handlers, signIn, signOut, auth } = NextAuth({ 
    secret: process.env.NEXT_SECRET,
    session: {
        strategy: 'jwt'
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
        }) 
    ],
    callbacks: {
        async jwt({ token, user }){
            console.log(user);
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
            return session;
        }
    }
});