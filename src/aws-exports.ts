import { ResourcesConfig } from 'aws-amplify';

const awsConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: 'us-east-2_2qJVq1bVB',
            userPoolClientId: 'd3n3i5jooxdsrv',
            signUpVerificationMethod: 'code',
            loginWith: {
                email: true,
                phone: false,
                username: true
            }
        }
    }
};

export default awsConfig;
