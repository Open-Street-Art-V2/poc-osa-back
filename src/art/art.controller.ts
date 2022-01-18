import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Art } from './art.entity';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';

@Controller('art')
@ApiTags('Art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createArtDto: CreateArtDto) : Promise<any> {
    const art=await this.artService.createArt(createArtDto);
    return {data:art};
  }

  @Get('all')
  public async getArts() : Promise<Art[]> {
    return await this.artService.getArts();
  }

  @Get('/:artId')
  public async getArt(@Param('artId') artId: number) {
    return await this.artService.getArt(artId);
  }

  @Get('title/:title')
  public async getArtByTitle(@Param('title') title: string) {
    return await this.artService.getArtByTitle(title);
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
