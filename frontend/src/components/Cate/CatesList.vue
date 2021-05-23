<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by Name"
          v-model="Name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Cates List</h4>
      <ul class="list-group">
        <li
          class="list-group-cate"
          :class="{ active: index == currentIndex }"
          v-for="(cate, index) in cates"
          :key="index"
          @click="setActiveCate(cate, index)"
        >
          {{ cate.Name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCates">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCate">
        <h4>Cate</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCate.Name }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentCate.Description }}
        </div>

        <a class="button" :href="'/cates/' + currentCate.id"> Edit </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Cate...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CateDataService from "../../services/CateDataService";

export default {
  name: "cates-list",
  data() {
    return {
      cates: [],
      currentCate: null,
      currentIndex: -1,
      Name: "",
    };
  },
  methods: {
    retrieveCates() {
      CateDataService.getAll()
        .then((response) => {
          this.cates = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCates();
      this.currentCate = null;
      this.currentIndex = -1;
    },

    setActiveCate(cate, index) {
      this.currentCate = cate;
      this.currentIndex = index;
    },

    removeAllCates() {
      CateDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      CateDataService.findByName(this.Name)
        .then((response) => {
          this.cates = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveCates();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>