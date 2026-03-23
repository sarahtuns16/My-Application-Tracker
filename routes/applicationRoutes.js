import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { body } from "express-validator";
import validateRequest from '../middleware/validateMiddleware.js';

export const validateApplication = [
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("status")
    .optional()
    .isIn(["pending", "accepted", "rejected"])
    .withMessage("Invalid status"),
];

import {
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
} from '../controllers/applicationController.js';

const router = express.Router();

router.route('/')
  .post(protect, validateApplication, validateRequest, createApplication)
  .get(protect, getApplication);

router.route('/:id')
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

export default router;