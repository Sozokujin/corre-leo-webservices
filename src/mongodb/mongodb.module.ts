import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('MONGO_USER')}:${configService.get<string>('MONGO_PWD')}@${configService.get<string>('MONGO_CLUSTER')}/?retryWrites=true&w=majority&appName=${configService.get<string>('MONGO_APP')}/`,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongodbModule {}
