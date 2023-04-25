import { NotFoundError } from "../helpers/apiErros";
import { PlaceRepository } from "../repositories/PlaceRepository";
import { AddressService } from "./addressService";
import { CustomersService } from "./customersService";

class PlaceService {
  private placeRepository = new PlaceRepository();
  private addressService = new AddressService();
  private customerService = new CustomersService();
    
  async create(data: ICreatePlaceDTO) {
    const costumer = await this.customerService.getByUserId(data.userId);

    if (!costumer) {
      throw new NotFoundError('Customer not found');
    }

    const {id: addressId} = await this.addressService.create(data.address);
    
    const place = await this.placeRepository.createPlace(addressId, costumer.id, data.name);
  
    return place;
  }

  async index(userId: string) {
    const costumer = await this.customerService.getByUserId(userId);

    if (!costumer) {
      throw new NotFoundError('Customer not found');
    }

    const places = await this.placeRepository.showPlaces(costumer.id);
  
    return places;
  }

  async show(placeId: string) {
    const place = await this.placeRepository.findPlaceById(placeId);

    if (!place) {
      throw new NotFoundError('Place not found');
    }

    return place;
  }

  async destroy(placeId: string) {
    const place = await this.show(placeId);
    
    if (!place) {
      throw new NotFoundError('Place not found');
    }

    const deletedPlace = await this.placeRepository.deletePlace(placeId);

    return deletedPlace;
  }

  async update(placeId: string, data: IUpdatePlaceDTO) {
    const place = await this.show(placeId);
    
    if (!place) {
      throw new NotFoundError('Place not found');
    }

    const {id: addressId} = await this.addressService.create(data.address);

    const updatedPlace = await this.placeRepository.updatePlace(placeId, data.name, addressId);

    return updatedPlace;
  }

  async findNearbySellers(placeId: string) {
    const place = await this.show(placeId);
    const address = await this.addressService.show(place.addressId);

    const places = 
      await this.addressService.findByNeighborhoodWithSeller(address.neighborhood);

    return places;
  }
}

export { PlaceService }