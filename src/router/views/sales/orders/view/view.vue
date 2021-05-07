<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
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
        payment: {
          payment_method: {},
        },
        shipping_method: {},
        invoice: {},
        shipment: {},
      },
      title: "View Order",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Orders",
        },
        {
          text: "View Order",
          active: true
        }
      ]
    };
  },
  mounted(){
    axios
    .get(`${this.backendURL}/api/v1/orders/${this.$route.params.id}`, authHeader())
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
        if (this.order.payment == null){
          this.order.payment = {
             payment_method: {},
          };
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
    }).catch(handleAxiosError);

  }
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
                <!-- <div class="text-sm-right">
                  <b-button v-b-modal.modal-scrollable variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Edit Order
                  </b-button>
                </div> -->
              </div>
              <!-- end col-->
            </div>
            <div class="row card-body">
              <div class="col-sm-6">
              <p>Status: {{order.status.status}}</p>
              <h3>#{{order.order_hash}}</h3>
              <p>
                Order Date: {{order.created_at}}<br>
                Customer Name: {{order.customer.name}}<br>
                Email: {{order.customer.email}}<br>
              </p>
              <p>
                Invoice:  {{order.invoice.invoice_hash}}<br>
                Invoice Date: {{order.invoice.created_at}}<br>
                Credit Memos:  {{order.credit_memo}}<br>
                Shipment:  {{order.shipment.shipment_hash}}<br>
                Shipment Date: {{order.shipment.created_at}}
              </p>
              </div>
              <div class="col-sm-6">
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Billing Address</h5>
                    <p>
                      {{order.billing_address.first_name + ' ' + order.billing_address.last_name}}<br>
                      {{order.billing_address.street}}<br>
                      {{order.billing_address.city}}<br>
                      {{order.billing_address.postcode}}<br>
                      {{order.billing_address.country}}
                    </p>
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
                    <h5>Payment Information</h5>
                    <p>
                      Payment Method: {{order.payment.payment_method.display_name}}<br>
                      Currency: {{order.currency.name}}<br>
                      Payment Amount: {{order.payment.amount}}<br>
                    </p>
                    <h5>Shipping Information</h5>
                    <p>
                      Shipping Method: {{order.shipping_method.display_name}}<br>
                      Shipping Cost: {{order.shipping_method.cost}}<br>
                    </p>
                  </div>
                </div>
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
