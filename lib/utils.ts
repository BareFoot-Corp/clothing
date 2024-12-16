import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import jwt from 'jsonwebtoken';

// tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// JWT verification token
// ********************************************************

const SECRET_KEY = process.env.JWT_SECRET || 'm_secret_key'; // Replace with a secure key in production

export function generateToken(payload: object, expiresIn: string = '1h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}
// ********************************************************


export function splitName(str: string){
  return str.split(" ");
}

export function getInitials(name: string){
  const split = splitName(name);
  return `${split[0][0]}${split[1][0]}`;
}