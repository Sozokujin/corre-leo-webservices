import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongodbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
