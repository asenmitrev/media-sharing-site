import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../../models/posts/create-post.dto';
import { EditPostDTO } from '../../models/posts/edit-post.dto';
import { DeletePostDTO } from '../../models/posts/delete-post.dto';
import { User } from '../../entities/user.entity';
import { Like } from '@entities/like.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
        @InjectRepository(Like) private readonly likesRepository: Repository<Like>
        ) {
    }

    public async getAll() {
        return this.postsRepository.find();
    }

    async findOne(query: any): Promise<Post | undefined> {
        return this.postsRepository.findOne(query);
    }

    async find(query: any): Promise<Post[] | undefined> {
        return this.postsRepository.find(query);
    }

    async create(postDto: CreatePostDTO, user: User): Promise<Post> {
        const postEntity = await this.postsRepository.create(postDto);
        postEntity.author = user;
        await this.postsRepository.save(postEntity);
        return postEntity;
    }

    async edit(postDto: EditPostDTO, user: User): Promise<Post> {
        const post = await this.postsRepository.findOne(postDto.id, { relations: ["author"] });
        if(post.author.id != user.id) {
            throw new UnauthorizedException();
        }
        post.title = postDto.title;
        post.description = postDto.description;
        return this.postsRepository.save(post);
    }

    async delete(postDto: DeletePostDTO, user: User) {
        const post = await this.postsRepository.findOne(postDto.id, { relations: ["author"] });
        if(post.author.id != user.id) {
            throw new UnauthorizedException();
        }
        //TODO: Remove comments and files as well
        return this.postsRepository.remove(post);
    }

    async like(postId: string, user: User) {
        let like: Like = await this.likesRepository.findOne({ where: {
            user: user,
            post: {
                id: postId
            }
        }});
        if(!like) {
            like = await this.likesRepository.create({
                user,
                post: {id: postId}
            });
            this.likesRepository.save(like)
            return { isLiked: true };
        } else {
            await this.likesRepository.remove(like);
            return { isLiked: false };
        }
    }

    async getPostsWithLikes(skip: number, limit: number) {
        //{relations: ['author'], order: { createDateTime: 'DESC' }, skip, take}
        return await this.postsRepository
            .createQueryBuilder('post')
            .loadRelationCountAndMap('post.likesCount', 'post.likes')
            .leftJoinAndSelect('post.author', 'author')
            .select('author.name')
            .orderBy('post.createDateTime', 'DESC')
            .offset(skip)
            .limit(limit)
            .getMany();
    }
}
