import { Module } from '@nestjs/common';
import { UsuarioModule } from './system/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
})
export class AppModule {}
