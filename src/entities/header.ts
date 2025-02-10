import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm";
import { Page } from "./page";

export enum HeaderNameType {
    PAGE = "PAGE",
    SUB_PAGES = "SUB_PAGES",
}

@Entity("headers")
export class Header extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        type: "enum",
        enum: HeaderNameType,
        default: HeaderNameType.PAGE
    })
    headerNameType!: HeaderNameType;

    @ManyToOne(() => Page, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "pageId" })
    page!: Page;

    @OneToMany(() => Page, (page) => page.header)
    pages!: Page[];

    @Column()
    pageId!: number; // The actual foreign key column for a single page

    @Column("json", { nullable: true })
    pageIds!: number[] | null; // This will store an array of page IDs for subPages

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
