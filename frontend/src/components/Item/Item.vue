<template>
  <div v-if="currentItem" class="edit-form">
    <h4>Item</h4>
    <form>
      <div class="form-group">
        <label for="NameItem">Name Item</label>
        <input
          type="text"
          class="form-control"
          id="NameItem"
          v-model="currentItem.NameItem"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentItem.Description"
        />
      </div>
      <div class="form-group">
        <label for="Price">Price</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentItem.Price"
        />
      </div>
      <div class="form-group">
        <label for="Caterogy">Caterogy</label>
        <input
          type="text"
          class="form-control"
          id="caterogy"
          v-model="currentItem.Caterogy"
        />
      </div>
      <div class="form-group">
        <label for="Brand">Brand</label>
        <input
          type="text"
          class="form-control"
          id="brand"
          v-model="currentItem.Brand"
        />
      </div>
    </form>

    <button class="Button" @click="deleteItem">Delete</button>

    <button type="submit" class="button" @click="updateItem">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Item...</p>
  </div>
</template>

<script>
import ItemDataService from "../../services/ItemDataService";

export default {
  name: "NameItem",
  data() {
    return {
      currentItem: null,
      message: "",
    };
  },
  methods: {
    getItem(id) {
      ItemDataService.get(id)
        .then((response) => {
          this.currentItem = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateItem() {
      ItemDataService.update(this.currentItem.id, this.currentItem)
        .then((response) => {
          console.log(response.data);
          this.message = "The item was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteItem() {
      ItemDataService.delete(this.currentItem.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "items" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getItem(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>