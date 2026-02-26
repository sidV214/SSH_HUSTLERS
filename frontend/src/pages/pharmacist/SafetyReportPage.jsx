import React, { useState } from 'react';
import LoadingState from '../../components/shared/LoadingState.jsx';
import ErrorState from '../../components/shared/ErrorState.jsx';
import EmptyState from '../../components/shared/EmptyState.jsx';
import Icon from '../../components/ui/Icon.jsx';

const mockSafetyReport = {
  id: 'RX-77021-BETA',
  timestamp: 'Oct 24, 2023 - 14:20 UTC',
  version: 'v4.2.1',
  ocrConfidence: 98.4,
  summary: {
    title: 'Critical drug‑drug interaction',
    body: 'Combining Warfarin and Aspirin significantly increases risk of major hemorrhage. Recommend pharmacist intervention.',
  },
  meds: [
    {
      name: 'Warfarin Sodium',
      dosage: '5mg - Once daily',
      confidence: '99%',
    },
    {
      name: 'Aspirin (Enteric Coated)',
      dosage: '81mg - Once daily',
      confidence: '97%',
    },
  ],
};

function PharmacistSafetyReportPage() {
  const [loading] = useState(false);
  const [error] = useState(null);
  const [data] = useState(mockSafetyReport);

  let content;
  if (loading) {
    content = <LoadingState label="Generating safety report…" />;
  } else if (error) {
    content = (
      <ErrorState
        message="We couldn't load this safety report."
        onRetry={null}
      />
    );
  } else if (!data) {
    content = (
      <EmptyState
        title="No report selected"
        description="Open a completed scan to review OCR confidence, extracted medications, and interaction details."
      />
    );
  } else {
    content = (
      <main className="space-y-8">
        {/* Header section */}
        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-primary/10 pb-6">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-sm text-primary font-bold uppercase tracking-wider">
              RX ID: {data.id}
            </p>
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground">
              Safety analysis report
            </h1>
            <p className="text-sm text-muted">
              Generated on {data.timestamp} • System {data.version}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-danger/10 text-danger px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-danger/40 shadow-sm">
              <Icon name="warning" size={16} />
              HIGH RISK DETECTED
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vision analysis */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center bg-surface-muted">
                <h3 className="font-bold text-sm uppercase tracking-widest text-muted">
                  Scanned document
                </h3>
                <span className="bg-success/10 text-success text-[10px] px-2 py-0.5 rounded-full font-bold">
                  LIVE OCR ACTIVE
                </span>
              </div>
              <div className="relative">
                <div className="aspect-[3/4] bg-surface-muted w-full relative overflow-hidden" />
                <div className="absolute top-[20%] left-[15%] w-[40%] h-[5%] border-2 border-primary bg-primary/10 rounded-sm" />
                <div className="absolute top-[35%] left-[15%] w-[35%] h-[5%] border-2 border-primary bg-primary/10 rounded-sm" />
                <div className="absolute top-[20%] right-[10%] w-[10%] h-[5%] bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary rounded-sm">
                  98%
                </div>
              </div>
              <div className="p-4 bg-surface-muted">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-muted">
                      OCR confidence score
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {data.ocrConfidence}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${data.ocrConfidence}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed italic">
                    Visual model detected Warfarin (5mg) and Aspirin (81mg) with high
                    linguistic probability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical intelligence */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-danger/5 border-l-4 border-danger p-5 rounded-xl">
              <div className="flex gap-4">
                <Icon name="error" size={32} className="text-danger shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-danger">
                    {data.summary.title}
                  </h3>
                  <p className="text-sm mt-1 text-danger">
                    {data.summary.body}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-sm uppercase tracking-widest text-muted">
                  Extracted medications
                </h3>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-muted text-[11px] uppercase tracking-wider text-muted">
                    <th className="px-4 py-3 font-semibold">Drug name</th>
                    <th className="px-4 py-3 font-semibold">Dosage</th>
                    <th className="px-4 py-3 font-semibold">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {data.meds.map((med) => (
                    <tr key={med.name} className="text-sm border-t border-border/40">
                      <td className="px-4 py-4 font-bold text-foreground">
                        {med.name}
                      </td>
                      <td className="px-4 py-4 text-muted">{med.dosage}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-success font-bold">
                          <Icon name="check_circle" size={12} />
                          {med.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="info" size={20} className="text-warning" />
                  <h4 className="font-bold text-sm text-foreground">Mechanism</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Additive anticoagulant and antiplatelet effects. Both drugs interfere
                  with the clotting cascade at different stages.
                </p>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="clinical_notes" size={20} className="text-primary" />
                  <h4 className="font-bold text-sm text-foreground">Action plan</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Validate with prescribing physician. Monitor INR levels closely if
                  co‑administration is strictly necessary.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-foreground">
              <div className="flex items-center justify-between px-4 py-2 bg-foreground/90">
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  FHIR R4 JSON export
                </span>
                <button
                  type="button"
                  className="text-muted hover:text-surface transition-colors"
                >
                  <Icon name="content_copy" size={16} />
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-success overflow-x-auto bg-foreground">
                {`{
  "resourceType": "MedicationRequest",
  "status": "active",
  "intent": "order",
  "medicationCodeableConcept": {
    "coding": [{
      "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
      "code": "855332",
      "display": "Warfarin Sodium 5 MG Oral Tablet"
    }]
  },
  "riskAssessment": {
    "severity": "high",
    "interaction": "aspirin_warfarin_001"
  }
}`}
              </pre>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-surface font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all"
              >
                <Icon name="check_circle" size={20} />
                Approve report
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-surface-muted hover:bg-surface text-foreground font-bold py-4 rounded-xl transition-all border border-border shadow-sm"
              >
                <Icon name="flag" size={20} className="text-danger" />
                Flag for review
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <section className="space-y-6 px-4 py-6 md:px-8">
      {content}
    </section>
  );
}

export default PharmacistSafetyReportPage;

