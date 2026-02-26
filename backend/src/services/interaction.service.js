// Mock ML interaction engine logic

export const checkInteractions = async (drugsArray) => {
    // Simulate heavy ML inference
    await new Promise(resolve => setTimeout(resolve, 500));

    let riskLevel = 'low';
    const alerts = [];

    const stringifiedDrugs = JSON.stringify(drugsArray).toLowerCase();

    // Simple stub condition mirroring the frontend UI state test
    if (stringifiedDrugs.includes('warfarin') && stringifiedDrugs.includes('aspirin')) {
        riskLevel = 'high';
        alerts.push({
            severity: 'high',
            description: 'Concurrent use of Warfarin and Aspirin significantly increases the risk of bleeding.',
            relatedDrugs: ['Warfarin', 'Aspirin']
        });
    }

    return { riskLevel, alerts };
};
