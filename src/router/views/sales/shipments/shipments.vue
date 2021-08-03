<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {authHeader} from "@/helpers/authservice/auth-header";
import convert from "@/helpers/convertObject";
import {handleAxiosError} from "@/helpers/authservice/user.service"

/**
 * Pages component
 */
export default {
  page: {
    title: "Shipments",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      backendURL: process.env.VUE_APP_BACKEND_URL,
      selectedAll: false,
      shipmentsData: [],
      shipmentsDataLength: [],
      title: "Shipments",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Shipments",
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
              label: "Shipment ID",
              key: "id",
              sortable: true,
          },
          {
              label: "Shipment Date",
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
          return this.shipmentsDataLength;
      },
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.shipmentsData.filter(data => data.selected);
      return this.shipmentsData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.shipmentsData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      // Set the initial number of items
      axios
      .get(`${this.backendURL}/api/v1/orders/shipments?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => {
         this.shipmentsData = convert(response.data.data),
         this.shipmentsDataLength = response.data.pagination.total;
         for (var i = 0; i < this.shipmentsData.length; i++){
            var smnt = this.shipmentsData[i];
            if (smnt.order == null){
              smnt.order = {};
            }
         }
       })
      .catch(handleAxiosError);
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
          this.currentPage = this.currentPage;
      },
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/orders/shipments?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.shipmentsData = convert(response.data.data),
                           this.shipmentsDataLength = response.data.pagination.total));
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/orders/shipments?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.shipmentsData = convert(response.data.data),
                           this.shipmentsDataLength = response.data.pagination.total));
      }
  },
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
                  <button type="button" class="btn btn btn-rounded mr-2">
                    <i class="mdi mdi-trash mr-1"></i> Delete Shipment
                  </button>
                  <!-- <b-button v-b-modal.modal-scrollable variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Add Shipment
                  </b-button> -->
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
                    <b-table :items="shipmentsData" 
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

                          <b-dropdown-item :href="'/sales/shipments/view/' + data.item.id">
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
