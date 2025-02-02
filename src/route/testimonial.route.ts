import { Router } from "express"
import {
    allTestimonials,
    createTestimonial,
    deleteTestimonial,
    updateTestimonial
} from "../controller/testimonial.controller";

const testimonialRoutes = Router();

testimonialRoutes.get("/", allTestimonials);
testimonialRoutes.post("/add-testimonial", createTestimonial);
testimonialRoutes.delete("/delete-testimonial/:id", deleteTestimonial);
testimonialRoutes.put("/update-testimonial/:id", updateTestimonial);

export default testimonialRoutes;