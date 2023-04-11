interface ICreateProductDTO {
  name: string
  description: string | null
  price: number
  quantity: number
  sellerId: string
}

export {ICreateProductDTO}