import Prescription from '../models/Prescription.model.js';
import logger from '../utils/logger.js';
import { performOCR } from '../services/ocr.service.js';
import { checkInteractions } from '../services/interaction.service.js';

// @desc    Upload and analyze prescription
// @route   POST /api/prescriptions/analyze
// @access  Private (Pharmacist, Doctor)
export const analyzePrescription = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('Please upload an image file');
        }

        // Mock flow:
        // 1. Send file buffer to OCR service
        logger.info('Starting OCR process for uploaded prescription...');
        const extractedDrugs = await performOCR(req.file.buffer);

        // 2. Pass extracted drugs to Interaction service
        logger.info('Performing interaction checks on extracted drugs...');
        const safetyAssessment = await checkInteractions(extractedDrugs);

        res.status(200).json({
            success: true,
            data: {
                extractedData: extractedDrugs,
                safetyAssessment
            }
        });

    } catch (error) {
        next(error);
    }
};
