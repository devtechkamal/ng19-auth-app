import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Messages } from '../config/messages';
import { success } from '../middlewares/responseHandler';
import { ZodError } from 'zod';
const prisma = new PrismaClient();

export const getEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const employees = await prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      hireDate: true,
      position: true,
      salary: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  return success(res, '', employees);
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        hireDate: true,
        position: true,
        salary: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return success(res, '', employee);
  } catch (error: any) {
    next(new Error(Messages.common.failed));
  }
};

export const storeEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      hireDate,
      position,
      salary,
    } = req.body;

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone.toString(),
        department: { connect: { id: department } },
        hireDate,
        position,
        salary,
      },
    });

    return success(res, Messages.employee.created, employee);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      console.log(error);

      next(new Error(Messages.common.failed));
    }
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      hireDate,
      position,
      salary,
    } = req.body;

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phone: phone.toString(),
        department: { connect: { id: department } },
        hireDate,
        position,
        salary,
      },
    });

    return success(res, Messages.employee.updated, employee);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });

    return success(res, Messages.employee.deleted);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(error);
    } else {
      next(new Error(Messages.common.failed));
    }
  }
};
