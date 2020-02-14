import { Entity, Column, ManyToOne } from 'typeorm';
import { PostType } from '../models/post-type.enum';
import { BaseEntity } from '@entities/base.entity';
import { User } from '@entities/user.entity';
import { Post } from '@entities/post.entity';

@Entity({ name: 'like' })
export class Like extends BaseEntity {
    @ManyToOne(type => Post, post => post.likes)
    post: Post;

    @ManyToOne(type => User)
    user: User;
}