import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { body } from "express-validator";
import validateRequest from '../middleware/validateMiddleware.js';

export const validateApplication = [
  body("companyName").notEmpty().withMessage("companyName is required"),
  body("jobTitle").notEmpty().withMessage("jobTitle is required"),
  body("status")
    .optional()
    .isIn(["Applied", "Interviewing", "Offered", "Rejected"])
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
  .post(protect, validateApplication, createApplication)
  .get(protect, getApplication);

router.route('/:id')
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);


export default router;