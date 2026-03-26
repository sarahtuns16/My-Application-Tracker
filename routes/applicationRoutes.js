import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { body } from "express-validator";
import validateRequest from '../middleware/validateMiddleware.js';

export const validateApplication = [
  body("companyName").notEmpty().withMessage("Company name is required"),
  body("jobTitle").notEmpty().withMessage("Job title is required"),
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

  router.get("/applications", protect, getApplication);

export default router;