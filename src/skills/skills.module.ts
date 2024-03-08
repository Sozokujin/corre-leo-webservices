import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill, SkillSchema } from './skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }])
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService], // Exporter le SkillsService si d'autres modules doivent l'utiliser
})
export class SkillsModule {}
