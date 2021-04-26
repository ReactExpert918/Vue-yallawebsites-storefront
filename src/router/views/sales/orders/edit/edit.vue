<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import { paymentData } from "./edit-data";
import { shippingData } from "./edit-data";
import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import {roleService} from "@/helpers/authservice/roles";

/**
 * Pages component
 */
export default {
  page: {
    title: "Edit Orders",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      pageIdentity: "orders",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      order: {
        total: {},
        status: {} , 
        customer: {},
        currency: {},
        billing_address: {},
        shipping_address: {},
        payment_method: {},
        shipping_method: {},
      },
      paymentData: paymentData,
      shippingData: shippingData,
      products: [],
      selectedProducts: [],
      selectedToogle: "A",
      title: "Edit Order",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Orders",
        },
        {
          text: "Edit Order",
          active: true
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      productQuantityGreaterThan: 1,
      filter: null,
      filterOn: [],
      selected: [],
      isCheckAll: false,
      sortBy: "age",
      sortDesc: false,
      fields: [{
              label: "",
              key: "selected",
              sortable: false,
          },
          {
              label: "Product",
              key: "name",
              sortable: true,
          },
          {
              label: "SKU",
              key: "sku",
              sortable: true,
          },
          {
              label: "Price",
              key: "price",
              sortable: true,
          },
          {
              label: "Qty",
              key: "quantity",
              sortable: true,
          },
          {
              key: "status",
              sortable: true,
          },
      ],
    };
  },
  computed: {
      /**
        * Total no. of records
        */
      rows() {
          return this.products.length;
      },
      console: () => console,
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.products.filter(data => data.selected);
      return this.products.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.products.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      axios
      .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&quantity_greater_than=${this.productQuantityGreaterThan}&with_disabled=false` , authHeader())
      .then(response => {
         this.products = response.data.data;
         for(var i = 0; i < this.products.length; i++){
           this.products[i].order_quantity = 1;
         }
       })
       .catch(handleAxiosError);
       axios
      .get(`${this.backendURL}/api/v1/orders/${this.$route.params.id}` , authHeader())
      .then(response => {
          this.order = response.data.data
          if (this.order.status == null){
            this.order.status = {};
          }
          if (this.order.customer == null){
            this.order.customer = {};
          }
          if (this.order.currency == null){
            this.order.currency = {};
          }
          if (this.order.billing_address == null){
            this.order.billing_address = {};
          }
          if (this.order.shipping_address == null){
            this.order.shipping_address = {};
          }
          if (this.order.payment_method == null){
            this.order.payment_method = {};
          }
          if (this.order.shipping_method == null){
            this.order.shipping_method = {};
          }
          
          for(var i = 0; i < this.order.products.length; i++){
            var op = this.order.products[i];
            op.product.order_quantity = op.quantity;
            op.product.price = op.price;
            op.product.order_product_id = op.id;
            this.selectedProducts.push(op.product);
          }

      })
      .catch(handleAxiosError);
  },
  methods: {
      /**
        * Search the table data with search input
        */
       uncheckSelectAll(){
         this.selectedAll = false
       },
      onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
      },
      addDataToModal(id){
        this.currentAttribut = this.products[id]
      },
      getSubTotal(){
        var subTotal = 0.0;
        for(var i = 0; i < this.selectedProducts.length; i++){
          subTotal += (this.selectedProducts[i].price * this.selectedProducts[i].order_quantity);
        }
        return subTotal;
      },
      getTotal(){
        return this.getSubTotal() + this.order.total.shipping_cost;
      },
      updateOrder(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        var payload = {
          billing_address: this.order.billing_address,
          shipping_address: this.order.shipping_address,
          products: []
        }
        for (var i = 0; i < this.selectedProducts.length; i++){
          var productPayload = {
            id: this.selectedProducts[i].id,
            quantity: this.selectedProducts[i].order_quantity
          }
          if (this.selectedProducts[i].order_product_id){
            productPayload.order_product_id = this.selectedProducts[i].order_product_id;
          }
          payload.products.push(productPayload);
        }
        axios
        .put(`${this.backendURL}/api/v1/orders/${this.$route.params.id}` , payload , authHeader())
        .then(response => (alert(`${response.data.data.id} Order Updated!`)))
        .catch(handleAxiosError);
      }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card" >
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2" v-b-modal.modal-cancel-order>
                    <i class="mdi mdi-trash mr-1"></i> Cancel Order
                  </button>
                  <b-button v-b-modal.modal-scrollable variant="primary" @click="updateOrder()">
                    <i class="mdi mdi-plus mr-1"></i> Save Order
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="row card-body">
              <div class="col-sm-9">
                <div class="card-body">
                        <div class="row">
                          <div class="col-md-6">
                            <h3>Billing Address</h3>
                            <label class="mt-3">Customer First Name</label>
                            <b-form-input for="text" v-model="order.billing_address.first_name"></b-form-input>
                            <label class="mt-3">Customer Last Name</label>
                            <b-form-input for="text" v-model="order.billing_address.last_name"></b-form-input>
                            <label class="mt-3">Street Address</label>
                            <b-form-input for="text" v-model="order.billing_address.street"></b-form-input>
                            <label class="mt-3">City</label>
                            <b-form-input for="text" v-model="order.billing_address.city"></b-form-input>
                            <label class="mt-3">Postcode / Zip Code</label>
                            <b-form-input for="text" v-model="order.billing_address.postcode"></b-form-input>
                            <label class="mt-3">Phone Number</label>
                            <b-form-input for="text" v-model="order.billing_address.phone_number"></b-form-input>
                          </div>
                          <div class="col-md-6">
                            <h3>Shipping Address</h3>
                            <label class="mt-3">Customer First Name</label>
                            <b-form-input for="text" v-model="order.shipping_address.first_name"></b-form-input>
                            <label class="mt-3">Customer Last Name</label>
                            <b-form-input for="text" v-model="order.shipping_address.last_name"></b-form-input>
                            <label class="mt-3">Street Address</label>
                            <b-form-input for="text" v-model="order.shipping_address.street"></b-form-input>
                            <label class="mt-3">City</label>
                            <b-form-input for="text" v-model="order.shipping_address.city"></b-form-input>
                            <label class="mt-3">Postcode / Zip Code</label>
                            <b-form-input for="text" v-model="order.shipping_address.postcode"></b-form-input>
                            <label class="mt-3">Phone Number</label>
                            <b-form-input for="text" v-model="order.shipping_address.phone_number"></b-form-input>
                          </div>
                        </div>
                      </div>
              </div>
              <!-- <div class="col-sm-3">
                <h5>Billing Address</h5>
                <p>
                  {{order.billingAddressCustomerName}}<br>
                  {{order.billingAddressStreetAddress}}<br>
                  {{order.billingAddressCity}}<br>
                  {{order.billingAddressPostCodeZip}}<br>
                  {{order.billingAddressCountry}}
                  {{order.billingAddressTelephoneNumber}}
                </p>
                <h5>Shipping Address</h5>
                <p>
                  {{order.shippingAddressCustomerName}}<br>
                  {{order.shippingAddressStreetAddress}}<br>
                  {{order.shippingAddressCity}}<br>
                  {{order.shippingAddressPostCodeZip}}<br>
                  {{order.shippingAddressCountry}}
                  {{order.shippingAddressTelephoneNumber}}
                </p>
              </div> -->
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h3>Items Ordered</h3>
                <div class="table-responsive">
                  <table class="table mb-0">
                    <thead>
                      <tr>
                        <th>Thumbnail</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in selectedProducts" :key="product.id">
                        <td><img :src="product.image"/></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.sku }}</td>
                        <td>{{ product.price }}</td>
                        <td><b-form-input for="number" :number="true" v-model="product.order_quantity"></b-form-input></td>
                        <td>{{ product.price * product.order_quantity}}</td>
                      </tr> 
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="6">
                          <b-button v-b-modal.modal-scrollable variant="primary">
                              <i class="bx bx-plus font-size-16 align-middle mr-2"></i> Add Product
                          </b-button>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Subtotal</b></td>
                        <td>{{ order.currency.symbol }}{{ getSubTotal() }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Shipping</b></td>
                        <td>{{ order.currency.sumbol }}{{ order.total.shipping_cost }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Total</b></td>
                        <td>{{ order.currency.symbol }}{{ getTotal() }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h3>Shipping</h3>
                   <b-form-group>
                    <b-form-radio
                      v-model="selectedToogle"
                      class="custom-radio mb-3"
                      value="A"
                    >Shipping 1</b-form-radio>
                    <b-form-radio
                      v-model="selectedToogle"
                      class="custom-radio mb-3"
                      value="B"
                    >Shipping 2</b-form-radio>
                  </b-form-group>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h3>Payment Methods</h3>
                <b-tabs pills vertical nav-class="p-0" nav-wrapper-class="col-sm-3" content-class="pt-0 px-2 text-muted">
                  <b-tab title="Payment 1" active title-item-class="mb-2">
                    <b-card-text>
                      <div class="row">
                        <div class="col-sm-5">
                          <label class="mt-3">Card Number</label>
                          <b-form-input for="text"></b-form-input>
                        </div>
                        <div class="col-sm-2">
                          <label class="mt-3">Sort Code</label>
                          <b-form-input for="text"></b-form-input>
                        </div>
                        <div class="col-sm-2">
                          <label class="mt-3">Expiry</label>
                          <b-form-input for="text"></b-form-input>
                        </div>
                        <div class="col-sm-2">
                          <label class="mt-3">CVV</label>
                          <b-form-input for="text"></b-form-input>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                  <b-tab title="Payment 2" title-item-class="mb-2">
                    <b-card-text>
                      <div class="col-sm-12">
                        <b-button variant="primary">
                            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                            Pay With Paypal
                        </b-button>
                      </div>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12 text-sm-right">
                <b-button variant="primary" @click="updateOrder()">
                    <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                    Save Order
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
    <b-modal id="modal-scrollable" scrollable title="Add Products" title-class="font-18" hide-footer>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
              <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
              </label>
          </div>
        </div>
        <!-- Search -->
        <div class="col-sm-12 col-md-6">
            <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                <label class="d-inline-flex align-items-center">Search:
                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                </label>
            </div>
        </div>
        <!-- End search -->
        <!-- Table -->
          <div class="table-responsive mb-0">
              <b-table :items="products" 
                :fields="fields" 
                responsive="sm" 
                :per-page="perPage" 
                :current-page="currentPage" 
                :sort-by.sync="sortBy" 
                :sort-desc.sync="sortDesc" 
                :filter="filter" 
                :filter-included-fields="filterOn" 
                @filtered="onFiltered"
              >
                <template #head(selected)="data">
                  <b-form-checkbox
                  v-model="selectedAll"
                  v-bind:value='data.id'                                                 
                  class="custom-checkbox custom-checkbox-primary "
                ></b-form-checkbox>
                </template>
                <template #cell(selected)="data">
                  <b-form-checkbox
                  @change="uncheckSelectAll"
                  v-model="selectedProducts"
                  :value="data.item"
                  
                  class="custom-checkbox custom-checkbox-primary"
                  
                ></b-form-checkbox>
                </template>
                <template #cell(status)="data">
                  <span class="badge badge-success font-size-12">
                    <span v-if="data.item.enabled">Enabled</span>
                          <span v-else>Disabled</span>
                  </span>
                </template>

              </b-table>
          </div>
          <div class="row">
              <div class="col">
                  <div class="dataTables_paginate paging_simple_numbers float-right">
                      <ul class="pagination pagination-rounded mb-0">
                          <!-- pagination -->
                          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                      </ul>
                  </div>
              </div>
          </div>
        </div>
      <div class="text-sm-right">
        <b-button variant="primary">
              <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
              Add
          </b-button>
      </div>
    </b-modal>
    <b-modal id="modal-cancel-order" centered title="Cancel Order" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Cancel will remove this order permenantly.</p>
      <div class="text-right">
        <b-button variant="danger">Cancel</b-button>
      </div>
    </b-modal>
  </Layout>
</template>
