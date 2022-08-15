import httpClient from "./httpcommon";

class ArticulosService {
    getAll() {
        return httpClient.get("/articulos");
    }

    get(id) {
        return httpClient.get("/articulos/" + id);
    }

    create(data) {
        return httpClient.post("/articulos/registrar", data);
    }

    update(id, data) {
        return httpClient.put("/articulos/" + id, data);
    }

    delete(id) {
        return httpClient.delete("/articulos/" + id);
    }

    deleteAll() {
        return httpClient.delete("/articulos");
    }


}

export default new ArticulosService();