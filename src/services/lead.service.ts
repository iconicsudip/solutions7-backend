import { Lead } from "../entities/lead"

export class LeadService {
    async createLead(data: {
        name: string,
        email: string,
        phoneNumber?: string | null,
        description?: string | null
    }) {
        const newLead = new Lead();
        newLead.name = data.name;
        newLead.email = data.email;
        if (data.phoneNumber) {
            newLead.phoneNumber = data.phoneNumber;
        }
        if (data.description) {
            newLead.description = data.description;
        }
        await newLead.save()
        return newLead;
    }

    async allLead() {
        const allLeads = await Lead.find();
        return allLeads;
    }
}