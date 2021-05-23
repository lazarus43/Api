<template>
  <div v-if="currentBill" class="edit-form">
    <h4>Bill</h4>
    <form>
      <div class="form-group">
        <label for="Merchant">Name Merchant</label>
        <input
          type="text"
          class="form-control"
          id="Merchant"
          v-model="currentBill.Merchant"
        />
      </div>
        <div class="form-group">
        <label for="NameItem">Name Item</label>
        <input
          type="text"
          class="form-control"
          id="NameItem"
          v-model="currentBill.NameItem"
        />
      </div>
      <div class="form-group">
        <label for="Description">Description</label>
        <input
          type="text"
          class="form-control"
          id="Description"
          v-model="currentBill.Description"
        />
      </div>
      <div class="form-group">
        <label for="Price">Price</label>
        <input
          type="text"
          class="form-control"
          id="Price"
          v-model="currentBill.Price"
        />
      </div>
        <div class="form-group">
        <label for="Quantity">Quantity</label>
        <input
          type="text"
          class="form-control"
          id="Quantity"
          v-model="currentBill.Quantity"
        />
      </div>
    </form>

    <button class="Button" @click="deleteBill">Delete</button>

    <button type="submit" class="button" @click="updateBill">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Bill...</p>
  </div>
</template>

<script>
import BillDataService from "../../services/BillDataService";

export default {
  name: "Merchant",
  data() {
    return {
      currentBill: null,
      message: "",
    };
  },
  methods: {
    getBill(id) {
      BillDataService.get(id)
        .then((response) => {
          this.currentBill = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateBill() {
      BillDataService.update(this.currentBill.id, this.currentBill)
        .then((response) => {
          console.log(response.data);
          this.message = "The bill was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteBill() {
      BillDataService.delete(this.currentBill.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "bills" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getBill(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>