export const createPatient = /* GraphQL */ `
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      firstName
      lastName
      dateOfBirth
      phoneNumber
      email
      address
      emergencyContact
      status
      createdAt
      updatedAt
    }
  }
`;

export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient($input: UpdatePatientInput!) {
    updatePatient(input: $input) {
      id
      firstName
      lastName
      dateOfBirth
      phoneNumber
      email
      address
      emergencyContact
      status
      createdAt
      updatedAt
    }
  }
`;

export const createCarePlan = /* GraphQL */ `
  mutation CreateCarePlan($input: CreateCarePlanInput!) {
    createCarePlan(input: $input) {
      id
      patientID
      title
      description
      status
      startDate
      endDate
      createdAt
      updatedAt
      patient {
        id
        firstName
        lastName
      }
    }
  }
`;

export const updateCarePlan = /* GraphQL */ `
  mutation UpdateCarePlan($input: UpdateCarePlanInput!) {
    updateCarePlan(input: $input) {
      id
      patientID
      title
      description
      status
      startDate
      endDate
      createdAt
      updatedAt
      patient {
        id
        firstName
        lastName
      }
    }
  }
`;

export const createTreatment = /* GraphQL */ `
  mutation CreateTreatment($input: CreateTreatmentInput!) {
    createTreatment(input: $input) {
      id
      carePlanID
      name
      description
      frequency
      duration
      notes
      status
      createdAt
      updatedAt
      carePlan {
        id
        title
      }
    }
  }
`;

export const updateTreatment = /* GraphQL */ `
  mutation UpdateTreatment($input: UpdateTreatmentInput!) {
    updateTreatment(input: $input) {
      id
      carePlanID
      name
      description
      frequency
      duration
      notes
      status
      createdAt
      updatedAt
      carePlan {
        id
        title
      }
    }
  }
`;

export const createGoal = /* GraphQL */ `
  mutation CreateGoal($input: CreateGoalInput!) {
    createGoal(input: $input) {
      id
      carePlanID
      description
      targetDate
      status
      createdAt
      updatedAt
      carePlan {
        id
        title
      }
    }
  }
`;

export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal($input: UpdateGoalInput!) {
    updateGoal(input: $input) {
      id
      carePlanID
      description
      targetDate
      status
      createdAt
      updatedAt
      carePlan {
        id
        title
      }
    }
  }
`;

export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
      patientID
      providerID
      datetime
      duration
      type
      status
      notes
      createdAt
      updatedAt
      patient {
        id
        firstName
        lastName
      }
      provider {
        id
        firstName
        lastName
        title
      }
    }
  }
`;

export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment($input: UpdateAppointmentInput!) {
    updateAppointment(input: $input) {
      id
      patientID
      providerID
      datetime
      duration
      type
      status
      notes
      createdAt
      updatedAt
      patient {
        id
        firstName
        lastName
      }
      provider {
        id
        firstName
        lastName
        title
      }
    }
  }
`;

export const createReminder = /* GraphQL */ `
  mutation CreateReminder($input: CreateReminderInput!) {
    createReminder(input: $input) {
      id
      type
      schedule
      enabled
      recipientEmail
      carePlanID
      treatmentID
      goalID
      createdAt
      updatedAt
    }
  }
`;

export const updateReminder = /* GraphQL */ `
  mutation UpdateReminder($input: UpdateReminderInput!) {
    updateReminder(input: $input) {
      id
      type
      schedule
      enabled
      recipientEmail
      carePlanID
      treatmentID
      goalID
      createdAt
      updatedAt
    }
  }
`;

export const updateNotificationSettings = /* GraphQL */ `
  mutation UpdateNotificationSettings($input: UpdateNotificationSettingsInput!) {
    updateNotificationSettings(input: $input) {
      carePlanID
      emailNotifications
      reminderFrequency
      customSchedule
      recipientEmail
    }
  }
`;
