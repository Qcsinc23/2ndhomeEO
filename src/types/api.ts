// Status and Type Enums
export enum PatientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export enum CarePlanStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  PENDING_REVIEW = 'PENDING_REVIEW'
}

export enum TreatmentStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export enum AppointmentType {
  INITIAL_ASSESSMENT = 'INITIAL_ASSESSMENT',
  FOLLOW_UP = 'FOLLOW_UP',
  TREATMENT = 'TREATMENT',
  REVIEW = 'REVIEW',
  EMERGENCY = 'EMERGENCY'
}

export enum ProviderStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE'
}

export enum GoalStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  ACHIEVED = 'ACHIEVED',
  CANCELLED = 'CANCELLED'
}

// Base Interfaces
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  status: PatientStatus;
  carePlans?: { items: CarePlan[] };
  appointments?: { items: Appointment[] };
  medicalHistory?: { items: MedicalRecord[] };
  createdAt: string;
  updatedAt: string;
}

export interface CarePlan {
  id: string;
  patientID: string;
  patient?: Patient;
  title: string;
  description?: string;
  status: CarePlanStatus;
  startDate: string;
  endDate?: string;
  treatments?: { items: Treatment[] };
  goals?: { items: Goal[] };
  notificationSettings?: NotificationSettings;
  reminders?: { items: ReminderPreference[] };
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: string;
  carePlanID: string;
  carePlan?: CarePlan;
  name: string;
  description: string;
  frequency: string;
  duration?: string;
  notes?: string;
  status: TreatmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  carePlanID: string;
  carePlan?: CarePlan;
  description: string;
  targetDate?: string;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientID: string;
  patient?: Patient;
  providerID: string;
  provider?: CareProvider;
  datetime: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareProvider {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialization?: string;
  email: string;
  phoneNumber?: string;
  status: ProviderStatus;
  appointments?: { items: Appointment[] };
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientID: string;
  patient?: Patient;
  type: string;
  date: string;
  description: string;
  attachment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReminderPreference {
  id: string;
  type: 'treatment' | 'goal';
  schedule: string;
  enabled: boolean;
  recipientEmail: string;
  carePlanID: string;
  treatmentID?: string;
  goalID?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  carePlanID: string;
  emailNotifications: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'custom';
  customSchedule?: string;
  recipientEmail: string;
}

// Input Types
export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  status: PatientStatus;
}

export interface UpdatePatientInput {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  status?: PatientStatus;
}

export interface CreateCarePlanInput {
  patientID: string;
  title: string;
  description?: string;
  status: CarePlanStatus;
  startDate: string;
  endDate?: string;
}

export interface UpdateCarePlanInput {
  id: string;
  title?: string;
  description?: string;
  status?: CarePlanStatus;
  endDate?: string;
}

export interface CreateTreatmentInput {
  carePlanID: string;
  name: string;
  description: string;
  frequency: string;
  duration?: string;
  notes?: string;
  status: TreatmentStatus;
}

export interface UpdateTreatmentInput {
  id: string;
  name?: string;
  description?: string;
  frequency?: string;
  duration?: string;
  notes?: string;
  status?: TreatmentStatus;
}

export interface CreateGoalInput {
  carePlanID: string;
  description: string;
  targetDate?: string;
  status: GoalStatus;
}

export interface UpdateGoalInput {
  id: string;
  description?: string;
  targetDate?: string;
  status?: GoalStatus;
}

export interface CreateAppointmentInput {
  patientID: string;
  providerID: string;
  datetime: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
}

export interface UpdateAppointmentInput {
  id: string;
  datetime?: string;
  duration?: number;
  type?: AppointmentType;
  status?: AppointmentStatus;
  notes?: string;
}

export interface CreateReminderInput {
  type: 'treatment' | 'goal';
  schedule: string;
  enabled: boolean;
  recipientEmail: string;
  carePlanID: string;
  treatmentID?: string;
  goalID?: string;
}

export interface UpdateReminderInput {
  id: string;
  schedule?: string;
  enabled?: boolean;
  recipientEmail?: string;
}

export interface UpdateNotificationSettingsInput {
  carePlanID: string;
  emailNotifications?: boolean;
  reminderFrequency?: 'daily' | 'weekly' | 'custom';
  customSchedule?: string;
  recipientEmail?: string;
}
