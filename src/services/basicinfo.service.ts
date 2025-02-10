import { In } from "typeorm";
import { BasicInfo } from "../entities/basicinfo";

export class BasicInfoService {
    async getBasicInfos() {
        const basicInfo = await BasicInfo.find();
        const result: { [key: string]: {} } = {};

        basicInfo.forEach(element => {
            if (!result[element.type]) {
                result[element.type] = {}
            }
            result[element.type] = JSON.parse(element.value);
        });

        return result;
    }

    async getBasicInfoByTypes(types: string[]) {
        const basicInfo = await BasicInfo.find({
            where: {
                type: In(types)
            }
        })
        const result: { [key: string]: {} } = {};

        basicInfo.forEach(element => {
            if (!result[element.type]) {
                result[element.type] = {}
            }
            result[element.type] = JSON.parse(element.value);
        });

        return result;
    }

    async updateAndCreateBasicInfo(type: string, value: string) {
        const existingBasicInfo = await BasicInfo.findOne({
            where: {
                type
            }
        })
        let message = "";
        if (existingBasicInfo) {
            existingBasicInfo.value = JSON.stringify(value);
            await existingBasicInfo.save()
            message = "updated"
        } else {
            const info = new BasicInfo();
            info.type = type;
            info.value = JSON.stringify(value)
            await info.save();

            message = "created"
        }

        return {
            message
        }
    }
}