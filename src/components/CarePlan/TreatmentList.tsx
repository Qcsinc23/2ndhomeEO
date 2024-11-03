import {
  Collection,
  Heading,
  View,
  Button,
  Card,
  Text,
  TextField,
  TextAreaField,
  SelectField
} from '@aws-amplify/ui-react';
import { Treatment, TreatmentStatus, CreateTreatmentInput, UpdateTreatmentInput } from '../../types/api';
import { flexStyles } from '../../styles/customStyles';
import { TREATMENT_STATUSES } from '../../constants/enums';
import { ProgressBar } from '../ui/ProgressBar';

interface TreatmentListProps {
  treatments: Treatment[];
  carePlanId: string;
  onAddTreatment: (treatment: CreateTreatmentInput) => Promise<void>;
  onUpdateTreatment: (treatment: UpdateTreatmentInput) => Promise<void>;
}

export const TreatmentList = ({
  treatments,
  carePlanId,
  onAddTreatment,
  onUpdateTreatment
}: TreatmentListProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    await onAddTreatment({
      carePlanID: carePlanId,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      frequency: formData.get('frequency') as string,
      status: 'SCHEDULED' as TreatmentStatus,
      notes: formData.get('notes') as string
    });

    form.reset();
  };

  const handleStatusUpdate = async (treatment: Treatment, newStatus: TreatmentStatus) => {
    await onUpdateTreatment({
      id: treatment.id,
      status: newStatus
    });
  };

  const calculateProgress = (treatments: Treatment[]): number => {
    if (treatments.length === 0) return 0;
    const completed = treatments.filter(t => t.status === 'COMPLETED').length;
    return (completed / treatments.length) * 100;
  };

  const progress = calculateProgress(treatments);

  return (
    <Card variation="outlined">
      <View {...flexStyles.headerContainer}>
        <Heading level={4}>Treatments</Heading>
        <View>
          <Text variation="secondary">Progress: {progress.toFixed(0)}%</Text>
          <ProgressBar
            value={progress}
            maxValue={100}
            label="Treatment Progress"
            size="small"
            variation={progress >= 80 ? 'success' : progress >= 50 ? 'warning' : 'error'}
          />
        </View>
      </View>

      <Collection
        type="list"
        items={treatments}
        gap="medium"
      >
        {(treatment) => (
          <Card variation="elevated">
            <View {...flexStyles.contentContainer}>
              <View>
                <Text fontWeight="bold">{treatment.name}</Text>
                <Text>{treatment.description}</Text>
                <Text variation="secondary">
                  Frequency: {treatment.frequency}
                </Text>
                {treatment.notes && (
                  <Text fontSize="small">Notes: {treatment.notes}</Text>
                )}
              </View>
              <View>
                <SelectField
                  label="Status"
                  value={treatment.status}
                  onChange={(e) => handleStatusUpdate(treatment, e.target.value as TreatmentStatus)}
                >
                  {TREATMENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, ' ')}
                    </option>
                  ))}
                </SelectField>
              </View>
            </View>
          </Card>
        )}
      </Collection>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Treatment Name"
          name="name"
          required
          marginBottom="medium"
        />
        <TextAreaField
          label="Description"
          name="description"
          marginBottom="medium"
        />
        <TextField
          label="Frequency"
          name="frequency"
          placeholder="e.g., Daily, Twice a week"
          required
          marginBottom="medium"
        />
        <TextAreaField
          label="Notes"
          name="notes"
          marginBottom="medium"
        />
        <Button type="submit" variation="primary">
          Add Treatment
        </Button>
      </form>
    </Card>
  );
};
