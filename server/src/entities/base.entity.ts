import { PrimaryGeneratedColumn, Column, BaseEntity as BaseEntityTypeORM, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity extends BaseEntityTypeORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 300, nullable: true })
    createdBy: string;
}