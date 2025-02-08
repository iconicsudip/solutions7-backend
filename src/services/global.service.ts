import { ServiceService } from "./service.service";
import { TestimonialService } from "./testimonial.service";

const serviceService = new ServiceService();
const testimonialService = new TestimonialService()

export class GlobalService {
    async fetchData(type: string, ids: string[]) {
        if (type === "services") {
            return await serviceService.getServicesByIds(ids);
        } else if (type === "testimonials") {
            return await testimonialService.getTestimonialsByIds(ids);
        }
        return [];
    };
}