import { Router } from 'express';
import { login, logout, me, register } from '../controllers/authController';
import {
  deleteRole,
  getRole,
  storeRole,
  updateRole,
} from '../controllers/roleController';
import { getUser, storeUser } from '../controllers/userController';
import {
  deleteDepartment,
  getDepartment,
  getDepartmentById,
  storeDepartment,
  updateDepartment,
} from '../controllers/departmentController';
import {
  deleteEmployee,
  getEmployee,
  getEmployeeById,
  storeEmployee,
  updateEmployee,
} from '../controllers/employeeController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.post('/auth/login', login);
router.get('/auth/me', authenticate, me);
router.get('/auth/logout', authenticate, logout);
router.post('/auth/register', register);

// Role
router.get('/roles', getRole);
router.post('/roles', storeRole);
router.post('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

// Department
router.get('/departments', getDepartment);
router.get('/departments/:id', getDepartmentById);
router.post('/departments', storeDepartment);
router.post('/departments/:id', updateDepartment);
router.delete('/departments/:id', deleteDepartment);

// User
router.get('/users', getUser);
router.post('/users', storeUser);

// Employee
router.get('/employees', getEmployee);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', storeEmployee);
router.post('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
