import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('testimonials')
export class Testimonials extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        nullable: true,
    })
    testimonial!: string;

    @Column({
        nullable: true,
    })
    designation!: string;

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