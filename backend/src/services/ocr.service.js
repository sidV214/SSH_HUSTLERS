// Mock OCR logic acting as a stub for the heavy AI extraction model

export const performOCR = async (fileBuffer) => {
    // Simulate delay for OCR processing
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return a mock extracted schema
    return [
        { drugName: 'Amoxicillin', dosage: '500mg', frequency: 'Bid (twice a day)' },
        { drugName: 'Ibuprofen', dosage: '400mg', frequency: 'Prn (as needed)' }
    ];
};
