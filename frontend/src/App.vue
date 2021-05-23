<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="" class="navbar-brand">Manage</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/items" class="nav-link">Items List</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/additem" class="nav-link">Add Item</router-link>
        </li>
          <li class="nav-item">
          <router-link to="/bills" class="nav-link">Bill List</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbill" class="nav-link">Add Bill</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cates" class="nav-link">All Caterogy</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addcate" class="nav-link">Add Caterogy</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/brands" class="nav-link">All Brand</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbrand" class="nav-link">Add Brand</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>