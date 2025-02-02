import { PageContentSection } from "../entities/pagecontentsection";

export class PageContentService {
    async createPageContentSection(
        content: string,
        contentType: string,
        section: string,
        pageId: number,
        order: number
    ) {
        const pageContent = new PageContentSection();
        pageContent.content = content;
        pageContent.contentType = contentType;
        pageContent.section = section;
        pageContent.pageId = pageId;
        pageContent.order = order;
        await pageContent.save();

        return pageContent;
    }

    async getPageContentSection(
        contentType: string,
        section: string,
        pageId: number
    ) {
        const pageContent = await PageContentSection.findOne({
            where: {
                contentType,
                section,
                pageId
            }
        });
        return pageContent;
    }

    async updatePageContentSection(
        content: string,
        contentType: string,
        section: string,
        pageId: number
    ) {
        const pageContent = await PageContentSection.findOne({
            where: {
                contentType,
                section,
                pageId
            }
        });

        if (!pageContent) {
            throw new Error("Content not found");
        }

        pageContent.content = content;
        await pageContent.save();

        return pageContent;
    }

    async getPageContentSectionByPageId(pageId: number) {
        const pageContent = await PageContentSection.find({
            where: {
                pageId
            }
        });

        return pageContent;
    }
}