import { CustomerPlace } from "@prisma/client";
import { prismaClient } from "../database";
import { IPlaceRepository } from "./IPlaceRepository";

class PlaceRepository implements IPlaceRepository {
    private placeRepository;

    constructor() {
        this.placeRepository = prismaClient.customerPlace;
    }

    async createPlace(addressId: string, customerId: string, name: string): Promise<CustomerPlace> {
        const place = await this.placeRepository.create({
            data: {
                addressId,
                customerId,
                name,
            }
        });

        return place;
    }

    async showPlaces(customerId: string): Promise<CustomerPlace[]> {
        const places = await this.placeRepository.findMany({
            where: {
                customerId
            },
            include: {
                address: true
            }
        });


        return places;
    }

    async findPlaceById(placeId: string): Promise<CustomerPlace | null> {
        const place = await this.placeRepository.findFirst({
            where: {
                id: placeId
            },
            include: {
                address: true
            }
        });

        return place;
    }

    async deletePlace(placeId: string): Promise<CustomerPlace> {
        const place = await this.placeRepository.delete({
            where: {
                id: placeId
            }
        });

        return place;
    }

    async updatePlace(placeId: string, name: string, addressId: string): Promise<CustomerPlace> {
        const place = await this.placeRepository.update({
            where: {
                id: placeId
            },
            data: {
                name,
                addressId
            }
        });

        return place;
    }
}

export {PlaceRepository}