import express from 'express';
import {
    createReturnRequest,
    getUserReturns,
    getReturnById,
    cancelReturnRequest,
} from '../controllers/returns.controller.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// Protected routes
router.post('/', verifyToken, createReturnRequest);       // POST /api/returns
router.get('/', verifyToken, getUserReturns);             // GET /api/returns
router.get('/:id', verifyToken, getReturnById);           // GET /api/returns/:id
router.delete('/:id', verifyToken, cancelReturnRequest);  // DELETE /api/returns/:id

export default router;
