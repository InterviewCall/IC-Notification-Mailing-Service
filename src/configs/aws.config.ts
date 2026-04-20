import { SESv2Client } from '@aws-sdk/client-sesv2';

import { awsConfig } from './server.config';

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = awsConfig;

const ses = new SESv2Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

export default ses;