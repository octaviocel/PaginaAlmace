import httpClient from "./httpcommon";

class UsuarioService {
    getAll() {
        return httpClient.get("/usuarios");
    }

    get(id) {
        return httpClient.get("/usuarios/" + id);
    }

    create(data) {
        return httpClient.post("/usuarios/registrar", data);
    }

    update(id, data) {
        return httpClient.put("/usuarios/" + id, data);
    }

    updatePass(id, data) {
        return httpClient.put("/usuarios/password/" + id, data);
    }

    delete(id) {
        return httpClient.delete("/usuarios/" + id);
    }

    deleteAll() {
        return httpClient.delete("/usuarios");
    }

    findByEmail(email){
        return httpClient.get(`/usuarios/email=${email}`);
    }
/*
    findByRol(rol){
        return http.get(`/usuarios/rol=${rol}`);
    }*/

}

export default new UsuarioService();