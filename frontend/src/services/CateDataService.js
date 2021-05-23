import http from "../http-common";

class CateDataService {
  getAll() {
    return http.get("/cates");
  }

  get(id) {
    return http.get(`/cates/${id}`);
  }

  create(data) {
    return http.post("/cates", data);
  }

  update(id, data) {
    return http.put(`/cates/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cates/${id}`);
  }

  deleteAll() {
    return http.delete(`/cates`);
  }

  findByName(Name) {
    return http.get(`/cates?Name=${Name}`);
  }
}

export default new CateDataService();