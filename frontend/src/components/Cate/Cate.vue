<template>
  <div v-if="currentCate" class="edit-form">
    <h4>Cate</h4>
    <form>
      <div class="form-group">
        <label for="Name">Name Cate</label>
        <input
          type="text"
          class="form-control"
          id="Name"
          v-model="currentCate.Name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentCate.Description"
        />
      </div>
      
    </form>

    <button class="Button" @click="deleteCate">Delete</button>

    <button type="submit" class="button" @click="updateCate">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Cate...</p>
  </div>
</template>

<script>
import CateDataService from "../../services/CateDataService";

export default {
  name: "Name",
  data() {
    return {
      currentCate: null,
      message: "",
    };
  },
  methods: {
    getCate(id) {
      CateDataService.get(id)
        .then((response) => {
          this.currentCate = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateCate() {
      CateDataService.update(this.currentCate.id, this.currentCate)
        .then((response) => {
          console.log(response.data);
          this.message = "The cate was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteCate() {
      CateDataService.delete(this.currentCate.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "cates" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getCate(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>