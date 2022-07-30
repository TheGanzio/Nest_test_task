import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { User, UsersDocument } from './users-schema';
import * as usersPrefill from './template_users_data';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(getUserByIdDto: GetUserByIdDto): Promise<User> {
    try {
      return await this.userModel.findOne({
        _id: getUserByIdDto.userId,
        include: { all: true },
      });
    } catch (error) {
      throw new HttpException({ message: 'User not found' }, 400);
    }
  }

  async prefillData() {
    try {
      await this.userModel.insertMany(usersPrefill);
      return 'Users successfully prefilled\n';
    } catch (error) {
      console.log(error);
      return 'Users not prefilled\n';
    }
  }
}
