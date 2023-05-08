import { BadRequestError, NotFoundError } from "../helpers/apiErros";
import { CustomersRepository } from "../repositories/CustomersRepository";

class CustomersService {
  private customerRepository = new CustomersRepository();

  async create(data: ICreateCustomerDTO) {
    const customerWithPhoneAlreadyExists = await this.customerRepository.findByPhone(data.phone);
    const customerWithUserIdAlreadyExists = await this.customerRepository.findByUserId(data.userId);
    
    if (customerWithUserIdAlreadyExists) {
      throw new BadRequestError('Customer already exists');
    }

    if (customerWithPhoneAlreadyExists) {
      throw new BadRequestError('Phone already exists');
    }
    
    const newCustomer = await this.customerRepository.create(data);
  
    return newCustomer;
  }

  async getByUserId(userId: string) {
    const customer = await this.customerRepository.findByUserId(userId);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    return customer;
  }
}

export { CustomersService };