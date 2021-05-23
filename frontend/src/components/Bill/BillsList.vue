<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Name"
          v-model="Merchant"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchMerchant"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Bills List</h4>
      <ul class="list-group">
        <li class="list-group-bill"
          :class="{ active: index == currentIndex }"
          v-for="(bill, index) in bills"
          :key="index"
          @click="setActiveBill(bill, index)"
        >
          {{ bill.Merchant }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllBills">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBill">
        <h4>Bill</h4>
        <div>
          <label><strong>Merchant:</strong></label> {{ currentBill.Merchant }}
        </div>
         <div>
          <label><strong>NameItem:</strong></label> {{ currentBill.NameItem }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentBill.Description }}
        </div>
           <div>
          <label><strong>Price:</strong></label> {{ currentBill.Price }}
        </div>
         <div>
          <label><strong>Quantity:</strong></label> {{ currentBill.Quantity }}
        </div>

        <a class="button"
          :href="'/bills/' + currentBill.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Bill...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BillDataService from "../../services/BillDataService";

export default {
  name: "bills-list",
  data() {
    return {
      bills: [],
      currentBill: null,
      currentIndex: -1,
      Merchant: ""
    };
  },
  methods: {
    retrieveBills() {
      BillDataService.getAll()
        .then(response => {
          this.bills = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBills();
      this.currentBill = null;
      this.currentIndex = -1;
    },

    setActiveBill(bill, index) {
      this.currentBill = bill;
      this.currentIndex = index;
    },

    removeAllBills() {
      BillDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchMerchant() {
      BillDataService.findByMerchant(this.Merchant)
        .then(response => {
          this.bills = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveBills();
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