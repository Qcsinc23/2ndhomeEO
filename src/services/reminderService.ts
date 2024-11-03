import { Appointment, Treatment, Goal } from '../types/api';
import { sendTreatmentReminder, sendGoalReminder } from './emailService';

interface ReminderOptions {
  appointment: Appointment;
  notifyBefore: number; // minutes
}

export const scheduleReminder = async ({ appointment, notifyBefore }: ReminderOptions): Promise<void> => {
  try {
    const response = await fetch('/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentId: appointment.id,
        datetime: appointment.datetime,
        notifyBefore
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule reminder');
    }
  } catch (error) {
    console.error('Error scheduling reminder:', error);
    throw error;
  }
};

export const cancelReminder = async (appointmentId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/reminders/${appointmentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to cancel reminder');
    }
  } catch (error) {
    console.error('Error canceling reminder:', error);
    throw error;
  }
};

export const scheduleTreatmentReminder = async (
  treatment: Treatment,
  patientEmail: string,
  frequency: string
): Promise<void> => {
  try {
    // Schedule the reminder in the backend
    const response = await fetch('/api/reminders/treatment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        treatmentId: treatment.id,
        frequency,
        patientEmail
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule treatment reminder');
    }

    // Send initial reminder email
    await sendTreatmentReminder(treatment, patientEmail);
  } catch (error) {
    console.error('Error scheduling treatment reminder:', error);
    throw error;
  }
};

export const scheduleGoalReminder = async (
  goal: Goal,
  patientEmail: string,
  checkInterval: number // days
): Promise<void> => {
  try {
    // Schedule the reminder in the backend
    const response = await fetch('/api/reminders/goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goalId: goal.id,
        checkInterval,
        patientEmail
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule goal reminder');
    }

    // Send initial reminder email
    await sendGoalReminder(goal, patientEmail);
  } catch (error) {
    console.error('Error scheduling goal reminder:', error);
    throw error;
  }
};
