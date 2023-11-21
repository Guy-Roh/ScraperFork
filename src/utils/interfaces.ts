export interface PriceInfo {
    priceCents: number;
    priceType: string;
}

export interface Location {
    cityName: string;
    countryName: string;
    countryAbbreviation: string;
    distanceMeters: number;
    isBuyerLocation: boolean;
    onCountryLevel: boolean;
    abroad: boolean;
    latitude: number;
    longitude: number;
}

export interface SellerInformation {
    sellerId: number;
    sellerName: string;
    showSoiUrl: boolean;
    showWebsiteUrl: boolean;
    isVerified: boolean;
}

export interface Attribute {
    key: string;
    value: string;
    values: string[];
}

export interface ExtendedAttribute {
    key: string;
    value: string;
    values: string[];
}

export interface Picture {
    id: number;
    mediaId: string;
    url: string;
    extraSmallUrl: string;
    mediumUrl: string;
    largeUrl: string;
    extraExtraLargeUrl: string;
    aspectRatio: {
        width: number;
        height: number;
    };
}
export interface Important{
    itemId: string,
    title: string,
    description: string,
    price: number,
    cityName: string,
    distance: number,
    dateDay: string,
    dateHour: string
    link: string;
}

export interface Listing {
    itemId: string;
    title: string;
    description: string;
    categorySpecificDescription: string;
    thinContent: boolean;
    priceInfo: PriceInfo;
    location: Location;
    date: string;
    imageUrls: string[];
    sellerInformation: SellerInformation;
    categoryId: number;
    priorityProduct: string;
    videoOnVip: boolean;
    urgencyFeatureActive: boolean;
    napAvailable: boolean;
    attributes: Attribute[];
    extendedAttributes: ExtendedAttribute[];
    traits: string[];
    verticals: string[];
    pictures: Picture[];
    vipUrl: string;
}

export interface Items {
    listings: Listing[],
    topBlock: string[],
    facets: string[],
    totalResultCount : number,
    maxAllowedPageNumber: number,
    correlationId: string,
    suggestedSearches: string[],
    sortOptions: string[],
    isSearchSaved: boolean,
    hasErrors: boolean,
    alternativeLocales: string[],
    searchRequest: string[],
    searchCategory: number,
    searchCategoryOptions: string[],
    seoFriendlyAttributes: string[],
    seoFriendlyTextAttributes: string[],
    attributeHierarchy: string[],
    categoriesById: string[],
    metaTags: string[]
}