// export type browseDataType = {
//     id: string,
//     name: string,
//     collection: "men" | "women" | "kids",
//     year: number,
//     category: string[],
//     instock: boolean,
//     price: number,
//     imgURL: string,
//     colors: string[],
//     size: string[],
//     sold: number
// }
// export type browseDataType = {
//     name: string,
//     collection: "men" | "women" | "kids",
//     year: number,
//     category: string[],
//     instock: boolean,
//     price: number,
//     imgURL: string,
//     colors: string[],
//     size: string[],
//     sold: number
// }

// export const browseData: browseDataType[] = [
//     {
//         id: 1, 
//         name: "Men Jeans 1",
//         collection: "men",
//         year: 2024,
//         category: ["jeans"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/men_jeans_1.webp",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 5
//     },{
//         id: 2,
//         name: "Men Jeans 2",
//         collection: "men",
//         year: 2024,
//         category: ["jeans"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/men_jeans_2.webp",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["L", "XL", "XXL"],
//         sold: 7
//     },{
//         id: 3,
//         name: "Men Jeans 3",
//         collection: "men",
//         year: 2024,
//         category: ["jeans"],
//         instock: false,
//         price: 25,
//         imgURL: "./assets/men_jeans_3.webp",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["M", "L", "XL", "XXL"],
//         sold: 6
//     },{
//         id: 4,
//         name: "Men Jeans Jacket",
//         collection: "men",
//         year: 2024,
//         category: ["jeans", "jacket"],
//         instock: true,
//         price: 40,
//         imgURL: "./assets/men_jeans_jacket_1.webp",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["M", "L", "XL", "XXL"],
//         sold: 1
//     },{
//         id: 5,
//         name: "Men Tshirt 1",
//         collection: "men",
//         year: 2023,
//         category: ["tshirt"],
//         instock: false,
//         price: 23,
//         imgURL: "./assets/men_tshirt_1.webp",
//         colors: ["#FFFFFF", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 3
//     },{
//         id: 6,
//         name: "Men Tshirt 2",
//         collection: "men",
//         year: 2024,
//         category: ["tshirt"],
//         instock: true,
//         price: 20,
//         imgURL: "./assets/men_jeans_2.webp",
//         colors: ["#FFFFFF", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 10
//     },{
//         id: 7,
//         name: "Women Blouse 1",
//         collection: "women",
//         year: 2024,
//         category: ["blouse"],
//         instock: false,
//         price: 65,
//         imgURL: "./assets/women_blouse_1.webp",
//         colors: ["#FFFFFF", "#000000", "#0000FF"],
//         size: ["S", "M", "L"],
//         sold: 4
//     },{
//         id: 8,
//         name: "Women Pants 1",
//         collection: "women",
//         year: 2024,
//         category: ["pant"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/women_pants_1.webp",
//         colors: ["#0000FF", "#00FF00", "#FF0000"],
//         size: ["M", "L", "XL"],
//         sold: 9
//     },{
//         id: 9,
//         name: "Men Jacket 1",
//         collection: "men",
//         year: 2024,
//         category: ["jacket"],
//         instock: true,
//         price: 25.99,
//         imgURL: "./assets/men_jacket_1.webp",
//         colors: ["#808080", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 3
//     },{
//         id: 10,
//         name: "Women Shirt 1",
//         collection: "women",
//         year: 2024,
//         category: ["shirt"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/women_shirt_1.webp",
//         colors: ["#0000FF", "#00FF00", "#FFFF00"],
//         size: ["S", "M", "L"],
//         sold: 5
//     },
// ]

// export const browseData: browseDataType[] = [
//     {
//         name: "Men Jeans 1",
//         collection: "men",
//         year: 2024,
//         category: ["jeans"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/men_jeans_1.jpg",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 5
//     },{
//         name: "Men Jeans 2",
//         collection: "men",
//         year: 2024,
//         category: ["jeans"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/men_jeans_2.jpg",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["L", "XL", "XXL"],
//         sold: 7
//     },{
//         name: "Men Jeans 3",
//         collection: "men",
//         year: 2024,
//         category: ["jeans"],
//         instock: false,
//         price: 25,
//         imgURL: "./assets/men_jeans_3.jpg",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["M", "L", "XL", "XXL"],
//         sold: 6
//     },{
//         name: "Men Jeans Jacket",
//         collection: "men",
//         year: 2024,
//         category: ["jeans", "jacket"],
//         instock: true,
//         price: 40,
//         imgURL: "./assets/men_jeans_jacket_1.jpg",
//         colors: ["#0000FF", "#00FF00", "#000000"],
//         size: ["M", "L", "XL", "XXL"],
//         sold: 1
//     },{
//         name: "Men Tshirt 1",
//         collection: "men",
//         year: 2023,
//         category: ["tshirt"],
//         instock: false,
//         price: 23,
//         imgURL: "./assets/men_tshirt_1.jpg",
//         colors: ["#FFFFFF", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 3
//     },{
//         name: "Men Tshirt 2",
//         collection: "men",
//         year: 2024,
//         category: ["tshirt"],
//         instock: true,
//         price: 20,
//         imgURL: "./assets/men_jeans_2.jpg",
//         colors: ["#FFFFFF", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 10
//     },{
//         name: "Women Blouse 1",
//         collection: "women",
//         year: 2024,
//         category: ["blouse"],
//         instock: false,
//         price: 65,
//         imgURL: "./assets/women_blouse_1.jpg",
//         colors: ["#FFFFFF", "#000000", "#0000FF"],
//         size: ["S", "M", "L"],
//         sold: 4
//     },{
//         name: "Women Pants 1",
//         collection: "women",
//         year: 2024,
//         category: ["pant"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/women_pants_1.jpg",
//         colors: ["#0000FF", "#00FF00", "#FF0000"],
//         size: ["M", "L", "XL"],
//         sold: 9
//     },{
//         name: "Men Jacket 1",
//         collection: "men",
//         year: 2024,
//         category: ["jacket"],
//         instock: true,
//         price: 25.99,
//         imgURL: "./assets/men_jacket_1.jpg",
//         colors: ["#808080", "#000000"],
//         size: ["M", "L", "XL"],
//         sold: 3
//     },{
//         name: "Women Shirt 1",
//         collection: "women",
//         year: 2024,
//         category: ["shirt"],
//         instock: true,
//         price: 25,
//         imgURL: "./assets/women_shirt_1.jpg",
//         colors: ["#0000FF", "#00FF00", "#FFFF00"],
//         size: ["S", "M", "L"],
//         sold: 5
//     },
// ]