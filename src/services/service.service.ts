import { In } from "typeorm";
import { Services } from "../entities/services";

export class ServiceService {
    async getAllServices() {
        const services = await Services.find({
            where: {
                isDeleted: false,
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return services;
    }

    async createService(data: {
        title: string,
        order: number
    }) {
        const service = new Services();
        service.title = data.title;
        service.order = data.order;
        await service.save();
        return service;
    }

    async getServiceById(id: number) {
        const service = await Services.findOne({
            where: {
                id,
                isDeleted: false,
            }
        })

        return service;
    }

    async getServicesByIds(ids: string[]) {
        const numericIds = ids.map(id => Number(id)).filter(id => !isNaN(id)); // Convert strings to numbers

        if (numericIds.length === 0) return []; // Return empty array if no valid IDs

        const services = await Services.find({
            where: {
                id: In(numericIds), // Use TypeORM's In() operator for multiple IDs
                isDeleted: false,
            },
            order: {
                order: "ASC", // Sorting by 'order' column in ascending order
            },
        });
        const formattedData = services.map((s) => { return { ...s } })
        return formattedData;
    }


    async deleteService(id: string) {
        const service = await Services.findOne({
            where: {
                id: parseInt(id),
                isDeleted: false,
            }
        })

        if (!service) {
            throw new Error("Service not found");
        }

        service.isDeleted = true;
        await service.save();
        return service;
    }

    async updateService(id: string, data: {
        title: string;
        shortDescription: string;
        description: string;
        cardLinkText: string;
        cardLink: string
    }) {
        const service = await Services.findOne({
            where: {
                id: parseInt(id),
                isDeleted: false,
            }
        })

        if (!service) {
            throw new Error("Service not found");
        }

        if (data.title !== undefined) service.title = data.title;
        if (data.shortDescription !== undefined) service.shortDescription = data.shortDescription;
        if (data.description !== undefined) service.description = data.description;
        if (data.cardLinkText !== undefined) service.cardLinkText = data.cardLinkText;
        if (data.cardLink !== undefined) service.cardLink = data.cardLink;

        await service.save();
        return service;
    }

    async getMaxOrder() {
        const maxOrder = await Services.createQueryBuilder("services")
            .select("MAX(services.order)", "max")
            .getRawOne();
        return maxOrder;
    }
}