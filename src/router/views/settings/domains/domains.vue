<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import appConfig from "@/app.config";
import {roleService} from "@/helpers/authservice/roles";

/**
 * Domains component
 */
export default { 
  page: {
    title: "Domains",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      pageIdentity: "domains",
      selectedAll: false,
      backendURL: process.env.VUE_APP_BACKEND_URL,
      domainsData: [],
      currentDomain: {},
      newDomainData: {}, 
      title: "Domains",
      items: [
        {
          text: "Domains",
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
              label: "Domain Name",
              key: "name",
              sortable: true,
          },
          {
              label: "Status",
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
          return this.domainsData.length;
      }
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.domainsData.filter(data => data.selected);
      return this.domainsData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.domainsData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      axios
      .get(`${this.backendURL}/api/v1/domains?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => (this.domainsData = response.data.data))
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
      verifyDomain(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        axios
        .get(`${this.backendURL}/api/v1/domains/${this.currentDomain.id}/verify` , authHeader())
        .then(response => {
          var resp = response.data.data
          if (resp.verified){
            alert("Domain is verified!");
          }else{
            alert("Domain is not verified!");
          }
        })
        .catch(handleAxiosError);
      },
      addDomain(){
        if (!roleService.hasCreatePermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
         axios
        .post(`${this.backendURL}/api/v1/domains` , this.newDomainData , authHeader())
        .then(response => (alert(`${response.data.data.id} Domain created!`)))
        .catch(handleAxiosError);
      },
      deleteDomain(){
        if (!roleService.hasDeletePermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
      }
        axios
        .delete(`${this.backendURL}/api/v1/domains/${this.currentDomain.id}` , authHeader())
        .then(response => (alert(`${response.data.data.id} Domain deleted!`)))
        .catch(handleAxiosError);
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
                  <b-button v-b-modal.modal-scrollable-add-domain variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Add Domain
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
                        <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
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
                    <b-table :items="domainsData" 
                      :fields="fields" 
                      responsive="sm" 
                      :per-page="perPage" 
                      :current-page="currentPage" 
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
                          <span v-if="data.item.verified">Connected</span>
                          <span v-else>Not Connected</span>
                        </span>
                      </template>
                      <template #cell(actions)="data">
                        <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                          <template v-slot:button-content>
                            <i class="mdi mdi-dots-horizontal font-size-18"></i>
                          </template>
                          <b-dropdown-item v-b-modal.modal-scrollable-verify-domain @click="currentDomain = data.item">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> Verify
                          </b-dropdown-item>
                          <b-dropdown-item @click="currentDomain = data.item;deleteDomain()">
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
                                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
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

    <b-modal id="modal-scrollable-add-domain" scrollable title="Add Domain" title-class="font-18" hide-footer>
      <div class="row">
        <div class="col-sm-12">
          <p>Add your domain here to use it for your website</p>
        </div>
        <div class="col-sm-6">
          <label class="mt-3">Domain Name</label>
          <b-form-input for="text" placeholder="Your domain name" v-model="newDomainData.domain"></b-form-input>
        </div>
      </div>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary" @click="addDomain()">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Add
        </b-button>
      </div>
    </b-modal>

    <b-modal id="modal-scrollable-verify-domain" scrollable title="Verify Domain" title-class="font-18" hide-footer>
      <div class="row">
        <div class="col-sm-12">
          <p>Verify your domain by adding the sub domain & value given here into your domain settings as txt record.</p>
        </div>
        <div class="col-sm-6">
          <label class="mt-3">Sub Domain Value</label>
          <b-form-input for="text" v-model="currentDomain.sub_domain" disabled></b-form-input>
        </div>
        <div class="col-sm-6">
          <label class="mt-3">TXT Value</label>
          <b-form-input for="text" v-model="currentDomain.value" disabled></b-form-input>
        </div>
      </div>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary" @click="verifyDomain()">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Continue
        </b-button>
      </div>
    </b-modal>

  </Layout>
</template>
