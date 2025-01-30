import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Messages } from '../config/messages';
import { success } from '../middlewares/responseHandler';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
  return success(res, '', users);
};

export const storeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: { connect: { id: role } },
      },
    });

    return success(res, Messages.user.created, user);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};
