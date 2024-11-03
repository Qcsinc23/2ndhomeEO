import {
  View,
  Heading,
  Text,
  Button,
  SelectField,
  TextAreaField,
  Divider,
  Card
} from '@aws-amplify/ui-react';
import { Appointment, AppointmentStatus } from '../../types/api';
import { flexStyles } from '../../styles/customStyles';
import { APPOINTMENT_STATUSES } from '../../constants/enums';

interface AppointmentDetailsProps {
  appointment: Appointment;
  onUpdateStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
  onClose: () => void;
}

export const AppointmentDetails = ({
  appointment,
  onUpdateStatus,
  onUpdateNotes,
  onClose
}: AppointmentDetailsProps) => {
  const handleStatusChange = async (newStatus: string) => {
    await onUpdateStatus(appointment.id, newStatus as AppointmentStatus);
  };

  const handleNotesChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    await onUpdateNotes(appointment.id, formData.get('notes') as string);
  };

  return (
    <View
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <Card
        variation="elevated"
        padding="large"
        backgroundColor="white"
        maxWidth="600px"
        width="90%"
        onClick={(e) => e.stopPropagation()}
      >
        <View {...flexStyles.headerContainer}>
          <Heading level={3}>Appointment Details</Heading>
          <Button onClick={onClose}>Close</Button>
        </View>

        <View {...flexStyles.contentContainer}>
          <View>
            <Text variation="primary" fontSize="large">
              {new Date(appointment.datetime).toLocaleString()}
            </Text>
            <Text>Duration: {appointment.duration} minutes</Text>
            <Text>Type: {appointment.type.replace(/_/g, ' ')}</Text>
          </View>

          <View>
            <SelectField
              label="Status"
              value={appointment.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {APPOINTMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, ' ')}
                </option>
              ))}
            </SelectField>
          </View>
        </View>

        <Divider marginTop="medium" marginBottom="medium" />

        <form onSubmit={handleNotesChange}>
          <TextAreaField
            label="Notes"
            name="notes"
            defaultValue={appointment.notes}
            marginBottom="medium"
          />
          <Button type="submit" variation="primary">
            Update Notes
          </Button>
        </form>
      </Card>
    </View>
  );
};
