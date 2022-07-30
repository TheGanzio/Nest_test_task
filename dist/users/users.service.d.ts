import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { User, UsersDocument } from './users-schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UsersDocument>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(getUserByIdDto: GetUserByIdDto): Promise<User>;
    prefillData(): Promise<"Users successfully prefilled\n" | "Users not prefilled\n">;
}
