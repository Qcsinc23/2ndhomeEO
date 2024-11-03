import {
  AppointmentStatus,
  AppointmentType,
  CarePlanStatus,
  TreatmentStatus,
  GoalStatus
} from '../types/api';

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  AppointmentStatus.SCHEDULED,
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.IN_PROGRESS,
  AppointmentStatus.COMPLETED,
  AppointmentStatus.CANCELLED,
  AppointmentStatus.NO_SHOW
];

export const APPOINTMENT_TYPES: AppointmentType[] = [
  AppointmentType.INITIAL_ASSESSMENT,
  AppointmentType.FOLLOW_UP,
  AppointmentType.TREATMENT,
  AppointmentType.REVIEW,
  AppointmentType.EMERGENCY
];

export const CARE_PLAN_STATUSES: CarePlanStatus[] = [
  CarePlanStatus.ACTIVE,
  CarePlanStatus.COMPLETED,
  CarePlanStatus.CANCELLED,
  CarePlanStatus.PENDING_REVIEW
];

export const TREATMENT_STATUSES: TreatmentStatus[] = [
  TreatmentStatus.SCHEDULED,
  TreatmentStatus.IN_PROGRESS,
  TreatmentStatus.COMPLETED,
  TreatmentStatus.CANCELLED
];

export const GOAL_STATUSES: GoalStatus[] = [
  GoalStatus.IN_PROGRESS,
  GoalStatus.ACHIEVED,
  GoalStatus.CANCELLED
];
