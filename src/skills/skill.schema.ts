import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop({ required: true, unique: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
