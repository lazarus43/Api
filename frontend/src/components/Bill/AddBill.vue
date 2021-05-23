<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="Merchant">Name Merchant</label>
        <input
          type="text"
          class="form-control"
          id="Merchant"
          required
          v-model="bill.Merchant"
          name="Merchant"
        />

      </div>
       <div class="form-group">
        <label for="NameItem">Name Item</label>
        <input
          class="form-control"
          id="NameItem"
          required
          v-model="bill.NameItem"
          name="NameItem"
        />
      </div>

      <div class="form-group">
        <label for="Price">Price</label>
        <input
          type="number"
          class="form-control"
          id="Price"
          required
          v-model="bill.Price"
          name="Price"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="bill.Description"
          name="description"
        />
      </div>

       <div class="form-group">
        <label for="Quantity">Quantity</label>
        <input
          class="form-control"
          type="number"
          id="Quantity"
          required
          v-model="bill.Quantity"
          name="Quantity"
        />
      </div>

      <button @click="saveBill" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBill">Add</button>
    </div>
  </div>
</template>

<script>
import BillDataService from "../../services/BillDataService";

export default {
  name: "add-bill",
  data() {
    return {
      bill: {
        id: null,
        Merchant:"",
        NameItem: "",
        Price: "",
        description: "",
        Quantity:"",
      },
      submitted: false,
    };
  },
  methods: {
    saveBill() {
      var data = {
        Merchant: this.bill.Merchant,
        NameItem  : this.bill.NameItem,
        Price: this.bill.Price,
        Description: this.bill.Description,
        Quantity: this.bill.Quantity
      };

      BillDataService.create(data)
        .then((response) => {
          this.bill.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newBill() {
      this.submitted = false;
      this.bill = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>