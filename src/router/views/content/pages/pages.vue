<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";

/**
 * Pages component
 */
export default {
  page: {
    title: "Pages",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      selectedAll: false,
      backendURL: process.env.VUE_APP_BACKEND_URL,
      pagesData: [],
      page: {},
      title: "Pages",
      items: [
        {
          text: "Content",
        },
        {
          text: "Pages",
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
              label: "name",
              key: "title",
              sortable: true,
          },
          {
              label: "url",
              key: "url_key",
              sortable: true,
          },
          {
              label: "status",
              key: "status",
              sortable: true,
          },
          {
              label: "modified",
              key: "updated_at",
              sortable: true,
          },
          {
              label: "added",
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
          return this.pagesData.length;
      },
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.pagesData.filter(data => data.selected);
      return this.pagesData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.pagesData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      axios
      .get(`${this.backendURL}/api/v1/pages?per_page=${this.perPage}&page=${this.currentPage}`)
      .then(response => (this.pagesData = response.data.data))
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
      deletePage(){
        axios
        .delete(`${this.backendURL}/api/v1/pages/${this.page.id}`)
        .then(response => (alert(`${response.data.data.id} Page deleted!`)));
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
              <div class="col-sm-4">
                
              </div>
              <div class="col-sm-8">
                <div class="text-sm-right">
                  <a href="/content/pages/add">
                    <b-button v-b-modal.modal-scrollable variant="primary">
                      <i class="mdi mdi-plus mr-1"></i> Add Page
                    </b-button>
                  </a>
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
                  <b-table :items="pagesData" 
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
                        <span v-if="data.item.enabled">Enabled</span>
                          <span v-else>Disabled</span>
                      </span>
                    </template>
                    <template #cell(actions)="data">
                      <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                        <template v-slot:button-content>
                          <i class="mdi mdi-dots-horizontal font-size-18"></i>
                        </template>
                        <b-dropdown-item :href="'/content/pages/edit/' + data.item.id">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
                          </b-dropdown-item>

                        <b-dropdown-item v-b-modal.modal-delete-page @click="page = data.item">
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
    <b-modal id="modal-delete-page" centered title="Delete Page" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Delete will remove this page permenantly.</p>
      <div class="text-right">
        <b-button variant="danger" @click="deletePage()">Delete</b-button>
      </div>
    </b-modal>
    <!-- end row -->
  </Layout>
</template>
