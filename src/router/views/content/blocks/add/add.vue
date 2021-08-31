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
import {handleAxiosError} from "@/helpers/authservice/user.service";
import alertBox from "@/helpers/Alert";

/**
 * Pages component
 */
export default {
  page: {
    title: "Add Block",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, ckeditor: CKEditor.component },
  data() {
    return {
      pageIdentity: "blocks",
      title: "Add Block",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      data: "",
      disable: false,
      loading: false,
      blockData: {
        title: "",
        shortcode: "",
        paragraph: "",
        enabled: false
      },
      items: [
        {
          text: "Content",
        },
        {
          text: "Blocks",
          href: "/content/pages"
        },
        {
          text: "Add Block",
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
      lgchecked: false,
    };
  },
  computed: {
    isdisable() {
      if(this.blockData.title == "" || this.blockData.shortcode == "" || this.blockData.paragraph == "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    addBlock() {
      this.loading = true;
      if (!roleService.hasCreatePermission(this.pageIdentity)){
          alertBox("You do no have the permission to perform this action!", false)
          return;
      }
      axios
      .post(`${this.backendURL}/api/v1/blocks` , this.blockData , authHeader())
      .then(response => (
        this.$router.push('/content/blocks'),
        this.data = response.data,
        alertBox("Blocks Created successfully", true) 
      ))
      .catch(handleAxiosError)
      .finally(() => {
        this.loading = false
      });
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-9">
        <div class="card">
          <div class="card-body">
            <div class="pageEditor">
              <span class="red"> *</span>
               <b-form-input for="text" class="mb-3" v-model="blockData.title"></b-form-input>
               <span class="red"> *</span>
               <ckeditor :editor="editor" v-model="blockData.paragraph"></ckeditor>
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
                        <b-form-checkbox switch size="lg" v-model="blockData.enabled" class="text-right"></b-form-checkbox>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-6 col-form-label">Block ID <span class="red"> *</span></label>
                      <div class="col-md-6 align-right pl-0">
                        <b-form-input for="text" v-model="blockData.shortcode"></b-form-input>
                      </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12">
                         <b-button variant="primary" :disabled="isdisable" @click="addBlock()">
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
