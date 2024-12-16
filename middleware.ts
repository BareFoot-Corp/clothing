// export { auth as middleware } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

// middleware function runs at all pages unless mathcher config is set
export default async function middleware(request: NextRequest){

    // Fetch token from cookies (requires NEXTAUTH_SECRET)
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // If no token, redirect to the sign-in page
    if (!token) {
        const signInUrl = new URL("/auth/signIn", request.url);
        // signInUrl.searchParams.set("callbackUrl", request.url); // Optional: Set a return URL
        return NextResponse.redirect(signInUrl);
    }
    // Allow users to access only their own `/user/[id]` page
    if (pathname.startsWith("/user/")) {
        const userId = pathname.split("/")[2]; // Extract user ID from the path
        if (token.id !== userId) {
            return NextResponse.redirect(new URL("/403", request.url)); // Redirect to a forbidden page
        }
    }

    // Restrict `/admin` pages to admin users only
    if (pathname.startsWith("/admin")) {
        if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/403", request.url)); // Redirect to a forbidden page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*", '/admin/:path*', '/cart/:path*'],
  };