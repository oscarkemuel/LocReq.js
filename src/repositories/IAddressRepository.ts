import { Address, Seller, User } from "@prisma/client";

interface IAddressRepository {
  create(address: ICreateAddressDTO): Promise<Address>;
  show(id: string): Promise<Address | null>;
  delete(id: string): Promise<void>;
  findByNeighborhoodWithSeller(neighborhood: string): Promise<(Address & {
    Seller: (Seller & {
        user: User;
    })[];
})[]>;
}

export { IAddressRepository };