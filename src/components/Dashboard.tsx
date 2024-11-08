import { useEffect } from 'react';
import { Collection, Heading, View, Text, Loader, Alert } from '@aws-amplify/ui-react';
import { useDataSync } from '../hooks/useDataSync';
import type { Appointment, CarePlan } from '../types/api';

interface DashboardItem {
  title: string;
  value: number;
  description: string;
}

interface ActivityItem extends Partial<Appointment>, Partial<CarePlan> {
  updatedAt: string;
}

const Dashboard = () => {
  const {
    patients,
    appointments,
    carePlans,
    loading,
    error,
    refetch
  } = useDataSync({
    enablePatientSync: true,
    enableAppointmentSync: true,
    enableCarePlanSync: true
  });

  useEffect(() => {
    const refreshInterval = setInterval(refetch, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(refreshInterval);
  }, [refetch]);

  if (loading) {
    return (
      <View padding="medium">
        <Loader size="large" />
        <Text>Loading dashboard data...</Text>
      </View>
    );
  }

  if (error) {
    console.error('Dashboard Error:', error);
    return (
      <Alert
        variation="error"
        isDismissible={true}
        hasIcon={true}
        heading="Error loading dashboard"
      >
        {error.message}
        <Text>Please check the console for more details.</Text>
      </Alert>
    );
  }

  const activePatients = patients?.filter(p => p.status === 'ACTIVE') || [];
  const todaysAppointments = appointments?.filter(a => {
    const appointmentDate = new Date(a.datetime);
    const today = new Date();
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  }) || [];
  const activeCarePlans = carePlans?.filter(cp => cp.status === 'ACTIVE') || [];

  const dashboardItems: DashboardItem[] = [
    {
      title: 'Active Patients',
      value: activePatients.length,
      description: 'Currently active patients'
    },
    {
      title: "Today's Appointments",
      value: todaysAppointments.length,
      description: 'Scheduled for today'
    },
    {
      title: 'Active Care Plans',
      value: activeCarePlans.length,
      description: 'Care plans in progress'
    }
  ];

  const recentActivity: ActivityItem[] = [...(appointments || []), ...(carePlans || [])]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <View padding="medium">
      <Heading level={1}>Dashboard</Heading>

      <Collection
        type="grid"
        items={dashboardItems}
        gap="medium"
        templateColumns="1fr 1fr 1fr"
      >
        {(item: DashboardItem) => (
          <View
            backgroundColor="white"
            padding="medium"
            borderRadius="medium"
            boxShadow="small"
          >
            <Heading level={3}>{item.title}</Heading>
            <Text
              fontSize="xxl"
              fontWeight="bold"
            >
              {item.value}
            </Text>
            <Text
              fontSize="small"
            >
              {item.description}
            </Text>
          </View>
        )}
      </Collection>

      <View marginTop="large">
        <Heading level={2}>Recent Activity</Heading>
        <Collection
          type="list"
          items={recentActivity}
          gap="small"
        >
          {(item: ActivityItem) => (
            <View
              backgroundColor="white"
              padding="medium"
              borderRadius="medium"
              boxShadow="small"
            >
              <Text fontWeight="bold">
                {'datetime' in item
                  ? `Appointment: ${new Date(item.datetime!).toLocaleString()}`
                  : `Care Plan: ${item.title}`}
              </Text>
              <Text fontSize="small">
                Last updated: {new Date(item.updatedAt).toLocaleString()}
              </Text>
            </View>
          )}
        </Collection>
      </View>
    </View>
  );
};

export default Dashboard;
