import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Art } from './art.entity';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';

@Controller('art')
@ApiTags('Art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createArtDto: CreateArtDto) :object {
    return this.artService.createArt(createArtDto);
  }

  @Get('all')
  public async getArts() : Promise<Art[]> {
    return await this.artService.getArts();
  }

  @Get('/:artId')
  getArt(@Param('artId') artId: number) {
    return this.artService.getArt(artId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:artId')
  update(@Param('artId') artId: number, @Body() updateArtDto: UpdateArtDto) : Promise<Art> {

    return this.artService.editArt(artId,updateArtDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:artId')
  remove(@Param('artId') artId: number) {
    return this.artService.deleteArt(artId);
  }
}
