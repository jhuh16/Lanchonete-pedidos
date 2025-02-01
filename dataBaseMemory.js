import { randomUUID } from "node:crypto"; // Importa a função randomUUID do módulo node:crypto para gerar IDs únicos
import { get } from "node:http"; // Importa o módulo node:http (não está sendo usado neste código, pode ser removido)

export class dataBaseMemory { // Define a classe dataBaseMemory, responsável por simular um banco de dados em memória

    #pedido = new Map(); // Cria um novo Map privado (#pedido) para armazenar os pedidos. Maps são estruturas de dados que armazenam pares chave-valor.

    getById(id) { // Método getById: Retorna um pedido pelo seu ID
        return this.#pedido.get(id); // Usa o método get do Map para obter o pedido com o ID fornecido
    };

    list(search) { // Método list: Retorna uma lista de pedidos, opcionalmente filtrada por um termo de busca
        return Array.from(this.#pedido.entries()).map((pedidoArray) => { // Converte o Map #songs em um array de entradas [chave, valor] e usa map para transformar cada entrada em um objeto de música

            const id = pedidoArray[0]; // Extrai o ID do pedido (chave do Map)
            const data = pedidoArray[1]; // Extrai os dados do pedido (valor do Map)

            return { // Retorna um novo objeto contendo o ID e os dados do pedido
                id,
                ...data, // Espalha os dados do pedido no objeto
            };
        })
            .filter(pedido => { // Filtra o array dos pedidos com base no termo de busca (se fornecido)
                if (search) { // Verifica se o termo de busca foi fornecido
                    return pedido.nome.includes(search); // Retorna true se o nome do pedido inclui o termo de busca, false caso contrário
                };
                return true; // Se o termo de busca não foi fornecido, retorna true para todos os pedidos (inclui todos na lista)
            });
    };

    create(pedido) { // Método create: Crie um novo pedido e a adiciona ao "banco de dados"
        const pedidoID = randomUUID(); // Gera um novo ID único usando randomUUID
        this.#pedido.set(pedidoID, pedido); // Adicione o pedido ao Map #pedidos, usando o ID gerado como chave
    };

    update(id, pedido) { // Método update: Atualiza um pedido existente
        this.#pedido.set(id, pedido); // Atualiza o pedido no Map #pedido, usando o ID fornecido como chave e os novos dados do pedido como valor
    };

    delete(id) { // Método delete: Deleta um pedido existente
        this.#pedido.delete(id); // Remove a música do Map #pedido, usando o ID fornecido como chave
    };
};