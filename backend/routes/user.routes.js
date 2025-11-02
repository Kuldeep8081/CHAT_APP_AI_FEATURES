import { Router } from "express";
import * as userController from '../controllers/user.controller.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';
import redisClient from "../services/redis.service.js";
const router=Router();

router.post('/register',
    body('email').isEmail().withMessage('Email mush be a valid email address'),
    body('password').isLength({min : 3}).withMessage('Password mush be atleast 6 character  '),
    userController.createUserController
);

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long'),
    userController.loginController
);

router.get('/profile',authMiddleware.authUser, userController.profileController);

router.get('/logout', authMiddleware.authUser, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies?.token || (authHeader && authHeader.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const ttl = 24 * 60 * 60; // 1 day

        // Support different Redis client APIs (redis v4: setEx, ioredis: setex)
        if (typeof redisClient.setEx === 'function') {
            await redisClient.setEx(token, ttl, 'logout');
        } else if (typeof redisClient.setex === 'function') {
            await redisClient.setex(token, ttl, 'logout');
        } else {
            // Fallback: try generic set with EX option
            await redisClient.set(token, 'logout', 'EX', ttl);
        }

        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

export default router;