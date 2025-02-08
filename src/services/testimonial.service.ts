import { In } from "typeorm";
import { Testimonials } from "../entities/testimonial";

export class TestimonialService {
    async getAllTestimonials() {
        const services = await Testimonials.find({
            where: {
                isDeleted: false,
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return services;
    }

    async createTestimonial(data: {
        name: string,
        testimonial: string,
        designation: string
    }) {
        const service = new Testimonials();
        service.name = data.name;
        service.testimonial = data.testimonial;
        service.designation = data.designation;
        await service.save();
        return service;
    }

    async getTestimonialById(id: number) {
        const service = await Testimonials.findOne({
            where: {
                id,
                isDeleted: false,
            }
        })

        return service;
    }
    async getTestimonialsByIds(ids: string[]) {
        const numericIds = ids.map(id => Number(id)).filter(id => !isNaN(id)); // Convert strings to numbers

        if (numericIds.length === 0) return []; // Return empty array if no valid IDs

        const services = await Testimonials.find({
            where: {
                id: In(numericIds), // Use TypeORM's In() operator for multiple IDs
                isDeleted: false,
            },
        });
        const formattedData = services.map((s) => { return { ...s } })
        return formattedData;
    }

    async deleteTestimonial(id: string) {
        const service = await Testimonials.findOne({
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

    async updateTestimonial(id: string, data: {
        name: string,
        testimonial: string,
        designation: string
    }) {
        const service = await Testimonials.findOne({
            where: {
                id: parseInt(id),
                isDeleted: false,
            }
        })

        if (!service) {
            throw new Error("Service not found");
        }

        if (data.name !== undefined) service.name = data.name;
        if (data.testimonial !== undefined) service.testimonial = data.testimonial;
        if (data.designation !== undefined) service.designation = data.designation;

        await service.save();
        return service;
    }

}