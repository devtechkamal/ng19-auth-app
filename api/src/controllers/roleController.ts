import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Messages } from '../config/messages';
import { success } from '../middlewares/responseHandler';
import { ZodError } from 'zod';
const prisma = new PrismaClient();

export const getRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const roles = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  return success(res, '', roles);
};

export const storeRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    const role = await prisma.role.create({
      data: { name },
    });

    return success(res, Messages.role.created, role);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    return success(res, Messages.role.updated, role);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await prisma.role.delete({
      where: { id: parseInt(id) },
    });

    return success(res, Messages.role.deleted);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};
