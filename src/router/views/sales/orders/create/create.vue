<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import { viewData } from "./create-data";
import { paymentData } from "./create-data";
import { shippingData } from "./create-data";

import axios from "axios";
import appConfig from "@/app.config";

/**
 * Pages component
 */
export default {
  page: {
    title: "Create Orders",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      backendURL: process.env.VUE_APP_BACKEND_URL,
      viewData: viewData,
      paymentData: paymentData,
      shippingData: shippingData,
      products: [],
      customers: [],
      selectedToogle: "A",
      title: "Create Order",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Orders",
        },
        {
          text: "Create Order",
          active: true
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
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
      customerfields: [{
              label: "",
              key: "selected",
              sortable: false,
          },
          {
              label: "ID",
              key: "id",
              sortable: true,
          },
          {
              label: "Name",
              key: "name",
              sortable: true,
          },
          {
              label: "Email",
              key: "email",
              sortable: true,
          }
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
      customerrows() {
          return this.customers.length;
      },
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
    },
  },
  mounted() {
      axios
      .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}&address=true`)
      .then(response => (this.customers = response.data.data));
      axios
      .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}`)
      .then(response => (this.products = response.data.data));
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
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card" v-for="order in viewData" :key="order.id">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Cancel Order
                  </button>
                  <button type="button" class="btn btn-success btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-plus mr-1"></i> Submit Order
                  </button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="row card-body">
              <div class="col-sm-9">
                <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
                    
                    <b-tab active>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">New Customer</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-6">
                            <h3>Billing Address</h3>
                            <label class="mt-3">Customer First Name</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Customer Last Name</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Street Address</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">City</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Postcode / Zip Code</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Phone Number</label>
                            <b-form-input for="text"></b-form-input>
                          </div>
                          <div class="col-md-6">
                            <h3>Shipping Address</h3>
                            <label class="mt-3">Customer First Name</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Customer Last Name</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Street Address</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">City</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Postcode / Zip Code</label>
                            <b-form-input for="text"></b-form-input>
                            <label class="mt-3">Phone Number</label>
                            <b-form-input for="text"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>

                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">Existing Customer</span>
                      </template>
                      <div class="card-body">
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
                                <b-table :items="customers" 
                                  :fields="customerfields" 
                                  responsive="sm" 
                                  :per-page="perPage" 
                                  :current-page="currentPage" 
                                  :sort-by.sync="sortBy" 
                                  :sort-desc.sync="sortDesc" 
                                  :filter="filter" 
                                  :filter-included-fields="filterOn" 
                                  @filtered="onFiltered"
                                >
                                 
                                  <template #cell(selected)="data">
                                    <b-form-checkbox
                                    @change="uncheckSelectAll"
                                    v-model="data.item.selected"
                                    :value="data.id"
                                    
                                    class="custom-checkbox custom-checkbox-primary"
                                    
                                  ></b-form-checkbox>
                                  </template>
                                  <template #cell(status)="data">
                                    <span class="badge badge-success font-size-12">
                                      {{data.item.status}}
                                    </span>
                                  </template>
                                </b-table>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="dataTables_paginate paging_simple_numbers float-right">
                                        <ul class="pagination pagination-rounded mb-0">
                                            <!-- pagination -->
                                            <b-pagination v-model="currentPage" :total-rows="customerrows" :per-page="perPage"></b-pagination>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </b-tab>

                </b-tabs>
              </div>
              <div class="col-sm-3">
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
              </div>
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
                      <tr v-for="item in order.orderedItems" :key="item.id">
                        <td><img :src="item.thumbnail"/></td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.productSKU }}</td>
                        <td>{{ item.unitPrice }}</td>
                        <td><b-form-input for="text" value="1"></b-form-input></td>
                        <td>{{ item.totalPrice }}</td>
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
                        <td>{{ order.orderCurrencySymbol }}{{ order.subtotal }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Shipping</b></td>
                        <td>{{ order.orderCurrencySymbol }}{{ order.shippingCost }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Total</b></td>
                        <td>{{ order.orderCurrencySymbol }}{{ order.total }}</td>
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
                <b-button variant="primary">
                    <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                    Submit Order
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
                  v-model="data.item.selected"
                  :value="data.id"
                  
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
  </Layout>
</template>
