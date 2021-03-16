<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";


export default {
  page: {
    title: "Reports",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    vueDropzone: vue2Dropzone,
    Layout,
    PageHeader,
  },
  data() {
    return {
      backendURL: process.env.VUE_APP_BACKEND_URL,
      configData: {},
      general_config: {
        id: "",
        domain:{},
        https_enabled: false,
        page: {},
        country: {},
        state: "",
        city: "",
        street_address: "",
        postalcode: "",
        allowed_countries: [],
        language_dropdown_enabled: false,
        currency: {},
        allowed_currencies: [],
        general_contact: "",
        sales_contact: "",
        support_contact: "",
        custom_contact: ""
      },
      catalog_config: {
         id: "",
         layout: {},
         products_per_page: 0,
         allow_all_products: false,
         sort_options: [],
         default_sort_option: {},
         use_canonical_link_category: false,
         product_reviews_enabled: false,
         allow_guest_reviews: false,
         use_categories_path_for_url: false,
         use_canonical_link_product: false,
         tax_display_option: {},
         hide_prices: false,
         display_out_of_stock_products: false,
         display_stock_number: false,
         enable_backborders: false,
         out_of_stock_threshold: 0,
         product_placeholder_image: ""
      },
      customer_config: {
        id: "",
        group: {},
        welcome_email_enabled: false,
        welcome_email_sender: "",
        signup_confirmation_email_enabled: false,
        dashboard_redirection_enabled: false
      },
      advanced_config:{
        id: "",
        session_lifetime_seconds: 0,
        minify_html: false,
        merge_html: false,
        merge_javascript: false,
        minify_javascript: false,
        merge_css: false,
        minify_css: false
      },
      sales_config:{
        id: "",
        order_emails_enabled: false,
        order_email_copy_to: "",
        order_email_sender: "",
        invoice_emails_enabled: false,
        invoice_email_copy_to: "",
        invoice_email_sender: "",
        shipment_emails_enabled: false,
        shipment_email_copy_to: "",
        shipment_email_sender: "",
        refund_emails_enabled: false,
        refund_email_copy_to: "",
        refund_email_sender: "",
        tax_enabled: false,
        tax_rate_based_on: {},
        tax_calculation_based_on: {},
        tax_discount_calculation: {},
        cart_enabled: false,
        price_display: {},
        allow_guest_checkout: false,
        address_autocomplete_enabled: false,
        minimum_order_amount: 0,
        checkout_terms: "",
        stripe: {
          allowed_countries:[],
          card_payment: {},
          apple_pay: {},
          ali_pay: {},
          stripe_subscription: {},
          we_chat: {}
        },
        paypal: {allowed_countries:[]},
        on_account: {allowed_countries:[]},
        flat_rate: {allowed_countries:[]},
        free_shipping: {allowed_countries:[]},
        table_rates: {conditions:[] , allowed_countries:[]},
        ups: {allowed_delivery_methods:[] , allowed_countries:[]},
        fedex: {allowed_methods:[] , allowed_countries:[]},
        dhl: {sizes:[] ,allowed_document_methods:[],allowed_non_document_methods:[],allowed_countries:[]}
      },
      shippingServiceData: {
        ups: {
            types: [],
            shipment_origins: [],
            container_types: [],
            destination_types: [],
            delivery_methods: []
        },
        fedex: {
            package_request_types: [],
            packaging_types: [],
            dropoffs: [],
            destination_types: [],
            allowed_methods: []
        },
        dhl: {
            content_types: [],
            size_categories: [],
            allowed_document_methods: [],
            allowed_non_document_methods: []
        }
      },
      domains: [],
      pages: [],
      countries: [],
      currencies: [],
      customerGroups: [],
      layouts: [],
      sortOptions: [],
      taxDisplayOptions: [],
      taxRateBasedOns: [],
      taxCalculationBasedOns: [],
      taxDiscountCalculations: [],
      tableRateFile: '',
      title: "Configuration",
      items: [
        {
          text: "Settings",
        },
        {
          text: "Configuration",
          active: true
        }
      ],
      dropzoneOptions: {
        url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/stores/catalog/upload`,
        // thumbnailWidth: 75,
        paramName: "product_placeholder_image",
        maxFilesize: 200
        // headers: {"SomeHeader": "some value"},
      }
    };
  },
  computed: {
  },
  mounted() {
    axios
    .get(`${this.backendURL}/api/v1/stores/general`)
    .then(response => {
      this.general_config = response.data.data
      if (this.general_config.domain == null){
        this.general_config.domain = {};
      }
      if (this.general_config.page == null){
        this.general_config.page = {};
      }
      if (this.general_config.country == null){
        this.general_config.country = {};
      }
      if (this.general_config.currency == null){
        this.general_config.currency = {};
      }
      if (this.general_config.allowed_countries == null){
        this.general_config.allowed_countries = [];
      }
      if (this.general_config.allowed_currencies == null){
        this.general_config.allowed_currencies = [];
      }
     });
     axios
    .get(`${this.backendURL}/api/v1/stores/catalog`)
    .then(response => {
        this.catalog_config = response.data.data
        if (this.catalog_config.layout == null){
          this.catalog_config.layout = {};
        }
        if (this.catalog_config.default_sort_option == null){
          this.catalog_config.default_sort_option = {};
        }
        if (this.catalog_config.tax_display_option == null){
          this.catalog_config.tax_display_option = {};
        }

    });
     axios
    .get(`${this.backendURL}/api/v1/stores/sales`)
    .then(response => {
        this.sales_config = response.data.data;
        if (this.sales_config.tax_rate_based_on == null){
          this.sales_config.tax_rate_based_on = {};
        }
        if (this.sales_config.tax_calculation_based_on == null){
          this.sales_config.tax_calculation_based_on = {};
        }
        if (this.sales_config.tax_rate_based_on == null){
          this.sales_config.tax_rate_based_on = {};
        }
        if (this.sales_config.tax_calculation_based_on == null){
          this.sales_config.tax_calculation_based_on = {};
        }
        if (this.sales_config.price_display == null){
          this.sales_config.price_display = {};
        }
        if (this.sales_config.stripe == null){
          this.sales_config.stripe = {allowed_countries:[]};
        }
        if (this.sales_config.paypal == null){
          this.sales_config.paypal = {allowed_countries:[]};
        }
        if (this.sales_config.on_account == null){
          this.sales_config.on_account = {allowed_countries:[]};
        }
        if (this.sales_config.flat_rate == null){
          this.sales_config.flat_rate = {allowed_countries:[]};
        }
        if (this.sales_config.free_shipping == null){
          this.sales_config.free_shipping = {allowed_countries:[]};
        }
        if (this.sales_config.table_rates == null){
          this.sales_config.table_rates = {conditions:[] , allowed_countries:[]};
        }
        if (this.sales_config.ups == null){
          this.sales_config.ups = {allowed_delivery_methods:[] , allowed_countries:[]};
        }
        if (this.sales_config.fedex == null){
          this.sales_config.fedex = {allowed_methods:[] , allowed_countries:[]};
        }
        if (this.sales_config.dhl == null){
          this.dhl = {sizes:[] ,allowed_document_methods:[],allowed_non_document_methods:[],allowed_countries:[]};
        }

     });
    axios
    .get(`${this.backendURL}/api/v1/stores/customer`)
    .then(response => {
        this.customer_config = response.data.data
        if (this.customer_config.group == null){
          this.customer_config.group = {};
        }
    });
    axios
    .get(`${this.backendURL}/api/v1/stores/advanced`)
    .then(response => (this.advanced_config = response.data.data));
    axios
    .get(`${this.backendURL}/api/v1/domains?per_page=-1`)
    .then(response => (this.domains = response.data.data));
    axios
    .get(`${this.backendURL}/api/v1/pages?per_page=-1`)
    .then(response => (this.pages = response.data.data));
    axios
    .get(`${this.backendURL}/api/v1/areas/countries`)
    .then(response => (this.countries = response.data.data));
    axios
    .get(`${this.backendURL}/api/v1/currencies`)
    .then(response => (this.currencies = response.data.data));
    axios
    .get(`${this.backendURL}/api/v1/customers/groups?per_page=-1`)
    .then(response => (this.customerGroups = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/pages/layouts`)
    .then(response => (this.layouts = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/pages/sort-options`)
    .then(response => (this.sortOptions = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/tax/displays`)
    .then(response => (this.taxDisplayOptions = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/tax/rate-bases`)
    .then(response => (this.taxRateBasedOns = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/tax/calculation-bases`)
    .then(response => (this.taxCalculationBasedOns = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/tax/discount-calculations`)
    .then(response => (this.taxDiscountCalculations = response.data.data))
    axios
    .get(`${this.backendURL}/api/v1/shipping/services`)
    .then(response => (this.shippingServiceData = response.data.data))
  },
  methods:{
    isCountryAllowed(id){
      var i;
      for (i in this.general_config.allowed_countries){
        if ( this.general_config.allowed_countries[i].id == id){
          return true;
        }
      }
      return false;
    },
    isCurrencyAllowed(id){
      var i;
      for (i in this.general_config.allowed_currencies){
        if ( this.general_config.allowed_currencies[i].id == id){
          return true;
        }
      }
      return false;
    },
    saveGeneralConfiguration(){
      this.configData = {
        domain_id: this.general_config.domain.id,
        https_enabled: this.general_config.https_enabled,
        page_id: this.general_config.page.id,
        country_id: this.general_config.country.id,
        state: this.general_config.state,
        city: this.general_config.city,
        street_address: this.general_config.street_address,
        postalcode: this.general_config.postalcode,
        allowed_country_ids: [],
        language_dropdown_enabled: this.general_config.language_dropdown_enabled,
        currency_id: this.general_config.currency.id,
        allowed_currency_ids: [],
        general_contact: this.general_config.general_contact,
        sales_contact: this.general_config.sales_contact,
        support_contact: this.general_config.support_contact,
        custom_contact: this.general_config.custom_contact
      };

      var i;
      for (i in this.general_config.allowed_countries){
        this.configData.allowed_country_ids.push(this.general_config.allowed_countries[i].id)
      }
      for (i in this.general_config.allowed_currencies){
        this.configData.allowed_currency_ids.push(this.general_config.allowed_currencies[i].id)
      }
      
      axios
      .post(`${this.backendURL}/api/v1/stores/general` , this.configData)
      .then(response => {
        this.configData = {};
        alert(`${response.data.data.id} Updated General Configuration!`);
       })
    },
    saveCatalogConfiguration(){
       this.configData = {
        layout_id: this.catalog_config.layout.id,
        products_per_page: parseInt(this.catalog_config.products_per_page),
        allow_all_products: this.catalog_config.allow_all_products,
        sort_ids: [],
        default_sort_id: this.catalog_config.default_sort_option.id,
        use_canonical_link_category: this.catalog_config.use_canonical_link_category,
        product_reviews_enabled: this.catalog_config.product_reviews_enabled,
        allow_guest_reviews: this.catalog_config.allow_guest_reviews,
        use_categories_path_for_url: this.catalog_config.use_categories_path_for_url,
        use_canonical_link_product: this.catalog_config.use_canonical_link_product,
        price_display_id: this.catalog_config.tax_display_option.id,
        hide_prices: this.catalog_config.hide_prices,
        display_out_of_stock_products: this.catalog_config.display_out_of_stock_products,
        display_stock_number: this.catalog_config.display_stock_number,
        enable_backborders: this.catalog_config.enable_backborders,
        out_of_stock_threshold: parseInt(this.catalog_config.out_of_stock_threshold)
      }

      var i;
      for (i in this.catalog_config.sort_options){
        this.configData.sort_ids.push(this.catalog_config.sort_options[i].id);
      }

      axios
      .post(`${this.backendURL}/api/v1/stores/catalog` , this.configData)
      .then(response => {
        this.configData = {};
        alert(`${response.data.data.id} Updated Catalog Configuration!`);
        })
    },
    saveSalesConfiguration(){
      this.configData = {
          order_emails_enabled: this.sales_config.order_emails_enabled,
          order_email_copy_to: this.sales_config.order_email_copy_to,
          order_email_sender: this.sales_config.order_email_sender,
          invoice_emails_enabled: this.sales_config.invoice_emails_enabled,
          invoice_email_copy_to: this.sales_config.invoice_email_copy_to,
          invoice_email_sender: this.sales_config.invoice_email_sender,
          shipment_emails_enabled: this.sales_config.shipment_emails_enabled,
          shipment_email_copy_to: this.sales_config.shipment_email_copy_to,
          shipment_email_sender: this.sales_config.shipment_email_sender,
          refund_emails_enabled: this.sales_config.refund_emails_enabled,
          refund_email_copy_to: this.sales_config.refund_email_copy_to,
          refund_email_sender: this.sales_config.refund_email_sender,
          tax_enabled: this.sales_config.tax_enabled,
          tax_rate_based_on_id: this.sales_config.tax_rate_based_on.id,
          tax_calculation_based_on_id: this.sales_config.tax_calculation_based_on.id,
          tax_discount_calculation_id: this.sales_config.tax_discount_calculation.id,
          cart_enabled: this.sales_config.cart_enabled,
          price_display_id: this.sales_config.price_display.id,
          allow_guest_checkout: this.sales_config.allow_guest_checkout,
          address_autocomplete_enabled: this.sales_config.address_autocomplete_enabled,
          minimum_order_amount: parseInt(this.sales_config.minimum_order_amount),
          checkout_terms: this.sales_config.checkout_terms,
          stripe: this.sales_config.stripe,
          paypal: this.sales_config.paypal,
          on_account: this.sales_config.on_account,
          flat_rate: this.sales_config.flat_rate,
          free_shipping: this.sales_config.free_shipping,
          table_rates: this.sales_config.table_rates,
          ups: this.sales_config.ups,
          fedex: this.sales_config.fedex,
          dhl: this.sales_config.dhl
      }

      axios
      .post(`${this.backendURL}/api/v1/stores/sales` , this.configData)
      .then(response => {
          this.configData = {};
          alert(`${response.data.data.id} Updated Sales Configuration!`);
          this.uploadTableRateFile();

        })
      
    },
    uploadTableRateFile(){
       if (this.tableRateFile != ''){
            let formData = new FormData();
            formData.append('rate_file' , this.tableRateFile);
            axios
            .post(`${this.backendURL}/api/v1/stores/sales/upload` , formData , {
                headers:{
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(response => {
              alert(`${response.data.data.id} Upload Sales Configuration Table Rate File!`);
              });
       }
    },
    saveCustomerConfiguration(){
      this.configData = {
        group_id: this.customer_config.group.id,
        welcome_email_enabled: this.customer_config.welcome_email_enabled,
        welcome_email_sender: this.customer_config.welcome_email_sender,
        signup_confirmation_email_enabled: this.customer_config.signup_confirmation_email_enabled,
        dashboard_redirection_enabled: this.customer_config.dashboard_redirection_enabled
      }
      axios
      .post(`${this.backendURL}/api/v1/stores/customer` , this.configData)
      .then(response => {
        this.configData = {};
        alert(`${response.data.data.id} Updated Customer Configuration!`);
        })
    },
    saveAdvancedConfiguration(){
      this.configData = {
        session_lifetime_seconds: parseInt(this.advanced_config.session_lifetime_seconds),
        minify_html: this.advanced_config.minify_html,
        merge_html: this.advanced_config.merge_html,
        merge_javascript: this.advanced_config.merge_javascript,
        minify_javascript: this.advanced_config.minify_javascript,
        merge_css: this.advanced_config.merge_css,
        minify_css: this.advanced_config.minify_css
      }
      axios
      .post(`${this.backendURL}/api/v1/stores/advanced` , this.configData)
      .then(response => {
        this.configData = {};
        alert(`${response.data.data.id} Updated Advanced Configuration!`);
       })
    },
    isSortOption(id){
      var i;
      for (i in this.catalog_config.sort_options){
        if ( this.catalog_config.sort_options[i].id == id){
          return true;
        }
      }
      return false;
    },
    handleFileUpload(){
      this.tableRateFile = this.$refs.file.files[0];
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        
        <div class="card configuration-tabs">
          <div class="card-body">
            <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">General</span>
                </template>

                <b-button v-b-modal.modal-scrollable variant="primary" @click="saveGeneralConfiguration()">
                    <i class="mdi mdi-plus mr-1"></i> Save
                </b-button>
                
                <div class="card-body">
                  <h4 class="card-title mb-3">Store</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Domain</label>
                       <select class="form-control" v-model="general_config.domain.id">
                          <option v-for="domain in domains" v-bind:value="domain.id" :key="domain.id" :selected="general_config.domain.id == domain.id">{{domain.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Enable HTTPS</label>
                      <b-form-checkbox switch size="lg" v-model="general_config.https_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Default Homepage</label>
                      <select class="form-control" v-model="general_config.page.id">
                        <option v-for="page in pages" v-bind:value="page.id" :key="page.id" :selected="general_config.page.id == page.id">{{page.title}}</option>
                      </select>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Store Information</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Store Country</label>
                      <select class="form-control" v-model="general_config.country.id"> 
                        <option v-for="country in countries" v-bind:value="country.id" :key="country.id" :selected="general_config.country.id == country.id">{{country.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Store State / Region</label>
                      <b-form-input for="text" v-model="general_config.state" v-bind:value="general_config.state"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>City</label>
                      <b-form-input for="text" v-model="general_config.city" v-bind:value="general_config.city"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Street Address</label>
                      <b-form-input for="text" v-model="general_config.street_address" v-bind:value="general_config.street_address"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Zip / Postal Code</label>
                      <b-form-input for="text" v-model="general_config.postalcode" v-bind:value="general_config.postalcode"></b-form-input>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Country Options</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Allow Countries</label>
                      <select class="form-control" multiple v-model="general_config.allowed_countries">
                        <option v-for="country in countries" v-bind:value="country" :key="country.id" :selected="isCountryAllowed(country.id)">{{country.name}}</option>
                      </select>
                    </div>
                     <div class="col-md-3">
                      <label>Enable Language Dropdown</label>
                      <b-form-checkbox switch size="lg" v-model="general_config.language_dropdown_enabled"></b-form-checkbox>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Currency Options</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Default Currency</label>
                      <select class="form-control" v-model="general_config.currency.id">
                        <option v-for="currency in currencies" v-bind:value="currency.id" :key="currency.id" :selected="general_config.currency.id == currency.id">{{currency.name}}</option>
                      </select>
                    </div>
                   <div class="col-md-3">
                      <label>Allow Currency</label>
                      <select class="form-control" multiple v-model="general_config.allowed_currencies"> 
                        <option v-for="currency in currencies" v-bind:value="currency" :key="currency.id" :selected="isCurrencyAllowed(currency.id)">{{currency.name}}</option>
                      </select>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Store Email Addresses</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>General Contact</label>
                      <b-form-input for="text" v-model="general_config.general_contact" v-bind:value="general_config.general_contact"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Sales Contact</label>
                      <b-form-input for="text" v-model="general_config.sales_contact" v-bind:value="general_config.sales_contact"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Support Contact</label>
                      <b-form-input for="text" v-model="general_config.support_contact" v-bind:value="general_config.support_contact"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Custom Contact</label>
                      <b-form-input for="text" v-model="general_config.custom_contact" v-bind:value="general_config.custom_contact"></b-form-input>
                    </div>
                  </div>
                </div>
                
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Catalog</span>
                </template>

                <b-button v-b-modal.modal-scrollable variant="primary" @click="saveCatalogConfiguration()">
                    <i class="mdi mdi-plus mr-1"></i> Save
                </b-button>
                
                <div class="card-body">
                  <h4 class="card-title mb-3">Category Pages</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Layout</label>
                      <select class="form-control" v-model="catalog_config.layout.id">
                        <option v-for="layout in layouts" v-bind:value="layout.id" :key="layout.id" :selected="catalog_config.layout.id  == layout.id">{{layout.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Products Per Page</label>
                      <b-form-input for="text" v-model="catalog_config.products_per_page"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Allow All Products</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.allow_all_products"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Sort By Options</label>
                      <select class="form-control" multiple v-model="catalog_config.sort_options">
                        <option v-for="sortOption in sortOptions" v-bind:value="sortOption" :key="sortOption.id" :selected="isSortOption(sortOption.id)">{{sortOption.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Default Sort By</label>
                      <select class="form-control" v-model="catalog_config.default_sort_option.id">
                        <option v-for="sortOption in sortOptions" v-bind:value="sortOption.id" :key="sortOption.id" :selected="catalog_config.default_sort_option.id == sortOption.id">{{sortOption.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Use Canonical Link</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.use_canonical_link_category"></b-form-checkbox>
                    </div>
                  </div>

                  <h4 class="card-title mb-3">Product Pages</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Product Placeholder</label>
                      <vue-dropzone
                        id="dropzone"
                        ref="myVueDropzone"
                        :use-custom-slot="true"
                        :options="dropzoneOptions"
                        v-model="catalog_config.product_placeholder_image"

                      >
                        <div class="dropzone-custom-content">
                          <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </vue-dropzone>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Prodcut Reviews</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.product_reviews_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Allow Guest Reviews</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.allow_guest_reviews"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Use Categories Path For URL</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.use_categories_path_for_url"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Use Canonical Link</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.use_canonical_link_product"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Display Tax</label>
                      <select class="form-control" v-model="catalog_config.tax_display_option.id">
                        <option v-for="taxDisplayOption in taxDisplayOptions" v-bind:value="taxDisplayOption.id" :key="taxDisplayOption.id" :selected="catalog_config.tax_display_option.id == taxDisplayOption.id">{{taxDisplayOption.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Hide Pries for non-logged in customers</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.hide_prices"></b-form-checkbox>
                    </div>
                  </div>

                  <h4 class="card-title mb-3">Inventory</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Display Out Of Stock Products</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.display_out_of_stock_products"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Display Stock Number On Storefront</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.display_stock_number"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Backorders</label>
                      <b-form-checkbox switch size="lg" v-model="catalog_config.enable_backborders"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Out Of Stock Threshold</label>
                      <b-form-input for="text" v-model="catalog_config.out_of_stock_threshold"></b-form-input>
                    </div>
                  </div>
                </div>

              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Sales</span>
                </template>

                <b-button v-b-modal.modal-scrollable variant="primary" @click="saveSalesConfiguration()">
                    <i class="mdi mdi-plus mr-1"></i> Save
                </b-button>

                <div class="card-body">
                  <h4 class="card-title mb-3">Sales Email</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Enable Order Emails</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.order_emails_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Send Order Email Copy To</label>
                      <b-form-input for="text" v-model="sales_config.order_email_copy_to"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Order Email Sender</label>
                      <select class="form-control" v-model="sales_config.order_email_sender">
                        <option value="general_contact">General Contact</option>
                        <option value="sales_contact">Sales Contact</option>
                        <option value="support_contact">Support Contact</option>
                        <option value="custom_contact">Custom Contact</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Invoice Emails</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.invoice_emails_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Send Invoice Email Copy To</label>
                      <b-form-input for="text" v-model="sales_config.invoice_email_copy_to"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Invoice Email Sender</label>
                      <select class="form-control" v-model="sales_config.invoice_email_sender">
                        <option value="general_contact">General Contact</option>
                        <option value="sales_contact">Sales Contact</option>
                        <option value="support_contact">Support Contact</option>
                        <option value="custom_contact">Custom Contact</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Shipment Emails</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.shipment_emails_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Send Shipment Email Copy To</label>
                      <b-form-input for="text" v-model="sales_config.shipment_email_copy_to"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Shipment Email Sender</label>
                      <select class="form-control" v-model="sales_config.shipment_email_sender">
                       <option value="general_contact">General Contact</option>
                        <option value="sales_contact">Sales Contact</option>
                        <option value="support_contact">Support Contact</option>
                        <option value="custom_contact">Custom Contact</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Refund Emails</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.refund_emails_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Send Refund Email Copy To</label>
                      <b-form-input for="text" v-model="sales_config.refund_email_copy_to"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Refund Email Sender</label>
                      <select class="form-control" v-model="sales_config.refund_email_sender">
                        <option value="general_contact">General Contact</option>
                        <option value="sales_contact">Sales Contact</option>
                        <option value="support_contact">Support Contact</option>
                        <option value="custom_contact">Custom Contact</option>
                      </select>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Tax</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Enabled</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.tax_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Tax Rate Based On</label>
                      <select class="form-control" v-model="sales_config.tax_rate_based_on.id">
                        <option v-for="taxRateBasedOn in taxRateBasedOns" v-bind:value="taxRateBasedOn.id" :key="taxRateBasedOn.id" :selected="sales_config.tax_rate_based_on.id == taxRateBasedOn.id">{{taxRateBasedOn.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Tax Calculation Based On</label>
                      <select class="form-control" v-model="sales_config.tax_calculation_based_on.id">
                        <option v-for="taxCalculationBasedOn in taxCalculationBasedOns" v-bind:value="taxCalculationBasedOn.id" :key="taxCalculationBasedOn.id" :selected="sales_config.tax_calculation_based_on.id == taxCalculationBasedOn.id">{{taxCalculationBasedOn.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Discount Tax Calculation</label>
                      <select class="form-control" v-model="sales_config.tax_discount_calculation.id">
                        <option v-for="taxDiscountCalculation in taxDiscountCalculations" v-bind:value="taxDiscountCalculation.id" :key="taxDiscountCalculation.id" :selected="sales_config.tax_discount_calculation.id == taxDiscountCalculation.id">{{taxDiscountCalculation.name}}</option>
                      </select>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Cart</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Enabled</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.cart_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Show Prices</label>
                      <select class="form-control" v-model="sales_config.price_display.id">
                         <option v-for="taxDisplayOption in taxDisplayOptions" v-bind:value="taxDisplayOption.id" :key="taxDisplayOption.id" :selected="sales_config.price_display.id == taxDisplayOption.id">{{taxDisplayOption.name}}</option>
                      </select>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Checkout</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Allow Guest Checkout</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.allow_guest_checkout"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Address Autocomplete</label>
                      <b-form-checkbox switch size="lg" v-model="sales_config.address_autocomplete_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Minimum Order Amount</label>
                      <b-form-input for="text" v-model="sales_config.minimum_order_amount"></b-form-input>
                    </div>
                    <div class="col-md-3">
                      <label>Terms And Conditions On Checkout</label>
                       <textarea 
                          class="form-control"
                          :maxlength="225"
                          rows="3"
                          placeholder="This textarea has a limit of 225 chars."
                          v-model="sales_config.checkout_terms"
                        ></textarea>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Shipping Methods</h4>
                  <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
                    <b-tab active>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">Flat Rate</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                            <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.flat_rate.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.flat_rate.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Price</label>
                            <b-form-input for="text" v-model="sales_config.flat_rate.price"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Charge Calulation</label>
                            <select class="form-control" v-model="sales_config.flat_rate.charge_calculation">
                              <option value="per_order">Per Order</option>
                              <option value="per_item">Per Item</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handling Fee</label>
                            <b-form-input for="text" v-model="sales_config.flat_rate.handling_fee"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.flat_rate.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                              
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.flat_rate.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>

                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">Free Shipping</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                           <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.free_shipping.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.free_shipping.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Minimum Order Amount</label>
                            <b-form-input for="text" v-model="sales_config.free_shipping.minimum_order_amount"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.free_shipping.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.free_shipping.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>

                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">Table Rates</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                           <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.table_rates.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.table_rates.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Condition</label>
                            <select class="form-control" multiple v-model="sales_config.table_rates.conditions">
                              <option value="package_weight">Weight vs. Destination</option>
                              <option value="package_value">Price vs. Destination</option>
                              <option value="package_qty"># of Items vs. Destination</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Upload Rates</label>
                            <div class="custom-file">
                              <input id="customerFile" type="file" ref="file" class="custom-file-input" v-on:change="handleFileUpload()" />
                              <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.table_rates.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handliing Fee</label>
                            <b-form-input for="text" v-model="sales_config.table_rates.handling_fee"></b-form-input>
                          </div>
                          <!-- <div class="col-md-3">
                            <label>Handliing Fee</label>
                            <select class="form-control">
                              <option>Fixed</option>
                              <option>Percent</option>
                            </select>
                          </div> -->
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.table_rates.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>

                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">UPS</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                            <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.ups.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.ups.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Type</label>
                            <select class="form-control" v-model="sales_config.ups.type">
                              <option v-for="type in shippingServiceData.ups.types" v-bind:value="type" :key="type">{{type}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Mode</label>
                            <select class="form-control" v-model="sales_config.ups.mode">
                              <option value="live">Live</option>
                              <option value="sandbox" selected="selected">Sandbox</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Access License Number</label>
                            <b-form-input for="text" v-model="sales_config.ups.access_license_number"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>User ID</label>
                            <b-form-input for="text" v-model="sales_config.ups.user_id"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Password</label>
                            <b-form-input for="text" v-model="sales_config.ups.password"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Shipper Number</label>
                            <b-form-input for="text" v-model="sales_config.ups.shipper_number"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Enable Negotiated Rates</label>
                            <select class="form-control" v-model="sales_config.ups.negotiated_rates_enabled">
                              <option value="false" :selected="sales_config.ups.negotiated_rates_enabled == false">No</option>
                              <option value="true" :selected="sales_config.ups.negotiated_rates_enabled == true">Yes</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Shipment Origin</label>
                            <select class="form-control" v-model="sales_config.ups.shipment_origin">
                              <option v-for="so in shippingServiceData.ups.shipment_origins" v-bind:value="so" :key="so">{{so}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Container</label>
                            <select class="form-control" v-model="sales_config.ups.container">
                              <option v-for="ct in shippingServiceData.ups.container_types" v-bind:value="ct" :key="ct">{{ct}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Destination Type</label>
                            <select class="form-control" v-model="sales_config.ups.destination_type">
                              <option v-for="dt in shippingServiceData.ups.destination_types" v-bind:value="dt" :key="dt">{{dt}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Shipper Number</label>
                            <b-form-input for="text" v-model="sales_config.ups.shipper_number"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Maximum Package Weight</label>
                            <b-form-input for="text" v-model="sales_config.ups.maximum_package_weight"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Minimum Package Weight</label>
                            <b-form-input for="text" v-model="sales_config.ups.minimum_package_weight"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Calculate Handling Fee</label>
                            <select class="form-control" v-model="sales_config.ups.handling_fee_calculation">
                              <option value="flat">Fixed</option>
                              <option value="percent">Percent</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handliing Applied</label>
                            <select class="form-control" v-model="sales_config.ups.handling_condition">
                              <option value="per_order">Per Order</option>
                              <option value="per_item">Per Item</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handling Fee</label>
                            <b-form-input for="text" v-model="sales_config.handling_fee"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Delivery Methods</label>
                            <select class="form-control" multiple v-model="sales_config.ups.allowed_delivery_methods">
                              <option v-for="dm in shippingServiceData.ups.delivery_methods" v-bind:value="dm" :key="dm">{{dm}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Allow Free Shipping</label>
                            <select class="form-control" v-model="sales_config.ups.free_shipping_allowed">
                              <option value="false" :selected="sales_config.ups.free_shipping_allowed == false">No</option>
                              <option value="true" :selected="sales_config.ups.free_shipping_allowed == true">Yes</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Free Shipping Minimum Order Amount</label>
                            <b-form-input for="text" v-model="sales_config.ups.free_shipping_minimum_order_amount"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.ups.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.ups.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>

                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">FedEx</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                            <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.fedex.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.fedex.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Account ID</label>
                            <b-form-input for="text" v-model="sales_config.fedex.account_id"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Meter Number</label>
                            <b-form-input for="text" v-model="sales_config.fedex.meter_number"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Key</label>
                            <b-form-input for="text" v-model="sales_config.fedex.key"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Password</label>
                            <b-form-input for="text" v-model="sales_config.fedex.password"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Mode</label>
                            <select class="form-control" v-model="sales_config.fedex.mode">
                              <option value="sandbox" selected="selected">Sandbox</option>
                              <option value="live">Live</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Packages Request Type</label>
                            <select class="form-control" v-model="sales_config.fedex.package_request_type">
                              <option v-for="prt in shippingServiceData.fedex.package_request_types" v-bind:value="prt" :key="prt">{{prt}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Packaging</label>
                            <select class="form-control" v-model="sales_config.fedex.packaging_type">
                              <option v-for="pt in shippingServiceData.fedex.packaging_types" v-bind:value="pt" :key="pt">{{pt}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Dropoff</label>
                            <select class="form-control" v-model="sales_config.fedex.dropoff">
                              <option v-for="dropoff in shippingServiceData.fedex.dropoffs" v-bind:value="dropoff" :key="dropoff">{{dropoff}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Maximum Package Weight</label>
                            <b-form-input for="text" v-model="sales_config.fedex.maximum_package_weight"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Calculate Handling Fee</label>
                            <select class="form-control" v-model="sales_config.fedex.handling_fee_calculation">
                              <option value="flat">Fixed</option>
                              <option value="percent">Percent</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handliing Applied</label>
                            <select class="form-control" v-model="sales_config.fedex.handling_condition">
                              <option value="per_order">Per Order</option>
                              <option value="per_item">Per Item</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handling Fee</label>
                            <b-form-input for="text" v-model="sales_config.fedex.handling_fee"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Destination Type</label>
                            <select class="form-control" v-model="sales_config.fedex.destination_type">
                              <option v-for="dt in shippingServiceData.fedex.destination_types" v-bind:value="dt" :key="dt">{{dt}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Methods</label>
                            <select class="form-control" multiple v-model="sales_config.fedex.allowed_methods"> 
                             <option v-for="method in shippingServiceData.fedex.allowed_methods" v-bind:value="method" :key="method">{{method}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Allow Free Shipping</label>
                            <select class="form-control" v-model="sales_config.fedex.free_shipping_allowed">
                              <option value="false" :selected="sales_config.fedex.free_shipping_allowed == false">No</option>
                              <option value="true" :selected="sales_config.fedex.free_shipping_allowed == true">Yes</option>
                            </select>
                          </div>
                          <!-- <div class="col-md-3">
                            <label>Free Shipping Method</label>
                            <select class="form-control">
                              <option value="no" selected="selected">No</option>
                              <option value="yes">Yes</option>
                            </select>
                          </div> -->
                          <div class="col-md-3">
                            <label>Free Shipping Minimum Order Amount</label>
                            <b-form-input for="text" v-model="sales_config.fedex.free_shipping_minimum_order_amount"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.fedex.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.fedex.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>

                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">DHL</span>
                      </template>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                            <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.dhl.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.dhl.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Access ID</label>
                            <b-form-input for="text" v-model="sales_config.dhl.access_id"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Password</label>
                            <b-form-input for="text" v-model="sales_config.dhl.password"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Account Number</label>
                            <b-form-input for="text" v-model="sales_config.dhl.account_number"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Content Type</label>
                            <select class="form-control" v-model="sales_config.dhl.content_type">
                              <option v-for="ct in shippingServiceData.dhl.content_types" v-bind:value="ct" :key="ct">{{ct}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Calculate Handling Fee</label>
                            <select class="form-control" v-model="sales_config.dhl.handling_fee_calculation">
                              <option value="flat">Fixed</option>
                              <option value="percent">Percent</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handliing Applied</label>
                            <select class="form-control" v-model="sales_config.dhl.handling_condition">
                              <option value="per_order">Per Order</option>
                              <option value="per_item">Per Item</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Handling Fee</label>
                            <b-form-input for="text" v-model="sales_config.dhl.handling_fee"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Size</label>
                            <select class="form-control" multiple v-model="sales_config.dhl.sizes">
                              <option v-for="sc in shippingServiceData.dhl.size_categories" v-bind:value="sc" :key="sc">{{sc}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Documents Allowed Methods</label>
                            <select class="form-control" multiple v-model="sales_config.dhl.allowed_document_methods">
                              <option v-for="adm in shippingServiceData.dhl.allowed_document_methods" v-bind:value="adm" :key="adm">{{adm}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Non Documents Allowed Methods</label>
                            <select class="form-control" multiple v-model="sales_config.dhl.allowed_non_document_methods">
                              <option v-for="adm in shippingServiceData.dhl.allowed_non_document_methods" v-bind:value="adm" :key="adm">{{adm}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Allow Free Shipping</label>
                            <select class="form-control" v-model="sales_config.dhl.free_shipping_allowed">
                              <option value="false" :selected="sales_config.dhl.free_shipping_allowed == false">No</option>
                              <option value="true" :selected="sales_config.dhl.free_shipping_allowed == true">Yes</option>
                            </select>
                          </div>
                          <!-- <div class="col-md-3">
                            <label>Free Shipping Method</label>
                            <select class="form-control">
                              <option value="no" selected="selected">No</option>
                              <option value="yes">Yes</option>
                            </select>
                          </div> -->
                          <div class="col-md-3">
                            <label>Free Shipping Minimum Order Amount</label>
                            <b-form-input for="text" v-model="sales_config.dhl.free_shipping_minimum_order_amount"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.dhl.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.dhl.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs>
                  <h4 class="card-title mb-3">Payment Methods</h4>
                  <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
                    <b-tab active>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">Stripe</span>
                      </template>

                      <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                              <label>Enabled</label>
                              <b-form-checkbox switch size="lg" v-model="sales_config.stripe.enabled"></b-form-checkbox>
                            </div>
                            <div class="col-md-3">
                              <label>Mode</label>
                              <select class="form-control" v-model="sales_config.stripe.mode">
                                <option value="live">Live</option>
                                <option value="sandbox">Sandbox</option>
                              </select>
                            </div>
                            <div class="col-md-3">
                              <label>Live Publishable Key</label>
                              <b-form-input for="text" v-model="sales_config.stripe.live_publishable_api_key"></b-form-input>
                            </div>
                            <div class="col-md-3">
                              <label>Live Secret API Key</label>
                              <b-form-input for="text" v-model="sales_config.stripe.live_secret_api_key"></b-form-input>
                            </div>
                            <div class="col-md-3">
                              <label>Live Webhooks Signing Secret</label>
                              <b-form-input for="text" v-model="sales_config.stripe.live_webhooks_signing_secret"></b-form-input>
                            </div>
                            <div class="col-md-3">
                              <label>Sandbox Publishable Key</label>
                              <b-form-input for="text" v-model="sales_config.stripe.sandbox_publishable_api_key"></b-form-input>
                            </div>
                            <div class="col-md-3">
                              <label>Sandbox Secret API Key</label>
                              <b-form-input for="text" v-model="sales_config.stripe.sandbox_secret_api_key"></b-form-input>
                            </div>
                            <div class="col-md-3">
                              <label>Sandbox Webhooks Signing Secret</label>
                              <b-form-input for="text" v-model="sales_config.stripe.sandbox_webhooks_signing_secret"></b-form-input>
                            </div>
                            <div class="col-md-3">
                              <label>Allowed Countries</label>
                              <select class="form-control" multiple v-model="sales_config.stripe.allowed_countries">
                                <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                              </select>
                            </div>
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Stripe Payments</th>
                                    <th>Method Title</th>
                                    <th>Enabled</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">Card Payments</th>
                                    <td><b-form-input for="text" v-model="sales_config.stripe.card_payment.method_title"></b-form-input></td>
                                    <td><b-form-checkbox switch size="lg" v-model="sales_config.stripe.card_payment.enabled"></b-form-checkbox></td>
                                    <td><i class="bx bx-edit-alt"></i></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Apple Pay</th>
                                    <td><b-form-input for="text" v-model="sales_config.stripe.apple_pay.method_title"></b-form-input></td>
                                    <td><b-form-checkbox switch size="lg" v-model="sales_config.stripe.apple_pay.enabled"></b-form-checkbox></td>
                                    <td><i class="bx bx-edit-alt"></i></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Ali Pay</th>
                                    <td><b-form-input for="text" v-model="sales_config.stripe.ali_pay.method_title"></b-form-input></td>
                                    <td><b-form-checkbox switch size="lg" v-model="sales_config.stripe.ali_pay.enabled"></b-form-checkbox></td>
                                    <td><i class="bx bx-edit-alt"></i></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Stripe Subscriptions</th>
                                    <td><b-form-input for="text" v-model="sales_config.stripe.stripe_subscription.method_title"></b-form-input></td>
                                    <td><b-form-checkbox switch size="lg" v-model="sales_config.stripe.stripe_subscription.enabled"></b-form-checkbox></td>
                                    <td><i class="bx bx-edit-alt"></i></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">WeChat</th>
                                    <td><b-form-input for="text" v-model="sales_config.stripe.we_chat.method_title"></b-form-input></td>
                                    <td><b-form-checkbox switch size="lg" v-model="sales_config.stripe.we_chat.enabled"></b-form-checkbox></td>
                                    <td><i class="bx bx-edit-alt"></i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                        </div>
                      </div>
                    </b-tab> 
                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">PayPal</span>
                      </template>

                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                            <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.paypal.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Mode</label>
                            <select class="form-control" v-model="sales_config.paypal.mode">
                              <option value="live">Live</option>
                              <option value="sandbox">Sandbox</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.paypal.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                              <label>Merchant Account Email Address</label>
                              <b-form-input for="text" v-model="sales_config.paypal.merchant_email"></b-form-input>
                          </div>
                          <div class="col-md-3">
                              <label>API Authentication</label>
                              <b-form-input for="text" v-model="sales_config.paypal.api_authentication"></b-form-input>
                          </div>
                          <div class="col-md-3">
                              <label>API Username</label>
                              <b-form-input for="text" v-model="sales_config.paypal.api_username"></b-form-input>
                          </div>
                          <div class="col-md-3">
                              <label>API Password</label>
                              <b-form-input for="text" v-model="sales_config.paypal.api_password"></b-form-input>
                          </div>
                          <div class="col-md-3">
                              <label>API Signature</label>
                              <b-form-input for="text" v-model="sales_config.paypal.api_signature"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Enable PayPal Credit</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.paypal.credit_enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Enable Guest Checkout</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.paypal.guest_checkout_enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.paypal.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </b-tab> 
                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-envelope"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">Pay On Account</span>
                      </template>

                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-3">
                            <label>Enabled</label>
                            <b-form-checkbox switch size="lg" v-model="sales_config.on_account.enabled"></b-form-checkbox>
                          </div>
                          <div class="col-md-3">
                            <label>Method Title</label>
                            <b-form-input for="text" v-model="sales_config.on_account.method_title"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Allowed Countries</label>
                            <select class="form-control" multiple v-model="sales_config.on_account.allowed_countries">
                              <option v-for="country in countries" v-bind:value="country.id" :key="country.id">{{country.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Minimum Order Amount</label>
                            <b-form-input for="text" v-model="sales_config.on_account.minimum_order_total"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Maximum Order Amount</label>
                            <b-form-input for="text" v-model="sales_config.on_account.maximum_order_total"></b-form-input>
                          </div>
                          <div class="col-md-3">
                            <label>Sort Order</label>
                            <b-form-input for="text" v-model="sales_config.on_account.sort_order"></b-form-input>
                          </div>
                        </div>
                      </div>
                    </b-tab> 
                  </b-tabs>
                </div>
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-cog"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Customers</span>
                </template>

                <b-button v-b-modal.modal-scrollable variant="primary" @click="saveCustomerConfiguration()">
                    <i class="mdi mdi-plus mr-1"></i> Save
                </b-button>
                
                <div class="card-body">
                  <h4 class="card-title mb-4">Customers Configuration</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Default Customer Group</label>
                      <select class="form-control" v-model="customer_config.group.id">
                         <option v-for="group in customerGroups" v-bind:value="group.id" :key="group.id" :selected="customer_config.group.id == group.id">{{group.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Welcome Email</label>
                      <b-form-checkbox switch size="lg" v-model="customer_config.welcome_email_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Welcome Email Sender</label>
                      <select class="form-control" v-model="customer_config.welcome_email_sender">
                        <option value="general_contact">General Contact</option>
                        <option value="sales_contact">Sales Contact</option>
                        <option value="support_contact">Support Contact</option>
                        <option value="custom_contact">Custom Contact</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Enable Sign-Up Confirmation Email</label>
                      <b-form-checkbox switch size="lg" v-model="customer_config.signup_confirmation_email_enabled"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Redirect To Dashboard After Login</label>
                      <b-form-checkbox switch size="lg" v-model="customer_config.dashboard_redirection_enabled"></b-form-checkbox>
                    </div>
                  </div>
                </div>

              </b-tab>

              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Advanced</span>
                </template>

                <b-button v-b-modal.modal-scrollable variant="primary" @click="saveAdvancedConfiguration()">
                    <i class="mdi mdi-plus mr-1"></i> Save
                </b-button>
                
                <div class="card-body">
                  <h4 class="card-title mb-4">Admin</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Session Lifetime Seconds</label>
                      <b-form-input for="text" v-model="advanced_config.session_lifetime_seconds"></b-form-input>
                    </div>
                  </div>
                  <h4 class="card-title mb-4">Template Settings</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Minify HTML</label>
                      <b-form-checkbox switch size="lg" v-model="advanced_config.minify_html"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Minify Javascript</label>
                      <b-form-checkbox switch size="lg" v-model="advanced_config.minify_javascript"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Minify CSS</label>
                      <b-form-checkbox switch size="lg" v-model="advanced_config.minify_css"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Merge HTML</label>
                      <b-form-checkbox switch size="lg" v-model="advanced_config.merge_html"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Merge Javascript</label>
                      <b-form-checkbox switch size="lg" v-model="advanced_config.merge_javascript"></b-form-checkbox>
                    </div>
                    <div class="col-md-3">
                      <label>Merge CSS</label>
                      <b-form-checkbox switch size="lg" v-model="advanced_config.merge_css"></b-form-checkbox>
                    </div>
                  </div>
                </div>

              </b-tab>
              
            </b-tabs>
          </div>
        </div>

      </div>
    </div>
  </Layout>
</template>