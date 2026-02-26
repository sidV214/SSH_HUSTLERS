import express from 'express';
import { analyzePrescription } from '../controllers/prescription.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Temporarily loosely protect for easier frontend integration, can tighten with authorize() later
router.post('/analyze', upload.single('prescriptionImage'), analyzePrescription);

export default router;
