import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto, UpdateSkillDto } from './dto';


@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }  

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.skillsService.delete(id);
  }
}
