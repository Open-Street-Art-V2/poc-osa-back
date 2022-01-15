import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { Art } from  './entities/art.entity'

@Injectable()
export class ArtService {
  constructor(
    @InjectRepository(Art)
    private artRepo: Repository<Art> 
    ){}

  create(createArtDto: CreateArtDto) : Object {
    let art: Art = new Art();
    art.artist = createArtDto.artist;
    art.title = createArtDto.title;
    art.latitude = createArtDto.geolocation.latitude;
    art.longitude = createArtDto.geolocation.longitude;
    this.artRepo.insert(art).catch((error : TypeORMError) => {
      console.log("ERROR : " + error.message);
    });
    return {status: "success", data: art };
  }

  findAll() {
    return `This action returns all art`;
  }

  findOne(id: number) {
    return `This action returns a #${id} art`;
  }

  update(id: number, updateArtDto: UpdateArtDto) {
    return `This action updates a #${id} art`;
  }

  remove(id: number) {
    return `This action removes a #${id} art`;
  }
}
