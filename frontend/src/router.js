import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/items",
      name: "items",
      component: () => import("./components/Item/ItemsList")
    },
    {
      path: "/items/:id",
      name: "item-details",
      component: () => import("./components/Item/Item")
    },
    {
      path: "/additem",
      name: "additem",
      component: () => import("./components/Item/AddItem")
    },
    {
      path:"/bills",
      name:"bills",
      component: () => import("./components/Bill/BillsList")
    },
    {
      path: "/bills/:id",
      name: "bill-details",
      component: () => import("./components/Bill/Bill")
    },
    {
      path:"/addbill",
      name:"addbill",
      component: () => import("./components/Bill/AddBill")
    },
    {
      path:"/cates",
      name:"cates",
      component: () => import("./components/Cate/CatesList")
    },
    {
      path: "/cates/:id",
      name: "cate-details",
      component: () => import("./components/Cate/Cate")
    },
    {
      path:"/addcate",
      name:"addcategory",
      component: () => import("./components/Cate/AddCate")
    },
    {
      path:"/brands",
      name:"brand",
      component: () => import("./components/Brand/BrandsList")
    },
    {
      path: "/brands/:id",
      name: "brand-details",
      component: () => import("./components/Brand/Brand")
    },
    {
      path:"/addbrand",
      name:"addbrand",
      component: () => import("./components/Brand/AddBrand")
    },
  ]
});