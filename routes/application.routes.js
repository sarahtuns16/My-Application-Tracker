const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} = require('../controllers/application.controller');

router.route('/')
  .post(protect, createApplication)
  .get(protect, getApplications);

router.route('/:id')
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

module.exports = router;