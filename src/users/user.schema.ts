import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Skill } from '../skills/skill.schema';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([String])
  roles: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }])
  skills: Skill[];
}

export const UserSchema = SchemaFactory.createForClass(User);
