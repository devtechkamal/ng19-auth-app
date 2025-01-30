import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Messages } from '../config/messages';
import { success } from '../middlewares/responseHandler';
import { ZodError } from 'zod';
const prisma = new PrismaClient();

export const getDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const departments = await prisma.department.findMany({
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
  return success(res, '', departments);
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });

    return success(res, '', department);
  } catch (error: any) {
    next(new Error(Messages.common.failed));
  }
};

export const storeDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    const department = await prisma.department.create({
      data: { name },
    });

    return success(res, Messages.department.created, department);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const department = await prisma.department.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    return success(res, Messages.department.updated, department);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await prisma.department.delete({
      where: { id: parseInt(id) },
    });

    return success(res, Messages.department.deleted);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};
