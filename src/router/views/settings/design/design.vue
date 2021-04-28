<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import vue2Dropzone from "vue2-dropzone";
import {authHeader} from "@/helpers/authservice/auth-header";
import {handleAxiosError} from "@/helpers/authservice/user.service";
import {roleService} from "@/helpers/authservice/roles";

import axios from "axios";


export default {
  page: {
    title: "Reports",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    vueDropzone: vue2Dropzone,
    Layout,
    PageHeader,
  },
  data() {
    return {
      pageIdentity: "designs",
      backendURL: process.env.VUE_APP_BACKEND_URL,
      configuration: {
          id:"",
          site_logo:"",
          favicon:"",
          primary_color:"",
          secondary_color:"",
          button_color_1:"",
          button_text_1:"",
          button_color_2:"",
          button_text_2:"",
          primary_font_custom:"",
          secondary_font_custom:"",
          primary_font:{},
          secondary_font:{},
      },
      fonts: [],
      themesData: [],
      primaryFontFile: '',
      secondaryFontFile: '',
      title: "Configuration",
      items: [
        {
          text: "Settings",
        },
        {
          text: "Configuration",
          active: true
        }
      ],
      siteLogoDropzoneOptions: {
        url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/design/configurations/upload`,
        // thumbnailWidth: 75,
        paramName: "site_logo",
        maxFilesize: 200,
        headers: authHeader().headers,
        autoProcessQueue: false,
      },
      faviconDropzoneOptions: {
        url: `${process.env.VUE_APP_BACKEND_URL}/api/v1/design/configurations/upload`,
        // thumbnailWidth: 75,
        paramName: "favicon",
        maxFilesize: 200,
        headers: authHeader().headers,
        autoProcessQueue: false,
      }
    };
  },
  mounted(){
    axios
    .get(`${this.backendURL}/api/v1/design/configurations` , authHeader())
    .then(response => {
      this.configuration = response.data.data;
      if (this.configuration.primary_font == null){
        this.configuration.primary_font = {};
      }
      if (this.configuration.secondary_font == null){
        this.configuration.secondary_font = {};
      }
    })
    .catch(handleAxiosError)
    axios
    .get(`${this.backendURL}/api/v1/design/fonts` , authHeader())
    .then(response => (this.fonts = response.data.data))
    .catch(handleAxiosError)
    axios
    .get(`${this.backendURL}/api/v1/design/themes` , authHeader())
    .then(response => (this.themesData = response.data.data))
    .catch(handleAxiosError)

  },
  methods:{
    saveDesignConfiguration(){
      if (!roleService.hasEditPermission(this.pageIdentity)){
          alert("You do no have the permission to perform this action!")
          return;
      }
      var payload = {
          primary_color: this.configuration.primary_color,
          secondary_color: this.configuration.secondary_color,
          button_color_1: this.configuration.button_color_1,
          button_text_1: this.configuration.button_text_1,
          button_color_2: this.configuration.button_color_2,
          button_text_2: this.configuration.button_text_2,
          primary_font_id: this.configuration.primary_font.id,
          secondary_font_id: this.configuration.secondary_font.id,
      }
    axios
    .post(`${this.backendURL}/api/v1/design/configurations` ,payload, authHeader())
    .then(response => {
      alert(`${response.data.data.id} Design saved!`);
      var confID = response.data.data.id;
      this.$refs.siteLogoDropzone.setOption("url" , `${this.backendURL}/api/v1/design/configurations/${confID}/upload`);
      this.$refs.faviconDropzone.setOption("url" , `${this.backendURL}/api/v1/design/configurations/${confID}/upload`);
      this.$refs.siteLogoDropzone.processQueue();
      this.$refs.faviconDropzone.processQueue();

      if (this.primaryFontFile != '' || this.secondaryFontFile != ''){
          let formData = new FormData();
          if (this.primaryFontFile != ''){
            formData.append('primary_font_custom' , this.primaryFontFile);
          }
          if (this.secondaryFontFile != ''){
            formData.append('secondary_font_custom' , this.secondaryFontFile);
          }
          var header = authHeader();
          header.headers["Content-Type"] = 'multipart/form-data';
          axios
          .post(`${this.backendURL}/api/v1/design/configurations/${confID}/upload` , formData , header)
          .then(response => {
            alert(`${response.data.data.id} Uploaded Design Configuration Font Files!`);
            })
          .catch(handleAxiosError);
      }

    })
    .catch(handleAxiosError)
    },
    handlePrimaryFontUpload(){
      this.primaryFontFile = this.$refs.primaryFontFile.files[0];
    },
    handleSecondaryFontUpload(){
      this.secondaryFontFile = this.$refs.secondaryFontFile.files[0];
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">

        <div class="card configuration-tabs">
          <div class="card-body">
            <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Configuration</span>
                </template>

                <b-button v-b-modal.modal-scrollable variant="primary" @click="saveDesignConfiguration()">
                    <i class="mdi mdi-plus mr-1"></i> Save
                </b-button>
                
                <div class="card-body">
                  <h4 class="card-title mb-3">General</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Site Logo</label>
                      <vue-dropzone
                        id="dropzone"
                        ref="siteLogoDropzone"
                        :use-custom-slot="true"
                        :options="siteLogoDropzoneOptions"
                      >
                        <div class="dropzone-custom-content">
                          <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </vue-dropzone>
                    </div>
                    <div class="col-md-3">
                      <label>Favicon</label>
                      <vue-dropzone
                        id="dropzone"
                        ref="faviconDropzone"
                        :use-custom-slot="true"
                        :options="faviconDropzoneOptions"
                      >
                        <div class="dropzone-custom-content">
                          <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </vue-dropzone>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Colors</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Primary Color</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" v-model="configuration.primar_color"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Secondary Color</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" v-model="configuration.secondary_color"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button Color 1</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" v-model="configuration.button_color_1"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button text 1</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" v-model="configuration.button_text_1"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button Color 2</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" v-model="configuration.button_color_2"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button text 2</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" v-model="configuration.button_text_2"></b-form-input>
                      </b-form-group>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Fonts</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Primary Font</label>
                      <select class="form-control" v-model="configuration.primary_font.id">
                        <option v-for="font in fonts" v-bind:value="font.id" :key="font.id">{{font.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Primary Custom Font</label>
                      <div class="custom-file">
                        <input id="primaryFontFile" type="file" ref="primaryFontFile" class="custom-file-input" v-on:change="handlePrimaryFontUpload()" />
                        <label class="custom-file-label" for="primaryFontFile">Choose file</label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label>Secondary Font</label>
                      <select class="form-control" v-model="configuration.secondary_font.id">
                        <option v-for="font in fonts" v-bind:value="font.id" :key="font.id">{{font.name}}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Seconday Custom Font</label>
                      <div class="custom-file">
                        <input id="secondaryFontFile" type="file" ref="secondaryFontFile" class="custom-file-input" v-on:change="handleSecondaryFontUpload()" />
                        <label class="custom-file-label" for="secondaryFontFile">Choose file</label>
                      </div>
                    </div>
                  </div>
                </div>
                
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Themes</span>
                </template>
                
                <div class="card-body">
                  <h4 class="card-title mb-3">Choose Theme</h4>
                  <div class="row">
                    <div class="col-xl-3 col-sm-6">
                      <div class="card text-center">
                        <div class="card-body">
                          <div class="avatar-sm mx-auto mb-4">
                            <span class="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">+</span>
                          </div>
                          <h5 class="font-size-15">
                            <a href="javascript: void(0);" class="text-dark">Add New Theme</a>
                          </h5>
                          <p class="text-muted">Search the marketplace to find and use a new theme</p>
                        </div>
                      </div>
                    </div>
                    <div v-for="theme in themesData" :key="theme.id" class="col-xl-3 col-sm-6">
                      <div class="card text-center">
                        <img :src="`${theme.image}`" alt="themePreview" class="card-img-top" />
                        <div class="card-body">
                          <h5 class="font-size-15">
                            <a href="javascript: void(0);" class="text-dark">{{theme.name}}</a>
                          </h5>
                          <p class="text-muted">{{theme.description}}</p>
                        </div>
                        <div class="card-footer bg-transparent border-top">
                          <div class="contact-links d-flex font-size-20">
                            <div class="flex-fill">
                              <b-button variant="light">
                                Activate
                              </b-button>
                            </div>
                            <div class="flex-fill">
                              <a v-b-tooltip.hover.top title="Add subscribers" href="javascript: void(0);">
                                <i class="bx bx-show-alt"></i>
                              </a>
                            </div>
                            <div class="flex-fill">
                              <a v-b-tooltip.hover.top title="Delete" href="javascript: void(0);">
                                <i class="bx bx-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </b-tab>
              
            </b-tabs>
          </div>
        </div>

      </div>
    </div>
  </Layout>
</template>