import {
  View,
  Heading,
  Text,
  Button,
  Card,
  Collection,
  Badge,
  Divider
} from '@aws-amplify/ui-react';
import { CarePlan, Treatment, Goal, TreatmentStatus, GoalStatus } from '../../types/api';
import { flexStyles } from '../../styles/customStyles';
import { ProgressBar } from '../ui/ProgressBar';

interface ProgressReportProps {
  carePlan: CarePlan;
  onGeneratePDF: () => void;
}

interface TreatmentSection {
  type: 'treatment';
  title: string;
  items: Treatment[];
}

interface GoalSection {
  type: 'goal';
  title: string;
  items: Goal[];
}

type ProgressSection = TreatmentSection | GoalSection;

type ProgressItem = {
  id: string;
  label: string;
  status: string;
  type: 'treatment' | 'goal';
};

export const ProgressReport = ({
  carePlan,
  onGeneratePDF
}: ProgressReportProps) => {
  const treatments = carePlan.treatments?.items || [];
  const goals = carePlan.goals?.items || [];

  const calculateTreatmentProgress = (items: Treatment[]): number => {
    if (items.length === 0) return 0;
    const completed = items.filter(item => item.status === TreatmentStatus.COMPLETED).length;
    return (completed / items.length) * 100;
  };

  const calculateGoalProgress = (items: Goal[]): number => {
    if (items.length === 0) return 0;
    const achieved = items.filter(item => item.status === GoalStatus.ACHIEVED).length;
    return (achieved / items.length) * 100;
  };

  const getStatusVariation = (progress: number): 'success' | 'warning' | 'error' => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  const formatDuration = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  const sections: ProgressSection[] = [
    {
      type: 'treatment',
      title: 'Treatment Progress',
      items: treatments
    },
    {
      type: 'goal',
      title: 'Goal Progress',
      items: goals
    }
  ];

  const getItemStatusVariation = (status: string, type: 'treatment' | 'goal'): 'success' | 'warning' | 'error' => {
    if (type === 'treatment') {
      return status === TreatmentStatus.COMPLETED
        ? 'success'
        : status === TreatmentStatus.IN_PROGRESS
          ? 'warning'
          : 'error';
    } else {
      return status === GoalStatus.ACHIEVED
        ? 'success'
        : status === GoalStatus.IN_PROGRESS
          ? 'warning'
          : 'error';
    }
  };

  const mapItemsToProgressItems = (section: ProgressSection): ProgressItem[] => {
    return section.items.map(item => ({
      id: item.id,
      type: section.type,
      label: section.type === 'treatment' 
        ? (item as Treatment).name 
        : (item as Goal).description,
      status: item.status
    }));
  };

  return (
    <Card variation="elevated">
      <View {...flexStyles.headerContainer}>
        <Heading level={2}>Progress Report</Heading>
        <Button onClick={onGeneratePDF}>Download PDF</Button>
      </View>

      <View {...flexStyles.contentContainer}>
        <View>
          <Text variation="primary" fontSize="large">
            {carePlan.title}
          </Text>
          <Text>Duration: {formatDuration(carePlan.startDate, carePlan.endDate)}</Text>
          <Text>Status: {carePlan.status}</Text>
        </View>

        <Badge variation={getStatusVariation(calculateTreatmentProgress(treatments))}>
          {calculateTreatmentProgress(treatments).toFixed(0)}% Complete
        </Badge>
      </View>

      <Divider marginTop="medium" marginBottom="medium" />

      <Collection
        type="list"
        items={sections}
        gap="large"
      >
        {(section) => {
          const progress = section.type === 'treatment'
            ? calculateTreatmentProgress(section.items)
            : calculateGoalProgress(section.items);

          const completedCount = section.type === 'treatment'
            ? section.items.filter(item => (item as Treatment).status === TreatmentStatus.COMPLETED).length
            : section.items.filter(item => (item as Goal).status === GoalStatus.ACHIEVED).length;

          const progressItems = mapItemsToProgressItems(section);

          return (
            <View>
              <View {...flexStyles.headerContainer}>
                <Heading level={4}>{section.title}</Heading>
                <Text>
                  {completedCount} of {section.items.length} {section.type === 'treatment' ? 'completed' : 'achieved'}
                </Text>
              </View>

              <ProgressBar
                value={progress}
                maxValue={100}
                label={section.title}
                size="small"
                variation={getStatusVariation(progress)}
              />

              <Collection
                type="list"
                items={progressItems}
                gap="small"
              >
                {(item) => (
                  <View {...flexStyles.contentContainer}>
                    <Text>{item.label}</Text>
                    <Badge variation={getItemStatusVariation(item.status, item.type)}>
                      {item.status}
                    </Badge>
                  </View>
                )}
              </Collection>
            </View>
          );
        }}
      </Collection>
    </Card>
  );
};
