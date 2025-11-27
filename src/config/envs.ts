import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  KAFKA_SERVERS: string[];
}

const envsSchema = joi
  .object<EnvVars>({
    KAFKA_SERVERS: joi.array().items(joi.string()).required(),
    // DATABASE_URL_HUMTAL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  KAFKA_SERVERS: process.env.KAFKA_SERVERS?.split(','),
});

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  //   databaseUrl: envVars.DATABASE_URL_HUMTAL,
  kafkaServer: envVars.KAFKA_SERVERS,
};
