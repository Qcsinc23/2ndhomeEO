import { useState, useEffect, useCallback } from 'react';
import { API } from '../services/api';
import {
  Patient,
  CarePlan,
  Appointment,
  Treatment,
  Goal,
  ReminderPreference,
  NotificationSettings
} from '../types/api';

interface DataSyncOptions {
  enablePatientSync?: boolean;
  enableCarePlanSync?: boolean;
  enableAppointmentSync?: boolean;
  enableTreatmentSync?: boolean;
  enableGoalSync?: boolean;
  enableReminderSync?: boolean;
  enableNotificationSync?: boolean;
}

interface DataState {
  patients: Patient[];
  carePlans: CarePlan[];
  appointments: Appointment[];
  treatments: Treatment[];
  goals: Goal[];
  reminders: ReminderPreference[];
  notificationSettings: NotificationSettings | null;
  loading: boolean;
  error: Error | null;
}

export const useDataSync = (options: DataSyncOptions = {}) => {
  const [state, setState] = useState<DataState>({
    patients: [],
    carePlans: [],
    appointments: [],
    treatments: [],
    goals: [],
    reminders: [],
    notificationSettings: null,
    loading: true,
    error: null,
  });

  const updateState = useCallback((key: keyof DataState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  // Initial data fetch
  const fetchInitialData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const promises: Promise<any>[] = [];

      if (options.enablePatientSync) {
        promises.push(API.patient.listPatients());
      }
      if (options.enableCarePlanSync) {
        promises.push(API.carePlan.listCarePlans());
      }
      if (options.enableAppointmentSync) {
        promises.push(API.appointment.listAppointments());
      }
      if (options.enableTreatmentSync) {
        promises.push(API.treatment.listTreatments());
      }
      if (options.enableGoalSync) {
        promises.push(API.goal.listGoals());
      }
      if (options.enableReminderSync) {
        promises.push(API.reminder.listReminders());
      }

      const responses = await Promise.all(promises);
      const results: Partial<DataState> = {};
      let index = 0;

      if (options.enablePatientSync) {
        results.patients = responses[index++]?.items || [];
      }
      if (options.enableCarePlanSync) {
        results.carePlans = responses[index++]?.items || [];
      }
      if (options.enableAppointmentSync) {
        results.appointments = responses[index++]?.items || [];
      }
      if (options.enableTreatmentSync) {
        results.treatments = responses[index++]?.items || [];
      }
      if (options.enableGoalSync) {
        results.goals = responses[index++]?.items || [];
      }
      if (options.enableReminderSync) {
        results.reminders = responses[index++]?.items || [];
      }

      setState(prev => ({
        ...prev,
        ...results,
        loading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as Error,
        loading: false,
      }));
    }
  }, [options]);

  // Set up subscriptions
  useEffect(() => {
    const subscriptions: { unsubscribe: () => void }[] = [];

    if (options.enablePatientSync) {
      const sub = API.patient.onPatientUpdated((patient) => {
        setState(prev => ({
          ...prev,
          patients: prev.patients.map(p => 
            p.id === patient.id ? patient : p
          ),
        }));
      });
      subscriptions.push(sub);
    }

    if (options.enableCarePlanSync) {
      const sub = API.carePlan.onCarePlanUpdated((carePlan) => {
        setState(prev => ({
          ...prev,
          carePlans: prev.carePlans.map(cp => 
            cp.id === carePlan.id ? carePlan : cp
          ),
        }));
      });
      subscriptions.push(sub);
    }

    if (options.enableAppointmentSync) {
      const createdSub = API.appointment.onAppointmentCreated((appointment) => {
        setState(prev => ({
          ...prev,
          appointments: [...prev.appointments, appointment],
        }));
      });

      const updatedSub = API.appointment.onAppointmentUpdated((appointment) => {
        setState(prev => ({
          ...prev,
          appointments: prev.appointments.map(a => 
            a.id === appointment.id ? appointment : a
          ),
        }));
      });

      subscriptions.push(createdSub, updatedSub);
    }

    if (options.enableTreatmentSync) {
      const sub = API.treatment.onTreatmentUpdated((treatment) => {
        setState(prev => ({
          ...prev,
          treatments: prev.treatments.map(t => 
            t.id === treatment.id ? treatment : t
          ),
        }));
      });
      subscriptions.push(sub);
    }

    if (options.enableGoalSync) {
      const sub = API.goal.onGoalUpdated((goal) => {
        setState(prev => ({
          ...prev,
          goals: prev.goals.map(g => 
            g.id === goal.id ? goal : g
          ),
        }));
      });
      subscriptions.push(sub);
    }

    if (options.enableReminderSync) {
      const createdSub = API.reminder.onReminderCreated((reminder) => {
        setState(prev => ({
          ...prev,
          reminders: [...prev.reminders, reminder],
        }));
      });

      const updatedSub = API.reminder.onReminderUpdated((reminder) => {
        setState(prev => ({
          ...prev,
          reminders: prev.reminders.map(r => 
            r.id === reminder.id ? reminder : r
          ),
        }));
      });

      subscriptions.push(createdSub, updatedSub);
    }

    if (options.enableNotificationSync) {
      const sub = API.notification.onNotificationSettingsUpdated((settings) => {
        setState(prev => ({
          ...prev,
          notificationSettings: settings,
        }));
      });
      subscriptions.push(sub);
    }

    fetchInitialData();

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [options, fetchInitialData]);

  const refetch = useCallback(() => {
    setState(prev => ({ ...prev, loading: true }));
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    ...state,
    refetch,
    updateState,
  };
};

export default useDataSync;
