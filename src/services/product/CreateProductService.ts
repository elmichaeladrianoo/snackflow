import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: number;
    description: string;
    banner: string;
    categoryId: number;
}

class CreateProductservice {
    async execute({ name, price, description, banner, categoryId }: ProductRequest) {
       
        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: categoryId
            }
        });
        return product;
    }
}

export { CreateProductservice };
