/*

PSS Trabalho 02
Andressa dos Santos Vieira
Jhulie Stefany
Laísa Mohr

Tema: Lanchonete

*/

import { fastify } from "fastify"; // Importa o framework Fastify para criar o servidor
import { dataBaseMemory } from "./dataBaseMemory.js"; // Importa a classe dataBaseMemory do arquivo dataBaseMemory.js, responsável pela manipulação dos dados em memória

const server = fastify(); // Cria uma instância do servidor Fastify

const dataBase = new dataBaseMemory(); // Cria uma instância da classe dataBaseMemory, inicializando o "banco de dados" em memória

// Rota GET /pedido: Retorna a lista de pedidos
server.get('/pedido', (request) => {
    try {

        const search = request.query.search; // Obtém o parâmetro de busca "search" da query string da requisição
        const pedido = dataBase.list(search); // Chama o método list da classe dataBaseMemory para obter a lista de pedidos, filtrada pelo parâmetro de busca (se fornecido)

        return pedido; // Retorna a lista de músicas como resposta

    } catch (error) {

        console.error("Error in GET /pedido:", error); // Imprime o erro no console para depuração
        return { error: "Failed to retrieve pedido." }; // Retorna um objeto com a mensagem de erro

    }
});

// Rota POST /songs: Cria um novo pedido
server.post('/pedido', (request, reply) => {
    try {

        const { nome, cliente , pedido , telefone, endereço, taxa } = request.body; // Obtém os dados do pedido do corpo da requisição

        dataBase.create({ // Chama o método create da classe dataBaseMemory para criar o novo pedido
            nome,
            cliente,
            pedido,
            telefone,
            endereço,
            taxa,
        });

        return reply.status(201).send(); // Retorna uma resposta com status 201 (Created) indicando sucesso na criação

    } catch (error) {

        console.error("Error in POST /pedido:", error); // Imprime o erro no console para depuração
        return reply.status(500).send({ error: "Failed to create song." }); // Retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro

    }
});

// Rota PUT /songs/:id: Atualiza um pedido existente
server.put('/pedido/:id', (request, reply) => {
    try {

        const songId = request.params.id; // Obtém o ID do pedido da URL
        const { nome, cliente, pedido, telefone, endereço, taxa } = request.body; // Obtém os dados da música do corpo da requisição

        const pedidoID = dataBase.update(songId, { // Chama o método update da classe dataBaseMemory para atualizar o pedido
            nome,
            cliente,
            pedido,
            telefone,
            endereço,
            taxa,
        });

        return reply.status(204).send(); // Retorna uma resposta com status 204 (No Content) indicando sucesso na atualização

    } catch (error) {

        console.error("Error in PUT /pedido/:id:", error); // Imprime o erro no console para depuração
        return reply.status(500).send({ error: "Failed to update song." }); // Retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro

    }
});

// Rota PATCH /songs/:id: Atualiza parcialmente um pedido existente
server.patch('/pedido/:id', (request, reply) => {
    try {

        const songId = request.params.id; // Obtém o ID do pedido da URL
        const update = request.body; // Obtém os dados do pedido do corpo da requisição, que serão usados para atualização parcial

        const OnMusics = dataBase.getById(songId); // Obtém o pedido pelo ID
        if (!OnMusics) { // Verifica se o pedido foi encontrado
            return reply.status(404).send({ message: 'Music not found.' }); // Retorna status 404 se o pedido não foi encontrado
        };

        const upMusics = { ...OnMusics, ...update }; // Cria um novo objeto com os dados da música original e os dados de atualização

        dataBase.update(songId, upMusics); // Chama o método update para atualizar a música com os dados combinados

        return reply.status(204).send(); // Retorna uma resposta com status 204 (No Content) indicando sucesso na atualização

    } catch (error) {

        console.error("Error in PUT /pedido/:id:", error); // Imprime o erro no console para depuração
        return reply.status(500).send({ error: "Failed to update song." }); // Retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro

    }
});

// Rota DELETE /songs/:id: Deleta um pedido existente
server.delete('/pedido/:id', (request, reply) => {
    try {

        const songId = request.params.id; // Obtém o ID do pedido da URL
        const deleted = dataBase.delete(songId); // Chama o método delete da classe dataBaseMemory para deletar o pedido

        return reply.status(204).send({ message: "Song deleted." }); // Retorna uma resposta com status 204 (No Content) indicando sucesso na exclusão

    } catch (error) {

        console.error("Error in DELETE /pedido/:id:", error); // Imprime o erro no console para depuração
        return reply.status(500).send({ error: "Failed to delete song." }); // Retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro

    }
});

server.listen({ // Inicia o servidor na porta 3333
    port: 3333,
});