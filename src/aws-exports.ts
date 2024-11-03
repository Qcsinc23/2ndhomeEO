import { ResourcesConfig } from 'aws-amplify';

const awsConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: "us-east-2_2qJVq1bVB",
            userPoolClientId: "6jlptfktguc8ocbt0mjbhdrolc",
            signUpVerificationMethod: "code",
            loginWith: {
                email: true,
                phone: false,
                username: true
            }
        }
    }
};

export default awsConfig;
