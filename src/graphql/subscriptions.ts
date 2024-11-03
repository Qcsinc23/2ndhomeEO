export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient {
    onCreatePatient {
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

export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
      id
      firstName
      lastName
      status
      updatedAt
    }
  }
`;

export const onCreateCarePlan = /* GraphQL */ `
  subscription OnCreateCarePlan {
    onCreateCarePlan {
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

export const onUpdateCarePlan = /* GraphQL */ `
  subscription OnUpdateCarePlan {
    onUpdateCarePlan {
      id
      patientID
      title
      status
      startDate
      endDate
      updatedAt
    }
  }
`;

export const onCreateTreatment = /* GraphQL */ `
  subscription OnCreateTreatment {
    onCreateTreatment {
      id
      carePlanID
      name
      description
      frequency
      status
      createdAt
      updatedAt
    }
  }
`;

export const onUpdateTreatment = /* GraphQL */ `
  subscription OnUpdateTreatment {
    onUpdateTreatment {
      id
      carePlanID
      name
      status
      updatedAt
    }
  }
`;

export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal {
    onCreateGoal {
      id
      carePlanID
      description
      targetDate
      status
      createdAt
      updatedAt
    }
  }
`;

export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal {
    onUpdateGoal {
      id
      carePlanID
      description
      status
      updatedAt
    }
  }
`;

export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment {
    onCreateAppointment {
      id
      patientID
      providerID
      datetime
      duration
      type
      status
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

export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment {
    onUpdateAppointment {
      id
      patientID
      datetime
      status
      updatedAt
    }
  }
`;

export const onCreateReminder = /* GraphQL */ `
  subscription OnCreateReminder {
    onCreateReminder {
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

export const onUpdateReminder = /* GraphQL */ `
  subscription OnUpdateReminder {
    onUpdateReminder {
      id
      type
      schedule
      enabled
      recipientEmail
      updatedAt
    }
  }
`;

export const onUpdateNotificationSettings = /* GraphQL */ `
  subscription OnUpdateNotificationSettings {
    onUpdateNotificationSettings {
      carePlanID
      emailNotifications
      reminderFrequency
      customSchedule
      recipientEmail
    }
  }
`;
