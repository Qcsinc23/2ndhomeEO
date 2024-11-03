import { useState } from 'react';
import {
  Collection,
  Heading,
  View,
  Button,
  Card,
  Text,
  Badge,
  TextField,
  SelectField,
  Loader,
  Alert,
  Divider,
  TextAreaField
} from '@aws-amplify/ui-react';
import { useDataSync } from '../hooks/useDataSync';
import { API } from '../services/api';
import {
  AppointmentStatus,
  AppointmentType,
  CreateAppointmentInput
} from '../types/api';
import { useAuth } from '../contexts/AuthContext';
import { flexStyles } from '../styles/customStyles';

const Appointments = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { user } = useAuth();

  const {
    appointments,
    patients,
    loading,
    error,
    refetch
  } = useDataSync({
    enableAppointmentSync: true,
    enablePatientSync: true
  });

  const handleCreateAppointment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const input: CreateAppointmentInput = {
        patientID: formData.get('patientID') as string,
        providerID: user?.username as string, // Using current user as provider
        datetime: new Date(formData.get('date') as string + 'T' + formData.get('time') as string).toISOString(),
        duration: parseInt(formData.get('duration') as string),
        type: formData.get('type') as AppointmentType,
        status: 'SCHEDULED' as AppointmentStatus,
        notes: formData.get('notes') as string
      };

      await API.appointment.createAppointment(input);
      setIsCreating(false);
      form.reset();
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create appointment');
    }
  };

  const getStatusBadgeVariation = (status: AppointmentStatus) => {
    switch (status) {
      case 'SCHEDULED':
        return 'info';
      case 'CONFIRMED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      case 'NO_SHOW':
        return 'error';
      default:
        return 'info';
    }
  };

  if (loading) {
    return (
      <View padding="medium">
        <Loader size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <Alert
        variation="error"
        isDismissible={true}
        hasIcon={true}
        heading="Error loading appointments"
      >
        {error.message}
      </Alert>
    );
  }

  return (
    <View padding="medium">
      <View {...flexStyles.headerContainer}>
        <Heading level={1}>Appointments</Heading>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? 'Cancel' : 'Schedule Appointment'}
        </Button>
      </View>

      {isCreating && (
        <Card variation="elevated" padding="medium" marginBottom="medium">
          <form onSubmit={handleCreateAppointment}>
            <SelectField
              label="Patient"
              name="patientID"
              required
              marginBottom="medium"
            >
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {`${patient.firstName} ${patient.lastName}`}
                </option>
              ))}
            </SelectField>

            <TextField
              label="Date"
              name="date"
              type="date"
              required
              marginBottom="medium"
            />

            <TextField
              label="Time"
              name="time"
              type="time"
              required
              marginBottom="medium"
            />

            <TextField
              label="Duration (minutes)"
              name="duration"
              type="number"
              required
              marginBottom="medium"
            />

            <SelectField
              label="Type"
              name="type"
              required
              marginBottom="medium"
            >
              {Object.values(AppointmentType).map(type => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ')}
                </option>
              ))}
            </SelectField>

            <TextAreaField
              label="Notes"
              name="notes"
              marginBottom="medium"
            />

            {formError && (
              <Alert
                variation="error"
                isDismissible={true}
                hasIcon={true}
                marginBottom="medium"
              >
                {formError}
              </Alert>
            )}

            <Button type="submit" variation="primary">
              Schedule Appointment
            </Button>
          </form>
        </Card>
      )}

      <Collection
        type="list"
        items={appointments.sort((a, b) => 
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        )}
        gap="medium"
      >
        {(appointment) => (
          <Card variation="elevated">
            <View {...flexStyles.contentContainer}>
              <View>
                <Text variation="primary" fontSize="large">
                  {new Date(appointment.datetime).toLocaleString()}
                </Text>
                <Text variation="secondary">
                  Patient: {
                    patients.find(p => p.id === appointment.patientID)
                      ? `${patients.find(p => p.id === appointment.patientID)?.firstName} ${patients.find(p => p.id === appointment.patientID)?.lastName}`
                      : 'Unknown'
                  }
                </Text>
                <Text>Type: {appointment.type.replace(/_/g, ' ')}</Text>
                <Text>Duration: {appointment.duration} minutes</Text>
              </View>
              <Badge variation={getStatusBadgeVariation(appointment.status)}>
                {appointment.status}
              </Badge>
            </View>
            {appointment.notes && (
              <>
                <Divider />
                <View padding="medium">
                  <Text fontWeight="bold">Notes:</Text>
                  <Text>{appointment.notes}</Text>
                </View>
              </>
            )}
            <Divider />
            <View padding="medium">
              <Text variation="tertiary" fontSize="small">
                Last Updated: {new Date(appointment.updatedAt).toLocaleString()}
              </Text>
            </View>
          </Card>
        )}
      </Collection>
    </View>
  );
};

export default Appointments;
