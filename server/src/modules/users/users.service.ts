import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../../models/user.dto';
import * as bcrypt from 'bcrypt-nodejs';

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    }

    public async getAll() {
        return await this.userRepository.find();
    }

    async findOne(query: any): Promise<User | undefined> {
        return this.userRepository.findOne(query);
    }

    async find(query: any): Promise<User[] | undefined> {
        return this.userRepository.find(query);
    }

    async create(userDto: UserDTO): Promise<User> {
        const userEntity = this.userRepository.create({ ...userDto, password: this.hashPassword(userDto.password) });
        await this.userRepository.save(userEntity);
        return userEntity;
    }

    hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    isValidPassword(password: string, user: User): boolean {
        return bcrypt.compareSync(password, user.password);
    }

    async getUserWithPassword(username): Promise<User> {
        return await this.userRepository
            .createQueryBuilder()
            .where("user.username = :username", { username })
            .addSelect("user.password")
            .getOne();
    }
}