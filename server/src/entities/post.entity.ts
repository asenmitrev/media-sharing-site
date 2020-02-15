import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { PostType } from '../models/post-type.enum';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'post' })
export class Post extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 3000 })
    description: string;

    @Column({ type: 'varchar', length: 10 })
    postType: PostType;

    @Column({ type: 'varchar', length: 200, nullable: true })
    link: string;
    
    @ManyToOne(type => User, author => author.posts)
    author: User;

    @OneToMany(type => Like, like => like.post)
    likes: Like[];

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment;
}