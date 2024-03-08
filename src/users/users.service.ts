import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { SkillsService } from 'src/skills/skills.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private skillsService: SkillsService, 
      ) {}
      

      async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user.toObject();
          return result;
        }
        return null;
      }

      async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
      }
      
      
      async create(createUserDto: CreateUserDto): Promise<User> {
        const skillIds = await Promise.all(createUserDto.skills.map(skillName => 
          this.skillsService.findOrCreateByName(skillName).then(skill => skill._id)
        ));

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
        const newUser = new this.userModel({
          ...createUserDto,
          skills: skillIds,
          password: hashedPassword,
        });
    
        return newUser.save();
      }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
}
}
