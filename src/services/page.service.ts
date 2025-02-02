import { Page } from "../entities/page";

export class PageService {
    async getAllPages({
        isPublished
    }: {
        isPublished: string
    }) {
        if (isPublished) {
            const pages = await Page.find({
                where: {
                    isDeleted: false,
                    isPublished: true
                },
                order: {
                    createdAt: 'DESC'
                }
            });
            return pages;
        }
        const pages = await Page.find({
            where: {
                isDeleted: false,
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return pages;
    }

    async createPage(data: any) {
        const page = new Page();
        page.title = data.title;
        await page.save();
        return page;
    }

    async getPageById(id: number) {
        const page = await Page.findOne({
            where: {
                id,
                isDeleted: false,
            }
        })

        return page;
    }

    async getPageByName(name: string) {
        const page = await Page.findOne({
            where: {
                title: name,
                isDeleted: false,
            }
        })

        return page
    }

    async deletePage(id: string) {
        const page = await Page.findOne({
            where: {
                id: parseInt(id),
                isDeleted: false,
            }
        })

        if (!page) {
            throw new Error("Page not found");
        }

        page.isDeleted = true;
        await page.save();
        return page;
    }

    async publishPage(id: string) {
        const page = await Page.findOne({
            where: {
                id: parseInt(id),
                isDeleted: false,
            }
        });

        if (!page) {
            throw new Error("Page not found");
        }

        page.isPublished = true;
        await page.save();
        return page;
    }

    async unpublishPage(id: string) {
        const page = await Page.findOne({
            where: {
                id: parseInt(id),
                isDeleted: false,
            }
        });

        if (!page) {
            throw new Error("Page not found");
        }

        page.isPublished = false;
        await page.save();
        return page;
    }
}