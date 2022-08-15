import httpClient from "./httpcommon";

class ImagesServices{

    get(key){
        return httpClient.get("/images/" + key);
    }
    
    create(data) {
        return httpClient.post("/images", data);
    }

    delete(key) {
        return httpClient.delete("/images/" + key);
    }
}

export default new ImagesServices();