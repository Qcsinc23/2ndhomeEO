import {
  Collection,
  View,
  Text,
  Card
} from '@aws-amplify/ui-react';
import { Appointment } from '../../types/api';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onSelectAppointment: (appointment: Appointment) => void;
}

export const AppointmentCalendar = ({
  appointments,
  onSelectAppointment
}: AppointmentCalendarProps) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.datetime);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <View>
      <Collection
        type="grid"
        items={weekDays}
        templateColumns="repeat(7, 1fr)"
        gap="small"
      >
        {(date) => (
          <Card
            variation="elevated"
            padding="medium"
            backgroundColor={
              date.toDateString() === today.toDateString()
                ? 'brand.primary.10'
                : 'white'
            }
          >
            <Text fontWeight="bold">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
            <Text>{date.getDate()}</Text>
            
            <Collection
              type="list"
              items={getAppointmentsForDate(date)}
              gap="xxs"
            >
              {(appointment) => (
                <View
                  backgroundColor="brand.primary.20"
                  padding="xs"
                  borderRadius="small"
                  onClick={() => onSelectAppointment(appointment)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text fontSize="small">
                    {new Date(appointment.datetime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </View>
              )}
            </Collection>
          </Card>
        )}
      </Collection>
    </View>
  );
};
