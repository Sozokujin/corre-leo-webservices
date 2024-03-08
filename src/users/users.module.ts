import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { SkillsModule } from '../skills/skills.module'; // Assurez-vous que le chemin d'importation est correct

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SkillsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
