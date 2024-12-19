export type tFilter = {
    stock: 'all' | 'stock' | 'soon' | string,
    colors: string[],
    sizes: string[],
    collections: string[],
    price: {
        min: number,
        max: number
    }
}

export type tSortBy = 'price_asc' | 'price_desc' | 'popular_asc' | 'popular_desc';

export type tUser = {
    id: string;
    fullname: string | null;
    username: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    avatar: string | null;
}

export type tGoogleUser = {
    id: string;
    email: string;
    name: string;
    image: string;
}

export type browseDataType = {
    id: string,
    name: string,
    // collection: "men" | "women" | "kids",
    collection: string,
    year: number,
    category: string[],
    instock: boolean,
    price: number,
    imgURL: string,
    colors: string[],
    size: string[],
    sold: number
}