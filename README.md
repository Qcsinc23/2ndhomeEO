# 2ndHome Care Management System

A comprehensive healthcare management platform designed to streamline patient care, appointment scheduling, and treatment planning.

## Overview

2ndHome Care Management System is a modern web application built with React and TypeScript, leveraging AWS Amplify for backend services. The platform provides healthcare professionals with tools to manage patient care plans, schedule appointments, track progress, and generate reports.

## Key Features

- **Authentication & Authorization**
  - Secure user authentication system
  - Role-based access control
  - Protected routes for sensitive information

- **Care Plan Management**
  - Treatment planning and tracking
  - Goal setting and progress monitoring
  - Custom metrics for patient progress

- **Appointment System**
  - Interactive appointment calendar
  - Detailed appointment management
  - Automated reminders and notifications

- **Reporting & Analytics**
  - Progress report generation
  - PDF export capabilities
  - Treatment outcome tracking

- **Real-time Updates**
  - GraphQL subscriptions for live data
  - Synchronized data across devices
  - Instant notification system

## Technology Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite (Build tool)

- **Backend & Services**
  - AWS Amplify
  - GraphQL API
  - Amazon Cognito (Authentication)
  - DynamoDB (Database)

- **Additional Tools**
  - ESLint (Code linting)
  - PostCSS (CSS processing)
  - PDF Generation utilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- AWS Account (for Amplify services)
- AWS Amplify CLI

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd 2ndhome-care-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Amplify:
   ```bash
   amplify configure
   amplify init
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/           # React components
│   ├── Appointments/    # Appointment-related components
│   ├── CarePlan/       # Care plan components
│   ├── notifications/  # Notification system
│   ├── reports/       # Reporting components
│   └── ui/            # Reusable UI components
├── contexts/           # React contexts
├── graphql/           # GraphQL queries and mutations
├── hooks/             # Custom React hooks
├── services/          # API and utility services
├── styles/            # Global styles and themes
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
VITE_AWS_REGION=your_aws_region
VITE_API_ENDPOINT=your_api_endpoint
VITE_USER_POOL_ID=your_user_pool_id
VITE_USER_POOL_CLIENT_ID=your_client_id
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
