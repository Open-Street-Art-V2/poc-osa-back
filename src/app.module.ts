import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtModule } from './art/art.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "tarek",
      "password": "password",
      "database": "test",
      "autoLoadEntities": true,
      "synchronize": true,
      "migrations": [
        '../dist/src/db/migrations/*.js'
      ],
      "cli": {
        "migrationsDir": '../src/db/migrations'
      }
    }
  ), ArtModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
