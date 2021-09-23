<script>
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {roleService} from "@/helpers/authservice/roles";
import {handleAxiosError} from "@/helpers/authservice/user.service";
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
      data: "",
      loading: false,
      order: {
        total: {},
        status: {} , 
        customer: {},
        currency: {},
        billing_address: {},
        shipping_address: {},
        payment: {
          payment_method:{},
        },
        shipping_method: {},
        is_cancelable: false,
        is_editable: false,
        is_shippable: false,
        is_deliverable: false,
        is_refundable: false,
      },
      paymentData: [],
      paymentMap: {},
      currentPayment:{},
      currentPaymentType: {},
      shippingData: [],
      products: [],
      productsLength: 1,
      selectedProducts: [],
      credit_memo: "",
      selectedToogle: "A",
      title: "Edit Order",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Orders",
          href: "/sales/orders"
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
          return this.productsLength;
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
    this.loading = true
      axios
      .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&quantity_greater_than=${this.productQuantityGreaterThan}&with_disabled=false` , authHeader())
      .then(response => {
         this.products = response.data.data,
         this.productsLength = response.data.pagination.total;
         for(var i = 0; i < this.products.length; i++){
           this.products[i].order_quantity = 1;
         }
       })
       .catch(error => handleAxiosError(error, this));
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
          // if (this.order.payment == null){
          //   this.order.payment = {
          //     payment_method: {},
          //   };
          // }
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
      .catch(error => handleAxiosError(error, this));

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
      .catch(error => handleAxiosError(error, this));

      axios
      .get(`${this.backendURL}/api/v1/shipping/methods` , authHeader())
      .then(response => (this.shippingData = response.data.data))
      .catch(error => handleAxiosError(error, this))
      .finally(() => {
        this.loading = false
      });
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
        for(let i = 0; i < this.selectedProducts.length; i++){
          subTotal += (this.selectedProducts[i].price * this.selectedProducts[i].order_quantity);
        }
        return subTotal;
      },
      getTotal(){
        return this.getSubTotal() + this.order.total.shipping_cost;
      },
      updateOrder(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          this.$toast.error("You do no have the permission to perform this action!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        if (!this.order.is_editable){
          this.$toast.error("Order Cannot Be Edited!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
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
        .then(response => (
          this.$router.push('/sales/orders'),
          this.data = response.data,
          this.$toast.success("Order Updated Successfully!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
        ))
        .catch(error => handleAxiosError(error, this));
      },
      cancelOrder(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          this.$toast.error("You do no have the permission to perform this action!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        if (!this.order.is_cancelable){
          this.$toast.error("Order Cannot Be Cancelled!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        
        axios
        .delete(`${this.backendURL}/api/v1/orders/${this.$route.params.id}/cancel` , authHeader())
        .then(response => (
          this.data = response.data,
          this.$toast.success("Order Cancelled Successfully!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })))
        .catch(error => handleAxiosError(error, this));
      },
      shipOrder(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          this.$toast.error("You do no have the permission to perform this action!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        if (!this.order.is_shippable){
          this.$toast.error("Order Cannot Be Markup Shipped!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        
        axios
        .put(`${this.backendURL}/api/v1/orders/${this.$route.params.id}/ship`  ,{}, authHeader())
        .then(response => (
          this.data = response.data, 
          this.$toast.success("Order Marked As Shipped!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
        ))
        .catch(error => handleAxiosError(error, this));
      },
      deliverOrder(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          this.$toast.error("You do no have the permission to perform this action!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        if (!this.order.is_deliverable){
          this.$toast.error("Order Cannot Be Markup Delivered!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        
        axios
        .put(`${this.backendURL}/api/v1/orders/${this.$route.params.id}/deliver` ,{}, authHeader())
        .then(response => (
          this.data = response.data,
          this.$toast.success("Order Be Mark As Delivered!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
        ))
        .catch(error => handleAxiosError(error, this));
      },
      refundOrder(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
           this.$toast.error("You do no have the permission to perform this action!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        if (!this.order.is_refundable){
          this.$toast.error("Order Cannot Be Mark As Refund!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }

        const payload = {
          credit_memo: this.credit_memo,
        }
        
        axios
        .put(`${this.backendURL}/api/v1/orders/${this.$route.params.id}/refund` ,payload, authHeader())
        .then(response => (
          this.data=response.data,
          this.$toast.success("Order Refund Successfully!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
        ))
        .catch(error => handleAxiosError(error, this));
      },
      reOrder(){
        if (!roleService.hasCreatePermission(this.pageIdentity)){
           this.$toast.error("You do no have the permission to perform this action!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          return;
        }
        var payload = {
          customer_id: this.order.customer.id,
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
        .post(`${this.backendURL}/api/v1/orders` , payload , authHeader())
        .then(response => (
          this.data = response.data,
          this.$toast.success("Order Re-Created!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
        ))
        .catch(error => handleAxiosError(error, this));
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
      purchase() {
        var orderID = this.$route.params.id;
        if (this.currentPayment.display_name == 'stripe'){
          if (this.currentPaymentType.method_slug == 'card_payment'){
            this.purchaseWithStripeCard(orderID)
          }
        }
        if (this.currentPayment.display_name == 'paypal'){
          this.purchaseWithPaypal(orderID);
        }
       },
       purchaseWithPaypal(orderID) {
        var payload = {
              order_id: orderID,
              method: "paypal",
            }
        axios
            .post(`${this.backendURL}/api/v1/payments/${this.currentPayment.id}/pay` , payload , authHeader())
            .then(response => (
              this.$router.push('/sales/orders'),
              this.data = response.data,
              this.$toast.success("Payment is Being Processed!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              })
            ))
            .catch(error => handleAxiosError(error, this));
      },
      purchaseWithStripeCard(orderID){
          this.stripe.createToken(this.card)
          .then(result => {
            if(result.error){
              this.$toast.error("Failed to create stripe card token because: " + result.error.message, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              })
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
            .then(response => (
              this.$router.push('/sales/orders'),
              this.data = response.data,
              this.$toast.success("Payment is Being Processed!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              })
            ))
            .catch(error => handleAxiosError(error, this));
          })
      },
      checkStripeCard(name , type , enabled){
        if (enabled && name == "stripe" && type == "card_payment"){
          return true;
        }
        return false;
      },
      setCurrentPaymentType(checked , type){
        if (checked){
          this.currentPaymentType = type;
        }else{
          this.currentPaymentType = {};
        }
      },
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&quantity_greater_than=${this.productQuantityGreaterThan}&with_disabled=false` , authHeader())
        .then(response => {
          this.products = response.data.data,
          this.productsLength = response.data.pagination.total;
          for(var i = 0; i < this.products.length; i++){
            this.products[i].order_quantity = 1;
          }
        })
        .catch(error => handleAxiosError(error, this));
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&quantity_greater_than=${this.productQuantityGreaterThan}&with_disabled=false` , authHeader())
        .then(response => {
          this.products = response.data.data,
          this.productsLength = response.data.pagination.total;
          for(var i = 0; i < this.products.length; i++){
            this.products[i].order_quantity = 1;
          }
        })
        .catch(error => handleAxiosError(error, this));
      },
  },
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
        <div class="card" >
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                   <button type="button" class="btn btn btn-rounded mb-2 mr-2" :disabled="!order.is_cancelable" v-b-modal.modal-cancel-order>
                    <i class="mdi mdi-trash mr-1"></i> Cancel Order
                  </button>
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2" v-b-modal.modal-reorder-order>
                    <i class="mdi mdi-trash mr-1"></i> Reorder
                  </button>
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2" :disabled="!order.is_refundable" v-b-modal.modal-refund-order>
                    <i class="mdi mdi-trash mr-1"></i> Refund Order
                  </button>
                  <button type="button" class="btn btn btn-rounded mb-2 mr-2" :disabled="!order.is_shippable" v-b-modal.modal-ship-order>
                    <i class="mdi mdi-trash mr-1"></i> Mark As Shipped Order
                  </button>
                   <button type="button" class="btn btn btn-rounded mb-2 mr-2" :disabled="!order.is_deliverable" v-b-modal.modal-deliver-order>
                    <i class="mdi mdi-trash mr-1"></i> Mark As Delivered Order
                  </button>
                  <b-button v-b-modal.modal-scrollable variant="primary" :disabled="!order.is_editable" @click="updateOrder()">
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
                        <td><img :src="product.image" class="thumbnail-img" /></td>
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
                <div v-if="this.order.payment == null">
                  <h3>Payment Methods</h3>
                  <b-tabs pills vertical nav-class="p-0" nav-wrapper-class="col-sm-3" content-class="pt-0 px-2 text-muted">
                    <b-tab v-for="payment in paymentData" :key="payment.id" :title="payment.on_screen_name" active title-item-class="mb-2" @click="currentPayment = payment">
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
                      <!-- <b-card-text>
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
                      </b-card-text> -->
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
                  <b-button variant="primary" :disabled="Object.keys(currentPayment).length === 0 && currentPayment.constructor === Object" v-b-modal.modal-getpaid-order>
                      <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                      Get Paid
                  </b-button>
                </div>
                <div v-else>
                  <p v-if="this.order.payment.type" class="align_center">Payment was made via {{this.order.payment.payment_method.display_name}} using {{this.order.payment.type}}!</p>
                  <p v-else class="align_center">Payment was made via {{this.order.payment.payment_method.display_name}}!</p>
                </div>
              </div>
            </div>
            <div class="row card-body">
              <div class="col-sm-12 text-sm-right">
                <b-button variant="primary" :disabled="!order.is_editable" @click="updateOrder()">
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
                  <b-form-select v-model="perPage" @change="handlePerPageChange" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
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
                :current-page="1" 
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
                          <b-pagination v-model="currentPage" @change="handlePageChange" :total-rows="rows" :per-page="perPage"></b-pagination>
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
        <b-button variant="danger" :disabled="!order.is_cancelable" @click="cancelOrder">Cancel</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-ship-order" centered title="Mark As Shipped Order" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Confirm will mark this order as shipped.</p>
      <div class="text-right">
        <b-button variant="danger" :disabled="!order.is_shippable" @click="shipOrder">Confirm</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-deliver-order" centered title="Mark As Delivered Order" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Confirm will mark this order as delivered permenantly.</p>
      <div class="text-right">
        <b-button variant="danger" :disabled="!order.is_deliverable" @click="deliverOrder">Confirm</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-refund-order" centered title="Refund Order" title-class="font-18" hide-footer>
      <p>Are you sure? Entering the Credit Memo & pressing the confirm button will mark the order as refunded permanently.</p>
      <div class="col-sm-6">
          <label class="mt-3">Credit Memo</label>
          <b-form-input for="text" placeholder="Credit Memo" v-model="credit_memo"></b-form-input>
        </div>
      <div class="text-right">
        <b-button variant="danger" :disabled="!order.is_refundable || credit_memo==''" @click="refundOrder">Confirm</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-reorder-order" centered title="Re-Order" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Confirm will create a new order from this order.</p>
      <div class="text-right">
        <b-button variant="danger"  @click="reOrder">Confirm</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-getpaid-order" centered title="Get Paid" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Confirm will commence the payment from process with customer.</p>
      <div class="text-right">
        <b-button variant="danger"  @click="purchase">Confirm</b-button>
      </div>
    </b-modal>
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
    top: 15%;
    left: 50%;
  }

  #card-element {
    box-sizing: border-box;
    height: 40px;
    padding: 10px 12px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 1px 3px 0 #606368;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
</style>