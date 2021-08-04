<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import { viewData } from "./create-data";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import {roleService} from "@/helpers/authservice/roles";

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
      pageIdentity: "orders",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      viewData: viewData,
      paymentData: [],
      paymentMap: {},
      currentPayment:{},
      currentPaymentType: {},
      shippingData: [],
      products: [],
      customers: [],
      customersLength: 0,
      selectedCustomer: {
        billing_addresses: [],
        shipping_addresses: [],
      },
      selectedProducts: [],
      selectedToogle: "A",
      title: "Create Order",
      stripeAPIToken: '',
      stripe: '',
      elements: '',
      card: '',
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
      productQuantityGreaterThan: 0,
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
          return this.customersLength;
      }
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
      .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}&address=true` , authHeader())
      .then(response => (this.customers = response.data.data,
      this.customersLength = response.data.pagination.total))
      .catch(handleAxiosError);

       axios
      .get(`${this.backendURL}/api/v1/payments/methods` , authHeader())
      .then(response => {
          this.paymentData = response.data.data;

          for(var i = 0; i < this.paymentData.length; i++){
            var pd = this.paymentData[i];
            if (!(pd.display_name in this.paymentMap)){
               this.paymentMap[pd.display_name] = pd;
            }
            if (pd.display_name == "stripe"){
                // include stripe library dynamically
                this.includeStripe('js.stripe.com/v3/' , function(){
                  this.configureStripe();
                }.bind(this));
            }
          }          
        })
      .catch(handleAxiosError);

      axios
      .get(`${this.backendURL}/api/v1/shipping/methods` , authHeader())
      .then(response => (this.shippingData = response.data.data))
      .catch(handleAxiosError);
      
  },
  methods: {
      /**
        * Search the table data with search input 
        */
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}&address=true` , authHeader())
        .then(response => (this.customers = response.data.data,
        this.customersLength = response.data.pagination.total))
        .catch(handleAxiosError);
      },
      handlePerPageChange(value) {
        this.currentPage = 1;
        this.perPage = value;
        axios
        .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}&address=true` , authHeader())
        .then(response => (this.customers = response.data.data,
        this.customersLength = response.data.pagination.total))
        .catch(handleAxiosError);
      },
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
        return this.getSubTotal() + 5;
      },
      createOrder(){
        if (!roleService.hasCreatePermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        var billingAddress = {}
        if (this.selectedCustomer.billing_addresses.length > 0){
          billingAddress  =this.selectedCustomer.billing_addresses[0]
        }
         var shippingAddress = {}
        if (this.selectedCustomer.shipping_addresses.length > 0){
          shippingAddress  =this.selectedCustomer.shipping_addresses[0]
        }
        var payload = {
          customer_id: this.selectedCustomer.id,
          billing_address: billingAddress,
          shipping_address: shippingAddress,
          products: []
        }
        for (var i = 0; i < this.selectedProducts.length; i++){
          payload.products.push({
            id: this.selectedProducts[i].id,
            quantity: this.selectedProducts[i].order_quantity
          });
        }
        axios
        .post(`${this.backendURL}/api/v1/orders` , payload , authHeader())
        .then(response => {
            alert(`${response.data.data.id} Order Created!`);
            this.purchase(response.data.data.id);
         })
        .catch(handleAxiosError);
      },
      // Invluce stripe dynamically
      includeStripe( URL, callback ){
        let documentTag = document, tag = 'script',
            object = documentTag.createElement(tag),
            scriptTag = documentTag.getElementsByTagName(tag)[0];
        object.src = '//' + URL;
        if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
        scriptTag.parentNode.insertBefore(object, scriptTag);
      },
      configureStripe(){
        this.stripe = window.Stripe(this.paymentMap["stripe"].api_key);

        this.elements = this.stripe.elements();
        this.card = this.elements.create('card' , {
          hidePostalCode : true,
        });

        this.card.mount('#card-element');
      },
       purchase(orderID){
        if (this.currentPayment.display_name == 'stripe'){
          if (this.currentPaymentType.method_slug == 'card_payment'){
            this.purchaseWithStripeCard(orderID)
          }
        }
        if(this.currentPayment.display_name == 'paypal'){
          this.purchaseWithPaypal(orderID);
        }
       },
      purchaseWithStripeCard(orderID){
          this.stripe.createToken(this.card)
          .then(result => {
            if(result.error){
              alert("Failed to create stripe card token because: " + result.error.message);
              return;
            }

            var payload = {
              order_id: orderID,
              method: "stripe",
              type: "card",
              info: {
                token: result.token.id,
              },
            }
            axios
            .post(`${this.backendURL}/api/v1/payments/${this.currentPayment.id}/pay` , payload , authHeader())
            .then(response => (alert(`${response.data.data.id} Got Paid!`)))
            .catch(handleAxiosError);
          })
      },
      checkStripeCard(name , type , enabled){
        if (enabled && name == "stripe" && type == "card_payment"){
          return true;
        }
        return false;
      },
      purchaseWithPaypal(orderID) {
        var payload = {
              order_id: orderID,
              method: "paypal",
            }
        axios
            .post(`${this.backendURL}/api/v1/payments/${this.currentPayment.id}/pay` , payload , authHeader())
            .then(response => (alert(`${response.data.data.id} Got Paid!`)))
            .catch(handleAxiosError);
      },
      setCurrentPaymentType(checked , type){
        if (checked){
          this.currentPaymentType = type;
        }else{
          this.currentPaymentType = {};
        }
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
                  <button type="button" class="btn btn-success btn-rounded mb-2 mr-2" @click="createOrder">
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
                                      <b-form-select 
                                        v-model="perPage" 
                                        size="sm" 
                                        :options="pageOptions"
                                        @change = "handlePerPageChange"
                                      ></b-form-select>&nbsp;entries
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
                                  :current-page="1" 
                                  :sort-by.sync="sortBy" 
                                  :sort-desc.sync="sortDesc" 
                                  :filter="filter" 
                                  :filter-included-fields="filterOn" 
                                  @filtered="onFiltered"
                                >
                                 
                                  <template #cell(selected)="data">
                                    <b-form-checkbox
                                    @change="uncheckSelectAll"
                                    v-model="selectedCustomer"
                                    :value="data.item"
                                    
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
                                          <b-pagination 
                                            v-model="currentPage" :total-rows="customerrows"
                                            :per-page="perPage"
                                            @change = "handlePageChange"
                                          ></b-pagination>
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
                        <td>{{ order.orderCurrencySymbol }}{{ getSubTotal() }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Shipping</b></td>
                        <td>{{ order.orderCurrencySymbol }}{{ order.shippingCost }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Total</b></td>
                        <td>{{ order.orderCurrencySymbol }}{{ getTotal() }}</td>
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
                      v-for="shipping in shippingData"
                      :key="shipping.id"
                      v-model="selectedToogle"
                      class="custom-radio mb-3"
                      :value="shipping.id"
                    >{{shipping.on_screen_name}}</b-form-radio>
                  </b-form-group>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h3>Payment Methods</h3>
                <b-tabs pills vertical nav-class="p-0" nav-wrapper-class="col-sm-3" content-class="pt-0 px-2 text-muted">
                  <b-tab v-for="payment in paymentData" :key="payment.id" :title="payment.on_screen_name" active title-item-class="mb-2" @click="currentPayment = payment">
                    <!-- <b-card-text> -->
                      <!-- <div class="row"> -->
                        <div v-for="type in payment.types" :key="type.method_slug" v-bind:value="type.method_slug">
                          <div id="card-element" v-if="checkStripeCard(payment.display_name , type.method_slug, type.enabled)">
                          </div>
                          <b-form-checkbox v-if="type.enabled" @change="(v)=>setCurrentPaymentType(v, type)" class="custom-checkbox custom-checkbox-primary"></b-form-checkbox>
                        </div>

                        <b-card-text v-if="payment.display_name == 'paypal'">
                          <div class="col-sm-12">
                            <b-button variant="primary">
                                <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                                Pay With Paypal
                            </b-button>
                          </div>
                        </b-card-text>
                        <!-- </div> -->
                        <!-- <div class="col-sm-5">
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
                        </div> -->
                      <!-- </div> -->
                     <!-- </b-card-text> -->
                  </b-tab>
                  <!-- <b-tab title="Payment 2" title-item-class="mb-2">
                    <b-card-text>
                      <div class="col-sm-12">
                        <b-button variant="primary">
                            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                            Pay With Paypal
                        </b-button>
                      </div>
                    </b-card-text>
                  </b-tab> -->
                </b-tabs>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12 text-sm-right">
                <b-button variant="primary" @click="createOrder">
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
  </Layout>
</template>
