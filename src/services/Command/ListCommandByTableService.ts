import prismaClient from "../../prisma";

interface CommandRequest {
    table: number;
}

class ListCommandByTableService {
    async listCommand({ table }: CommandRequest) {
        try {
            // Buscar todos os pedidos associados à mesa fornecida
            const orders = await prismaClient.order.findMany({
                where: {
                    table: table
                },
                include: {
                    items: true
                }
            });

            // Calcular o valor total de cada comanda
            const commandsPromises = orders.map(async (order) => {
                const totalAmount = order.items.reduce((acc, item) => {
                    return acc + item.amount;
                }, 0);
                const updatedOrder = await prismaClient.order.update({
                    where: {
                        id: order.id
                    },
                    data: {
                        finallyTotAmount: totalAmount
                    }
                });
                return updatedOrder.command_id;
            });

            // Obter os IDs das comandas dos pedidos
            const commandIds = await Promise.all(commandsPromises);

            // Buscar os dados das comandas com base nos IDs obtidos
            const commands = await prismaClient.command.findMany({
                where: {
                    id: {
                        in: commandIds
                    }
                }
            });

            return commands;
        } catch (error) {
            console.error('Erro ao listar comandos:', error);
            throw error;
        }
    }
}

export { ListCommandByTableService };
