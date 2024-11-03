import { ResourcesConfig } from 'aws-amplify';

const awsConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: "us-east-2_F9nz52p0H",
            userPoolClientId: "53hcnnsfvpr9rk64ofrpkjjji9",
            signUpVerificationMethod: "code",
            loginWith: {
                email: true,
                phone: false,
                username: true
            }
        }
    },
    API: {
        GraphQL: {
            endpoint: 'https://xxxxxxxxxx.appsync-api.us-east-2.amazonaws.com/graphql',
            region: 'us-east-2',
            defaultAuthMode: 'userPool'
        }
    }
};

export default awsConfig;
