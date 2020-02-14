import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'ip' })
export class Ip extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    ip: string;

    @ManyToOne(type => User, user => user.ips)
    user: User;
}