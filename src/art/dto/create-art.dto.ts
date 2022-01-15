import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

class Geo {
    @ApiProperty()
    @IsNotEmpty()
    latitude: Number;

    @ApiProperty()
    @IsNotEmpty()
    longitude: Number;
}

export class CreateArtDto {
    @ApiProperty()
    @IsNotEmpty()
    title: String;

    @ApiProperty()
    @IsNotEmpty()
    artist: String;

    @ApiProperty()
    @IsNotEmpty()
    geolocation: Geo;
}



