import dotenv from 'dotenv';

dotenv.config();

type ServerConfig = {
    PORT: number
}

type DBConfig = {
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
}

type AwsConfig = {
    AWS_REGION: string,
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string
}

export const awsConfig: AwsConfig = {
    AWS_REGION: process.env.AWS_REGION || '',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || ''
};

export const dbConfig: DBConfig = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '1748arijiT#',
    DB_NAME: process.env.DB_NAME || 'ic_notification'
};

export const serverConfig: ServerConfig =  {
    PORT: Number(process.env.PORT) || 3000
};