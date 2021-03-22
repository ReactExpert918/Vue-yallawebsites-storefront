<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";

import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";

import { variationsData } from "./variations-data";
import axios from "axios";
import appConfig from "@/app.config";

/**
 * Pages component
 */
export default {
  page: {
    title: "Edit Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, ckeditor: CKEditor.component, vueDropzone: vue2Dropzone, Multiselect },

  data() {
    return {
      backendURL: process.env.VUE_APP_BACKEND_URL,
      productData: {layout:{} , meta_keywords_str:"" , meta_description:"" , bundle_ids:[]},
      variationsData: variationsData,
      allProductsData: [],
      preVariation: [],
      layouts: [],
      categories: [],
      selectedCategories: [],
      VariationOptionsName: ['name1', 'name2', 'name3'],
      id: [],
      variations: [],
      variationValue: 'Variation Name',
      variationOptions: [],
      variationRequired: false,
      title: "Edit Product",
      items: [
        {
          text: "Catalog",
        },
        {
          text: "Products",
          href: "/content/pages"
        },
        {
          text: "Edit Product",
          active: true
        }
      ],
      attributevalues: [
        "value 1",
        "value 2",
        "value 3",
        "value 4",
      ],
      categoryvalues: [
        "cat 1",
        "cat 2",
        "cat 3",
        "cat 4",
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: [{
              label: "Selected",
              key: "selected",
              sortable: true,
          },
          { 
              label: "Product Name",
              key: "name",
              sortable: true,
          },
          {   
              label: "SKU",
              key: "sku",
              sortable: true,
          },
          {
              label: "Price",
              key: "price",
              sortable: true,
          },
          {
              label: "Qty",
              key: "quantity",
              sortable: true,
          },
          {
              key: "status",
              sortable: true,
          },
      ],
      editor: ClassicEditor,
      editorData: "",
      content: "",
      plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "save table contextmenu directionality emoticons template paste textcolor",
      ],
      toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
      options: {
        height: 300,
        style_formats: [
          { title: "Bold text", inline: "b" },
          { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          { title: "Example 1", inline: "span", classes: "example1" },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          { title: "Table row 1", selector: "tr", classes: "tablerow1" },
        ],
      },
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      textarea: '',
      lgchecked: '',
      value1: '',
      outputUrl: '',
      tempArr: [],
      tempArr2: null
    };
  },
  computed: {
      
  },
  mounted() {
      axios
      .get(`${this.backendURL}/api/v1/pages/layouts`)
      .then(response => (this.layouts = response.data.data));
      axios
      .get(`${this.backendURL}/api/v1/categories`)
      .then(response => (this.categories = response.data.data));
      axios
      .get(`${this.backendURL}/api/v1/products/${this.$route.params.id}`)
      .then(response => {
          this.productData = response.data.data;
          this.productData.meta_keywords_str = "";
          if (this.productData.layout == null){
            this.productData.layout = {};
          }
          for (var i  = 0; i < this.productData.meta_keywords.length; i++){
            this.productData.meta_keywords_str += this.productData.meta_keywords[i];
            if ((this.productData.meta_keywords.length - i) > 1){ // adding space seperated words and checking for the last item
              this.productData.meta_keywords_str += " ";
            }
          }
      });
      axios
      .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&without=${this.$route.params.id}`)
      .then(response => (this.allProductsData = response.data.data));
  },
  methods: {

      updateProduct(){
        this.productData.meta_keywords = this.productData.meta_keywords_str.split(" ");
        if (this.productData.meta_keywords[0] == ""){
          this.productData.meta_keywords = [];
        } 
        var productReq = {
           name: this.productData.name,
           price: parseFloat(this.productData.price),
           cost_price: parseFloat(this.productData.cost_price),
           sale_price: parseFloat(this.productData.sale_price),
           short_description: this.productData.short_description,
           long_description: this.productData.long_description,
           meta_title: this.productData.meta_title,
           meta_description: this.productData.meta_description,
           meta_keywords: this.productData.meta_keywords,
           layout_id: this.productData.layout.id,
           ean: this.productData.ean,
           sku: this.productData.sku,
           visibility: this.productData.visibility,
           url_key: this.productData.url_key,
           quantity: parseInt(this.productData.quantity),
           enabled: this.productData.enabled,
           is_downloadable: this.productData.is_downloadable,
           category_ids: [],
        }

        for(var i = 0; i < this.selectedCategories.length; i++){ 
           productReq.category_ids.push(this.selectedCategories[i].id);
        }

        axios
        .put(`${this.backendURL}/api/v1/products/${this.$route.params.id}` , productReq)
        .then(response => (alert(`${response.data.data.id} Product Updated!`)))
      },

      deleteProduct(){
        axios
        .delete(`${this.backendURL}/api/v1/products/${this.productData.id}`)
        .then(response => (alert(`${response.data.data.id} Product deleted!`)));
      },

      isBundleID(id){
        for (var i = 0; i < this.productData.bundle_ids.length; i++){
          if (this.productData.bundle_ids[i] == id){
            return true;
          }
        }
        return false;
      },
      addTag (searchQuery, id) {
          let optionValue = {
            name: searchQuery
          }
          this.variationsData[id].options.push(optionValue)
          this.id = []
          this.tempArr = []
          this.variations = []
          this.variationsData.forEach( i => {
            i.options.forEach( i => this.id.push(i.name) )
            this.tempArr.push(this.id)
            this.id = []
          })
          this.tempArr2 = this.cartesianProduct(this.tempArr)
          this.tempArr2.forEach( i => {
          let tag = {
          id: 1,
          name: this.variationsData[id].name,
          options: [],
          subitems: [
              { 
                  id: 1,
                  price: '21.20',
                  qty: '31',
                  sku: 'SDJA_SD',
                  costprice: '13.31',
                  saleprice: '123.41',
                  ean: 'sadkoskd_s1',
                  customImage: '/custom.jpg',
                  specs: [
                      {
                          id: 1,
                          name: 'Manufacturer',
                          value: '1',
                      },
                      {
                          id: 2,
                          name: 'Length',
                          value: '12',
                      }
                  ] 
              }
            ]
          }   
          tag.options = i      
          this.variations.push(tag)  
        })
      },
      /**
        * Search the table data with search input
        */
      onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
      },
      addVariation(){
        let variation = {
          name: '',
          options: [],
          required: false
        }
        this.variationsData.push(variation)
      },
      cartesianProduct(arr) {
          return arr.reduce(function(a,b){
              return a.map(function(x){
                  return b.map(function(y){
                      return x.concat([y]);
                  })
              }).reduce(function(a,b){ return a.concat(b) },[])
          }, [[]])
      },
      deleteVariation(index){
        this.variationsData.splice(index, 1);
      },
      deleteOption(option, id){
        if (id == 0){
            this.variations = this.variations.filter( i => {
            return i.options[0] !== option.name
            })
            if(!this.variations.length){
              this.variationsData = []
            }
        } 
        else if(id == 1){
          if(this.variationsData[1].options.length == 1){
            this.variations.forEach( variation => {
             variation.options = variation.options.filter( i => {
                return i !== option.name
              })
            })                 
          } else {
            this.variations = this.variations.filter( i => {
            return i.options[1] !== option.name
            })               
          }}
       else if (id == 2){
          if(this.variationsData[2].options.length == 1){
            this.variations.forEach( variation => {
             variation.options = variation.options.filter( i => {
                return i !== option.name
              })
            })                 
          } else {
            this.variations = this.variations.filter( i => {
            return i.options[2] !== option.name
            })                 
          }
        }
      }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-9">
        <div class="card">
          <div class="card-body">
          <h4 class="card-title mt-3">General</h4>
            <div class="row">
              <div class="col-9">
                <label class="mt-3">Product Name</label>
                <b-form-input for="text" v-model="productData.name"></b-form-input>
              </div>
              <div class="col-3">
              <label class="mt-3">Product Type</label>
                <select class="custom-select">
                  <option value="0">Simple Product</option>
                  <option value="1">Downloadable Product</option>
                  <option value="2">Groupped Product</option>
                  <option value="3">Bundled Product</option>
                </select>
              </div>
              <div class="col-4">
                <label class="mt-3">Product Price</label>
                <b-form-input for="text" v-model="productData.price"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">Product Cost Price</label>
                <b-form-input for="text" v-model="productData.cost_price"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">Product Sale Price</label>
                <b-form-input for="text" v-model="productData.sale_price"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">Qty</label>
                <b-form-input for="text" v-model="productData.quantity"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">SKU</label>
                <b-form-input for="text" v-model="productData.sku"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">EAN</label>
                <b-form-input for="text" v-model="productData.ean"></b-form-input>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
          <h4 class="card-title mt-3">Short Description</h4>
          <div class="row">
            <div class="col-12">
              <ckeditor :editor="editor" v-model="productData.short_description"></ckeditor>
            </div>
          </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Full Product Description</h4>
            <div class="row">
              <div class="col-12">
                <ckeditor :editor="editor" v-model="productData.long_description"></ckeditor>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Images</h4>
            <div class="row">
              <div class="col-3 mt-2">
                <vue-dropzone
                  id="dropzone"
                  ref="myVueDropzone"
                  :use-custom-slot="true"
                  :options="dropzoneOptions">
                  <div class="dropzone-custom-content">
                    <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </vue-dropzone>
                </div>
                <div class="col-9">
                  <div class="row">
                    <div class="imagesUploaded mb-2 col-6">
                      <div class="imageFile highlight-border">
                          <img src="placeholder.png"/>
                          <span class="actions-right cursor-ponter">
                            <b-button id="tooltip-set-default-1" variant="primary" class="mr-2"><i class="bx bx-image-alt"></i></b-button>
                            <b-tooltip target="tooltip-set-default-1">Set Image As Default</b-tooltip>
                            <b-button class="mr-1 w-s" variant="danger"><i class="mdi mdi-trash-can d-block"></i></b-button>
                          </span>
                      </div>
                    </div>
                    <div class="imagesUploaded mb-2 col-6">
                      <div class="imageFile">
                          <img src="placeholder.png"/>
                          <span class="actions-right cursor-ponter">
                            <b-button id="tooltip-set-default-2" variant="primary" class="mr-2"><i class="bx bx-image-alt"></i></b-button>
                            <b-tooltip target="tooltip-set-default-2">Set Image As Default</b-tooltip>
                            <b-button class="mr-1 w-s" variant="danger"><i class="mdi mdi-trash-can d-block"></i></b-button>
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Attributes</h4>
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table mb-0">
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Manufacturer</td>
                        <td>
                          <select class="custom-select">
                            <option value="0">Manufacturer 1</option>
                            <option value="1">Manufacturer 2</option>
                            <option value="2">Manufacturer 3</option>
                            <option value="3">Manufacturer 4</option>
                          </select>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Length</td>
                        <td>
                          <b-form-input for="text" value="Length"></b-form-input>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Width</td>
                        <td>
                          <b-form-input for="text" value="Width"></b-form-input>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Product Variations</h4>
            <div class="variationHeadings" v-if="variationsData.length">
              <div class="row">
                <div class="col-3">
                  <label>Variation Name</label>
                </div>
                <div class="col-9">
                  <label>Option Value</label>
                </div>
              </div>
            </div>
            <div class="variation" v-for="(item, index) of variationsData" :key="index + 34">
              <div class="row">
                <div class="col-3">
                  <b-form-input value="" size="md" v-model="VariationOptionsName[index]"></b-form-input>
                </div>
                <div class="col-9 mb-1">
                  <multiselect 
                    track-by="name" 
                    :multiple="true" 
                    :taggable="true" 
                    :id="index"
                    @tag="addTag"
                    @remove="deleteOption"
                    v-model="item.options" 
                    label="name"  
                    :options="item.options" 
                  >
                  <template  slot="item.variationOptions">
                   {{item.name}}
                  </template>
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="variationToolbar">
              <div class="row">
                <div class="col-12" >
                  <b-button @click="addVariation()" v-if="variationsData.length < 3" variant="primary mb-2 ">
                      <i class="bx bx-plus-circle font-size-16 align-middle mr-2"></i>
                      Add Variation
                  </b-button>
                </div>
              </div>
            </div>
            <div class="variationGenerated">
              <div class="category-tabs" role="tablist">
                  <div v-for="(variation, index) in variations" :key="index + 65">
                    <b-card no-body class="mb-1 shadow-none">
                      <b-card-header header-tag="header" role="tab">
                          <a v-b-toggle="'accordion-' + index" class="text-dark row" href="javascript: void(0);">
                            <div class="col-4">
                              <i class="bx bx-caret-down mr-3"></i>
                              <span>{{variation.name}}</span>
                              <span v-for="(i, index) in variation.options" :key="index + 20"> {{i}} /</span>
                            </div>
                            <div class="col-8 row" v-for="(subitem, index) in variation.subitems" :key="index ">
                              <div class="col-4">
                                <label class="mt-3">Price</label>
                                <b-form-input for="text" :value="subitem.price"></b-form-input>
                              </div>
                              <div class="col-4">
                                <label class="mt-3">Qty</label>
                                <b-form-input for="text" :value="subitem.qty"></b-form-input>
                              </div>
                              <div class="col-4">
                                <label class="mt-3">SKU</label>
                                <b-form-input for="text" :value="subitem.sku"></b-form-input>
                              </div>
                            </div>
                          </a>
                      </b-card-header>
                      <b-collapse :id="'accordion-' + index" accordion="" role="tabpanel">
                          <div v-for="(subitem, index) in variation.subitems" :key="index + 131">
                            <div class="subcategory card-header">
                              <div class="row">
                                <div class="col-3">
                                  <label class="mt-3">Cost Price</label>
                                  <b-form-input for="text" :value="subitem.costprice"></b-form-input>
                                </div>
                                <div class="col-3">
                                  <label class="mt-3">Sale Price</label>
                                  <b-form-input for="text" :value="subitem.saleprice"></b-form-input>
                                </div>
                                <div class="col-3">
                                  <label class="mt-3">EAN</label>
                                  <b-form-input for="text" :value="subitem.ean"></b-form-input>
                                </div>
                                <div class="col-3">
                                  <label class="mt-3">Custom Image</label>
                                  <vue-dropzone
                                    id="dropzone"
                                    ref="myVueDropzone"
                                    :use-custom-slot="true"
                                    :options="dropzoneOptions"
                                    url="/"
                                    autoDiscover="false"
                                    >
                                    <div class="dropzone-custom-content customImage">
                                      <i class="display-14 text-muted bx bxs-cloud-upload"></i>
                                      <h6>Drop files here or click to upload.</h6>
                                    </div>
                                  </vue-dropzone>
                                </div>
                                <div class="col-12">
                                  <label class="mt-3">Custom Specs</label>
                                  <div class="table-responsive">
                                    <table class="table table-striped mb-0">
                                      <thead>
                                        <tr>
                                          <th>Attribute</th>
                                          <th>Value</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>{{subitem.specs[0].name}}</td>
                                          <td>{{subitem.specs[0].value}}</td>
                                        </tr>
                                        <tr>
                                          <td>{{subitem.specs[1].name}}</td>
                                          <td>{{subitem.specs[1].value}}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </b-collapse>
                    </b-card>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Product Bundles</h4>
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
                                <label class="d-inline-flex align-items-center">
                                    Search:
                                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                                </label>
                            </div>
                        </div>
                        <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table :items="allProductsData" selectable :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                      <template #cell(selected)="data">
                        <b-form-checkbox switch size="lg" :checked="isBundleID(data.item.id)"></b-form-checkbox>
                      </template>
                       <template #cell(status)="data">
                        <span class="badge badge-success font-size-12">
                          <span v-if="data.item.enabled">Enabled</span>
                          <span v-else>Disabled</span>
                        </span>
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
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Search Engine Optimisation</h4>
            <div class="row">
              <div class="col-md-6">
                <label class="mb-1 mt-3 font-weight-medium">Meta Title</label>
                <b-form-input for="text" v-model="productData.meta_title"></b-form-input>
              </div>
              <div class="col-md-6">
                 <label class="mb-1 mt-3 font-weight-medium">Meta Keywords</label>
                <b-form-input for="text" v-model="productData.meta_keywords_str"></b-form-input>
              </div>
              <div class="col-md-12">
                 <label class="mb-1 mt-3 font-weight-medium">Meta Description</label>
                <textarea
                v-model="productData.meta_description"
                class="form-control"
                :maxlength="225"
                rows="3"
                placeholder="This textarea has a limit of 225 chars."
              ></textarea>
              <div class="text-center">
                <p
                  v-if="textarea.meta_description"
                  class="badge position-absolute"
                  :class="{ 'badge-success': textarea.length !== 225,
                            'badge-danger': textarea.length === 225 }"
                >
                  {{ textarea.length }} /
                  225
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <div class="row">
                <div class="col-12">
                  <form class="form-horizontal pagesSidebar" role="form">
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Enabled</label>
                      <div class="col-md-6 align-right">
                        <b-form-checkbox switch size="lg" v-model="productData.enabled" class="text-right"></b-form-checkbox>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Visibility</label>
                      <div class="col-md-6 align-right pl-0">
                        <select class="custom-select" v-model="productData.visibility">
                          <option selected value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Layout</label>
                      <div class="col-md-6 align-right pl-0">
                        <select class="custom-select" v-model="productData.layout.id">
                         <option v-for="layout in layouts" v-bind:value="layout.id" :key="layout.id">{{layout.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">URL</label>
                      <div class="col-md-6 align-right pl-0">
                        <b-form-input for="text" v-model="productData.url_key"></b-form-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Categories</label>
                      <multiselect class="mr-3 ml-2"  v-model="selectedCategories" label="name" track-by="id" :options="categories"  :multiple="true"></multiselect>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <b-button class="btn-block" variant="danger" v-b-modal.modal-delete-page><i class="mdi mdi-trash-can d-block"></i></b-button>
                       </div>
                       <div class="col-md-8 mb-2 text-right pl-0">
                          <b-button variant="light" class="btn-block">
                              Preview
                          </b-button>
                        </div>
                        <div class="col-md-12">
                         <b-button variant="primary" class="btn-block" @click="updateProduct()">
                              <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                              Publish
                          </b-button>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- end row -->
    <b-modal id="modal-delete-page" centered title="Delete Product" title-class="font-18" hide-footer>
      <p>Are you sure? Pressing Delete will remove this product permenantly.</p>
      <div class="text-right">
        <b-button variant="danger" @click="deleteProduct()">Delete</b-button>
      </div>
    </b-modal>
  </Layout>
</template>
