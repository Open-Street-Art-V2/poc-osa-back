import { UpdateArtDto } from './dto/update-art.dto';
import { ArtRepository } from './art.repository';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtDto } from './dto/create-art.dto';
import { Art } from  './art.entity'

@Injectable()
export class ArtService {
  constructor( @InjectRepository(ArtRepository) private artRepository: ArtRepository){}

  public async createArt(createArtDto: CreateArtDto) {
    try {
      return await this.artRepository.createArt(createArtDto);
    } catch(err) {
      switch(err.code){
        case "ER_DUP_ENTRY":
          throw new HttpException(
            'Art with same title already exists',
            HttpStatus.BAD_REQUEST,
          );
          default:
            throw new HttpException(
              'Something went wrong',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
      }
      
    }
  }

  public async getArts() : Promise<Art[]> {
    return await this.artRepository.find();
  }

  public async getArt(artId : number): Promise<Art>{
    
    const findArt= await this.artRepository.findOne(artId);
    if(!findArt){
      throw new NotFoundException("Art not found");
    }
    return findArt;
  }

  public async getArtByTitle(title : string): Promise<Art>{
    
    const findArt= await this.artRepository.findOne({title});
    if(!findArt){
      throw new NotFoundException("Art not found");
    }
    return findArt;
  }

  public async editArt(artId: number, updateArtDto: UpdateArtDto) : Promise<Art> {

    const editedArt= await this.artRepository.findOne(artId);
    if(!editedArt){
      throw new NotFoundException("Art not found");
    }

    return this.artRepository.editArt(updateArtDto,editedArt);
  }

  public async deleteArt(artId: number) : Promise<void> {
    await this.artRepository.delete(artId);
  }
}
