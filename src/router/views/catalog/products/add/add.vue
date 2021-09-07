<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";

import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import {roleService} from "@/helpers/authservice/roles";
import {copyArrayOfObjects} from "@/helpers/common";
import alertBox from "@/helpers/Alert";

/**
 * Pages component
 */
export default {
  page: {
    title: "Add Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, ckeditor: CKEditor.component, vueDropzone: vue2Dropzone, Multiselect },
  data() {
    return {
      pageIdentity: "products",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      allProductsData: [],
      allProductsDataLength: 1,
      loading: false,
      data: "",
      attrs: [],
      attrGroups: [],
      preVariation: [],
      newProduct: {
           name: "",
           price: 0,
           cost_price: 0,
           sale_price: 0,
           weight: 0,
           short_description: "",
           long_description: "",
           meta_title: "",
           meta_description: "",
           meta_keywords: [],
           meta_keywords_str: "",
           layout_id: "",
           ean: "",
           sku: "",
           visibility: "public",
           url_key: "",
           quantity: "",
           enabled: false,
           is_downloadable: false,
           category_ids: [],
           bundle_ids: [],
           attribute_group_id: "",
           attributes: [],
           specifications: [],
           variations: [],
      },
      layouts: [],
      categories: [],
      selectedCategories: [],
      id: [],
      variations: [],
      variationValue: 'Variation Name',
      variationOptions: [],
      variationRequired: false,
      custom_specs: [],
      variationsData: [],
      title: "Add Product",
      items: [
        {
          text: "Catalog",
        },
        {
          text: "Products",
          href: "/content/pages"
        },
        {
          text: "Add Product",
          active: true
        }
      ],
      attrGrpMap: {},
      currentAttrGroup: {},
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
        url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/products/upload`,
        // thumbnailWidth: 75,
        paramName: "product_image",
        maxFilesize: 200,
        headers: authHeader().headers,
        autoProcessQueue: false,
      },
      variationDropzoneOptions:{
         url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/products/upload`,
        // thumbnailWidth: 75,
        paramName: "product_variation_image",
        maxFilesize: 200,
        headers: authHeader().headers,
        autoProcessQueue: false,
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
      /**
        * Total no. of records
        */
      isdisable() {
        if(this.newProduct.name == "" || this.newProduct.short_description == "" || this.newProduct.long_description == "" || this.newProduct.sku == "" || this.newProduct.ean == "" || this.newProduct.price <= 0 
        || this.newProduct.cost_price <= 0 || this.newProduct.sale_price <= 0 || this.newProduct.quantity == "" || this.newProduct.visibility == "" || this.newProduct.layout_id == "") {
          return true;
        } else {
          return false;
        }
      },
      rows() {
          return this.allProductsDataLength;
      },

      currentAttributeGroupHandler:{
        get(){
          return this.currentAttrGroup;
        },
        set(newGrp){
          this.currentAttrGroup = newGrp;
          this.custom_specs = this.currentAttrGroup.attributes;
          for(var i = 0; i < this.variations.length; i++){
            this.variations[i].subitem.specs = [];
            this.variations[i].custom_specs = copyArrayOfObjects(this.custom_specs);
          }
        }       
      }
  },
  mounted() {
    this.loading = true
      axios
      .get(`${this.backendURL}/api/v1/pages/layouts` , authHeader())
      .then(response => (this.layouts = response.data.data,
      this.newProduct.layout_id = this.layouts[0].id))
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/categories` , authHeader())
      .then(response => (this.categories = response.data.data))
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&with_disabled=false` , authHeader())
      .then(response => (this.allProductsData = response.data.data,
      this.allProductsDataLength = response.data.pagination.total))
      .catch(handleAxiosError);
      
      axios
      .get(`${this.backendURL}/api/v1/products/attributes?with_disabled=false&all=true` , authHeader())
      .then(response => {
        this.attrs = response.data.data;
        for(var i = 0; i < this.attrs.length; i++){
          var attr = this.attrs[i];

          if (attr.group == null){
            attr.group = {};
          }else{
            if(!(attr.group.id in this.attrGrpMap)){
              this.attrGrpMap[attr.group.id] = [];
            }
            attr.value = "";
            attr.option_id = "";
            this.attrGrpMap[attr.group.id].push(attr);
          }

          if (attr.type == null){
            attr.type = {};
          }

          if (attr.options.length < 1) {
            attr.options = [];
          }

        }

          axios
          .get(`${this.backendURL}/api/v1/products/attributes/groups` , authHeader())
          .then(response => {
            this.attrGroups = response.data.data;
            if (this.attrGroups.length > 0){
              this.currentAttrGroup = this.attrGroups[0];
            }
            for(var i = 0; i < this.attrGroups.length; i++){
              if(this.attrGroups[i].id in this.attrGrpMap){
                this.attrGroups[i].attributes = this.attrGrpMap[this.attrGroups[i].id];
              }
          }
          this.custom_specs = this.currentAttrGroup.attributes;
        })
        .catch(handleAxiosError);

      })
      .catch(handleAxiosError)
      .finally(() => {
        this.loading = false
      });
  },
  methods: {
      handlePageChange(value) {
        this.currentPage = value;
        axios
        .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&with_disabled=false` , authHeader())
        .then(response => (this.allProductsData = response.data.data,
        this.allProductsDataLength = response.data.pagination.total))
        .catch(handleAxiosError);
      },
      handlePerPageChange(value) {
        this.perPage = value;
        this.currentPage = 1;
        axios
        .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&with_disabled=false` , authHeader())
        .then(response => (this.allProductsData = response.data.data,
        this.allProductsDataLength = response.data.pagination.total))
        .catch(handleAxiosError);
      },
      createProduct(){
        if (this.$refs.myVueDropzone.getAcceptedFiles().length < 1){ // if there are files added to the dropzone for uploading, then do not hide the modal
          this.backPage();
        }
        if (!roleService.hasCreatePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
        }
        this.newProduct.meta_keywords = this.newProduct.meta_keywords_str.split(" ");
        if (this.newProduct.meta_keywords[0] == ""){
          this.newProduct.meta_keywords = [];
        } 
        for(var i = 0; i < this.selectedCategories.length; i++){ 
           this.newProduct.category_ids.push(this.selectedCategories[i].id);
        }
        this.newProduct.price = parseFloat(this.newProduct.price);
        this.newProduct.cost_price = parseFloat(this.newProduct.cost_price);
        this.newProduct.sale_price = parseFloat(this.newProduct.sale_price);
        this.newProduct.quantity = parseInt(this.newProduct.quantity);
        this.newProduct.weight = parseInt(this.newProduct.weight);
        
        this.newProduct.attribute_group_id = this.currentAttrGroup.id;

        this.variationsData.forEach((v) => {
          var spec = {
            name: v.name,
            values: [],
          }
          v.options.forEach((o) => {
            spec.values.push(o.name);
          })
          this.newProduct.specifications.push(spec);
        })
        this.variations.forEach((v) => {
          var varReq = {
            labels: v.labels,
            quantity: parseInt(v.subitem.qty),
            price: parseFloat(v.subitem.price),
            cost_price: parseFloat(v.subitem.costprice),
            sale_price: parseFloat(v.subitem.saleprice),
            sku: v.subitem.sku,
            ean: v.subitem.ean,
            custom_specs: [],
          }
          if (v.image_name){
            varReq.image_name = v.image_name;
            varReq.image_content = v.image_content;
          }
          v.subitem.specs.forEach((spec) => {
            varReq.custom_specs.push({
              attribute_id: spec.id,
              value: spec.custom_value,
            })
          })
  
          this.newProduct.variations.push(varReq);
        })
        axios
        .post(`${this.backendURL}/api/v1/products` , this.newProduct , authHeader())
        .then(response => {
          alertBox(`Product Created Successfully!`, true);
          this.$refs.myVueDropzone.setOption("url" , `${this.backendURL}/api/v1/products/${response.data.data.id}/upload`);
          this.$refs.myVueDropzone.processQueue();
         })
        .catch(handleAxiosError);
      },
      isBundleID(id){
        return this.newProduct.bundle_ids.indexOf(id) > -1;
      },
      addBundle(id){
        if (this.isBundleID(id)){
          this.newProduct.bundle_ids.splice(this.newProduct.bundle_ids.indexOf(id) , 1);
          return;
        }
        this.newProduct.bundle_ids.push(id);
      },
      addTag (searchQuery, id , varName) {
          let optionValue = {
            name: searchQuery,
            varspec: searchQuery + "_" + varName,
          }
          this.variationsData[id].options.push(optionValue)
          this.variationsData[id].labels[optionValue] = this.variationsData[id].name;
          this.id = []
          this.tempArr = []
          this.variations = []
          this.variationsData.forEach( i => {
            i.options.forEach( i => this.id.push(i.varspec) )
            this.tempArr.push(this.id)
            this.id = []
          })
        this.tempArr2 = this.cartesianProduct(this.tempArr)
        this.tempArr2.forEach( opts => {
          let tag = {
            id: this.variations.length+1,
            name: this.variationsData[id].name,
            options: [],
            labels: [],
            subitem: { 
                    id: this.variations.length+1,
                    price: 0.0,
                    qty: 0,
                    sku: '',
                    costprice: 0.0,
                    saleprice: 0.0,
                    ean: '',
                    specs: [], 
            },
            custom_specs: copyArrayOfObjects(this.custom_specs), // this is a temporary one
          }
          
          var options = [];
          opts.forEach(opt =>{
            var obj = {};
            var data = opt.split("_");
            options.push(data[0]);
            obj[data[1]] = data[0];
            tag.labels.push(obj);
          })
          tag.options = options;      
          this.variations.push(tag);
        })

      },
      onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
      },
      addVariation(){
        let variation = {
          name: '',
          options: [],
          labels: {},
          required: false
        }
        this.variationsData.push(variation)
      },
      addVariationSpec(variation , spec, selected){
        if (selected){
          variation.subitem.specs.push(spec);
        }else{
          variation.subitem.specs = variation.subitem.specs.filter(item => item.id !== spec.id);
        }
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
      },
      handleVariationImageUpload(file , variation){
        this.getBase64(file).
        then(data => {
          variation.image_name = file.name;
          variation.image_content = data;
        });
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        })
      },
      backPage(){
        this.$router.push('/catalog/products')
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
      <div class="col-9">
        <div class="card">
          <div class="card-body">
          <h4 class="card-title mt-3">General</h4>
            <div class="row">
              <div class="col-9">
                <label class="mt-3">Product Name <span class="red"> *</span></label>
                <b-form-input for="text" v-model="newProduct.name"></b-form-input>
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
              <div class="col-3">
                <label class="mt-3">Product Price <span class="red"> *</span></label>
                <b-form-input for="text" type="number" v-model="newProduct.price"></b-form-input>
              </div>
              <div class="col-3">
                <label class="mt-3">Product Cost Price <span class="red"> *</span></label>
                <b-form-input for="text" type="number" v-model="newProduct.cost_price"></b-form-input>
              </div>
              <div class="col-3">
                <label class="mt-3">Product Sale Price <span class="red"> *</span></label>
                <b-form-input for="text" type="number" v-model="newProduct.sale_price"></b-form-input>
              </div>
              <div class="col-3">
                <label class="mt-3">Product Weight <span class="red"> *</span></label>
                <b-form-input for="text" type="number" v-model="newProduct.weight"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">Qty <span class="red"> *</span></label>
                <b-form-input for="text" type="number" v-model="newProduct.quantity"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">SKU <span class="red"> *</span></label>
                <b-form-input for="text" v-model="newProduct.sku"></b-form-input>
              </div>
              <div class="col-4">
                <label class="mt-3">EAN <span class="red"> *</span></label>
                <b-form-input for="text" v-model="newProduct.ean"></b-form-input>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
          <h4 class="card-title mt-3">Short Description <span class="red"> *</span></h4>
          <div class="row">
            <div class="col-12">
              <ckeditor :editor="editor" v-model="newProduct.short_description"></ckeditor>
            </div>
          </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Full Product Description <span class="red"> *</span></h4>
            <div class="row">
              <div class="col-12">
                <ckeditor :editor="editor" v-model="newProduct.long_description"></ckeditor>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Images</h4>
            <div class="row">
              <div class="col-3">
                <vue-dropzone
                  id="dropzone"
                  ref="myVueDropzone"
                  :use-custom-slot="true"
                  :options="dropzoneOptions"
                  @vdropzone-complete="backPage"
                >
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
                          <img src="@/assets/images/product/img-1.png" class="product-img" />
                          <span class="actions-right cursor-ponter">
                            <b-button id="tooltip-set-default-1" variant="primary" class="mr-2"><i class="bx bx-image-alt"></i></b-button>
                            <b-tooltip target="tooltip-set-default-1">Set Image As Default</b-tooltip>
                            <b-button class="mr-1 w-s" variant="danger"><i class="mdi mdi-trash-can d-block"></i></b-button>
                          </span>
                      </div>
                    </div>
                    <div class="imagesUploaded mb-2 col-6">
                      <div class="imageFile">
                          <img src="@/assets/images/product/img-2.png" class="product-img" />
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
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-9"><h4 class="card-title mt-3">Attributes</h4></div>
                <div class="col-sm-3">
                  <label>Attribute Group</label>
                  <select class="custom-select"  v-model="currentAttributeGroupHandler">
                      <option v-for="group in attrGroups" v-bind:value="group" :key="group.id">{{group.name}}</option>
                    </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-responsive mt-3">
                  <table class="table mb-0">
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="attr in currentAttrGroup.attributes" :key="attr.id">
                        <td>
                          {{attr.name}}
                        </td>
                        <td>
                          <select class="custom-select" v-if="attr.type.slug=='dropdown'" v-model="attr.option_id">
                             <option v-for="opt in attr.options" v-bind:value="opt.id" :key="opt.id">{{opt.name}}</option>
                          </select>
                          <b-form-input v-else for="text" v-model="attr.value"></b-form-input>
                        </td>
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
                  <b-form-input value="" size="md" v-model="item.name"></b-form-input>
                </div>
                <div class="col-9 mb-1">
                  <multiselect 
                    track-by="name" 
                    :multiple="true" 
                    :taggable="true" 
                    :id="index"
                    @tag="(sq , id) => addTag(sq , id , item.name)"
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
                              <!-- <span>{{variation.name}}</span> -->
                              <span v-for="(i, index) in variation.options" :key="index + 20"> {{i}} /</span>
                            </div>
                            <div class="col-8 row">
                              <div class="col-4">
                                <label class="mt-3">Price</label>
                                <b-form-input for="text" v-model="variation.subitem.price"></b-form-input>
                              </div>
                              <div class="col-4">
                                <label class="mt-3">Qty</label>
                                <b-form-input for="text" v-model="variation.subitem.qty"></b-form-input>
                              </div>
                              <div class="col-4">
                                <label class="mt-3">SKU</label>
                                <b-form-input for="text" v-model="variation.subitem.sku"></b-form-input>
                              </div>
                            </div>
                          </a>
                      </b-card-header>
                      <b-collapse :id="'accordion-' + index" accordion="" role="tabpanel">
                          <div>
                            <div class="subcategory card-header">
                              <div class="row">
                                <div class="col-3">
                                  <label class="mt-3">Cost Price</label>
                                  <b-form-input for="text" v-model="variation.subitem.costprice"></b-form-input>
                                </div>
                                <div class="col-3">
                                  <label class="mt-3">Sale Price</label>
                                  <b-form-input for="text" v-model="variation.subitem.saleprice"></b-form-input>
                                </div>
                                <div class="col-3">
                                  <label class="mt-3">EAN</label>
                                  <b-form-input for="text" v-model="variation.subitem.ean"></b-form-input>
                                </div>
                                <div class="col-3">
                                  <label class="mt-3">Custom Image</label>
                                  <vue-dropzone
                                    id="vardropzone"
                                    ref="myVariationVueDropzone"
                                    :use-custom-slot="true"
                                    :options="variationDropzoneOptions"
                                    @vdropzone-file-added="(file) => handleVariationImageUpload(file,variation)"
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
                                          <th>Select</th>
                                          <th>Attribute</th>
                                          <th>Value</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="spec in variation.custom_specs" :key="spec.id">
                                          <td>
                                            <b-form-checkbox switch size="lg" v-on:change="(selected) => addVariationSpec(variation , spec , selected)"></b-form-checkbox>
                                          </td>
                                          <td>
                                            {{spec.name}}
                                          </td>
                                          <td>
                                            <b-form-input for="text" v-model="spec.custom_value"></b-form-input>
                                          </td>
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
                                    <b-form-select 
                                      v-model="perPage" 
                                      size="sm" :options="pageOptions"
                                      change = "handlePerPageChange"
                                    >
                                    </b-form-select>&nbsp;entries
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
                        <b-table :items="allProductsData" selectable :fields="fields" responsive="sm" :per-page="perPage" :current-page="1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                      <template #cell(selected)="data">
                        <b-form-checkbox switch size="lg"  v-on:change="addBundle(data.item.id)"></b-form-checkbox>
                      </template>
                       <template #cell(status)="data">
                        <span v-if="data.item.enabled" class="badge badge-success font-size-12">
                          <span>Enabled</span>
                        </span>
                        <span v-else class="badge badge-danger font-size-12">
                          <span>Disabled</span>
                        </span>
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
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-3">Search Engine Optimisation</h4>
            <div class="row">
              <div class="col-md-6">
                <label class="mb-1 mt-3 font-weight-medium">Meta Title</label>
                <b-form-input for="text" v-model="newProduct.meta_title"></b-form-input>
              </div>
              <div class="col-md-6">
                 <label class="mb-1 mt-3 font-weight-medium">Meta Keywords</label>
                <b-form-input for="text" v-model="newProduct.meta_keywords_str"></b-form-input>
              </div>
              <div class="col-md-12">
                 <label class="mb-1 mt-3 font-weight-medium">Meta Description</label>
                <textarea
                v-model="newProduct.meta_description"
                class="form-control"
                :maxlength="225"
                rows="3"
                placeholder="This textarea has a limit of 225 chars."
              ></textarea>
              <div class="text-center">
                <p
                  v-if="textarea"
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
                        <b-form-checkbox switch size="lg" v-model="newProduct.enabled" class="text-right"></b-form-checkbox>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Visibility <span class="red"> *</span></label>
                      <div class="col-md-6 align-right pl-0">
                        <select class="custom-select" v-model="newProduct.visibility">
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Layout <span class="red"> *</span></label>
                      <div class="col-md-6 align-right pl-0">
                        <select class="custom-select" v-model="newProduct.layout_id">
                         <option v-for="layout in layouts" v-bind:value="layout.id" :key="layout.id">{{layout.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">URL</label>
                      <div class="col-md-6 align-right pl-0">
                        <b-form-input for="text" v-model="newProduct.url_key"></b-form-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Categories</label>
                      <multiselect class="mr-3 ml-2"  v-model="selectedCategories" label="name" track-by="id" :options="categories"  :multiple="true"></multiselect>
                    </div>
                    <div class="form-group row">
                       <div class="col-md-6">
                          <b-button variant="light" class="btn-block">
                              Preview
                          </b-button>
                        </div>
                        <div class="col-md-6 pl-0">
                         <b-button variant="primary" class="btn-block" :disabled="isdisable" @click="createProduct()">
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
  </Layout>
</template>
<style scoped>
.product-img {
  height: 135px;
  width: 135px;
}

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
    top: 300px;
    left: 50%;
  }
</style>