<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {authHeader} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import convert from "@/helpers/convertObject";
/**
 * Pages component
 */
export default {
  page: {
    title: "Invoices",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      backendURL: process.env.VUE_APP_BACKEND_URL,
      selectedAll: false,
      invoicesData: [],
      invoicesDataLength: [],
      loading: false,
      title: "Invoices",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Invoices",
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
              label: "Invoice ID",
              key: "id",
              sortable: true,
          },
          {
              label: "Invoice Date",
              key: "created_at",
              sortable: true,
          },
          {
              label: "Order ID",
              key: "order.id",
              sortable: true,
          },
          {
              label: "Order Date",
              key: "order.created_at",
              sortable: true,
          },
          {
              label: "Total",
              key: "order.total_price",
              sortable: true,
          },
          {
              key: "status",
              sortable: true,
          },
          {
              key: "actions",
          },
      ],
    };
  },
  computed: {
      /**
        * Total no. of records
        */
      rows() {
          return this.invoicesDataLength;
      },
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.invoicesData.filter(data => data.selected);
      return this.invoicesData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.invoicesData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      // Set the initial number of items
      this.loading = true
      this.totalRows = this.items.length;
      axios
      .get(`${this.backendURL}/api/v1/orders/invoices?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => {
         this.invoicesData = convert(response.data.data);
         this.invoicesDataLength = response.data.pagination.total;
         for (var i = 0; i < this.invoicesData.length; i++){
            var inv = this.invoicesData[i];
            if (inv.order == null){
              inv.order = {};
            }
         }
       })
      .catch(handleAxiosError)
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
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/orders/invoices?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.invoicesData = convert(response.data.data),
                           this.invoicesDataLength = response.data.pagination.total));
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/orders/invoices?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.invoicesData = convert(response.data.data),
                           this.invoicesDataLength = response.data.pagination.total));
      }
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
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <button type="button" class="btn btn btn-roundedmr-2">
                    <i class="mdi mdi-trash mr-1"></i> Delete Invoice
                  </button>
                  <!--<b-button v-b-modal.modal-scrollable variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Add Invoice
                  </b-button>-->
                </div>
              </div>
              <!-- end col-->
            </div>

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
                        >
                        </b-form-select>&nbsp;entries
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
                    <b-table :items="invoicesData" 
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
                        v-model="data.item.selected"
                        :value="data.id"
                        
                        class="custom-checkbox custom-checkbox-primary"
                        
                      ></b-form-checkbox>
                      </template>
                      <template #cell(status)="data">
                        <span class="badge badge-success font-size-12">
                          {{data.item.order.status}}
                        </span>
                      </template>
                      <template #cell(actions)="data">
                        <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                          <template v-slot:button-content>
                            <i class="mdi mdi-dots-horizontal font-size-18"></i>
                          </template>

                          <b-dropdown-item :href="'/sales/invoices/view/' + data.item.id">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> View
                          </b-dropdown-item>
                          
                        </b-dropdown>
                      </template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="dataTables_paginate paging_simple_numbers float-right">
                            <ul class="pagination pagination-rounded mb-0">
                                <!-- pagination -->
                              <b-pagination 
                                v-model="currentPage" 
                                :total-rows="rows" 
                                :per-page="perPage"
                                @change = "handlePageChange"
                              >
                              </b-pagination>
                            </ul>
                        </div>
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
    top: 40%;
    left: 50%;
  }
</style>