import mongoose from 'mongoose';

const prescriptionitemSchema = new mongoose.Schema({
    drugName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    route: { type: String },
    duration: { type: String }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        prescriber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending_analysis', 'analyzed', 'verified', 'dispensed', 'rejected'],
            default: 'pending_analysis'
        },
        ocrTextRaw: {
            type: String,
            description: 'Raw text extracted from the digitized prescription'
        },
        extractedData: [prescriptionitemSchema],
        safetyAssessment: {
            riskLevel: {
                type: String,
                enum: ['low', 'medium', 'high', 'unknown'],
                default: 'unknown'
            },
            alerts: [
                {
                    severity: String,
                    description: String,
                    relatedDrugs: [String]
                }
            ]
        },
        imageFileRef: {
            type: String,
            description: 'Reference to the cloud storage bucket location of the original image'
        }
    },
    {
        timestamps: true
    }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
