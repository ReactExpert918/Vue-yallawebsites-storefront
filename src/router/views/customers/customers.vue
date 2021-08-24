<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import axios from "axios";
import appConfig from "@/app.config";
import {roleService} from "@/helpers/authservice/roles";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import convert from "@/helpers/convertObject";
import alertBox from "@/helpers/Alert";

/**
 * Pages component
 */
export default {
  page: {
    title: "Customers",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      selectedAll: false,
      pageIdentity: "customers",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      customersData: [],
      customersDataLength: 1,
      authConfig: {
        headers:{
          authorization: ""
        }
      },
      title: "Customers",
      items: [
        {
          text: "Customers",
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
      currentCustomerID: 0,
      fields: [{
              label: "",
              key: "selected",
              sortable: false,
          },
          {
              label: "ID",
              key: "id",
              sortable: true,
          },
          {
              label: "Name",
              key: "name",
              sortable: true,
          },
          {
              label: "Email",
              key: "email",
              sortable: true,
          },
          {
              label: "Customer Group",
              key: "group_name",
              sortable: true,
          },
          {
              label: "Customer Since",
              key: "created_at",
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
          return this.customersDataLength;
      },
      console: () => console
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.customersData.filter(data => data.selected);
      return this.customersData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.customersData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      axios
      .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => (this.customersData = convert(response.data.data),
                         this.customersDataLength = response.data.pagination.total))
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
          this.currentPage = 1;
      },

      deleteCustomer(id){
        this.$bvModal.hide("modal-delete-customer");
        if (!roleService.hasDeletePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
        }

        axios
        .delete(`${this.backendURL}/api/v1/customers/${id}` , authHeader())
        .then(
          this.handlePageChange(1),
          alertBox("Customer Deleted Successfully!", true)
          )
        .catch(handleAxiosError);
      },
      handlePageChange(value) {
          this.currentPage = value;
          axios
          .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
          .then(response => (this.customersData = convert(response.data.data),
                             this.customersDataLength = response.data.pagination.total));
        },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/customers?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.customersData = convert(response.data.data),
                           this.customersDataLength = response.data.pagination.total));
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
                  <b-button v-b-modal.modal-scrollable variant="primary" href="/customers/create">
                    <i class="mdi mdi-plus mr-1"></i> Add Customer
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
                    <b-table :items="customersData" 
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
                          {{data.item.status}}
                        </span>
                      </template>
                      <template #cell(actions)="data">
                        <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                          <template v-slot:button-content>
                            <i class="mdi mdi-dots-horizontal font-size-18"></i>
                          </template>

                          <b-dropdown-item :href="'/customers/edit/' + data.item.id">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
                          </b-dropdown-item>

                          <b-dropdown-item v-b-modal.modal-delete-customer @click="currentCustomerID = data.item.id">
                            <i class="fas fa-trash-alt text-danger mr-1"></i> Delete
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
    {{info}}
    <!-- end row -->
    <b-modal id="modal-delete-customer" centered title="Delete Customer" title-class="font-18" hide-footer >
      <p>Are you sure? Pressing Delete will remove this customer permenantly.</p>
      <div class="text-right" >
        <b-button variant="danger" v-on:click="deleteCustomer(currentCustomerID)">Delete</b-button>
      </div>
    </b-modal>
  </Layout>
</template>
