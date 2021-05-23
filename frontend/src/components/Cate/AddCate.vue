<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="Name">Name Cate</label>
        <input
          type="text"
          class="form-control"
          id="Name"
          required
          v-model="cate.Name"
          name="Name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="cate.Description"
          name="description"
        />
      </div>

      <button @click="saveCate" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCate">Add</button>
    </div>
  </div>
</template>

<script>
import CateDataService from "../../services/CateDataService";

export default {
  name: "add-cate",
  data() {
    return {
      cate: {
        id: null,
        Name: "",
        description: "",
  
      },
      submitted: false
    };
  },
  methods: {
    saveCate() {
      var data = {
        Name: this.cate.Name,
        Description: this.cate.Description
      };

      CateDataService.create(data)
        .then(response => {
          this.cate.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCate() {
      this.submitted = false;
      this.cate = {};
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