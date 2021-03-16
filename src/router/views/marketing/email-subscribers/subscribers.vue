<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "axios";
import { subscriberData } from "./subscribers-data";

/**
 * Contacts-grid component
 */
export default {
  page: {
    title: "Contact User Grid",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      subscriberData: subscriberData,
      title: "Email Subscribers Lists",
      items: [
        {
          text: "Marketing",
          href: "/"
        },
        {
          text: "Email Subscribers",
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
              sortable: true,
          },
          {
              key: "email",
              sortable: true,
          },
          {
              label: "First Name",
              key: "firstName",
              sortable: true,
          },
          {
              label: "Last Name",
              key: "lastName",
              sortable: true,
          },
          {
              label: "Date Added",
              key: "dateAdded",
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
          return this.subscriberData.length;
      },
  },
  mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      axios
          .get("http://dummy.restapiexample.com/api/v1/employees", {
              headers: {
                  "Content-type": "application/json;charset=utf-8",
              },
          })
          .then((res) => {
              return res;
          });
  },
  methods: {
      /**
        * Search the table data with search input
        */
      onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
      },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-3 col-sm-6">
        <div class="card text-center">
          <div class="card-body">
            <div class="avatar-sm mx-auto mb-4">
              <span class="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">+</span>
            </div>
            <h5 class="font-size-15">
              <a href="javascript: void(0);" class="text-dark">Add New List</a>
            </h5>
            <p class="text-muted">Create a new mailing list and add customers to it</p>
          </div>
        </div>
      </div>
      <div v-for="subscriberstat in subscriberData" :key="subscriberstat.id" class="col-xl-3 col-sm-6">
        <div class="card text-center">
          <div class="card-body">
            <div v-if="subscriberstat.font" class="avatar-sm mx-auto mb-4">
              <span
                class="avatar-title rounded-circle bg-soft-primary text-primary font-size-16"
              >{{subscriberstat.font}}</span>
            </div>
            <div v-if="subscriberstat.image" class="mb-4">
              <img class="rounded-circle avatar-sm" :src="`${subscriberstat.image}`" alt />
            </div>
            <h5 class="font-size-15">
              <a href="javascript: void(0);" class="text-dark">{{subscriberstat.name}}</a>
            </h5>
            <p class="text-muted">{{subscriberstat.text}}</p>

            <div>
              <span>Subscribers: </span>
              <span
                href="javascript: void(0);"
                class="badge badge-primary font-size-11 m-1"
              >{{subscriberstat.subcount}}</span>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top">
            <div class="contact-links d-flex font-size-20">
              <div class="flex-fill">
                <a v-b-tooltip.hover.top title="View" href="javascript: void(0);">
                  <i class="bx bx-show-alt"></i>
                </a>
              </div>
              <div class="flex-fill">
                <a v-b-tooltip.hover.top title="Add subscribers" href="javascript: void(0);">
                  <i class="bx bx-user-plus"></i>
                </a>
              </div>
              <div class="flex-fill">
                <a v-b-tooltip.hover.top title="Delete"  v-b-modal.modal-delete-list>
                  <i class="bx bx-trash-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <b-button v-b-modal.modal-scrollable-view variant="primary">View</b-button>
    <b-button v-b-modal.modal-scrollable-add variant="primary">Add</b-button>

    <!--View Subscribers Popup-->
    <b-modal id="modal-scrollable-view" scrollable title="View Subscribers" title-class="font-18" hide-footer>
      <div class="row">
        <div class="col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
              <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
              </label>
          </div>
        </div>
          <!-- Search -->
          <div class="col-md-6">
              <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">Search:
                      <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                  </label>
              </div>
          </div>
        </div>
        <!-- End search -->
        <!-- Table -->
        <div class="table-responsive mb-0">
          <b-table :items="subscriberData[1].subscribers" selectable :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
              <template #head(selected)="data">
                <b-form-checkbox
                @click="checkAll()"
                v-model="isCheckAll"
                :value="data.id"
                unchecked-value="not_accepted"
                class="custom-checkbox custom-checkbox-outline custom-checkbox-primary"
                checked
              ></b-form-checkbox>
              </template>
              <template #cell(selected)="data">
                <b-form-checkbox
                v-model="primaryoutlinecheck"
                v-bind:value='data.id' :v-model='data.id'
                @change="updateCheckall()"
                unchecked-value="not_accepted"
                class="custom-checkbox custom-checkbox-outline custom-checkbox-primary mb-3"
                checked
              ></b-form-checkbox>
              </template>
              <template #cell(actions)>
                <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                  <template v-slot:button-content>
                    <i class="mdi mdi-dots-horizontal font-size-18"></i>
                  </template>

                  <b-dropdown-item href="/marketing/subscribers/list">
                    <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
                  </b-dropdown-item>

                  <b-dropdown-item v-b-modal.modal-delete-list>
                    <i class="fas fa-trash-alt text-danger mr-1"></i> Delete
                  </b-dropdown-item>
                </b-dropdown>
              </template>
          </b-table>
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
        <br>
        <div class="text-sm-right">
          <b-button variant="secondary mr-2" v-b-modal.modal-delete-list>
              <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
              Delete Selected
          </b-button>
          <b-button variant="primary">
              <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
              Save
          </b-button>
      </div>
    </b-modal>

    <!--Add Subscribers Popup-->
    <b-modal id="modal-scrollable-add" scrollable title="Add Subscribers" title-class="font-18" hide-footer>
      <div class="row">
        <div class="col-md-6">
          <label class="mt-3">List Name</label>
          <b-form-input for="text" value=""></b-form-input>
          <label class="mt-3">Upload Via</label>
          <div class="row">
            <div class="col-md-12">
                <b-button variant="secondary mr-2">
                  Excel
                </b-button>
                <b-button variant="secondary mr-2">
                  Manual
                </b-button>
                 <b-button variant="secondary mr-2">
                  CSV
                </b-button>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-sm-right">
           <b-button variant="secondary mr-2">
              Download Example File
            </b-button>
        </div> 
        <div class="col-md-12 mt-3">
          <b-progress :value="25" height="20px" :max="100" show-value></b-progress>
        </div>
        </div>
        <br>
        <div class="text-sm-right">
          <b-button variant="secondary mr-2" v-b-modal.modal-delete-list>
              <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
              Delete Selected
          </b-button>
          <b-button variant="primary">
              <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
              Save
          </b-button>
        </div>
    </b-modal>
    <b-modal id="modal-delete-list" centered title="Delete List" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Delete will remove this list permenantly.</p>
      <div class="text-right">
        <b-button variant="danger">Delete</b-button>
      </div>
    </b-modal>
  </Layout>
</template>