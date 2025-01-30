import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Messages } from '../config/messages';
import { success } from '../middlewares/responseHandler';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import config from '../config';
import { AuthRequest } from '../middlewares/authenticate';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return next(new Error(Messages.auth.userExists));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: {
          connect: {
            id: 1,
          },
        },
      },
    });

    return success(res, Messages.auth.registered);
  } catch (error: any) {
    console.log(error);

    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return next(new Error(Messages.auth.userNotFound));
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new Error(Messages.auth.incorrectCredentials));
    }

    const token = sign({ sub: user.id }, config.jwtSecret as string, {
      expiresIn: '1d',
    });

    const checkToken = await prisma.token.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (checkToken) {
      await prisma.token.delete({
        where: {
          userId: user.id,
        },
      });
    }

    await prisma.token.create({
      data: { userId: user.id, token: token },
    });

    const data = {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };

    return success(res, Messages.auth.loggedIn, data);
  } catch (error: any) {
    console.log(error);

    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const _request = req as AuthRequest;
  const user = await prisma.user.findFirst({
    where: {
      id: _request.userId,
    },
  });
  if (user) {
    const data = {
      id: user.id,
      email: user.email,
    };

    return success(res, '', data);
  }

  return next(new Error(Messages.common.failed));
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _request = req as AuthRequest;
    await prisma.token.delete({
      where: { token: _request.token, userId: _request.userId },
    });

    return success(res, Messages.auth.loggedOut);
  } catch (error) {
    console.log(error);

    return next(new Error(Messages.common.failed));
  }
};
