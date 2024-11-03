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
  SelectField
} from '@aws-amplify/ui-react';
import { Goal, GoalStatus, CreateGoalInput, UpdateGoalInput } from '../../types/api';
import { flexStyles } from '../../styles/customStyles';
import { GOAL_STATUSES } from '../../constants/enums';
import { ProgressBar } from '../ui/ProgressBar';

interface GoalListProps {
  goals: Goal[];
  carePlanId: string;
  onAddGoal: (goal: CreateGoalInput) => Promise<void>;
  onUpdateGoal: (goal: UpdateGoalInput) => Promise<void>;
}

export const GoalList = ({
  goals,
  carePlanId,
  onAddGoal,
  onUpdateGoal
}: GoalListProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    await onAddGoal({
      carePlanID: carePlanId,
      description: formData.get('description') as string,
      targetDate: formData.get('targetDate') as string,
      status: 'IN_PROGRESS' as GoalStatus
    });

    form.reset();
  };

  const handleStatusUpdate = async (goal: Goal, newStatus: GoalStatus) => {
    await onUpdateGoal({
      id: goal.id,
      status: newStatus
    });
  };

  const getStatusBadgeVariation = (status: GoalStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'info';
      case 'ACHIEVED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'info';
    }
  };

  const calculateProgress = (goals: Goal[]): number => {
    if (goals.length === 0) return 0;
    const achieved = goals.filter(g => g.status === 'ACHIEVED').length;
    return (achieved / goals.length) * 100;
  };

  const calculateTimeProgress = (goal: Goal): number => {
    if (!goal.targetDate) return 0;
    const start = new Date(goal.createdAt).getTime();
    const end = new Date(goal.targetDate).getTime();
    const now = Date.now();
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const progress = calculateProgress(goals);

  return (
    <Card variation="outlined">
      <View {...flexStyles.headerContainer}>
        <Heading level={4}>Goals</Heading>
        <View>
          <Text variation="secondary">Achievement Rate: {progress.toFixed(0)}%</Text>
          <ProgressBar
            value={progress}
            maxValue={100}
            label="Goal Achievement"
            size="small"
            variation={progress >= 80 ? 'success' : progress >= 50 ? 'warning' : 'error'}
          />
        </View>
      </View>

      <Collection
        type="list"
        items={goals}
        gap="medium"
      >
        {(goal) => (
          <Card variation="elevated">
            <View {...flexStyles.contentContainer}>
              <View>
                <Text>{goal.description}</Text>
                {goal.targetDate && (
                  <>
                    <Text variation="secondary">
                      Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                    </Text>
                    <ProgressBar
                      value={calculateTimeProgress(goal)}
                      maxValue={100}
                      label="Time Progress"
                      size="small"
                      variation={calculateTimeProgress(goal) >= 80 ? 'warning' : 'info'}
                    />
                  </>
                )}
              </View>
              <View>
                <Badge variation={getStatusBadgeVariation(goal.status)}>
                  {goal.status}
                </Badge>
                <SelectField
                  label="Status"
                  value={goal.status}
                  onChange={(e) => handleStatusUpdate(goal, e.target.value as GoalStatus)}
                  marginTop="small"
                >
                  {GOAL_STATUSES.map((status) => (
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
        <TextAreaField
          label="Goal Description"
          name="description"
          required
          marginBottom="medium"
        />
        <TextField
          label="Target Date"
          name="targetDate"
          type="date"
          required
          marginBottom="medium"
        />
        <Button type="submit" variation="primary">
          Add Goal
        </Button>
      </form>
    </Card>
  );
};
