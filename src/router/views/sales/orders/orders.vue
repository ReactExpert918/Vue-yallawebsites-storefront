<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import convert from "@/helpers/convertObject";
import {roleService} from "@/helpers/authservice/roles";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import alertBox from "@/helpers/Alert";

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
      pageIdentity: "orders",
      selectedAll: false,
      data: "",
      ordersData: [],
      ordersDataLength: [],
      title: "Orders",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Orders",
          active: true
        }
      ],
      totalRows: 1,
      loading: false,
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
              label: "Order ID",
              key: "id",
              sortable: true,
          },
          {
              label: "Purchase Date",
              key: "created_at",
              sortable: true,
          },
          {
              label: "Ship To",
              key: "customer.name",
              sortable: true,
          },
          {
              label: "Total",
              key: "total.net_total",
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
          return this.ordersDataLength;
      },
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.ordersData.filter(data => data.selected);
      return this.ordersData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.ordersData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
    this.loading = true
      axios
      .get(`${this.backendURL}/api/v1/orders?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => (this.ordersData = convert(response.data.data),
                        this.ordersDataLength = response.data.pagination.total))
      .catch(handleAxiosError)
      .finally(() => {
        this.loading = false
      });
  },
  methods: {
      /**
        * Search the table data with search input
        */
      cancelOrder() {
        this.loading = true
        this.$bvModal.hide("modal-cancel-order");
        if (!roleService.hasEditPermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false);
          return;
        }
        axios
        .delete(`${this.backendURL}/api/v1/orders/${this.order.id}/cancel` , authHeader())
        .then(response => (
          this.data = response.data.data.id,
          axios
          .get(`${this.backendURL}/api/v1/orders?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
          .then(response => (this.ordersData = convert(response.data.data),
                            this.ordersDataLength = response.data.pagination.total))
          .catch(handleAxiosError),
          alertBox(`Order Deleted Succesfully!`, true)
          ))
        .catch(handleAxiosError)
        .finally(() => {
          this.loading = false
        });
      },
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
        .get(`${this.backendURL}/api/v1/orders?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.ordersData = convert(response.data.data),
                           this.ordersDataLength = response.data.pagination.total));
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/orders?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.ordersData = convert(response.data.data),
                           this.ordersDataLength = response.data.pagination.total));
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
                  <button type="button" class="btn btn btn-rounded mr-2" v-b-modal.modal-cancel-orders>
                    <i class="mdi mdi-trash mr-1"></i> Cancel Orders
                  </button>
                  <b-button href="/sales/orders/create" variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Add Order
                  </b-button>
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
                    <b-table :items="ordersData" 
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
                        <span :class= "[`badge badge-${data.item.status.badge} font-size-12`]">
                          <span>{{data.item.status.status}}</span>
                        </span>
                      </template>
                      <template #cell(actions)="data">
                        <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                          <template v-slot:button-content>
                            <i class="mdi mdi-dots-horizontal font-size-18"></i>
                          </template>

                           <b-dropdown-item :href="'/sales/orders/view/' + data.item.id">
                            <i class="bx bx-show-alt"></i> View
                          </b-dropdown-item>

                          <b-dropdown-item :href="'/sales/orders/edit/' + data.item.id">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
                          </b-dropdown-item>

                          <b-dropdown-item v-b-modal.modal-cancel-order @click="order = data.item">
                            <i class="fas fa-trash-alt text-danger mr-1"></i> Cancel
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
    <b-modal id="modal-cancel-order" centered title="Cancel Order" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Cancel will remove this order permenantly.</p>
      <div class="text-right">
        <b-button variant="danger" @click="cancelOrder()">Cancel</b-button>
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
    top: 30%;
    left: 50%;
  }
</style>
