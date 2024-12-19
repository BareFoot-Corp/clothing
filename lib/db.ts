import { PrismaClient } from "@prisma/client";
import { browseDataType } from "@/lib/type";

const prisma = new PrismaClient();

type argString = string | null | undefined;
type argBoolean = boolean | null | undefined;

// GET USERS
export async function getUserById(id: string | undefined){
    try{
        const user = await prisma.user.findUnique({ 
            where: { id },
            
            select: { username: true, fullname: true, email: true, id: true, isAdmin: true, isVerified: true, avatar: true }
        }); 
        return user;
    }
    catch(err){
        throw Error(`Server Error:\n${err}`);
    }

}

export async function getUserByEmail(email: string){
    try{

        const user = await prisma.user.findUnique({ 
            where: { email },
            
            select: { username: true, fullname: true, email: true, id: true, isAdmin: true, isVerified: true, avatar: true }
        }); 
    
        return user;
    }
    catch(error){
        throw Error(`Server Error\n${error}`);
    }
}

export async function getUserHashedPassword( email: string | null = null){
    let user = null;
    if(email){
        user = await prisma.user.findUnique({
            where: { email },

            select: { password: true }
        })
    }
    else{
        console.log("Either passdown email or id of user");
    }

    return user?.password;
}

// SET USERS
export async function setGoogleUser( email: argString, email_verified: argBoolean, picture: argString, name: argString){
    try{
        if(email && picture && name && email_verified){
            const user = await prisma.user.findUnique({
                where: { email }
            });

            // console.log("Google User ID(db.ts)", id)

            if(!user){
                await prisma.user.create({
                    data: {
                        username: name,
                        email, 
                        avatar: picture,
                        isVerified: email_verified
                    }
                });
            }
        }

        return null;
    }catch(error){
        throw Error(`${error}`);
    }
}


// GET PRODUCTS
export async function getAllProducts(): Promise<browseDataType[]>{
    const allProducts = await prisma.products.findMany();

    if(allProducts)
    {
        return allProducts;
    }
    return [];
}