import httpClient from "./httpcommon";

class PedidoService {
    getAll() {
        return httpClient.get("/pedido");
    }

    get(id) {
        return httpClient.get("/pedido/" + id);
    }

    getMaximo() {
        return httpClient.get("/pedido/maximo");
    }

    create(data) {
        return httpClient.post("/pedido/registrar", data);
    }

    update(id, data) {
        return httpClient.put("/pedido/" + id, data);
    }

    delete(id) {
        return httpClient.delete("/pedido/" + id);
    }

    deleteAll() {
        return httpClient.delete("/pedido");
    }


}

export default new PedidoService();