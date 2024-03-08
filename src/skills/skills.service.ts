import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './skill.schema';
import { CreateSkillDto, UpdateSkillDto } from './dto';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const newSkill = new this.skillModel(createSkillDto);
    return newSkill.save();
  }  

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async findOne(id: string): Promise<Skill> {
    return this.skillModel.findById(id).exec();
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.skillModel.findByIdAndDelete(id).exec();
  }
}
