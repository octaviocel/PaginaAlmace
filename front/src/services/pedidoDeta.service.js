import httpClient from "./httpcommon";

class PedidoDetaService {
    getAll() {
        return httpClient.get("/pedidoDetalle");
    }

    get(id) {
        return httpClient.get("/pedidoDetalle/" + id);
    }

    create(data) {
        return httpClient.post("/pedidoDetalle/registrar", data);
    }

    update(id, data) {
        return httpClient.put("/pedidoDetalle/" + id, data);
    }

    delete(id) {
        return httpClient.delete("/pedidoDetalle/" + id);
    }

    deleteAll() {
        return httpClient.delete("/pedidoDetalle");
    }


}

export default new PedidoDetaService();