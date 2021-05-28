<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import vue2Dropzone from "vue2-dropzone";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import { handleAxiosError } from "@/helpers/authservice/user.service"
import {roleService} from "@/helpers/authservice/roles";

/**
 * Users component
 */
export default { 
  page: {
    title: "Users",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader ,  vueDropzone: vue2Dropzone,},
  data() {
    return {
      pageIdentity: "user_management",
      selectedAll: false,
      backendURL: process.env.VUE_APP_BACKEND_URL,
      usersData: [],
      rolesData: [],
      currentUser: {
        role:{
          contents:[],
        },
        role_content_ids: [],
      },
      currentRoleID: "",
      roleContents: [],
      createUserPayload: {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        role_id: "",
        role_content_ids: [],
      },
      title: "Users",
      items: [
        {
          text: "Users",
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
              key: "name",
              sortable: true,
          },
          {
              key: "email",
              sortable: true,
          },
          {
              key: "username",
              sortable: true,
          },
          {
              key: "status",
              sortable: true,
          },
          {
              label: "Role",
              key: "role.name",
              sortable: true,
          },
          {
              key: "actions",
          },
      ],
      lgchecked: '',
      dropzoneOptions: {
        url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/users/upload`,
        // thumbnailWidth: 75,
        paramName: "profile_picture_image",
        maxFilesize: 200,
        headers: authHeader().headers,
        autoProcessQueue: false,
      }
    };
  },
  computed: {
      /**
        * Total no. of records
        */
      rows() {
          return this.usersData.length;
      },
  },
  watch: {
    selectedAll: function() {
      const selectedLength = this.usersData.filter(data => data.selected);
      return this.usersData.forEach( e => {
        if(this.selectedAll === true) { e.selected = true; }
        else if (selectedLength.length === this.usersData.length) {
          e.selected = false;
        }
      })
    }
  },
  mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
       axios
      .get(`${this.backendURL}/api/v1/users?per_page=${this.perPage}&page=${this.currentPage}` , authHeader())
      .then(response => {
         this.usersData = response.data.data;
         for(var i = 0; i < this.usersData.length; i++){
           var user = this.usersData[i];
           user.role_content_ids = [];
           if (user.role == null){
             user.role = {
               contents: [],
            }
           }else{
             for(var j = 0; j < user.role.contents.length; j++){
               user.role_content_ids.push(user.role.contents[j].id);
             }
           }
         }
       })
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/users/roles` , authHeader())
      .then(response => (this.rolesData = response.data.data))
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/users/roles/contents` , authHeader())
      .then(response => (this.roleContents = response.data.data))
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
      deleteUser(id){
        if (!roleService.hasDeletePermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        axios
        .delete(`${this.backendURL}/api/v1/users/${id}` , authHeader())
        .then(alert("Deleted!"))
        .catch(handleAxiosError);
      },
      createUser(e){
        if (!roleService.hasCreatePermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        e.preventDefault();
        this.createUserPayload.role_id = this.currentRoleID
        axios
        .post(`${this.backendURL}/api/v1/users` , this.createUserPayload , authHeader())
        .then(response => {
            alert(`${response.data.data.id} Created!`);
            this.$refs.vueCreateDropzone.setOption("url" , `${this.backendURL}/api/v1/users/${response.data.data.id}/upload`);
            this.$refs.vueCreateDropzone.processQueue();
         })
        .catch(handleAxiosError);
      },
      updateUser(e){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        e.preventDefault();
        this.currentUser.role_id = this.currentUser.role.id;
        axios
        .put(`${this.backendURL}/api/v1/users/${this.currentUser.id}` , this.currentUser , authHeader())
        .then(response => {
          alert(`${response.data.data.id} Updated!`);
          this.$refs.myVueDropzone.processQueue();
         })
        .catch(handleAxiosError);
      },
      isUserRole(role) {
        if (role.id == this.currentUser.role.id){
          return true;
        }
        return false;
      },
      isUserRoleContent(content){
        for(var i = 0; i < this.currentUser.role.contents.length; i++){
          var rc = this.currentUser.role.contents[i];
          if (rc.id == content.id){
            return true;
          }
        }
        return false;
      },
      addRoleContent(checked , contentID , contentArr){
        if (checked){
          contentArr.push(contentID);
        }else{
          contentArr.splice(contentArr.indexOf(contentID) , 1);
        }
      },
      handleImageUpload(){
        this.$refs.myVueDropzone.setOption("url" , `${this.backendURL}/api/v1/users/${this.currentUser.id}/upload`);
      },
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
                  <b-button v-b-modal.modal-scrollable-add-user variant="primary">
                    <i class="mdi mdi-plus mr-1"></i> Add User
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
                    <b-table :items="usersData" 
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

                          <b-dropdown-item v-b-modal.modal-scrollable-edit-user  @click="currentUser = data.item">
                            <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
                          </b-dropdown-item>

                          <b-dropdown-item  v-b-modal.modal-delete-user @click="currentUser = data.item">
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
    <b-modal id="modal-scrollable-add-user" scrollable title="Add User" title-class="font-18" hide-footer>
      <form @submit="createUser">
      <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
        <b-tab active>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">User Information</span>
          </template>
          <div class="row">
            <div class="col-sm-6">
              <label class="mt-3">First Name</label>
              <b-form-input for="text" value="" v-model="createUserPayload.first_name"></b-form-input>
              <label class="mt-3">Username</label>
              <b-form-input for="text" value="" v-model="createUserPayload.username"></b-form-input>
              <label class="mt-3">Password</label>
              <b-form-input type="password" for="password" value="" v-model="createUserPayload.password"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" value="" v-model="createUserPayload.last_name"></b-form-input>
              <label class="mt-3">Email</label>
              <b-form-input for="text" value="" v-model="createUserPayload.email"></b-form-input>
              <label class="mt-3">Password Confirmation</label>
              <b-form-input type="password" for="password" value="" v-model="createUserPayload.password_confirmation"></b-form-input>
            </div>
            <div class="col-md-6">
                  <label class="mt-3">Profile Picture</label>
                  <vue-dropzone
                    id="createDropzone"
                    ref="vueCreateDropzone"
                    :use-custom-slot="true"
                    :options="dropzoneOptions"
                  >
                      <div class="dropzone-custom-content">
                        <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                        <h4>Drop files here or click to upload.</h4>
                      </div>
                  </vue-dropzone>
            </div>
          </div>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Roles</span>
          </template>
          <div class="row">
            <div class="col-sm-12">
                <div class="row mb-3">
                  <div class="col-sm-12">
                   <label class="mt-3">Role</label>
                   <select class="custom-select" v-model="currentRoleID">
                        <option v-for="role in rolesData" v-bind:value="role.id" :key="role.id">{{role.name}}</option>
                    </select>
                  </div>
                </div>
                    <div v-for="(content, index) in roleContents" :key="index">
                      <b-card static no-body class="mb-1 shadow-none">
                        <b-card-header header-tag="header" role="tab">
                          <div class="slim-tab">
                            <b-form-checkbox
                                      class="custom-checkbox-primary float-left"
                                      checked
                                       @change="(v)=>addRoleContent(v , content.id , createUserPayload.role_content_ids)"
                                    ></b-form-checkbox>
                            <a
                              v-b-toggle="'accordion-' + index"
                              class="text-dark"
                              href="javascript: void(0);"
                            >
                              <div class="">{{content.name}}<div class="actions-right"><i v-if="content.sub_contents" class="bx bx-caret-down"></i></div></div>
                            </a>
                          </div>
                        </b-card-header>
                        <b-collapse :id="'accordion-' + index" accordion="" role="tabpanel">
                          <div></div>
                            <div v-for="(sub_content, index) in content.sub_contents" :key="index">
                              <div class="subcategory card-header">
                                <b-form-checkbox
                                  class="custom-checkbox-primary float-left"
                                  checked
                                  @change="(v)=>addRoleContent(v , sub_content.id , createUserPayload.role_content_ids)"
                                ></b-form-checkbox>
                                {{ sub_content.name }}
                              </div>
                            </div>
                        </b-collapse>
                      </b-card>
                    </div>

            </div>
          </div>
        </b-tab>
      </b-tabs>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary" type="submit">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Add
        </b-button>
      </div>
      </form>
    </b-modal>
    <b-modal id="modal-scrollable-edit-user" scrollable title="Edit User" title-class="font-18" hide-footer>
      <form @submit="updateUser">
      <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
        <b-tab active>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">User Information</span>
          </template>
          <div class="row">
            <div class="col-sm-6">
              <label class="mt-3">First Name</label>
              <b-form-input for="text" v-model="currentUser.first_name"></b-form-input>
              <label class="mt-3">Username</label>
              <b-form-input for="text" v-model="currentUser.username"></b-form-input>
              <label class="mt-3">Status</label>
              <b-form-checkbox switch size="lg" v-model="currentUser.enabled"></b-form-checkbox>
              <label class="mt-3">New Password</label>
              <b-form-input type="password" for="text" value="" v-model="currentUser.new_password"></b-form-input>
              <label class="mt-3">Current User Password</label>
              <b-form-input type="password" for="text" value="" v-model="currentUser.current_password"></b-form-input>
            </div>
            <div class="col-sm-6">
              <label class="mt-3">Last Name</label>
              <b-form-input for="text" v-model="currentUser.last_name"></b-form-input>
              <label class="mt-3">Email</label>
              <b-form-input for="text" v-model="currentUser.email"></b-form-input>
              <label class="mt-3">Password Confirmation</label>
              <b-form-input type="password" for="text" value="" v-model="currentUser.password_confirmation"></b-form-input>
              <label class="mt-3">Profile Picture</label>
              <vue-dropzone
                id="dropzone"
                ref="myVueDropzone"
                :use-custom-slot="true"
                :options="dropzoneOptions"
                @vdropzone-file-added="handleImageUpload"
              >
                <div class="dropzone-custom-content">
                  <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                  <h4>Drop files here or click to upload.</h4>
                </div>
              </vue-dropzone>
            </div>
          </div>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Roles</span>
          </template>
          <div class="row">
            <div class="col-sm-12">
                <div class="row mb-3">
                  <div class="col-sm-12">
                   <label class="mt-3">Role</label>
                   <select class="custom-select" v-model="currentUser.role.id">
                        <option v-for="role in rolesData" v-bind:value="role.id" :key="role.id" :selected="isUserRole(role)">{{role.name}}</option>
                    </select>
                  </div>
                </div>
                    <div v-for="(content, index) in roleContents" :key="index">
                      <b-card static no-body class="mb-1 shadow-none">
                        <b-card-header header-tag="header" role="tab">
                          <div class="slim-tab">
                            <b-form-checkbox
                                      class="custom-checkbox-primary float-left"
                                      :checked="isUserRoleContent(content)"
                                       @change="(v)=>addRoleContent(v , content.id , currentUser.role_content_ids)"
                                    ></b-form-checkbox>
                            <a
                              v-b-toggle="'accordion-' + index"
                              class="text-dark"
                              href="javascript: void(0);"
                            >
                              <div class="">{{content.name}}</div>
                            </a>
                          </div>
                        </b-card-header>
                        <b-collapse :id="'accordion-' + index" accordion="" role="tabpanel">
                          <div></div>
                            <div v-for="(sub_content, index) in content.sub_contents" :key="index">
                              <div class="subcategory card-header">
                                <b-form-checkbox
                                  class="custom-checkbox-primary float-left"
                                  @change="(v)=>addRoleContent(v , sub_content.id , currentUser.role_content_ids)"
                                  :checked="isUserRoleContent(sub_content)"
                                ></b-form-checkbox>
                                {{ sub_content.name }}
                              </div>
                            </div>
                        </b-collapse>
                      </b-card>
                    </div>

            </div>
          </div>
        </b-tab>
      </b-tabs>
      <br>
      <div class="text-sm-right">
        <b-button variant="primary" type="submit">
            <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
            Save
        </b-button>
      </div>
      </form>
    </b-modal>
    <b-modal id="modal-delete-user" centered title="Delete User" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Delete will remove this user permenantly.</p>
      <div class="text-right">
        <b-button variant="danger" @click="deleteUser(currentUser.id)">Delete</b-button>
      </div>
    </b-modal>
  </Layout>
</template>
