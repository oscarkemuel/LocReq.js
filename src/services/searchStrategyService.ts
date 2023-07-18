interface ParamsSerarch {
    neighborhood: string;
    search: string;
}

interface SearchStrategyService {
    Search(params: ParamsSerarch):Promise<any>
}

export { SearchStrategyService, ParamsSerarch }