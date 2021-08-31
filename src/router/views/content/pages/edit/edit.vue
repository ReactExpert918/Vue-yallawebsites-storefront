<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from "axios";
import appConfig from "@/app.config";
import {
  authHeader,
} from "@/helpers/authservice/auth-header";
import {roleService} from "@/helpers/authservice/roles";
import alertBox from "@/helpers/Alert";
import {handleAxiosError} from "@/helpers/authservice/user.service";

/**
 * Pages component
 */
export default {
  page: {
    title: "Edit Page",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, ckeditor: CKEditor.component },
  data() {
    return {
      pageIdentity: "pages",
      data: "",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      pageData: {layout:{} , meta_keywords_str:""},
      layouts: [],
      loading: false,
      title: "Edit Page",
      items: [
        {
          text: "Content",
        },
        {
          text: "Pages",
          href: "/content/pages"
        },
        {
          text: "Edit Page",
          active: true
        }
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
      textarea: '',
      lgchecked: false,
    };
  },
  computed: {
    isdisable() {
      if(this.pageData.title == "" || this.pageData.content == "" || this.pageData.layout_id == "" || this.pageData.visibility == "") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted(){
    this.loading = true;
    axios
    .get(`${this.backendURL}/api/v1/pages/layouts` , authHeader())
    .then(response => (this.layouts = response.data.data))
    .catch(handleAxiosError);
     axios
    .get(`${this.backendURL}/api/v1/pages/${this.$route.params.id}` , authHeader())
    .then(response => {
      this.pageData = response.data.data;
      this.pageData.meta_keywords_str = "";
      if (this.pageData.layout == null){
        this.pageData.layout = {};
      }
      for (var i  = 0; i < this.pageData.meta_keywords.length; i++){
        this.pageData.meta_keywords_str += this.pageData.meta_keywords[i];
        if ((this.pageData.meta_keywords.length - i) > 1){ // adding space seperated words and checking for the last item
          this.pageData.meta_keywords_str += " ";
        }
      }
    })
    .catch(handleAxiosError)
    .finally(() => {
      this.loading = false
    });
  },
  methods:{
    editPage(){
      if (!roleService.hasEditPermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
      }
      this.pageData.meta_keywords = this.pageData.meta_keywords_str.split(" ");
      this.pageData.layout_id = this.pageData.layout.id;
      if (this.pageData.meta_keywords[0] == ""){
        this.pageData.meta_keywords = [];
      } 
      axios
      .put(`${this.backendURL}/api/v1/pages/${this.$route.params.id}` , this.pageData , authHeader())
      .then(response => (
        this.$router.push('/content/pages'),
        this.data = response,
        alertBox("Page Updated succesfully", true)
        ))
      .catch(handleAxiosError);
    }
  }
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
            <div class="pageEditor">
              <span class="red"> *</span>
               <b-form-input for="text" class="mb-3" v-model="pageData.title"></b-form-input>
              <span class="red"> *</span>
               <ckeditor :editor="editor" v-model="pageData.content"></ckeditor>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
          <h4 class="card-title mb-3">SEO</h4>
            <div class="row">
              <div class="col-md-6">
                <label class="mb-1 mt-3 font-weight-medium">Meta Title</label>
                <b-form-input for="text" v-model="pageData.meta_title"></b-form-input>
              </div>
              <div class="col-md-6">
                 <label class="mb-1 mt-3 font-weight-medium">Meta Keywords</label>
                <b-form-input for="text" v-model="pageData.meta_keywords_str"></b-form-input>
              </div>
              <div class="col-md-12">
                 <label class="mb-1 mt-3 font-weight-medium">Meta Description</label>
                <textarea
                v-model="pageData.meta_description"
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
                        <b-form-checkbox switch size="lg" v-model="pageData.enabled" class="text-right"></b-form-checkbox>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Visibility <span class="red"> *</span></label>
                      <div class="col-md-6 align-right pl-0">
                        <select class="custom-select" v-model="pageData.visibility">
                          <option value="public" selected>Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Layout <span class="red"> *</span></label>
                      <div class="col-md-6 align-right pl-0">
                        <select class="custom-select" v-model="pageData.layout.id">
                          <option v-for="layout in layouts" v-bind:value="layout.id" :key="layout.id">{{layout.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">URL Key</label>
                      <div class="col-md-6 align-right pl-0">
                        <b-form-input for="text" v-model="pageData.url_key"></b-form-input>
                      </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-6">
                          <b-button variant="light" class="pl-4 pr-4">
                              Preview
                          </b-button>
                        </div>
                        <div class="col-md-6">
                         <b-button variant="primary" :disabled="isdisable" @click="editPage()">
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
    top: 30%;
    left: 50%;
  }
</style>
