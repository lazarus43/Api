<template>
  <div v-if="currentBrand" class="edit-form">
    <h4>Brand</h4>
    <form>
      <div class="form-group">
        <label for="NameBrand">NameBrand Brand</label>
        <input
          type="text"
          class="form-control"
          id="NameBrand"
          v-model="currentBrand.NameBrand"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentBrand.Description"
        />
      </div>
      
    </form>

    <button class="Button" @click="deleteBrand">Delete</button>

    <button type="submit" class="button" @click="updateBrand">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Brand...</p>
  </div>
</template>

<script>
import BrandDataService from "../../services/BrandDataService";

export default {
  name: "NameBrand",
  data() {
    return {
      currentBrand: null,
      message: "",
    };
  },
  methods: {
    getBrand(id) {
      BrandDataService.get(id)
        .then((response) => {
          this.currentBrand = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateBrand() {
      BrandDataService.update(this.currentBrand.id, this.currentBrand)
        .then((response) => {
          console.log(response.data);
          this.message = "The brand was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteBrand() {
      BrandDataService.delete(this.currentBrand.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ namebrand: "brands" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getBrand(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>