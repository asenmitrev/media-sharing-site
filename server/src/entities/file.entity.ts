import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'file' })
export class File extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    path: string;

    @Column({ type: 'int' })
    size: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @ManyToOne(type => User, {
        cascade: true
    })
    uploader: User;
}