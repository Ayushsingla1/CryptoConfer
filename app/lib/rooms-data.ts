export enum Rule {
    NoRule = 0,
    NftRule = 1,
    TokenRule = 2
}
type Control = {
    type : Rule,
    nftAddress? : string,
    tokenAddress? : string,
    tokenCount? : string
}

export type Room = {
    id : string,
    participants : Set<string>,
    rules : Control
}

export const Rooms = new Map<string,Room>();



