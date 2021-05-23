import http from "../http-common";

class BillDataService {
  getAll() {
    return http.get("/bills");
  }

  get(id) {
    return http.get(`/bills/${id}`);
  }

  create(data) {
    return http.post("/bills", data);
  }

  update(id, data) {
    return http.put(`/bills/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bills/${id}`);
  }

  deleteAll() {
    return http.delete(`/bills`);
  }

  findByMerchant(Merchant) {
    return http.get(`/bills?Merchant=${Merchant}`);
  }
}

export default new BillDataService();