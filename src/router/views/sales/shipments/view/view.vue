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
              <h3>#{{order.orderNumber}}</h3>
              <p>
                Shipment:  {{order.shipmentNumber}}<br>
                Shipment Date: {{order.shipmentDate}}
              </p>
              <p>
                Invoice:  {{order.invoiceNumber}}<br>
                Invoice Date: {{order.invoiceDate}}<br>
                Credit Memos:  {{order.creditMemoNumber}}<br>
                Order Date: {{order.orderDate}}<br>
                Order Status: {{order.orderStatus}}<br>
                Customer Name: {{order.customerName}}<br>
                Email: {{order.customerEmail}}<br>
              </p>
              </div>
              <div class="col-sm-6">
                <div class="row">
                  <div class="col-sm-6">
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
                    <h5>Shipping Information</h5>
                    <p>
                      Shipping Method: {{order.shippingMethod}}<br>
                      Shipping Cost: {{order.shippingCost}}<br>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <b-form-input for="text" placeholder="Tracking Number"></b-form-input>
              </div>
              <div class="col-sm-2">
                <select class="custom-select">
                  <option selected>UPS</option>
                  <option value="1">USPS</option>
                  <option value="1">FedEx</option>
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
