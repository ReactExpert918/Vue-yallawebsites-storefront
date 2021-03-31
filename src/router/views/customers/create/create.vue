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
      title: "Create Customer",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      customerGroups: [],
      createCustomerPayload: {
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: "",
        email: "",
        group_id: "",
        newsletter_subscriber: false,
        billing_addresses: [{} , {}],
        shipping_addresses: [{} , {}]
      },
      items: [
        {
          text: "Customers",
        },
        {
          text: "Create Customer",
          active: true
        },
      ]
    };
  },
  mounted(){
    axios
    .get(`${this.backendURL}/api/v1/customers/groups?per_page=-1` , authHeader())
    .then(response => (this.customerGroups = response.data.data))
  },
  methods:{
    createCustomer(){
        axios
        .post(`${this.backendURL}/api/v1/customers` , this.createCustomerPayload , authHeader())
        .then(response => (alert(`${response.data.data.id} Created!`)))
      },
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Back
                  </button>
                  <b-button v-b-modal variant="primary" @click="createCustomer()">
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
                    <b-form-input for="text" v-model="createCustomerPayload.first_name"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Last Name</label>
                    <b-form-input for="text" v-model="createCustomerPayload.last_name"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Email</label>
                    <b-form-input for="text" v-model="createCustomerPayload.email"></b-form-input>
                  </div>
                  <div class="col-sm-2">
                    <label class="mt-3">Customer Group</label>
                    <select class="custom-select" v-model="createCustomerPayload.group_id">
                      <option v-for="group in customerGroups" v-bind:value="group.id" :key="group.id">{{group.name}}</option>
                    </select>
                  </div>
                  <div class="col-sm-1">
                    <label class="mt-3">Newsletter Subscriber</label>
                    <b-form-checkbox switch size="lg" v-model="createCustomerPayload.newsletter_subscriber"></b-form-checkbox>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Password</label>
                    <b-form-input type="password" for="password" v-model="createCustomerPayload.password"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label class="mt-3">Confirm Password</label>
                    <b-form-input type="password" for="password" v-model="createCustomerPayload.password_confirmation"></b-form-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12">
                <h4>Addresses</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Billing Address</h5>
                    <b-button v-b-modal.modal-scrollable-billing variant="primary">Add Address</b-button>
                  </div>
                  <div class="col-sm-6">
                    <h5>Shipping Address</h5>
                    <b-button v-b-modal.modal-scrollable-shipping variant="primary">Add Address</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
    <!--Billing Method Popup-->
    <b-modal id="modal-scrollable-billing" scrollable title="Add Billing Addresses" title-class="font-18" hide-footer>
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
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[0].postcode"></b-form-input>
              <label class="mt-3">Default Billing Addreess</label>
              <b-form-checkbox switch size="lg" v-model="createCustomerPayload.billing_addresses[0].default_billing_address"></b-form-checkbox>
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
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="createCustomerPayload.billing_addresses[1].postcode"></b-form-input>
              <label class="mt-3">Default Billing Addreess</label>
              <b-form-checkbox switch size="lg" v-model="createCustomerPayload.billing_addresses[1].default_billing_address"></b-form-checkbox>
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
    <b-modal id="modal-scrollable-shipping" scrollable title="Add Shipping Addresses" title-class="font-18" hide-footer>
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
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[0].postcode"></b-form-input>
              <label class="mt-3">Default Shipping Addreess</label>
              <b-form-checkbox switch size="lg" v-model="createCustomerPayload.shipping_addresses[0].default_shipping_address"></b-form-checkbox>
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
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].first_name"></b-form-input>
              <label class="mt-3">Street Address</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].street"></b-form-input>
              <label class="mt-3">State</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].state"></b-form-input>
              <label class="mt-3">Country</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].country"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].last_name"></b-form-input>
              <label class="mt-3">City</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].city"></b-form-input>
              <label class="mt-3">Zip / Postcode</label>
              <b-form-input for="text" v-model="createCustomerPayload.shipping_addresses[1].postcode"></b-form-input>
              <label class="mt-3">Default Shipping Addreess</label>
              <b-form-checkbox switch size="lg" v-model="createCustomerPayload.shipping_addresses[1].default_shipping_address"></b-form-checkbox>
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
