import { Header, HeaderNameType } from "../entities/header";
import { Page } from "../entities/page";

export class HeaderService {

    // ✅ Create or Update a Header
    async saveHeader(data: Header) {
        if (data.headerNameType === "PAGE") {
            data.pageIds = null; // Ensure subPages are not stored if PAGE type
        }
        return await Header.save(data);
    }

    // ✅ Get All Headers
    async getAllHeaders() {
        return await Header.find({ relations: ["page", "pages"] });
    }

    // ✅ Get Header by ID
    async getHeaderById(id: number) {
        return await Header.findOne({ where: { id }, relations: ["page", "pages"] });
    }

    // ✅ Delete Header
    async deleteHeader(id: number) {
        await Header.delete(id);
    }

    // ✅ Get Headers by Type (PAGE or SUB_PAGES)
    async getHeadersByType(type: HeaderNameType) {
        return await Header.find({
            where: {
                headerNameType: type
            }
        });
    }

    async updateHeader(id: number, data: Partial<Header>) {
        const existingHeader = await Header.findOne({ where: { id } });

        if (!existingHeader) {
            throw new Error("Header not found");
        }

        // Ensure subPages are only stored when headerNameType is "SUB_PAGES"
        if (data.headerNameType === "PAGE") {
            data.pageIds = null;
        }

        Object.assign(existingHeader, data);

        return await Header.save(existingHeader);
    }
}