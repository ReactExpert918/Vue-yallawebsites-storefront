<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";

import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";

/**
 * Pages component
 */
export default {
  page: {
    title: "Orders",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      backendURL: process.env.VUE_APP_BACKEND_URL,
      customer: {
        group:{},
        billing_addresses:[{} , {}],
        shipping_addresses: [{} , {}],
        orders: [],
      },
      customerGroups: [],
      title: "Edit Customer",
      items: [
        {
          text: "Customers",
        },
        {
          text: "Edit Customer",
          active: true
        },
      ]
    };
  },
  mounted() {
      axios
      .get(`${this.backendURL}/api/v1/customers/${this.$route.params.id}` , authHeader())
      .then(response => {
          this.customer = response.data.data
          if (this.customer.billing_addresses.length == 0){
            this.customer.billing_addresses = [{} , {}];
          }
          if (this.customer.shipping_addresses.length == 0){
            this.customer.shipping_addresses = [{} , {}];
          }
          if (this.customer.billing_addresses.length == 1){
            this.customer.billing_addresses.push({});
          }
          if (this.customer.shipping_addresses.length == 1){
            this.customer.shipping_addresses.push({});
          }
          if(this.customer.group == null){
            this.customer.group = {};
          }
        })
      axios
      .get(`${this.backendURL}/api/v1/customers/groups?per_page=-1` , authHeader())
      .then(response => (this.customerGroups = response.data.data))
  },
  methods:{
     updateCustomer(){
        axios
        .put(`${this.backendURL}/api/v1/customers/${this.$route.params.id}` , this.customer , authHeader())
        .then(response => (alert(`${response.data.data.id} Updated!`)))
      },
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card"> <!--Why is customerData expected to be an iterable when we are dealing with just one customer to edit -->
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <button type="button" class="btn btn btn-rounded mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Delete Customer
                  </button>
                  <button type="button" class="btn btn btn-rounded mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Create Order
                  </button>
                  <button type="button" class="btn btn btn-rounded mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Login As Customer
                  </button>
                  <b-button v-b-modal variant="primary" @click="updateCustomer()">
                    <i class="mdi mdi-plus mr-1"></i> Save Customer
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h4>General Information</h4>
                <div class="row">
                  <div class="col-sm-3">
                    <label class="mt-3">First Name</label>
                    <b-form-input for="text" v-model="customer.first_name"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Last Name</label>
                    <b-form-input for="text" v-model="customer.last_name"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Email</label>
                    <b-form-input for="text" v-model="customer.email"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Customer Group</label>
                    <select class="custom-select" v-model="customer.group_id">
                      <option v-for="group in customerGroups" v-bind:value="group.id" :key="group.id" :selected="customer.group != null && group.id == customer.group.id">{{group.name}}</option>
                    </select>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">New Password</label>
                    <b-form-input for="text"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Confirm Password</label>
                    <b-form-input for="text"></b-form-input>
                  </div>
                  <div class="col-sm-2">
                    <label class="mt-3">Newsletter Subscriber</label>
                    <b-form-checkbox switch size="lg" v-model="customer.newsletter_subscriber"></b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h4>Addresses</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Billing Address - <b-button v-b-modal.modal-scrollable-billing variant="primary">Edit</b-button></h5>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="grey-box" v-for="item in customer.billing_addresses" :key="item.id">
                          <p>
                            {{item.name}}<br>
                            {{item.street}}<br>
                            {{item.city}}<br>
                            {{item.postcode}}<br>
                            {{item.country}}<br>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <h5>Shipping Address - <b-button v-b-modal.modal-scrollable-shipping variant="primary">Edit</b-button></h5>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="grey-box" v-for="item in customer.shipping_addresses" :key="item.id">
                          <p>
                            {{item.name}}<br>
                            {{item.street}}<br>
                            {{item.city}}<br>
                            {{item.postcode}}<br>
                            {{item.country}}<br>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h4>Previous Orders</h4>
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Purchase Date</th>
                      <th>No Of Products</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in customer.orders" :key="order.id">
                      <td>{{order.id}}</td>
                      <td>{{order.created_at}}</td>
                      <td>{{order.product_no}}</td>
                      <td>{{order.total_price }}</td>
                      <td>
                        <b-button variant="primary" >
                            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                            View
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <!--Billing Method Popup-->
    <b-modal id="modal-scrollable-billing" scrollable title="Edit Billing Addresses" title-class="font-18" hide-footer>
      <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
        <b-tab active>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Address 1</span>
          </template>
          <div class="row">
            <div class="col-sm-6">
              <label class="mt-3">First Name</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="customer.billing_addresses[0].postcode"></b-form-input>
              <label class="mt-3">Default Billing Addreess</label>
              <b-form-checkbox switch size="lg" v-model="customer.billing_addresses[0].default_billing_address"></b-form-checkbox>
            </div>
          </div>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Address 2</span>
          </template>
          <div class="row">
            <div class="col-sm-6">
              <label class="mt-3">First Name</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="customer.billing_addresses[1].postcode"></b-form-input>
              <label class="mt-3">Default Billing Addreess</label>
              <b-form-checkbox switch size="lg" v-model="customer.billing_addresses[1].default_billing_address"></b-form-checkbox>
            </div>
          </div>
        </b-tab>
      </b-tabs>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Save
        </b-button>
      </div>
    </b-modal>

    <!--Shippinig Method Popup-->
    <b-modal id="modal-scrollable-shipping" scrollable title="Edit Shipping Addresses" title-class="font-18" hide-footer>
      <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
        <b-tab active>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Address 1</span>
          </template>
          <div class="row">
            <div class="col-sm-6">
              <label class="mt-3">First Name</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[0].postcode"></b-form-input>
              <label class="mt-3">Default Shipping Addreess</label>
              <b-form-checkbox switch size="lg" v-model="customer.shipping_addresses[0].default_shipping_address"></b-form-checkbox>
            </div>
          </div>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Address 2</span>
          </template>
          <div class="row">
            <div class="col-sm-6">
              <label class="mt-3">First Name</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="customer.shipping_addresses[1].postcode"></b-form-input>
              <label class="mt-3">Default Shipping Addreess</label>
              <b-form-checkbox switch size="lg" v-model="customer.shipping_addresses[1].default_shipping_address"></b-form-checkbox>
            </div>
          </div>
        </b-tab>
      </b-tabs>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Save
        </b-button>
      </div>
    </b-modal>

  </Layout>
</template>
