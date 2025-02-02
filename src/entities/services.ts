import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('services')
export class Services extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        nullable: true,
    })
    shortDescription!: string;

    @Column({
        nullable: true,
    })
    description!: string;

    @Column({
        nullable: true,
    })
    icon!: string;

    @Column({
        nullable: true,
    })
    cardLinkText!: string;

    @Column({
        nullable: true,
    })
    cardLink!: string;

    @Column()
    order!: number;

    @Column({
        default: false,
    })
    isDeleted!: boolean;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt!: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt!: Date;
}