import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page";

@Entity('pagecontentsection')
export class PageContentSection extends BaseEntity {
    // Properties
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @Column()
    contentType!: string;

    @Column()
    section!: string;

    @Column()
    order!: number;

    @Column()
    pageId!: number;

    @ManyToOne(() => Page, page => page.contentSections, { onDelete: 'CASCADE' }) // Remove cascade from this side
    @JoinColumn({ name: 'pageId' }) // Explicitly define the foreign key column
    page!: Page;

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