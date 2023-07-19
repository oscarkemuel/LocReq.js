import { isNull } from "lodash";
import { AddressRepository } from "../../src/repositories/AddressRepository";
import { SellersRepository } from "../../src/repositories/SellersRepository";
import {
  ParamsSerarch,
  SearchStrategyService,
} from "../../src/services/searchStrategyService";
import { Address } from "@prisma/client";
import { ProductRepository } from "../../src/repositories/ProductRepository";

class SearchService implements SearchStrategyService {
  private sellerRepository = new SellersRepository();
  private addressRepository = new AddressRepository();
  private productRepository = new ProductRepository();

  async Search({ search, neighborhood }: ParamsSerarch): Promise<any> {
    const addressesWithSellers =
      await this.addressRepository.findByNeighborhoodWithSeller(neighborhood);

    const sellers = addressesWithSellers.map((address) => {
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
          favorities: address.Seller[0].Favorite.map(
            (favorite) => favorite.customer.userId
          ),
        },
      };
    });

    const sellersWithProducts = await Promise.all(
      sellers.map(async (seller) => {
        const products = await this.productRepository.showBySellerId(
          seller.seller.id
        );
        const productsFiltred = products.filter((product) => {
          return (
            product.startTime?.toISOString() === new Date(search).toISOString()
          );
        });
        return productsFiltred.length !== 0 ? seller : null;
      })
    );

    const result = sellersWithProducts.filter((seller) => seller !== null);

    return result;
  }
}

export { SearchService };
