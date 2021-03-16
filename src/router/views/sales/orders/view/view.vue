<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import { viewData } from "./view-data";
import appConfig from "@/app.config";

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
      viewData: viewData,
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
  }
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
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Reorder
                  </button>
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Hold Order
                  </button>
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Invoice Order
                  </button>
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Mark As Shipped Order
                  </button>
                  <b-button v-b-modal.modal-scrollable variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Edit Order
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="row card-body">
              <div class="col-sm-6">
              <p>Status: {{order.orderStatus}}</p>
              <h3>#{{order.orderNumber}}</h3>
              <p>
                Order Date: {{order.orderDate}}<br>
                Customer Name: {{order.customerName}}<br>
                Email: {{order.customerEmail}}<br>
              </p>
              <p>
                Invoice:  {{order.invoiceNumber}}<br>
                Invoice Date: {{order.invoiceDate}}<br>
                Credit Memos:  {{order.creditMemoNumber}}<br>
                Shipment:  {{order.shipmentNumber}}<br>
                Shipment Date: {{order.shipmentDate}}
              </p>
              </div>
              <div class="col-sm-6">
                <div class="row">
                  <div class="col-sm-6">
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
                  <div class="col-sm-6">
                    <h5>Payment Information</h5>
                    <p>
                      Payment Method: {{order.paymentMethod}}<br>
                      Currency: {{order.paymentCurrency}}<br>
                      Payment Amount: {{order.paymentAmount}}<br>
                    </p>
                    <h5>Shipping Information</h5>
                    <p>
                      Shipping Method: {{order.shippingMethod}}<br>
                      Shipping Cost: {{order.shippingCost}}<br>
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
                      <tr v-for="item in order.orderedItems" :key="item.id">
                        <td><img :src="item.thumbnail"/></td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.productSKU }}</td>
                        <td>{{ item.unitPrice }}</td>
                        <td>{{ item.qty }}</td>
                        <td>{{ item.totalPrice }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
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
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
