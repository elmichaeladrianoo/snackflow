import prismaClient from "../../prisma";

interface CommandRequest {
    table_id: string;
    company_id: string;
    status:boolean | string;
}

class ListCommandByTableService {
    async listCommand({ table_id, company_id }: CommandRequest) {
        try {
            const table = await prismaClient.table.findFirst({
                where: {
                    id: parseInt(table_id),
                    company_id: parseInt(company_id),
                    status: true, // Apenas mesas com status true
                },
                select: {
                    command_id: true
                }
            });

            if (table) {
              
                const commandIds = table.command_id;

              
                const commands = await prismaClient.command.findMany({
                    where: {
                        id: commandIds,
                        available: false 
                    },
                    select: {
                        id: true,
                        nameAlias: true,
                        available: true,
                        virtual: true,
                        finallyTotAmount: true,
                        created_at: true,
                    }
                });

                // Retornar os comandos encontrados
                return commands;
            } else {
                // Se não houver comandas encontradas, retornar um array vazio
                console.log("Não encontrou nenhuma mesa com o ID fornecido");
                return [];
            }
        } catch (error) {
            console.error('Erro ao listar comandos:', error);
            throw new Error("Erro ao listar comandos");
        } finally {
            prismaClient.$disconnect();
        }
    }
}

export { ListCommandByTableService };

