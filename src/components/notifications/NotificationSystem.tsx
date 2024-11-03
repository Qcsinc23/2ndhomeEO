import { useEffect, useState, useCallback } from 'react';
import { View, Text, Collection, Badge, Loader, Flex } from '@aws-amplify/ui-react';
import { API } from '../../services/api';

interface Notification {
  id: string;
  type: 'treatment' | 'goal' | 'appointment' | 'reminder';
  title: string;
  message: string;
  date: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading] = useState(true);
  const [error] = useState<string | null>(null);

  // Helper function to add a new notification
  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => {
      const exists = prev.some(n => n.id === notification.id);
      if (!exists) {
        return [notification, ...prev];
      }
      return prev;
    });
  }, []);

  // Treatment subscription
  useEffect(() => {
    const subscription = API.treatment.onTreatmentUpdated((treatment) => {
      if (treatment.status === 'SCHEDULED') {
        addNotification({
          id: `treatment-${treatment.id}-${Date.now()}`,
          type: 'treatment',
          title: 'Treatment Scheduled',
          message: `Treatment "${treatment.name}" has been scheduled`,
          date: new Date(),
          read: false,
          priority: 'high'
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [addNotification]);

  // Goal subscription
  useEffect(() => {
    const subscription = API.goal.onGoalUpdated((goal) => {
      if (goal.status === 'IN_PROGRESS' && goal.targetDate) {
        const targetDate = new Date(goal.targetDate);
        const today = new Date();
        const daysUntilTarget = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilTarget <= 7 && daysUntilTarget > 0) {
          addNotification({
            id: `goal-${goal.id}-${Date.now()}`,
            type: 'goal',
            title: 'Goal Deadline Approaching',
            message: `Goal "${goal.description}" is due in ${daysUntilTarget} days`,
            date: new Date(),
            read: false,
            priority: daysUntilTarget <= 3 ? 'high' : 'medium'
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [addNotification]);

  // Appointment subscription
  useEffect(() => {
    const appointmentCreated = API.appointment.onAppointmentCreated((appointment) => {
      addNotification({
        id: `appointment-created-${appointment.id}-${Date.now()}`,
        type: 'appointment',
        title: 'New Appointment',
        message: `New appointment scheduled for ${new Date(appointment.datetime).toLocaleString()}`,
        date: new Date(),
        read: false,
        priority: 'medium'
      });
    });

    const appointmentUpdated = API.appointment.onAppointmentUpdated((appointment) => {
      if (appointment.status === 'CONFIRMED') {
        addNotification({
          id: `appointment-confirmed-${appointment.id}-${Date.now()}`,
          type: 'appointment',
          title: 'Appointment Confirmed',
          message: `Appointment for ${new Date(appointment.datetime).toLocaleString()} has been confirmed`,
          date: new Date(),
          read: false,
          priority: 'medium'
        });
      }
    });

    return () => {
      appointmentCreated.unsubscribe();
      appointmentUpdated.unsubscribe();
    };
  }, [addNotification]);

  // Reminder subscription
  useEffect(() => {
    const subscription = API.reminder.onReminderCreated((reminder) => {
      addNotification({
        id: `reminder-${reminder.id}-${Date.now()}`,
        type: 'reminder',
        title: 'New Reminder Set',
        message: `A new reminder has been set for ${reminder.type}`,
        date: new Date(),
        read: false,
        priority: 'medium'
      });
    });

    return () => subscription.unsubscribe();
  }, [addNotification]);

  // Notification settings subscription
  useEffect(() => {
    const subscription = API.notification.onNotificationSettingsUpdated(() => {
      // We keep the subscription to stay updated with settings changes
      // but remove the unused settings parameter
    });

    return () => subscription.unsubscribe();
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'treatment':
        return '💊';
      case 'goal':
        return '🎯';
      case 'appointment':
        return '📅';
      case 'reminder':
        return '⏰';
      default:
        return '📌';
    }
  };

  if (error) {
    return (
      <View padding="1rem">
        <Text color="red" variation="error">
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <View padding="1rem">
      <Flex justifyContent="space-between" alignItems="center" marginBottom="1rem">
        <Text variation="primary" fontSize="1.25rem" fontWeight={700}>
          Notifications
        </Text>
        <Badge variation="info">
          {notifications.filter(n => !n.read).length} unread
        </Badge>
      </Flex>

      {loading ? (
        <Loader size="large" />
      ) : (
        <Collection
          type="list"
          items={notifications.sort((a, b) => b.date.getTime() - a.date.getTime())}
          gap="0.5rem"
        >
          {(notification) => (
            <View
              backgroundColor={notification.read ? 'neutral.10' : 'white'}
              padding="1rem"
              style={{
                borderRadius: '0.5rem',
                border: '1px solid var(--amplify-colors-neutral-20)',
                cursor: 'pointer'
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center" gap="0.5rem">
                  <Text fontSize="1.25rem">{getTypeIcon(notification.type)}</Text>
                  <View>
                    <Text fontWeight={700}>{notification.title}</Text>
                    <Text variation="secondary" fontSize="0.875rem">
                      {notification.date.toLocaleString()}
                    </Text>
                  </View>
                </Flex>
                <Badge variation={getPriorityColor(notification.priority)}>
                  {notification.priority}
                </Badge>
              </Flex>
              <Text marginTop="0.5rem">{notification.message}</Text>
            </View>
          )}
        </Collection>
      )}
    </View>
  );
};
