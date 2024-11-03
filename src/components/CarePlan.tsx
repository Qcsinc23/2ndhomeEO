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
  TextAreaField,
  SelectField,
  Loader,
  Alert,
  Divider
} from '@aws-amplify/ui-react';
import { useDataSync } from '../hooks/useDataSync';
import { API } from '../services/api';
import { CarePlanStatus, CreateCarePlanInput } from '../types/api';
import { flexStyles } from '../styles/customStyles';

const CarePlan = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    carePlans,
    patients,
    loading,
    error,
    refetch
  } = useDataSync({
    enableCarePlanSync: true,
    enablePatientSync: true
  });

  const handleCreateCarePlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const input: CreateCarePlanInput = {
        patientID: formData.get('patientID') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: 'ACTIVE' as CarePlanStatus,
        startDate: new Date().toISOString().split('T')[0],
      };

      await API.carePlan.createCarePlan(input);
      setIsCreating(false);
      form.reset();
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create care plan');
    }
  };

  const getStatusBadgeVariation = (status: CarePlanStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'COMPLETED':
        return 'info';
      case 'CANCELLED':
        return 'error';
      case 'PENDING_REVIEW':
        return 'warning';
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
        heading="Error loading care plans"
      >
        {error.message}
      </Alert>
    );
  }

  return (
    <View padding="medium">
      <View {...flexStyles.headerContainer}>
        <Heading level={1}>Care Plans</Heading>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? 'Cancel' : 'Create Care Plan'}
        </Button>
      </View>

      {isCreating && (
        <Card variation="elevated" padding="medium" marginBottom="medium">
          <form onSubmit={handleCreateCarePlan}>
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
              label="Title"
              name="title"
              required
              marginBottom="medium"
            />

            <TextAreaField
              label="Description"
              name="description"
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
              Create Care Plan
            </Button>
          </form>
        </Card>
      )}

      <Collection
        type="list"
        items={carePlans}
        gap="medium"
      >
        {(carePlan) => (
          <Card variation="elevated">
            <View {...flexStyles.contentContainer}>
              <View>
                <Heading level={3}>{carePlan.title}</Heading>
                <Text variation="secondary">
                  Patient: {
                    patients.find(p => p.id === carePlan.patientID)
                      ? `${patients.find(p => p.id === carePlan.patientID)?.firstName} ${patients.find(p => p.id === carePlan.patientID)?.lastName}`
                      : 'Unknown'
                  }
                </Text>
                {carePlan.description && (
                  <Text marginTop="xs">{carePlan.description}</Text>
                )}
              </View>
              <Badge variation={getStatusBadgeVariation(carePlan.status)}>
                {carePlan.status}
              </Badge>
            </View>
            <Divider />
            <View padding="medium">
              <Text>Start Date: {new Date(carePlan.startDate).toLocaleDateString()}</Text>
              {carePlan.endDate && (
                <Text>End Date: {new Date(carePlan.endDate).toLocaleDateString()}</Text>
              )}
              <Text variation="tertiary" fontSize="small" marginTop="xs">
                Last Updated: {new Date(carePlan.updatedAt).toLocaleString()}
              </Text>
            </View>
          </Card>
        )}
      </Collection>
    </View>
  );
};

export default CarePlan;
