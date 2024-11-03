import {
  Card,
  Heading,
  View,
  Text,
  Collection,
  Badge
} from '@aws-amplify/ui-react';
import { CarePlan } from '../../types/api';
import { flexStyles } from '../../styles/customStyles';
import { ProgressBar } from '../ui/ProgressBar';

interface ProgressMetricsProps {
  carePlan: CarePlan;
}

export const ProgressMetrics = ({ carePlan }: ProgressMetricsProps) => {
  const treatments = carePlan.treatments?.items || [];
  const goals = carePlan.goals?.items || [];

  const calculateTreatmentProgress = (): number => {
    if (treatments.length === 0) return 0;
    const completed = treatments.filter(t => t.status === 'COMPLETED').length;
    return (completed / treatments.length) * 100;
  };

  const calculateGoalProgress = (): number => {
    if (goals.length === 0) return 0;
    const achieved = goals.filter(g => g.status === 'ACHIEVED').length;
    return (achieved / goals.length) * 100;
  };

  const calculateOverallProgress = (): number => {
    const treatmentWeight = 0.6; // 60% weight to treatments
    const goalWeight = 0.4; // 40% weight to goals
    return (calculateTreatmentProgress() * treatmentWeight) +
           (calculateGoalProgress() * goalWeight);
  };

  const calculateTimeProgress = (): number => {
    const start = new Date(carePlan.startDate).getTime();
    const end = carePlan.endDate ? new Date(carePlan.endDate).getTime() : start + (90 * 24 * 60 * 60 * 1000); // Default 90 days
    const now = Date.now();
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getStatusColor = (progress: number): 'success' | 'warning' | 'error' => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  return (
    <Card variation="elevated">
      <View {...flexStyles.headerContainer}>
        <Heading level={3}>Care Plan Progress</Heading>
        <Badge variation={getStatusColor(calculateOverallProgress())}>
          {calculateOverallProgress().toFixed(0)}% Complete
        </Badge>
      </View>

      <Collection
        type="list"
        items={[
          {
            label: 'Overall Progress',
            value: calculateOverallProgress(),
            description: 'Combined progress of treatments and goals'
          },
          {
            label: 'Treatment Progress',
            value: calculateTreatmentProgress(),
            description: `${treatments.filter(t => t.status === 'COMPLETED').length} of ${treatments.length} treatments completed`
          },
          {
            label: 'Goal Achievement',
            value: calculateGoalProgress(),
            description: `${goals.filter(g => g.status === 'ACHIEVED').length} of ${goals.length} goals achieved`
          },
          {
            label: 'Time Progress',
            value: calculateTimeProgress(),
            description: `${carePlan.endDate ? `Until ${new Date(carePlan.endDate).toLocaleDateString()}` : 'No end date set'}`
          }
        ]}
        gap="medium"
      >
        {(metric) => (
          <View marginBottom="medium">
            <View {...flexStyles.headerContainer}>
              <Text fontWeight="bold">{metric.label}</Text>
              <Text variation="secondary">{metric.value.toFixed(0)}%</Text>
            </View>
            <ProgressBar
              value={metric.value}
              maxValue={100}
              label={metric.label}
              size="small"
              variation={getStatusColor(metric.value)}
            />
            <Text fontSize="small" color="neutral.80">
              {metric.description}
            </Text>
          </View>
        )}
      </Collection>

      <View marginTop="medium">
        <Text fontWeight="bold">Summary</Text>
        <Collection
          type="list"
          items={[
            `${treatments.filter(t => t.status === 'COMPLETED').length} treatments completed`,
            `${treatments.filter(t => t.status === 'IN_PROGRESS').length} treatments in progress`,
            `${goals.filter(g => g.status === 'ACHIEVED').length} goals achieved`,
            `${goals.filter(g => g.status === 'IN_PROGRESS').length} goals in progress`
          ]}
          gap="xxs"
        >
          {(item) => (
            <Text fontSize="small" color="neutral.80">
              • {item}
            </Text>
          )}
        </Collection>
      </View>
    </Card>
  );
};
