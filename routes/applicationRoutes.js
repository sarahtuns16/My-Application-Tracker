import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
} from '../controllers/applicationController.js';

const router = express.Router();

router.route('/')
  .post(protect, createApplication)
  .get(protect, getApplication);

router.route('/:id')
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

export default router;