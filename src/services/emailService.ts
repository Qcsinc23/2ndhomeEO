import { Treatment, Goal } from '../types/api';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  isHtml?: boolean;
}

export const sendEmail = async ({ to, subject, body, isHtml = false }: EmailOptions): Promise<void> => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        body,
        isHtml
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendTreatmentReminder = async (treatment: Treatment, patientEmail: string): Promise<void> => {
  const subject = `Reminder: Treatment - ${treatment.name}`;
  const body = `
    Hello,

    This is a reminder for your treatment: ${treatment.name}
    Frequency: ${treatment.frequency}
    ${treatment.description ? `Description: ${treatment.description}` : ''}
    ${treatment.notes ? `Notes: ${treatment.notes}` : ''}

    Please ensure to follow your treatment plan as scheduled.

    Best regards,
    Your Care Team
  `;

  await sendEmail({
    to: patientEmail,
    subject,
    body,
    isHtml: false
  });
};

export const sendGoalReminder = async (goal: Goal, patientEmail: string): Promise<void> => {
  const subject = `Reminder: Goal Progress Check`;
  const body = `
    Hello,

    This is a reminder to check your progress on the following goal:
    ${goal.description}
    ${goal.targetDate ? `Target Date: ${new Date(goal.targetDate).toLocaleDateString()}` : ''}

    Please review your progress and update your care plan accordingly.

    Best regards,
    Your Care Team
  `;

  await sendEmail({
    to: patientEmail,
    subject,
    body,
    isHtml: false
  });
};
