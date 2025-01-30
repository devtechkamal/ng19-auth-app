import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  userId: number;
  token: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ message: 'Authorization token is required' });
    return;
  }

  try {
    const parsedText = token.split(' ')[1];

    const decoded = verify(parsedText, config.jwtSecret as string);
    const _request = req as AuthRequest;
    _request.userId = Number(decoded.sub);
    _request.token = parsedText;

    const blacklistedToken = await prisma.token.findUnique({
      where: { token: parsedText, userId: _request.userId },
    });

    if (!blacklistedToken) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
};
