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
      pageIdentity: "products",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      productData: {
        layout:{} , 
        meta_keywords_str:"" ,
        meta_description:"" , 
        bundle_ids:[],
        default_image_url: "",
        delete_image_urls: [],
        attribute_group_id: "",
        attributes: [],
        specifications: [],
        variations: [],
      },
      variationsData: [],
      allProductsData: [],
      attrs: [],
      attrGroups: [],
      preVariation: [],
      layouts: [],
      categories: [],
      selectedCategories: [],
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
      attrMap: {},
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
      
  },
  mounted() {
      axios
      .get(`${this.backendURL}/api/v1/pages/layouts` , authHeader())
      .then(response => (this.layouts = response.data.data))
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/categories` , authHeader())
      .then(response => (this.categories = response.data.data))
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/products/${this.$route.params.id}` , authHeader())
      .then(response => {
          this.productData = response.data.data;
          this.productData.meta_keywords_str = "";
          if (this.productData.layout == null){
            this.productData.layout = {};
          }
          if (this.productData.attributes == null){
            this.productData.attributes = [];
          } 
          for (var i  = 0; i < this.productData.meta_keywords.length; i++){
            this.productData.meta_keywords_str += this.productData.meta_keywords[i];
            if ((this.productData.meta_keywords.length - i) > 1){ // adding space seperated words and checking for the last item
              this.productData.meta_keywords_str += " ";
            }
          }
          for(var j = 0; j < this.productData.attributes.length; j++){
            var a = this.productData.attributes[j];
            this.attrMap[a.id] = a;
          }


          if(this.attrs.length > 0){
            for(var k = 0; k < this.attrs.length; k++){
              var attr = this.attrs[k];
              if(attr.id in this.attrMap){
                if (this.attrMap[attr.id].option){
                   attr.option_id = this.attrMap[attr.id].option.id;
                }
                attr.value = this.attrMap[attr.id].value; 
              }
            }
          }

          if (this.attrGroups.length > 0 && this.productData.attribute_group){
            var grp = this.attrGroups[this.attrGroups.map(function(e) { return e.id; }).indexOf(this.productData.attribute_group.id)];
            if (grp){
              this.currentAttrGroup = grp;
            }
         }          

          this.productData.delete_image_urls = [];

          this.productData.specifications.forEach((v) => {
              var vd = {
                uuid: v.id,
                name: v.name,
                options: [],
              }
              v.values.forEach((o) => {
                vd.options.push({
                  name: o,
                })
              })
              this.variationsData.push(vd);
          })

          this.productData.variations.forEach((v) =>{
              var varData = {
                uuid: v.id,
                options: v.labels,
                subitem: {
                  uuid: v.id,
                  qty: v.quantity,
                  price: v.price,
                  costprice: v.cost_price,
                  saleprice: v.sale_price,
                  sku: v.sku,
                  ean: v.ean,
                  customImage: v.image,
                  specs: [],
                }
              }
              if (v.customer_spec){
                v.specs.push({
                  id: v.custom_spec.attribute_id,
                  name: v.custom_spec.attribute_name,
                  value: v.custom_spec.value,
                })
              }

              this.variations.push(varData);
          })

      })
      .catch(handleAxiosError);
      axios
      .get(`${this.backendURL}/api/v1/products?per_page=${this.perPage}&page=${this.currentPage}&without=${this.$route.params.id}&with_disabled=false` , authHeader())
      .then(response => (this.allProductsData = response.data.data))
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

          if(attr.id in this.attrMap){
            if (this.attrMap[attr.id].option){
              attr.option_id = this.attrMap[attr.id].option.id;
            }
            attr.value = this.attrMap[attr.id].value; 
          }

        }

        axios
          .get(`${this.backendURL}/api/v1/products/attributes/groups` , authHeader())
          .then(response => {
            this.attrGroups = response.data.data;
            if (this.attrGroups.length > 0){
              this.currentAttrGroup = this.attrGroups[0];
            }
            for(var j = 0; j < this.attrGroups.length; j++){
              this.attrGroups[j].attributes = this.attrGrpMap[this.attrGroups[j].id];
              var agi = "";
              if (this.productData.attribute_group){
                agi = this.productData.attribute_group.id;
              }
              if (this.attrGroups[j].id == agi){
                this.currentAttrGroup = this.attrGroups[j];
              }
            }
            
          })
          .catch(handleAxiosError);

      })
      .catch(handleAxiosError);
  },
  methods: {

      updateProduct(){
        if (!roleService.hasEditPermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
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
           default_image_url: this.productData.default_image_url,
           delete_image_urls: this.productData.delete_image_urls,
           category_ids: [],
           bundle_ids: this.productData.bundle_ids,
           attributes: [],
           specifications: [],
           variations: [],
        }

        for(var i = 0; i < this.selectedCategories.length; i++){ 
           productReq.category_ids.push(this.selectedCategories[i].id);
        }

        if(this.currentAttrGroup.attributes){
          for(var j = 0; j < this.currentAttrGroup.attributes.length; j++){
            var attr = this.currentAttrGroup.attributes[j];
            productReq.attributes.push({
              id: attr.id,
              option_id: attr.option_id,
              value: attr.value,
            })
          }
        }

        this.variationsData.forEach((v) => {
          var spec = {
            id: v.uuid,
            name: v.name,
            values: [],
          }
          v.options.forEach((o) => {
            spec.values.push(o.name);
          })
          productReq.specifications.push(spec);
        })

        this.variations.forEach((v) => {
          var varReq = {
            id: v.uuid,
            labels: v.options,
            quantity: parseInt(v.subitem.qty),
            price: parseFloat(v.subitem.price),
            cost_price: parseFloat(v.subitem.costprice),
            sale_price: parseFloat(v.subitem.saleprice),
            sku: v.subitem.sku,
            ean: v.subitem.ean,
          }
          if (v.image_name){
            varReq.image_name = v.image_name;
            varReq.image_content = v.image_content;
          }
          if (v.subitem.specs.length > 0) { //TODO: clear up about custom spec selection then un-comment
            var spec = v.subitem.specs[0];
            varReq.attribute_id = spec.id;
            varReq.value = spec.value;
          }
          productReq.variations.push(varReq);
        })


        axios
        .put(`${this.backendURL}/api/v1/products/${this.$route.params.id}` , productReq , authHeader())
        .then(response => {
          alert(`${response.data.data.id} Product Updated!`);
          this.$refs.myVueDropzone.processQueue();
        })
        .catch(handleAxiosError);
      },

      deleteProduct(){
        if (!roleService.hasDeletePermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
        }
        axios
        .delete(`${this.backendURL}/api/v1/products/${this.productData.id}` , authHeader())
        .then(response => (alert(`${response.data.data.id} Product deleted!`)))
        .catch(handleAxiosError);
      },

      handleImageUpload(){
        this.$refs.myVueDropzone.setOption("url" , `${this.backendURL}/api/v1/products/${this.productData.id}/upload`);
      },

      isBundleID(id){
         return this.productData.bundle_ids.indexOf(id) > -1;
      },
      addBundle(id){
        if (this.isBundleID(id)){
          this.productData.bundle_ids.splice(this.productData.bundle_ids.indexOf(id) , 1);
          return;
        }
        this.productData.bundle_ids.push(id);
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
          uuid: '',
          name: this.variationsData[id].name,
          options: [],
          subitem:  { 
              id: 1,
              uuid: '',
              price: 0.0,
              qty: 0,
              sku: '',
              costprice: 0.0,
              saleprice: 0.0,
              ean: '',
              specs: [] 
            },
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
          uuid: '',
          name: '',
          options: [],
          required: false
        }
        this.variationsData.push(variation)
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
                  :options="dropzoneOptions"
                  @vdropzone-file-added="handleImageUpload">
                  <div class="dropzone-custom-content">
                    <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </vue-dropzone>
                </div>
                <div class="col-9">
                  <div class="row">
                    <div class="imagesUploaded mb-2 col-6">
                      <div class="imageFile highlight-border" v-for="(image , index) of productData.images" :key="index">
                          <img :src="image" />
                          <span class="actions-right cursor-ponter">
                            <b-button id="tooltip-set-default-1" variant="primary" class="mr-2" @click="productData.default_image_url = image"><i class="bx bx-image-alt"></i></b-button>
                            <b-tooltip target="tooltip-set-default-1">Set Image As Default</b-tooltip>
                            <b-button class="mr-1 w-s" variant="danger" @click="productData.delete_image_urls.push(image)"><i class="mdi mdi-trash-can d-block"></i></b-button>
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
                       <tr v-for="attr in currentAttrGroup.attributes" :key="attr.id">
                        <td>
                          {{attr.name}}
                        </td>
                        <td>
                          <select class="custom-select" v-if="attr.type.slug =='dropdown'" v-model="attr.option_id">
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
                                          <th>Attribute</th>
                                          <th>Value</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="(spec , index) in variation.subitem.specs" :key="index">
                                          <td>{{spec.name}}</td>
                                          <td>{{spec.value}}</td>
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
                        <b-form-checkbox switch size="lg"   v-on:change="addBundle(data.item.id)" :checked="isBundleID(data.item.id)"></b-form-checkbox>
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
                                    <b-pagination v-model="currentPage" :per-page="perPage"></b-pagination>
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
