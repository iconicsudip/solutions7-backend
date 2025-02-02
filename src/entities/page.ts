import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { Header } from "./header";
import { PageContentSection } from "./pagecontentsection";

@Entity("pages")
export class Page extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        default: false,
    })
    isPublished!: boolean;

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

    // This establishes the reverse side of the relationship from Page to Header
    @ManyToOne(() => Header, (header) => header.pages, { nullable: true })
    header!: Header; // Now this property exists, pointing back to the Header entity

    @OneToMany(() => PageContentSection, contentSection => contentSection.page, {
        cascade: ['insert', 'update'], // Cascade only on insert and update
        onDelete: 'CASCADE', // Automatically delete child rows when the parent is deleted
    })
    contentSections!: PageContentSection[];
}
