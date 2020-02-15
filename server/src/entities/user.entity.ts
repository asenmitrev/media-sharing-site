import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
import { Ip } from './ip.entity';

@Entity({ name: 'user' })
@Unique("UQ_USERNAMES", ['username'])
export class User extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    username: string;

    @Exclude({ toPlainOnly: true })
    @Column({ type: 'varchar', length: 3000, select: false })
    password: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 200 })
    email: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @OneToMany(type => Ip, ip => ip.user)
    ips: Ip[];
}