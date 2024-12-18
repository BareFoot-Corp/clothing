import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// import nodemailer from 'nodemailer';
import { generateToken } from '@/lib/utils';
import { sendVerificationEmail } from '../sendVerificationEmail';

const prisma = new PrismaClient();


export async function POST(request: NextRequest){
    const { fullname, email, username, password } = await request.json();

    if (!username || !email || !password || !fullname) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
    
        if (existingUser) {
          return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create the user
        const user = await prisma.user.create({
          data: {
            username,
            fullname,
            email,
            password: hashedPassword,
          },
        });
        // Generate JWT token
        const token = generateToken({ userId: user.id });

        // Send verification email
        await sendVerificationEmail(email, token);

        return NextResponse.json({ message: 'User registered. Please check your email for verification.', user }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}