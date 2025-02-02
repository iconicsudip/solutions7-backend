import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("leads")
export class Lead extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({
        nullable: true,
    })
    phoneNumber!: string;

    @Column({
        nullable: true,
    })
    description!: string;

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