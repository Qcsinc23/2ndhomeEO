import { generateClient } from 'aws-amplify/api';
import { GraphQLSubscription, GraphQLQuery } from '@aws-amplify/api';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { 
  CreateReminderInput, 
  UpdateReminderInput, 
  UpdateNotificationSettingsInput,
  Patient,
  CarePlan,
  Treatment,
  Goal,
  Appointment,
  ReminderPreference,
  NotificationSettings,
  CreateAppointmentInput,
  UpdateAppointmentInput,
  CreateCarePlanInput,
  CreateTreatmentInput,
  UpdateTreatmentInput,
  CreateGoalInput,
  UpdateGoalInput
} from '../types/api';

const client = generateClient();

const handleError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};

// Subscription Types
type SubscriptionCallback<T> = (data: T) => void;
type Subscription = { unsubscribe: () => void };

// Enhanced APIs with subscription support
export const patientAPI = {
  async listPatients() {
    try {
      const response = await client.graphql<GraphQLQuery<{ listPatients: { items: Patient[] } }>>({
        query: queries.listPatients
      });
      return response.data?.listPatients;
    } catch (error) {
      handleError(error);
    }
  },

  onPatientUpdated(callback: SubscriptionCallback<Patient>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdatePatient: Patient }>>(
        { query: subscriptions.onUpdatePatient }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdatePatient) {
            callback(result.data.onUpdatePatient);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const carePlanAPI = {
  async listCarePlans() {
    try {
      const response = await client.graphql<GraphQLQuery<{ listCarePlans: { items: CarePlan[] } }>>({
        query: queries.listCarePlans
      });
      return response.data?.listCarePlans;
    } catch (error) {
      handleError(error);
    }
  },

  async createCarePlan(input: CreateCarePlanInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ createCarePlan: CarePlan }>>({
        query: mutations.createCarePlan,
        variables: { input }
      });
      return response.data?.createCarePlan;
    } catch (error) {
      handleError(error);
    }
  },

  onCarePlanUpdated(callback: SubscriptionCallback<CarePlan>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdateCarePlan: CarePlan }>>(
        { query: subscriptions.onUpdateCarePlan }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdateCarePlan) {
            callback(result.data.onUpdateCarePlan);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const treatmentAPI = {
  async listTreatments() {
    try {
      const response = await client.graphql<GraphQLQuery<{ listTreatments: { items: Treatment[] } }>>({
        query: queries.listTreatments
      });
      return response.data?.listTreatments;
    } catch (error) {
      handleError(error);
    }
  },

  async createTreatment(input: CreateTreatmentInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ createTreatment: Treatment }>>({
        query: mutations.createTreatment,
        variables: { input }
      });
      return response.data?.createTreatment;
    } catch (error) {
      handleError(error);
    }
  },

  async updateTreatment(input: UpdateTreatmentInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ updateTreatment: Treatment }>>({
        query: mutations.updateTreatment,
        variables: { input }
      });
      return response.data?.updateTreatment;
    } catch (error) {
      handleError(error);
    }
  },

  onTreatmentUpdated(callback: SubscriptionCallback<Treatment>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdateTreatment: Treatment }>>(
        { query: subscriptions.onUpdateTreatment }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdateTreatment) {
            callback(result.data.onUpdateTreatment);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const goalAPI = {
  async listGoals() {
    try {
      const response = await client.graphql<GraphQLQuery<{ listGoals: { items: Goal[] } }>>({
        query: queries.listGoals
      });
      return response.data?.listGoals;
    } catch (error) {
      handleError(error);
    }
  },

  async createGoal(input: CreateGoalInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ createGoal: Goal }>>({
        query: mutations.createGoal,
        variables: { input }
      });
      return response.data?.createGoal;
    } catch (error) {
      handleError(error);
    }
  },

  async updateGoal(input: UpdateGoalInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ updateGoal: Goal }>>({
        query: mutations.updateGoal,
        variables: { input }
      });
      return response.data?.updateGoal;
    } catch (error) {
      handleError(error);
    }
  },

  onGoalUpdated(callback: SubscriptionCallback<Goal>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdateGoal: Goal }>>(
        { query: subscriptions.onUpdateGoal }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdateGoal) {
            callback(result.data.onUpdateGoal);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const appointmentAPI = {
  async listAppointments() {
    try {
      const response = await client.graphql<GraphQLQuery<{ listAppointments: { items: Appointment[] } }>>({
        query: queries.listAppointments
      });
      return response.data?.listAppointments;
    } catch (error) {
      handleError(error);
    }
  },

  async createAppointment(input: CreateAppointmentInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ createAppointment: Appointment }>>({
        query: mutations.createAppointment,
        variables: { input }
      });
      return response.data?.createAppointment;
    } catch (error) {
      handleError(error);
    }
  },

  async updateAppointment(input: UpdateAppointmentInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ updateAppointment: Appointment }>>({
        query: mutations.updateAppointment,
        variables: { input }
      });
      return response.data?.updateAppointment;
    } catch (error) {
      handleError(error);
    }
  },

  onAppointmentCreated(callback: SubscriptionCallback<Appointment>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onCreateAppointment: Appointment }>>(
        { query: subscriptions.onCreateAppointment }
      ).subscribe({
        next: (result) => {
          if (result.data?.onCreateAppointment) {
            callback(result.data.onCreateAppointment);
          }
        },
        error: handleError
      }).unsubscribe
    };
  },

  onAppointmentUpdated(callback: SubscriptionCallback<Appointment>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdateAppointment: Appointment }>>(
        { query: subscriptions.onUpdateAppointment }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdateAppointment) {
            callback(result.data.onUpdateAppointment);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const reminderAPI = {
  async listReminders() {
    try {
      const response = await client.graphql<GraphQLQuery<{ listReminders: { items: ReminderPreference[] } }>>({
        query: queries.listReminders
      });
      return response.data?.listReminders;
    } catch (error) {
      handleError(error);
    }
  },

  async createReminder(input: CreateReminderInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ createReminder: ReminderPreference }>>({
        query: mutations.createReminder,
        variables: { input }
      });
      return response.data?.createReminder;
    } catch (error) {
      handleError(error);
    }
  },

  async updateReminder(input: UpdateReminderInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ updateReminder: ReminderPreference }>>({
        query: mutations.updateReminder,
        variables: { input }
      });
      return response.data?.updateReminder;
    } catch (error) {
      handleError(error);
    }
  },

  onReminderCreated(callback: SubscriptionCallback<ReminderPreference>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onCreateReminder: ReminderPreference }>>(
        { query: subscriptions.onCreateReminder }
      ).subscribe({
        next: (result) => {
          if (result.data?.onCreateReminder) {
            callback(result.data.onCreateReminder);
          }
        },
        error: handleError
      }).unsubscribe
    };
  },

  onReminderUpdated(callback: SubscriptionCallback<ReminderPreference>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdateReminder: ReminderPreference }>>(
        { query: subscriptions.onUpdateReminder }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdateReminder) {
            callback(result.data.onUpdateReminder);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const notificationAPI = {
  async updateNotificationSettings(input: UpdateNotificationSettingsInput) {
    try {
      const response = await client.graphql<GraphQLQuery<{ updateNotificationSettings: NotificationSettings }>>({
        query: mutations.updateNotificationSettings,
        variables: { input }
      });
      return response.data?.updateNotificationSettings;
    } catch (error) {
      handleError(error);
    }
  },

  onNotificationSettingsUpdated(callback: SubscriptionCallback<NotificationSettings>): Subscription {
    return {
      unsubscribe: client.graphql<GraphQLSubscription<{ onUpdateNotificationSettings: NotificationSettings }>>(
        { query: subscriptions.onUpdateNotificationSettings }
      ).subscribe({
        next: (result) => {
          if (result.data?.onUpdateNotificationSettings) {
            callback(result.data.onUpdateNotificationSettings);
          }
        },
        error: handleError
      }).unsubscribe
    };
  }
};

export const API = {
  patient: patientAPI,
  carePlan: carePlanAPI,
  treatment: treatmentAPI,
  goal: goalAPI,
  appointment: appointmentAPI,
  reminder: reminderAPI,
  notification: notificationAPI
};

export default API;
