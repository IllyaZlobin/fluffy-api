import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiFile,
  AuthUser,
  IFile,
  imageFileFilter,
  JwtAuthGuard,
  UserEntity,
} from '../../core';
import { CreatePetRequest, CreatePetResponse, GeTallPetsResponse } from './dto';
import { PetsService } from './pets.service';

@Controller('pets')
@ApiTags('pets')
export class PetsController {
  constructor(private petService: PetsService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFile('photo')
  @UseInterceptors(FileInterceptor('photo', { fileFilter: imageFileFilter }))
  async create(
    @UploadedFile() photo: IFile,
    @Body() model: CreatePetRequest,
    @AuthUser() user: UserEntity,
  ): Promise<CreatePetResponse> {
    const pet = await this.petService.create({ ...model, user, photo });
    const response = new CreatePetResponse(pet);
    return response;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: number) {
    await this.petService.delete(id);
    return 'Pet is deleted';
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const pets = await this.petService.getAll();
    const response = new GeTallPetsResponse(pets);
    return response;
  }
}
