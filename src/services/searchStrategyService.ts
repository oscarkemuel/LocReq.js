interface SearchStrategyService {
    Search(sellerName?: string, neighborhood?: string, productName?: string):Promise<any>
}

export { SearchStrategyService }