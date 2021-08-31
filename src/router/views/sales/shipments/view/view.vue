<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import axios from "axios";
import appConfig from "@/app.config";
import {authHeader} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";

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
      order: {
        order_hash: "",
        total: {},
        status: {} , 
        customer: {},
        currency: {},
        billing_address: {},
        shipping_address: {},
        payment_method: {},
        shipping_method: {},
        invoice: {},
        shipment: {},
      },
      loading: false,
      title: "View Shipment",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Shipments",
        },
        {
          text: "View Shipment",
          active: true
        }
      ]
    };
  },
  mounted(){
    this.loading = true
        axios
        .get(`${this.backendURL}/api/v1/orders/shipments/${this.$route.params.id}`, authHeader())
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
            if (this.order.invoice == null){
              this.order.invoice = {};
            }
            if (this.order.shipment == null){
              this.order.shipment = {};
            }
        }).catch(handleAxiosError)
        .finally(() => {
          this.loading = false
        });
  }
};
</script>

<template>
  <Layout>
    <div class="spinner"  v-if="this.loading">
      <div class="text-center loader">
       <b-spinner  style="width: 6rem; height: 6rem;" variant="primary" type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Send Shipment To Customer
                  </button>
                  <button type="button" class="btn btn-success btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-plus mr-1"></i> Print
                  </button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="row card-body">
              <div class="col-sm-6">
              <h3>#{{order.order_hash}}</h3>
              <p>
                Shipment:  {{order.shipment.shipment_hash}}<br>
                Shipment Date: {{order.shipment.created_at}}
              </p>
              <p>
                Invoice:  {{order.invoice.invoice_hash}}<br>
                Invoice Date: {{order.invoice.created_at}}<br>
                Credit Memos:  {{order.credit_memo}}<br>
                Order Date: {{order.created_at}}<br>
                Order Status: {{order.status.status}}<br>
                Customer Name: {{order.customer.name}}<br>
                Email: {{order.customer.email}}<br>
              </p>
              </div>
              <div class="col-sm-6">
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Shipping Address</h5>
                    <p>
                      {{order.shipping_address.first_name + ' ' + order.shipping_address.last_name}}<br>
                      {{order.shipping_address.street}}<br>
                      {{order.shipping_address.city}}<br>
                      {{order.shipping_address.postcode}}<br>
                      {{order.shipping_address.country}}
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <h5>Shipping Information</h5>
                    <p>
                      Shipping Method: {{order.shipping_method.display_name}}<br>
                      Shipping Cost: {{order.shipping_method.cost}}<br>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <b-form-input for="text" placeholder="Tracking Number"></b-form-input>
              </div>
              <div class="col-sm-2">
                <select class="custom-select">
                  <option selected>{{order.shipping_method.display_name}}</option>
                  <!-- <option value="1">USPS</option>
                  <option value="1">FedEx</option> -->
                </select>
              </div>
              <div class="col-sm-2">
                <a href="#">
                  <button type="button" class="btn btn-success btn-rounded mb-2 mr-2">
                      <i class="mdi mdi-plus mr-1"></i> Update
                  </button>
                </a>
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
                      <tr v-for="product in order.products" :key="product.id">
                        <td><img :src="product.product.image"/></td>
                        <td>{{ product.product.name }}</td>
                        <td>{{ product.product.sku }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.sub_total }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Subtotal</b></td>
                        <td>{{ order.currency.symbol }}{{ order.total.sub_total }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Shipping</b></td>
                        <td>{{ order.currency.symbol }}{{ order.total.shipping_cost }}</td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td><b>Total</b></td>
                        <td>{{ order.currency.symbol }}{{ order.total.net_total }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>

<style scoped>
.spinner {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;
    z-index: 20000;
  }
  .loader {
    position: absolute;
    top: 30%;
    left: 50%;
  }
</style>