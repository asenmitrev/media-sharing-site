import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@entities/post.entity';
import { PassportModule } from '@nestjs/passport';
import { Like } from '@entities/like.entity';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([Post, Like])
    ],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule { }
