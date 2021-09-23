<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {roleService} from "@/helpers/authservice/roles";
import {handleAxiosError} from "@/helpers/authservice/user.service";

import appConfig from "@/app.config";

import draggable from 'vuedraggable'

/**
 * Pages component
 */
export default {
  page: {
    title: "Attributes",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, draggable, },
  data() {
    return {
      optionType: false,
      pageIdentity: "attributes",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      primarycheck: null, 
      lgchecked: null,
      show: false,
      showid: "",
      id: 1,
      loading: false,
      data: "",
      currentAttribute:  {
            id: "",
            name: "",
            value: "",
            required: false,
            enabled: false,
            code: "",
            use_category_filters: false,
            show_product_specifications: false,
            show_product_page: false,
            show_category_page: false,
            sort_order: 0,
            group: {},
            type: {},
            options: []
        },

      selectedAll: false,

      attributesData: [],
      attributesDataLength: 1,
      attributeGroups: [],
      attrTypes: [],
      newOption: {},
      newAttr: { options: []},
      newGroup: {name: ""},
      title: "Attributes",
      items: [
        {
          text: "Catalog",
          active: true
        },
        {
          text: "Attributes",
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
              label: "Attribute Name",
              key: "name",
              sortable: true,
          },
          {
              label: "Is Required",
              key: "required",
              sortable: true,
          },
          {
              label: "Type",
              // key: "attributeType",
              sortable: true,
          },
          {
              label: "Options",
              key: "options.length",
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
    groupDisable() {
      if(this.newGroup.name == "") {
        return true;
      } else {
        return false;
      }
    },
    isdisable() {
      if(!this.optionType) {
        if(this.newAttr.name == undefined || this.newAttr.code == undefined || this.newAttr.code == "") {
          return true;
        } else {
          return false;
        }
      }
      else {
        if(this.newAttr.name == undefined || this.newAttr.code == undefined || this.newAttr.code == ""
        || this.newAttr.option_name == "" || this.newAttr.option_name == undefined|| this.newAttr.option_label == "" || this.newAttr.option_label == undefined) {
          return true;
        } else {
          return false;
        }
      }
    },
    rows() {
        return this.attributesDataLength;
    },
    console: () => console
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.attributesData.filter(data => data.selected);
      return this.attributesData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.attributesData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
    this.loading = true
      axios
      .get(`${this.backendURL}/api/v1/products/attributes?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => {
          this.attributesData = response.data.data,
          this.attributesDataLength = response.data.pagination.total;
          if (this.attributesData.group == null){
            this.attributesData.group = {};
          }
          if (this.attributesData.type == null){
            this.attributesData.type = {};
          }
          if (this.attributesData.default_option == null){
            this.attributesData.default_option = {};
          }
       })
       .catch(error => handleAxiosError(error, this));
      axios
      .get(`${this.backendURL}/api/v1/products/attributes/groups` , authHeader())
      .then(response => (this.attributeGroups = response.data.data,
      this.currentAttribute.group = response.data.data[0],
      this.newAttr.group_id = response.data.data[0].id))
      axios
      .get(`${this.backendURL}/api/v1/products/attributes/types` , authHeader())
      .then(response => (this.attrTypes = response.data.data,
      this.newAttr.type_id = response.data.data[0].id))
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
      isOptionSelected(id){
          var i;
          for (i in this.currentAttribute.options){
            if ( this.currentAttribute.options[i].id == id){
              return true;
            }
          }
          return false;
      },
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/products/attributes?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => {
            this.attributesData = response.data.data,
            this.attributesDataLength = response.data.pagination.total;
        })
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/products/attributes?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
        .then(response => {
            this.attributesData = response.data.data,
            this.attributesDataLength = response.data.pagination.total;
        })
      },
      handleDefaultOptionChange(id){
        this.currentAttribute.default_option.id = id;
      },
      handleDefaultOptionCreateChange(name){
        for(var i = 0; i < this.newAttr.options.length; i++){
          if(this.newAttr.options[i].name == name){
            this.newAttr.options[i].default = true;
          }else{
            this.newAttr.options[i].default = false;
          }
        }
      },
      isOptionDefault(name){
        for(var i = 0; i < this.newAttr.options.length; i++){
          if(this.newAttr.options[i].name == name){
            return this.newAttr.options[i].default;
          }
        }
        return false;
      },
      handleOptionAdd(){
        for(var i = 0; i < this.newAttr.options.length; i++){
          if(this.newAttr.options[i].name == this.newAttr.option_name){
            return;
          }
        }

        this.newAttr.options.push({
          name: this.newAttr.option_name,
          label: this.newAttr.option_label,
          text_label: this.newAttr.option_text_label,
          default: false
        })
        this.newAttr.option_name = "";
        this.newAttr.option_label = "";
        this.newAttr.option_text_label = "";
      },
      showDeleteConfirm(id) {
        
        this.show = true;
        this.showid = id;
        
      },
      addAttribute(){
        this.loading = true
        this.$bvModal.hide("modal-scrollable-add");
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
          this.newAttr.sort_order = parseInt(this.newAttr.sort_order);
          axios
         .post(`${this.backendURL}/api/v1/products/attributes` , this.newAttr , authHeader())
         .then(response => {
            axios
            .get(`${this.backendURL}/api/v1/products/attributes?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
            .then(response => {
                this.attributesData = response.data.data,
                this.attributesDataLength = response.data.pagination.total;
            }),
           this.data = response.data,
           this.$toast.success("Attribute Created Successfully!", {
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
          this.newAttr = {options: []};
         })
         .catch(error => handleAxiosError(error, this))
         .finally(() => {
        this.loading = false
         });
      },
      updateAttribute(){
        this.loading = true
        this.$bvModal.hide("modal-scrollable-edit");
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
        this.newAttr = {
          name: this.currentAttribute.name,
          required: this.currentAttribute.required,
          enabled: this.currentAttribute.enabled,
          code: this.currentAttribute.code,
          use_category_filters: this.currentAttribute.use_category_filters,
          show_product_specifications: this.currentAttribute.show_product_specifications,
          show_product_page: this.currentAttribute.show_product_page,
          show_category_page: this.currentAttribute.show_category_page,
          sort_order: parseInt(this.currentAttribute.sort_order),
          group_id: this.currentAttribute.group.id,
          type_id: this.currentAttribute.type.id,
          default_option_id: this.currentAttribute.default_option.id,
        }
        axios
         .put(`${this.backendURL}/api/v1/products/attributes/${this.currentAttribute.id}` , this.newAttr , authHeader())
         .then(response => {
            this.data = response.data,
            this.$toast.success("Attribute Updated Successfully!", {
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
            this.newAttr = {options: []};
         })
         .catch(error => handleAxiosError(error, this))
         .finally(() => {
           this.loading = false
         });
      },
      deleteAttribute(){
        this.loading = true
        this.$bvModal.hide("modal-delete-page");
        if (!roleService.hasDeletePermission(this.pageIdentity)){
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
        axios
        .delete(`${this.backendURL}/api/v1/products/attributes/${this.currentAttribute.id}` , authHeader())
        .then(response => (
          axios
          .get(`${this.backendURL}/api/v1/products/attributes?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
          .then(response => {
              this.attributesData = response.data.data,
              this.attributesDataLength = response.data.pagination.total;
          }),
          this.data = response.data,
          this.$toast.success("Attribute Deleted Successgfully!", {
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
        .catch(error => handleAxiosError(error, this))
        .finally(() => {
          this.loading = false
        });
      },
      addOption(){
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
        axios
        .post(`${this.backendURL}/api/v1/products/attributes/${this.currentAttribute.id}/options` , this.newOption , authHeader())
        .then(response => {
          this.currentAttribute.options.push({
            id: response.data.data.id,
            name: this.newOption.name,
            label: this.newOption.label,
            text_label: this.newOption.text_label
          })
          this.newOption = {};
        })
        .catch(error => handleAxiosError(error, this));
      },
      cancle() {
        this.showid = "";
      },
      handleProductOptionDelete(name , arr){
            for( var i = 0; i < arr.length; i++){ 
        
                if ( arr[i].name == name) { 
                    arr.splice(i, 1);
                    break; 
                }
        
            }
      },
      deleteProductOption(opt){
        this.$bvModal.hide("modal-attribute-groups");
        if (!roleService.hasDeletePermission(this.pageIdentity)){
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
         axios
        .delete(`${this.backendURL}/api/v1/products/attributes/options/${opt.id}` , authHeader())
        .then(response => {
          this.data = response.data,
          this.$toast.success("Option Deleted Successfully!", {
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
          this.handleProductOptionDelete(opt.name , this.currentAttribute.options)
        })
        .catch(error => handleAxiosError(error, this));
      },
      addAttributeGroup(){
        this.loading = true
        this.$bvModal.hide("modal-attribute-groups");
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
        axios
        .post(`${this.backendURL}/api/v1/products/attributes/groups` , this.newGroup , authHeader())
        .then(response => {
          this.data = response.data,
          axios
          .get(`${this.backendURL}/api/v1/products/attributes/groups` , authHeader())
          .then(response => (this.attributeGroups = response.data.data))
          this.$toast.success("Attribute Group Created Successfully!", {
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
          this.newGroup = {name: ""};
        })
        .catch(error => handleAxiosError(error, this))
        .finally(() => {
          this.loading = false
        });
      },
      changeOptionType() {
        if(this.newAttr.type_id !== "8877d113-3791-4b8d-90f8-662fa63b7d1a") {
          this.optionType = true
        }
        else {
          this.optionType = false
        }
      },
      deleteAttributeGroup(group){
        this.loading = true
        this.$bvModal.hide("modal-attribute-groups");
        if (!roleService.hasDeletePermission(this.pageIdentity)){
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
        axios
        .delete(`${this.backendURL}/api/v1/products/attributes/groups/${group.id}` , authHeader())
        .then(response => {
          this.data = response.data,
          this.$toast.success("Attribute Group Deleted Successfully!", {
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
          axios
          .get(`${this.backendURL}/api/v1/products/attributes/groups` , authHeader())
          .then(response => (this.attributeGroups = response.data.data))
        })
        .catch(error => handleAxiosError(error, this))
        .finally(() => {
          this.loading = false
        });
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
                  <b-button v-b-modal.modal-attribute-groups variant="secondary" class="mr-2">
                      <i class="mdi mdi-plus mr-1"></i> Manage Attribute Groups
                  </b-button>
                  <b-button v-b-modal.modal-scrollable-add variant="primary">
                      <i class="mdi mdi-plus mr-1"></i> Add Attribute
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
                        <b-form-input 
                          v-model="filter" 
                          type="search" 
                          placeholder="Search..." 
                          class="form-control form-control-sm ml-2"
                        ></b-form-input>
                      </label>
                  </div>
              </div>
              <!-- End search -->
              <!-- Table -->
                <div class="table-responsive mb-0">
                    <b-table :items="attributesData" 
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
                        <span v-if="data.item.enabled" class="badge badge-success font-size-12">
                          <span>Enabled</span>
                        </span>
                        <span v-else class="badge badge-danger font-size-12">
                          <span>Disabled</span>
                        </span>
                      </template>
                      <template #cell(actions)="data">
                        <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                          <template v-slot:button-content>
                            <i class="mdi mdi-dots-horizontal font-size-18"></i>
                          </template>

                          <b-dropdown-item 
                            v-b-modal.modal-scrollable-edit variant="primary"
                            @click="currentAttribute = data.item"
                          >
                            <i class="fas fa-pencil-alt text-success mr-1" ></i> Edit
                          </b-dropdown-item>

                          <b-dropdown-item 
                            v-b-modal.modal-delete-page 
                            @click="currentAttribute = data.item"
                          >
                            <i class="fas fa-trash-alt text-danger mr-1"></i> Delete
                          </b-dropdown-item>
                        </b-dropdown>
                      </template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col">
                        <div 
                          class="dataTables_paginate paging_simple_numbers float-right"
                        >
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

            <!-- <b-button v-b-modal.modal-scrollable variant="primary">Edit Popup</b-button> -->

            <b-modal 
              id="modal-scrollable-edit" 
              scrollable title="Edit Attribute" 
              title-class="font-18" hide-footer
            >
              <b-tabs justified 
                nav-class="nav-tabs-custom" 
                content-class="p-3 text-muted"
              >
                <b-tab active>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="fas fa-home"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">General</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Attribute Name <span class="red"> *</span></label>
                      <b-form-input 
                        for="text"  
                        v-model="currentAttribute.name"
                      ></b-form-input>
                      <label class="mt-3">Is Required</label>
                        <b-form-checkbox 
                          switch size="lg"       
                          v-model="currentAttribute.required"
                        ></b-form-checkbox>
                      <label class="mt-3">Option Type <span class="red"> *</span></label>
                      <select 
                        class="custom-select" 
                        v-model="currentAttribute.type.id"
                      >
                        <option 
                          v-for="attrType in attrTypes" 
                          v-bind:value="attrType.id" 
                          :key="attrType.id"
                        >
                          {{attrType.name}}
                        </option>
                      </select>
                      <label class="mt-3">Attribute Code <span class="red"> *</span></label>
                      <b-form-input 
                        for="text" 
                        v-model="currentAttribute.code"
                      ></b-form-input>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Attribute Group <span class="red"> *</span></label>
                      <select class="custom-select" v-model="currentAttribute.group.id">
                        <option 
                          v-for="group in attributeGroups" 
                          :key="group.id" 
                          :value="group.id"
                        >
                          {{group.name}}
                        </option>
                      </select>
                      <label class="mt-3">Enabled</label>
                      <b-form-checkbox 
                        switch size="lg"       
                        v-model="currentAttribute.enabled"
                      ></b-form-checkbox>
                    </div>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Options</span>
                  </template>
                  <div class="dropdownOptions">
                    <div class="row mb-3">
                      <div class="col-sm-12 mb-3">
                        <span v-if="this.optionType" class="red"> *</span>
                        <b-form-input 
                          for="text" 
                          placeholder="Option Label" 
                          v-model="newOption.label"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-9">
                        <span v-if="this.optionType" class="red"> *</span>
                        <b-form-input 
                          for="text" 
                          placeholder="Option Name" 
                          v-model="newOption.name"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-3">
                        <b-button 
                          variant="primary" 
                          class="btn-block" 
                          @click="addOption()"
                        >
                          <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                          Add
                        </b-button>
                      </div>
                    </div>
                    <draggable 
                      v-model="currentAttribute.options" 
                      group="people" 
                      @start="drag=true" 
                      @end="drag=false"
                    >
                      <div 
                        v-for="(attributeoption) of currentAttribute.options" 
                        :key="attributeoption.id"
                      >
                        <b-card no-body class="mb-1 shadow-none">
                          <b-card-header header-tag="header" >
                            <h6 class="row">
                              <div class="col-sm-8">
                                <span class="move"><i class="bx bx-move-vertical"></i></span>
                                {{attributeoption.name}}
                              </div>
                              <div class="col-sm-4">
                                <span class="actions-right">
                                  <div class="row">
                                    <div class="col-sm-8">
                                      <b-form-checkbox
                                        class="custom-checkbox-primary"
                                        :checked="currentAttribute.default_option.id == attributeoption.id"
                                        :disabled="currentAttribute.default_option.id == attributeoption.id"
                                        @change="handleDefaultOptionChange(attributeoption.id)"
                                      >
                                        Default
                                      </b-form-checkbox>
                                    </div>
                                    <div class="col-sm-4">
                                      <button 
                                        variant="primary" 
                                        @click="deleteProductOption(attributeoption)"
                                      >
                                        <i class="bx bx-trash-alt"></i>
                                      </button>
                                    </div>
                                  </div>
                                </span>
                              </div>
                            </h6>
                          </b-card-header>
                        </b-card>
                      </div>
                    </draggable>
                  </div>
                  <div class="text-options">
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <b-form-input 
                          for="text" 
                          placeholder="Text Label" 
                          v-model="newOption.text_label"
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Frontend Settings</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Use in Category Filters</label>
                      <b-form-checkbox 
                        switch size="lg" 
                        v-model="currentAttribute.use_category_filters"
                      ></b-form-checkbox>
                      <label class="mt-3">Show On Product Page</label>
                      <b-form-checkbox 
                        switch size="lg"
                        v-model="currentAttribute.show_product_page"
                      ></b-form-checkbox>
                      <label class="mt-3">Show On Category Page</label>
                      <b-form-checkbox 
                        switch size="lg" 
                        v-model="currentAttribute.show_category_page"
                      ></b-form-checkbox>
                      <label class="mt-3">Sort Order</label>
                      <b-form-input 
                        for="text" 
                        v-model="currentAttribute.sort_order"
                      ></b-form-input>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Show In Product Specifications</label>
                      <b-form-checkbox 
                        switch size="lg" 
                        v-model="currentAttribute.show_product_specifications"
                      ></b-form-checkbox>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
              <div class="text-sm-right">
                <b-button variant="primary" @click="updateAttribute()">
                  <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                  Publish
                </b-button>
              </div>
            </b-modal>
            <b-modal 
              id="modal-scrollable-add" 
              scrollable title="Add Attribute" 
              title-class="font-18" 
              hide-footer
            >
              <b-tabs justified 
                nav-class="nav-tabs-custom" 
                content-class="p-3 text-muted"
              >
                <b-tab active>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="fas fa-home"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">General</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Attribute Name <span class="red"> *</span></label>
                      <b-form-input 
                        for="text" 
                        v-model="newAttr.name"
                      ></b-form-input>
                      <label class="mt-3">Is Required</label>
                      <b-form-checkbox 
                        switch size="lg"
                        v-model="newAttr.required"
                      ></b-form-checkbox>
                      <label class="mt-3">Option Type <span class="red"> *</span></label>
                      <select class="custom-select" @change="changeOptionType()" v-model="newAttr.type_id">
                         <option 
                          v-for="attrType in attrTypes" 
                          v-bind:value="attrType.id" 
                          :key="attrType.id"
                        >
                          {{attrType.name}}
                        </option>
                      </select>
                      <label class="mt-3">Attribute Code <span class="red"> *</span></label>
                      <b-form-input 
                        for="text" 
                        v-model="newAttr.code"
                      ></b-form-input>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Attribute Group <span class="red"> *</span></label>
                      <select class="custom-select" v-model="newAttr.group_id">
                        <option 
                          v-for="group in attributeGroups" 
                          :key="group.id" 
                          :value="group.id"
                        >
                          {{group.name}}
                        </option>
                      </select>
                      <label class="mt-3">Enabled</label>
                      <b-form-checkbox 
                        switch size="lg"
                        v-model="newAttr.enabled"
                      ></b-form-checkbox>
                    </div>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Options</span>
                  </template>
                  <div class="dropdown-options">
                    <div class="row mb-3">
                      <div class="col-sm-12 mb-3">
                        <span v-if="this.optionType" class="red"> *</span>
                        <b-form-input 
                          for="text" 
                          placeholder="Option Label" 
                          v-model="newAttr.option_label"
                        ></b-form-input>
                      </div>
                      <div class="col-sm-9">
                        <span v-if="this.optionType" class="red"> *</span>
                        <b-form-input 
                          for="text" 
                          placeholder="Option Name" 
                          v-model="newAttr.option_name"
                        ></b-form-input>
                      </div>
                      
                      <div class="col-sm-3">
                        <b-button 
                          variant="primary" 
                          class="btn-block" 
                          @click="handleOptionAdd()"
                        >
                        <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                          Add
                        </b-button>
                      </div>
                    </div>
                    <draggable 
                      v-model="newAttr.options" 
                      group="people" 
                      @start="drag=true" 
                      @end="drag=false"
                    >
                      <div 
                        v-for="(attributeoption) of newAttr.options" 
                        :key="attributeoption.id"
                      >
                        <b-card no-body class="mb-1 shadow-none">
                          <b-card-header header-tag="header" >
                            <h6 class="row">
                              <div class="col-sm-8">
                                <span class="move">
                                  <i class="bx bx-move-vertical"></i>
                                </span>
                                {{attributeoption.name}}
                              </div>
                              <div class="col-sm-4">
                                <span class="actions-right">
                                  <div class="row">
                                    <div class="col-sm-8">
                                      <b-form-checkbox
                                        class="custom-checkbox-primary"
                                        :checked="isOptionDefault(attributeoption.name)"
                                        :disabled="isOptionDefault(attributeoption.name)"
                                        @change="handleDefaultOptionCreateChange(attributeoption.name)"
                                      >
                                        Default
                                      </b-form-checkbox>
                                    </div>
                                    <div class="col-sm-4">
                                      <button 
                                        variant="primary"   @click="handleProductOptionDelete(attributeoption.name , newAttr.options)"
                                      >
                                        <i class="bx bx-trash-alt"></i>
                                      </button>
                                    </div>
                                  </div>
                                </span>
                              </div>
                            </h6>
                          </b-card-header>
                        </b-card>
                      </div>
                    </draggable>
                  </div>
                  <div class="text-options">
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <b-form-input 
                          for="text" 
                          placeholder="Text Label" 
                          v-model="newAttr.option_text_label"
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Frontend Settings</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Use in Category Filters</label>
                      <b-form-checkbox 
                        switch size="lg" 
                        v-model="newAttr.use_category_filters"
                      ></b-form-checkbox>
                      <label class="mt-3">Show On Product Page</label>
                      <b-form-checkbox 
                        switch size="lg" 
                        v-model="newAttr.show_product_page"
                      ></b-form-checkbox>
                      <label class="mt-3">Show On Category Page</label>
                      <b-form-checkbox 
                        switch size="lg" 
                        v-model="newAttr.show_category_page"
                      ></b-form-checkbox>
                      <label class="mt-3">Sort Order</label>
                      <b-form-input 
                        for="text" 
                        v-model="newAttr.sort_order"
                      ></b-form-input>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Show In Product Specifications</label>
                      <b-form-checkbox 
                        switch size="lg"
                        v-model="newAttr.show_product_specifications"
                      ></b-form-checkbox>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
              <div class="text-sm-right">
                <b-button variant="primary" :disabled="isdisable" @click="addAttribute()">
                  <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                  Publish
                </b-button>
              </div>
            </b-modal>
            <b-modal 
              id="modal-delete-page" 
              centered title="Delete Attribute" 
              title-class="font-18" hide-footer
            >
              <p>Are you sure? Pressing Delete will remove this attribute permenantly.</p>
              <div class="text-right">
                <b-button 
                  variant="danger" 
                  @click="deleteAttribute()"
                >
                  Delete
                </b-button>
              </div>
            </b-modal>
            <b-modal 
              id="modal-attribute-groups" 
              centered title="Manage Attribute Groups" 
              title-class="font-18" hide-footer
            >
              <div class="row mb-3">
                <div class="col-sm-12 mb-3">
                  <div class="slim-tab mb-2" v-for="group in attributeGroups" :key="group.id">
                    <span class="p-3">{{group.name}}</span>
                    <span class="actions-right cursor-ponter">
                      <span v-if="group.id !== showid" class="show-delete-confirmation">
                        <b-button 
                          class="mr-1 w-s m-2" 
                          variant="danger"
                          @click="showDeleteConfirm(group.id)"
                        >
                          <i class="mdi mdi-trash-can d-block"></i>
                        </b-button>
                      </span>
                      <div v-else-if="show && group.id == showid" class="delete-confirmation-active">
                        <!-- <transition name="slide-fade"> -->
                        Are you sure? 
                        <b-button 
                          class="mr-1 w-s m-2" 
                          variant="danger" 
                          @click="deleteAttributeGroup(group)"
                        >
                          <i class="bx bx-check d-block"></i>
                        </b-button>
                        <b-button 
                          class="mr-1 w-s m-2" 
                          variant="secondary"
                          @click="cancle()"
                        >
                          <i class="bx bx-x d-block"></i>
                        </b-button>
                        <!-- </transition> -->
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col-sm-9">
                  <span class="red"> *</span>
                  <b-form-input 
                    for="text" 
                    placeholder="Attribute Group Name" 
                    v-model="newGroup.name"
                  ></b-form-input>
                </div>
                <div class="col-sm-3">
                  <b-button 
                    variant="primary" 
                    class="btn-block" 
                    :disabled="groupDisable"
                    @click="addAttributeGroup()"
                  >
                    <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                    Add
                  </b-button>
                </div>
              </div>
              <div class="text-right">
                <b-button variant="primary">Save</b-button>
              </div>
            </b-modal>
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
    height: 100vh;
    width: 100%;
    z-index: 20000;
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
