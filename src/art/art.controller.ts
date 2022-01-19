import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Art } from './art.entity';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { GetArtsQuery } from './types/query-params.type';

@Controller('art')
@ApiTags('Art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArtDto: CreateArtDto): Promise<Art> {
    return this.artService.createArt(createArtDto);
  }

  @Get()
  public async getArts(@Query() queryParams: GetArtsQuery): Promise<Art[] | Art> {
    if (Object.keys(queryParams).length === 0) {
      // if no params in the query
      return await this.artService.getArts();
    }

    return await this.artService.getArtByTitle(queryParams.title);
  }

  @Get('/:artId')
  public async getArt(@Param('artId') artId: number): Promise<Art> {
    return await this.artService.getArt(artId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:artId')
  update(@Param('artId') artId: number, @Body() updateArtDto: UpdateArtDto): Promise<Art> {
    return this.artService.editArt(artId, updateArtDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:artId')
  remove(@Param('artId') artId: number) {
    return this.artService.deleteArt(artId);
  }
}
