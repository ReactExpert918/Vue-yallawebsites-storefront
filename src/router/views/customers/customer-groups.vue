<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {roleService} from "@/helpers/authservice/roles";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import alertBox from "@/helpers/Alert";

/**
 * Pages component
 */
export default {
  page: {
    title: "Customer Groups",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      pageIdentity: "customer_groups",
      selectedAll: false,
      data: "",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      customerGroupsData: [],
      customerGroupsDataLength: [],
      taxClasses: [],
      currentGroup: {rule:{}},
      createGroupPayload: {
        name: "",
        rule: {
          tax_class: "",
          calculation: "",
          metric: "",
          value: 0
        }
      },
      title: "Customer Groups",
      items: [
        {
          text: "Customer Groups",
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
              key: "id",
              sortable: true,
          },
          {
              label: "Group Name",
              key: "name",
              sortable: true,
          },
          {
              label: "Assigned Customers",
              key: "assigned_customer_number",
              sortable: true,
          },
          {
              key: "rule",
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
      isdisable() {
        if(this.createGroupPayload.name == "" || this.createGroupPayload.rule.tax_class == "" 
        || this.createGroupPayload.rule.calculation <= 0 || this.createGroupPayload.rule.metric == "" || this.createGroupPayload.rule.value <= 0) {
          return true;
        }
        else {
          return false;
        }
      },
      rows() {
          return this.customerGroupsDataLength;
      },
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.customerGroupsData.filter(data => data.selected);
      return this.customerGroupsData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.customerGroupsData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      axios
      .get(`${this.backendURL}/api/v1/customers/groups?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => (this.customerGroupsData = response.data.data,
                        this.customerGroupsDataLength = response.data.pagination.total))
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
      fetchTaxClasses(){
        axios
      .get(`${this.backendURL}/api/v1/tax/classes` , authHeader())
      .then(response => (this.taxClasses = response.data.data,
                        this.createGroupPayload.rule.tax_class = this.taxClasses[0].country_code,
                        this.createGroupPayload.rule.metric = "%",
                        this.createGroupPayload.rule.calculation = "+"))
      .catch(handleAxiosError);
      },
      deleteCustomerGroup(id) {
        this.$bvModal.hide("modal-delete-customer-group");
        if(!roleService.hasDeletePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
       }
        axios
        .delete(`${this.backendURL}/api/v1/customers/groups/${id}` , authHeader())
        .then(
          axios
          .get(`${this.backendURL}/api/v1/customers/groups?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
          .then(response => (this.customerGroupsData = response.data.data,
                            this.customerGroupsDataLength = response.data.pagination.total))
          .catch(handleAxiosError),
          alertBox("Customer Group Deleted Successfully!", true)
          )
        .catch(handleAxiosError);
      },
      createCustomerGroup(e){
        if(!roleService.hasCreatePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
       }
        e.preventDefault();
        this.createGroupPayload.rule.value = parseFloat(this.createGroupPayload.rule.value);
        axios
        .post(`${this.backendURL}/api/v1/customers/groups` , this.createGroupPayload , authHeader())
        .then(response => (
          axios
          .get(`${this.backendURL}/api/v1/customers/groups?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
          .then(response => (this.customerGroupsData = response.data.data,
                            this.customerGroupsDataLength = response.data.pagination.total))
          .catch(handleAxiosError),
          this.data = response.data,
          alertBox("Customer Group Created Successfully!", true)
          ))
        .catch(handleAxiosError);
      },
      updateCustomerGroup(e){
        if(!roleService.hasEditPermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
       }
        e.preventDefault();
        this.currentGroup.rule.value = parseFloat(this.currentGroup.rule.value);
        axios
        .put(`${this.backendURL}/api/v1/customers/groups/${this.currentGroup.id}` , this.currentGroup , authHeader())
        .then(response => (
          axios
          .get(`${this.backendURL}/api/v1/customers/groups?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
          .then(response => (this.customerGroupsData = response.data.data,
                            this.customerGroupsDataLength = response.data.pagination.total))
          .catch(handleAxiosError),
          this.data = response.data,
          alertBox("Customer Group Updated Successfully!", true)))
        .catch(handleAxiosError);
      },
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/customers/groups?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.customersData = response.data.data,
                           this.customersDataLength = response.data.pagination.total));
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/customers/groups?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => (this.customersData = response.data.data,
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
                  <b-button v-b-modal.modal-add-group variant="primary" @click="fetchTaxClasses()">Add Customer Group</b-button>
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
                    <b-table :items="customerGroupsData" 
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
                      <template #cell(rule)="data">
                          {{data.item.rule.calculation}}
                          {{data.item.rule.value}}
                          {{data.item.rule.metric}}
                      </template>
                      <template #cell(actions)="data">
                        <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                          <template v-slot:button-content>
                            <i class="mdi mdi-dots-horizontal font-size-18"></i>
                          </template>

                          <b-dropdown-item v-b-modal.modal-edit-group @click="currentGroup = data.item;fetchTaxClasses()">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
                          </b-dropdown-item>

                          <b-dropdown-item v-b-modal.modal-delete-customer-group @click="currentGroup = data.item">
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
    <!-- end row -->
    <b-modal id="modal-add-group" scrollable title="Add Customer Group" title-class="font-18" hide-footer>
      <form @submit="createCustomerGroup">
      <div class="row">
        <div class="col-sm-6">
          <label class="mt-3">Customer Group Name <span class="red"> *</span></label>
          <b-form-input for="text" v-model="createGroupPayload.name"></b-form-input>
          <label class="mt-3">Tax Class <span class="red"> *</span></label>
          <select class="custom-select" v-model="createGroupPayload.rule.tax_class">
            <option v-for="taxClass in taxClasses" v-bind:value="taxClass.country_code" :key="taxClass.country_code">{{taxClass.country_name}}- {{taxClass.country_code}}</option>
          </select>
        </div>
        <div class="col-sm-6">
          <label class="mt-3">Price Rule <span class="red"> *</span></label>
          <select class="custom-select" v-model="createGroupPayload.rule.calculation">
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <label class="mt-3">Price Amount <span class="red"> *</span></label>
          <b-form-input type="number" for="number" step="0.01" v-model="createGroupPayload.rule.value"></b-form-input>
          <label class="mt-3">Price Metric <span class="red"> *</span></label>
          <select class="custom-select" v-model="createGroupPayload.rule.metric">
            <option value="%">Percentage</option>
            <option value="$">Fixed</option>
          </select>
        </div>
      </div>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary" :disabled="isdisable" type="submit">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Add Group
        </b-button>
      </div>
      </form>
    </b-modal>
    <b-modal id="modal-edit-group" scrollable title="Edit Customer Group" title-class="font-18" hide-footer>
      <form @submit="updateCustomerGroup">
      <div class="row">
        <div class="col-sm-6">
          <label class="mt-3">Customer Group Name</label>
          <b-form-input for="text" v-model="currentGroup.name"></b-form-input>
          <label class="mt-3">Tax Class</label>
          <select class="custom-select" v-model="currentGroup.rule.tax_class">
              <option v-for="taxClass in taxClasses" v-bind:value="taxClass.country_code" :key="taxClass.country_code" :selected="currentGroup.rule.tax_class == taxClass.country_code">{{taxClass.country_name}}- {{taxClass.country_code}}</option>
          </select>
        </div>
        <div class="col-sm-6">
          <label class="mt-3">Price Rule</label>
          <select class="custom-select" v-model="currentGroup.rule.calculation">
            <option value="+" :selected="currentGroup.rule.calculation == '+'">+</option>
            <option value="-" :selected="currentGroup.rule.calculation == '-'">-</option>
          </select>
          <label class="mt-3">Price Amount</label>
          <b-form-input type="number" step="0.01" for="number" v-model="currentGroup.rule.value"></b-form-input>
          <label class="mt-3">Price Metric</label>
          <select class="custom-select" v-model="currentGroup.rule.metric">
            <option value="%" :selected="currentGroup.rule.metric == '%'">Percentage</option>
            <option value="$" :selected="currentGroup.rule.metric == '$'">Fixed</option>
          </select>
        </div>
      </div>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary" type="submit">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Save
        </b-button>
      </div>
      </form>
    </b-modal>
    <b-modal id="modal-delete-customer-group" centered title="Delete Customer Group" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Delete will remove this customer group permenantly.</p>
      <div class="text-right">
        <b-button variant="danger" @click="deleteCustomerGroup(currentGroup.id)">Delete</b-button>
      </div>
    </b-modal>
  </Layout>
</template>
