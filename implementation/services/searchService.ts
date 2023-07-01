import { isNull } from "lodash";
import { AddressRepository } from "../../src/repositories/AddressRepository";
import { SellersRepository } from "../../src/repositories/SellersRepository";
import { SearchStrategyService } from "../../src/services/searchStrategyService";
import { Address } from '@prisma/client';

class SearchService implements SearchStrategyService {
    private sellerRepository = new SellersRepository()
    private addressRepository = new AddressRepository()

    async Search(sellerName: string, neighborhood: string) {
        const addressesWithSellers = await this.addressRepository.findByNeighborhoodWithSeller(neighborhood);

        const sellers = addressesWithSellers.map(address => {
            return {
                address: {
                id: address.id,
                street: address.street,
                number: address.number,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
                complement: address.complement,
                zipCode: address.zipCode,
                },

                seller: {
                id: address.Seller[0].id,
                name: address.Seller[0].user.name,
                email: address.Seller[0].user.email,
                phone: address.Seller[0].phone,
                favorities: address.Seller[0].Favorite.map(favorite =>
                    favorite.customer.userId,
                )
                }
            }
        })

        const sellersFilters = sellers.filter((seller) => { if (seller.seller.name.includes(sellerName)) { return seller } } )

        return sellersFilters;
    }
    
}

export { SearchService }