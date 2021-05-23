<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="NameItem">Name Item</label>
        <input
          type="text"
          class="form-control"
          id="NameItem"
          required
          v-model="item.NameItem"
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
          v-model="item.Price"
          name="Price"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="item.Description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="caterory">Caterogy</label>
        <input
          class="form-control"
          id="Caterogy"
          required
          v-model="item.Caterogy"
          name="caterogy"
        />
      </div>

      <div class="form-group">
        <label for="Brand">Brand</label>
        <input
          class="form-control"
          id="brand"
          required
          v-model="item.Brand"
          name="brand"
        />
      </div>


      <button @click="saveItem" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newItem">Add</button>
    </div>
  </div>
</template>

<script>
import ItemDataService from "../../services/ItemDataService";

export default {
  name: "add-item",
  data() {
    return {
      item: {
        id: null,
        NameItem: "",
        Price:"",
        description: "",
        Caterogy:"",
        Brand:"",
      },
      submitted: false
    };
  },
  methods: {
    saveItem() {
      var data = {
        NameItem: this.item.NameItem,
        Price: this.item.Price,
        Description: this.item.Description,
        Caterogy: this.item.Caterogy,
        Brand: this.item.Brand
      };

      ItemDataService.create(data)
        .then(response => {
          this.item.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newItem() {
      this.submitted = false;
      this.item = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>