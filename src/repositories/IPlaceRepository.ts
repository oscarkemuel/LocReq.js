import { CustomerPlace } from "@prisma/client";

interface IPlaceRepository {
    createPlace(addressId: string, customerId: string, name: string): Promise<CustomerPlace>;
    showPlaces(customerId: string): Promise<CustomerPlace[]>;
    findPlaceById(placeId: string): Promise<CustomerPlace | null>;
    deletePlace(placeId: string): Promise<CustomerPlace>;
    updatePlace(placeId: string, name: string, addressId: string): Promise<CustomerPlace>;
}

export {IPlaceRepository}