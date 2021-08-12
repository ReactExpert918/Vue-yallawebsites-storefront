<script>

import Layout from "../../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";

import draggable from 'vuedraggable'
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import {roleService} from "@/helpers/authservice/roles";
import alertBox from "@/helpers/Alert";


/**
 * Catalog component
 */
export default {
  page: {
    title: "Categories",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, draggable , vueDropzone: vue2Dropzone, },
  data() {
    return {
      pageIdentity: "categories",
      data: "",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      categoriesData: [],
      currentCategory: {product_sorts: []},
      currentProducts: [],
      catPayload: {
         name: "",
         content: "",
         parent_id: "",
         meta_title: "",
         meta_keywords: [],
         meta_description: "",
         enabled: false,
         meta_keywords_str: "",
      },
      productMap: {},
      productSortMap: {},
      pageTitle: "Catalog",
      items: [
        {
          text: "Catalog",
        },
        {
          text: "Categories",
          active: true
        }
      ],
      lgchecked: '',
      dropzoneOptions: {
        url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/categories/upload`,
        // thumbnailWidth: 75,
        paramName: "category_image",
        maxFilesize: 200,
        headers: authHeader().headers,
        autoProcessQueue: false,
      }
    };
  },
  computed: {
    console: () => console 
  },
  mounted(){
    axios
    .get(`${this.backendURL}/api/v1/categories?tree=true` , authHeader())
    .then(response => (this.categoriesData = response.data.data))
    .catch(handleAxiosError);
  },
  methods: {
    currentCategoryData(category){
      this.currentCategory = category
      this.currentCategory.product_sorts = [];
      this.currentProducts = []

      if (!(this.currentCategory.id in this.productMap)){
         axios
         .get(`${this.backendURL}/api/v1/categories/${this.currentCategory.id}/products` , authHeader())
         .then(response => {
            this.currentProducts = response.data.data;
            this.productMap[this.currentCategory.id] = this.currentProducts;
          })
          .catch(handleAxiosError);
      }else{
        this.currentProducts = this.productMap[this.currentCategory.id];
      }
     
    },
    createCategory(){
      if (!roleService.hasCreatePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!")
          return;
      }
      this.catPayload.meta_keywords = this.catPayload.meta_keywords_str.split(" ");
      if (this.catPayload.meta_keywords[0] == ""){
        this.catPayload.meta_keywords = [];
      } 
      axios
      .post(`${this.backendURL}/api/v1/categories` , this.catPayload , authHeader())
      .then(response => {
          this.data = response.data,
          alertBox("Category Created succesfully!")
          this.$refs.vueCreateDropzone.setOption("url" , `${this.backendURL}/api/v1/categories/${response.data.data.id}/upload`);
          this.$refs.vueCreateDropzone.processQueue();
       })
      .catch(handleAxiosError);
    },
    updateCategory(){
      if (!roleService.hasEditPermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!")
          return;
      }
      this.currentCategory.meta_keywords = this.currentCategory.meta_keywords_str.split(" ");
      if (this.currentCategory.meta_keywords[0] == ""){
        this.currentCategory.meta_keywords = [];
      } 

      for (const [productID, sortOrder] of Object.entries(this.productSortMap)) {
        this.currentCategory.product_sorts.push({
          product_id: productID,
          sort_order: parseInt(sortOrder)
        })
      }

      axios
      .put(`${this.backendURL}/api/v1/categories/${this.currentCategory.id}` , this.currentCategory , authHeader())
      .then(response => {
        this.data = response.data,
        alertBox("Category Updated succesfully!")
          this.$refs.myVueDropzone.processQueue();
       })
      .catch(handleAxiosError);
    },
    handleImageUpload(){
      this.$refs.myVueDropzone.setOption("url" , `${this.backendURL}/api/v1/categories/${this.currentCategory.id}/upload`);
    },
    deleteCategory(){
      if (!roleService.hasDeletePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!")
          return;
      }
      axios
      .delete(`${this.backendURL}/api/v1/categories/${this.currentCategory.id}` , authHeader())
      .then(response => (
        this.data = response.data,
        alertBox("Category Deleted successfully")
      ))
      .catch(handleAxiosError);
    },
    productSortChange(product){
        this.productSortMap[product.id] = product.sort_order;
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="pageTitle" :items="items" />
    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="col-lg-12">
                <div class="category-tabs" role="tablist"> 
                  <draggable
                    v-model="categoriesData"                @start="drag=true" 
                    @end="drag=false"
                    class="dragArea"
                    :group="{ name: 'g1' }"
                  >
                    <div 
                      v-for="(category, index) in categoriesData" :key="index + 10"
                    >
                      <b-card static 
                        no-body 
                        class="mb-0 shadow-none"
                      >
                        <div header-tag="header" role="tab" class="category-tab">
                          <h6 class="m-0">
                            <span class="move">
                              <i class="bx bx-move"></i>
                            </span>
                            <a
                              v-b-toggle="'accordion-' + index"
                              class="text-dark"
                              href="javascript: void(0);"
                            >
                              <i class="bx bx-caret-down mr-3"></i>
                              <span>{{category.name}}</span>
                            </a>
                            <span class="actions-right cursor-ponter btn-primary">
                              <i @click="currentCategoryData(category)" class="bx bx-edit-alt"></i>
                            </span>
                          </h6>
                        </div>
                        <b-collapse 
                          :id="'accordion-' + index"
                          accordion="" role="tabpanel"
                        >
                          <draggable  
                            v-model="category.subitems"                               
                            @start="drag=true" 
                            @end="drag=false"
                            class="dragArea"
                            :group="{ name: 'g1' }"
                          >
                            <div 
                              v-for="(subCat, index) in category.sub_categories" 
                              :key="index"
                            >
                              <div class="subcategory category-tab">
                                <span class="move">
                                  <i class="bx bx-move"></i>
                                </span>
                                {{ subCat.name }}
                                <span class="actions-right cursor-ponter btn-primary">
                                  <i 
                                    @click="currentCategoryData(subCat)" 
                                    class="bx bx-edit-alt"></i>
                                </span>
                              </div>
                            </div>
                          </draggable>
                        </b-collapse>
                      </b-card>
                    </div>
                  </draggable>
                </div>
                <b-button 
                  class="mt-2" variant="primary" 
                  v-b-modal.modal-add-category
                >
                  <i class="bx bx-plus mr-2"></i>
                  Add Category
                </b-button>
            </div>
          </div>
        </div>
        <div class="card product-in-category" >
          <div class="card-body">
            <label>Products In Category</label>
              <table class="table mb-0 mt-3">
                <thead>
                  <tr>
                    <th class="sort">Sort</th>
                    <th>Product Name</th>
                    <th>SKU</th>
                  </tr>
                </thead>
                <tbody v-if="currentProducts.length">
                  <tr 
                    v-for="products of currentProducts" 
                    :key="products.index"
                  >
                    <th scope="row">
                      <input 
                        type="text" 
                        class="form-control" 
                        @change="productSortChange(products)" 
                        v-model="products.sort_order" 
                      />
                    </th>
                    <td>{{products.name}}</td>
                    <td>{{products.sku}}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th scope="row">
                      <input 
                        type="text" 
                        class="form-control" 
                        value="1" 
                      />
                    </th>
                    <td>Select product</td>
                    <td>Select product</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <div class="mt-4">
              <div class="form-group row">
                <label class="col-md-6 col-form-label">Enabled</label>
                <div class="col-md-6 align-right">
                  <b-form-checkbox 
                    switch size="lg" 
                    v-model="currentCategory.enabled" 
                    class="text-right"
                  ></b-form-checkbox>
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Category Name</label>
                </div>
                <input 
                  type="text" 
                  v-model="currentCategory.name" 
                  class="form-control" 
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Content</label>
                </div>
                <textarea 
                  type="text" 
                  v-model="currentCategory.content" 
                  class="form-control"
                ></textarea>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label>Image</label>
                </div>
                <div class="col-12 p-0">
                  <div class="imagesUploaded mb-4">
                    <div class="imageFile">
                        <img :src="currentCategory.image"/>
                        <span>placeholder.png</span>
                        <span class="actions-right cursor-ponter">
                          <b-button 
                            class="mr-1 w-s" 
                            variant="danger"
                          >
                            <i class="mdi mdi-trash-can d-block"></i>
                          </b-button>
                        </span>
                    </div>
                  </div>
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
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Meta Title</label>
                </div>
                <input 
                  type="text" 
                  v-model="currentCategory.meta_title" 
                  class="form-control" 
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Meta Keywords</label>
                </div>
                <input 
                  type="text" 
                  v-model="currentCategory.meta_keywords_str" 
                  class="form-control" 
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Meta Description</label>
                </div>
                <textarea 
                  type="text" 
                  v-model="currentCategory.meta_description" 
                  class="form-control"
                ></textarea>
              </div>
              <div class="text-right">
                <b-button 
                  class="mr-1 w-s" 
                  variant="danger" 
                  v-b-modal.modal-delete-category
                >
                  <i class="mdi mdi-trash-can d-block"></i>
                </b-button>
                <b-button 
                  class="ml-1 w-lg" 
                  variant="primary" 
                  @click="updateCategory()"
                >
                  Save
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
    <b-modal 
      id="modal-add-category" 
      centered title="Add Category" 
      title-class="font-18" 
      hide-footer
    >
      <div class="form-group row">
        <div class="col-md-6">
          <label class="mt-3">Category Name</label>
          <b-form-input 
            for="text" 
            v-model="catPayload.name"
          ></b-form-input>
        </div>
        <div class="col-md-6">
          <label class="mt-3">Parent Category</label>
            <select class="custom-select" v-model="catPayload.parent_id">
              <option 
                v-for="category in categoriesData" 
                v-bind:value="category.id" 
                :key="category.id"
              >
                {{category.name}}
              </option>
            </select>
        </div>
        <div class="col-md-12">
            <label class="mt-3">Content</label>
            <textarea   
              type="text" 
              class="form-control" 
              v-model="catPayload.content"
            ></textarea>
        </div>
        <div class="col-md-12">
          <label class="mt-3">Image</label>
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
        <div class="col-md-12">
          <!--IMAGE PLACEHOLDER-->
          <div class="imagesUploaded">
            <div class="imageFile">
                <img src="placeholder.png" />
                <span>placeholder.png</span>
                <span class="actions-right cursor-ponter">
                  <b-button 
                    class="mr-1 w-s" 
                    variant="danger"
                  >
                    <i class="mdi mdi-trash-can d-block"></i>
                  </b-button>
                </span>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label class="mt-3">Meta Title</label>
          <b-form-input 
            for="text" 
            v-model="catPayload.meta_title"
          ></b-form-input>
        </div>
        <div class="col-md-6">
          <label class="mt-3">Meta Keywords</label>
          <b-form-input 
            for="text"  
            v-model="catPayload.meta_keywords_str"
          ></b-form-input>
        </div>
        <div class="col-md-12">
            <label class="mt-3">Meta Description</label>
            <textarea 
              type="text" 
              class="form-control"  
              v-model="catPayload.meta_description"
            ></textarea>
        </div>
        <div class="col-md-12 mt-3">
          <div class="text-right">
            <b-button 
              class="mt-2" 
              variant="primary" 
              @click="createCategory()"
            >
              Save
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal 
      id="modal-delete-category" 
      centered title="Delete Category" 
      title-class="font-18" 
      hide-footer
    >
      <p>Are you sure? Pressing Delete will remove this category permenantly.</p>
      <div class="text-right">
        <b-button 
          variant="danger" 
          @click="deleteCategory"
        >
          Delete
        </b-button>
      </div>
    </b-modal>
  </Layout>
</template>