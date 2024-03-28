import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: number;
    description: string;
    bannerBase64: string;
    categoryId: number;
}

class CreateProductService {
    async createProduct({ name, price, description, bannerBase64, categoryId }: ProductRequest) {
        try{
            if (price <= 0){
                throw new Error('Preço do produto precisa ser maior que zero!');
            }
    
    
            // Salvar o produto no banco de dados usando Prisma
            const product = await prismaClient.product.create({
                data: {
                    name: name,
                    price: price,
                    description: description,
                    banner: bannerBase64, // Salvar o conteúdo base64 diretamente
                    category_id: categoryId
                },
                include: {
                    category: true
                }
            });
    
            // Formatando a resposta para incluir o campo banner como base64
            const productWithBase64Banner = {
                ...product,
                banner: bannerBase64
            };
    
            return productWithBase64Banner;

        }catch(err){

            throw new Error(err);
            
        }finally{
            prismaClient.$disconnect();

        }
      
    }
}

export { CreateProductService };
