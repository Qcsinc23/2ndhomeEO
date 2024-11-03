export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      phoneNumber
      email
      address
      emergencyContact
      status
      carePlans {
        items {
          id
          title
          status
          startDate
          endDate
          createdAt
          updatedAt
        }
      }
      appointments {
        items {
          id
          datetime
          duration
          type
          status
          notes
          createdAt
          updatedAt
        }
      }
      medicalHistory {
        items {
          id
          type
          date
          description
          attachment
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const listPatients = /* GraphQL */ `
  query ListPatients($filter: ModelPatientFilterInput, $limit: Int) {
    listPatients(filter: $filter, limit: $limit) {
      items {
        id
        firstName
        lastName
        dateOfBirth
        phoneNumber
        email
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const getCarePlan = /* GraphQL */ `
  query GetCarePlan($id: ID!) {
    getCarePlan(id: $id) {
      id
      patientID
      patient {
        id
        firstName
        lastName
      }
      title
      description
      status
      startDate
      endDate
      treatments {
        items {
          id
          name
          description
          frequency
          duration
          notes
          status
          createdAt
          updatedAt
        }
      }
      goals {
        items {
          id
          description
          targetDate
          status
          createdAt
          updatedAt
        }
      }
      notificationSettings {
        emailNotifications
        reminderFrequency
        customSchedule
        recipientEmail
      }
      reminders {
        items {
          id
          type
          schedule
          enabled
          recipientEmail
          treatmentID
          goalID
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const listCarePlans = /* GraphQL */ `
  query ListCarePlans($filter: ModelCarePlanFilterInput, $limit: Int) {
    listCarePlans(filter: $filter, limit: $limit) {
      items {
        id
        patientID
        patient {
          id
          firstName
          lastName
        }
        title
        description
        status
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
      id
      patientID
      patient {
        id
        firstName
        lastName
      }
      providerID
      provider {
        id
        firstName
        lastName
        title
      }
      datetime
      duration
      type
      status
      notes
      createdAt
      updatedAt
    }
  }
`;

export const listAppointments = /* GraphQL */ `
  query ListAppointments($filter: ModelAppointmentFilterInput, $limit: Int) {
    listAppointments(filter: $filter, limit: $limit) {
      items {
        id
        patientID
        patient {
          id
          firstName
          lastName
        }
        providerID
        provider {
          id
          firstName
          lastName
          title
        }
        datetime
        duration
        type
        status
        notes
        createdAt
        updatedAt
      }
    }
  }
`;

export const getTreatment = /* GraphQL */ `
  query GetTreatment($id: ID!) {
    getTreatment(id: $id) {
      id
      carePlanID
      carePlan {
        id
        title
      }
      name
      description
      frequency
      duration
      notes
      status
      createdAt
      updatedAt
    }
  }
`;

export const listTreatments = /* GraphQL */ `
  query ListTreatments($filter: ModelTreatmentFilterInput, $limit: Int) {
    listTreatments(filter: $filter, limit: $limit) {
      items {
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
      }
    }
  }
`;

export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
      id
      carePlanID
      carePlan {
        id
        title
      }
      description
      targetDate
      status
      createdAt
      updatedAt
    }
  }
`;

export const listGoals = /* GraphQL */ `
  query ListGoals($filter: ModelGoalFilterInput, $limit: Int) {
    listGoals(filter: $filter, limit: $limit) {
      items {
        id
        carePlanID
        description
        targetDate
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const listReminders = /* GraphQL */ `
  query ListReminders($filter: ModelReminderFilterInput, $limit: Int) {
    listReminders(filter: $filter, limit: $limit) {
      items {
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
  }
`;

export const getNotificationSettings = /* GraphQL */ `
  query GetNotificationSettings($carePlanID: ID!) {
    getNotificationSettings(carePlanID: $carePlanID) {
      carePlanID
      emailNotifications
      reminderFrequency
      customSchedule
      recipientEmail
    }
  }
`;
