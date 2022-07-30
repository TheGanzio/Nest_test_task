import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./users-schema").User>;
    findAll(): Promise<import("./users-schema").User[]>;
    findOne(dto: GetUserByIdDto): Promise<import("./users-schema").User>;
    prefillData(): Promise<"Users successfully prefilled\n" | "Users not prefilled\n">;
}
