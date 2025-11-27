import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  OnModuleInit,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { ClientKafka } from '@nestjs/microservices';

@Controller('usuario')
export class UsuarioController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly usuarioService: ClientKafka,
  ) {}

  async onModuleInit() {
    this.usuarioService.subscribeToResponseOf('createUsuario');
    this.usuarioService.subscribeToResponseOf('findAllUsuario');
    this.usuarioService.subscribeToResponseOf('findOneUsuario');
    this.usuarioService.subscribeToResponseOf('updateUsuario');
    this.usuarioService.subscribeToResponseOf('removeUsuario');

    await this.usuarioService.connect();
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.send('createUsuario', createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.send('findAllUsuario', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.send('findOneUsuario', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    console.log({ id, updateUsuarioDto });

    return this.usuarioService.send('updateUsuario', {
      id,
      ...updateUsuarioDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.send('removeUsuario', { id });
  }
}
