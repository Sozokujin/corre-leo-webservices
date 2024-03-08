import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './skill.schema';
import { CreateSkillDto, UpdateSkillDto } from './dto';
import { skillSynonyms } from '../synonymous/synonymous'; // Assurez-vous que le chemin est correct


@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) {}

  private normalizeSkill(skill: string): string {
    console.log(skill);
    const normalizedKey = skill.toLowerCase().replace(/\s+/g, '');
    return skillSynonyms[normalizedKey] || skill;
  }
  
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const normalizedSkillName = this.normalizeSkill(createSkillDto.name);
    let skill = await this.skillModel.findOne({ name: normalizedSkillName }).exec();
    console.log(normalizedSkillName)
    if (!skill) {
      skill = new this.skillModel({ ...createSkillDto, name: normalizedSkillName });
      await skill.save();
    }
    return skill;
  }
  
  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async findOne(id: string): Promise<Skill> {
    return this.skillModel.findById(id).exec();
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const normalizedSkillName = this.normalizeSkill(updateSkillDto.name);
    const existingSkill = await this.skillModel.findOne({ name: normalizedSkillName }).exec();
    if (existingSkill && existingSkill._id.toString() !== id) {
      throw new Error('Une compétence avec ce nom existe déjà.');
    }
    return this.skillModel.findByIdAndUpdate(id, { ...updateSkillDto, name: normalizedSkillName }, { new: true }).exec();
  }
  

  async delete(id: string): Promise<any> {
    return this.skillModel.findByIdAndDelete(id).exec();
  }

  async findOrCreateByName(skillName: string): Promise<SkillDocument> {
    const normalizedSkillName = this.normalizeSkill(skillName);
    let skill = await this.skillModel.findOne({ name: normalizedSkillName }).exec();
  
    if (!skill) {
      skill = new this.skillModel({ name: normalizedSkillName });
      await skill.save();
    }
  
    return skill;
  }
}
