import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

const servicio = [
  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'gateway',
          brokers: envs.kafkaServer,
        },
        consumer: {
          groupId: 'gateway-consumer',
        },
      },
    },
  ]),
];

@Module({
  imports: servicio,
  exports: servicio,
})
export class KafkaModule {}
