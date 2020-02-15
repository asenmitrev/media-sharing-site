import { Entity, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {

    @Column({ type: 'varchar', length: 3000 })
    content: string;

    @Column({ type: 'varchar', length: 1000 })
    link: string;

    @ManyToOne(type => Post, {
        cascade: true
    })
    post: Post;
}