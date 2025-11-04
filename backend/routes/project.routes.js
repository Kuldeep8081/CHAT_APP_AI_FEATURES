import {Router} from 'express';
import { body } from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
const router=Router();
router.post('/create',
    authMiddleware.authUser,
    body('name').isString().withMessage('Project name must be a string').notEmpty().withMessage('Project name is required'),
    projectController.createProject
);

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProjects,
)

router.put('/add-user',
    authMiddleware.authUser,
    body('projectId').isString()
    .withMessage('Project ID must be a string')
    .notEmpty()
    .withMessage('Project ID is required'),
    
    body('users')
    .isArray()
    .withMessage('Users must be an array')
    .custom(arr => arr.every(item => typeof item === 'string'))
    .withMessage('Users must be an array of strings'),
    projectController.addUserToProject
);

export default router;