import { CarePlan } from '../types/api';

interface PDFOptions {
  carePlan: CarePlan;
  includeMetrics?: boolean;
  includeNotes?: boolean;
}

export const generateProgressReport = async ({ 
  carePlan,
  includeMetrics = true,
  includeNotes = true 
}: PDFOptions): Promise<Blob> => {
  try {
    const response = await fetch('/api/reports/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carePlanId: carePlan.id,
        includeMetrics,
        includeNotes
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF report');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const downloadPDF = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
