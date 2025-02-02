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