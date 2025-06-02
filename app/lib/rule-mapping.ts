
enum Rule {
    NoRule,
    NftRule,
    TokenRule
}
type Control = {
    type : Rule,
    nftAddress? : string,
    tokenAddress? : string,
    tokenCount? : string
}

export const RuleMap = new Map<string,Control>();

