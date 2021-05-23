<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="NameBrand">Name Brand</label>
        <input
          type="text"
          class="form-control"
          id="NameBrand"
          required
          v-model="brand.NameBrand"
          namebrand="NameBrand"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="brand.Description"
          namebrand="description"
        />
      </div>

      <button @click="saveBrand" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBrand">Add</button>
    </div>
  </div>
</template>

<script>
import BrandDataService from "../../services/BrandDataService";

export default {
  name: "add-brand",
  data() {
    return {
      brand: {
        id: null,
        NameBrand: "",
        description: "",
  
      },
      submitted: false
    };
  },
  methods: {
    saveBrand() {
      var data = {
        NameBrand: this.brand.NameBrand,
        Description: this.brand.Description
      };

      BrandDataService.create(data)
        .then(response => {
          this.brand.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBrand() {
      this.submitted = false;
      this.brand = {};
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