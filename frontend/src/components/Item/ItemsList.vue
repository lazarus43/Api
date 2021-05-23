<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Name"
          v-model="NameItem"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchNameItem"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Items List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(item, index) in items"
          :key="index"
          @click="setActiveItem(item, index)"
        >
          {{ item.NameItem }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllItems">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentItem">
        <h4>Item</h4>
        <div>
          <label><strong>NameItem:</strong></label> {{ currentItem.NameItem }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentItem.Description }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentItem.Price }}
        </div>
        <div>
          <label><strong>Caterogy:</strong></label> {{ currentItem.Caterogy }}
        </div>
        <div>
          <label><strong>Brand:</strong></label> {{ currentItem.Brand }}
        </div>

        <a class="button"
          :href="'/items/' + currentItem.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Item...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ItemDataService from "../../services/ItemDataService";

export default {
  name: "items-list",
  data() {
    return {
      items: [],
      currentItem: null,
      currentIndex: -1,
      NameItem: ""
    };
  },
  methods: {
    retrieveItems() {
      ItemDataService.getAll()
        .then(response => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveItems();
      this.currentItem = null;
      this.currentIndex = -1;
    },

    setActiveItem(item, index) {
      this.currentItem = item;
      this.currentIndex = index;
    },

    removeAllItems() {
      ItemDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchNameItem() {
      ItemDataService.findByNameItem(this.NameItem)
        .then(response => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveItems();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>