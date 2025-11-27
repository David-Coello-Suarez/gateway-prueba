import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { KafkaModule } from 'src/transports/kafka/kafka.module';

@Module({
  controllers: [UsuarioController],
  imports: [KafkaModule],
})
export class UsuarioModule {}
