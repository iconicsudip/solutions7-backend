import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Secret key for JWT (store this securely in your environment variables)

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Please set it in the environment variables.');
}

// Sign-up logic
export const userSignUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => { };

// Sign-in logic
export const userSignIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => { };
