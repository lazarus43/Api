<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by NameBrand"
          v-model="NameBrand"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchNameBrand"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Brands List</h4>
      <ul class="list-group">
        <li
          class="list-group-brand"
          :class="{ active: index == currentIndex }"
          v-for="(brand, index) in brands"
          :key="index"
          @click="setActiveBrand(brand, index)"
        >
          {{ brand.NameBrand }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllBrands">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBrand">
        <h4>Brand</h4>
        <div>
          <label><strong>NameBrand:</strong></label> {{ currentBrand.NameBrand }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentBrand.Description }}
        </div>

        <a class="button" :href="'/brands/' + currentBrand.id"> Edit </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Brand...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BrandDataService from "../../services/BrandDataService";

export default {
  name: "brands-list",
  data() {
    return {
      brands: [],
      currentBrand: null,
      currentIndex: -1,
      NameBrand: "",
    };
  },
  methods: {
    retrieveBrands() {
      BrandDataService.getAll()
        .then((response) => {
          this.brands = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBrands();
      this.currentBrand = null;
      this.currentIndex = -1;
    },

    setActiveBrand(brand, index) {
      this.currentBrand = brand;
      this.currentIndex = index;
    },

    removeAllBrands() {
      BrandDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchNameBrand() {
      BrandDataService.findByNameBrand(this.NameBrand)
        .then((response) => {
          this.brands = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveBrands();
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