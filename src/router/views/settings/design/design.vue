<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import vue2Dropzone from "vue2-dropzone";
import { themesData } from "./themes-data";

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
      themesData: themesData,
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
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 75,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      }
    };
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
                
                <div class="card-body">
                  <h4 class="card-title mb-3">General</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Site Logo</label>
                      <vue-dropzone
                        id="dropzone"
                        ref="myVueDropzone"
                        :use-custom-slot="true"
                        :options="dropzoneOptions"
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
                        ref="myVueDropzone"
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
                  <h4 class="card-title mb-3">Colors</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Primary Color</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" value="#556ee6"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Secondary Color</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" value="#556ee6"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button Color 1</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" value="#556ee6"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button text 1</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" value="#556ee6"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button Color 2</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" value="#556ee6"></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <label>Button text 2</label>
                      <b-form-group
                        id="example-color"
                        label-for="color"
                      >
                        <b-form-input id="color" type="color" name="Primary Color" value="#556ee6"></b-form-input>
                      </b-form-group>
                    </div>
                  </div>
                  <h4 class="card-title mb-3">Fonts</h4>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Primary Font</label>
                      <select class="form-control">
                        <option>Font 1</option>
                        <option>Font 2</option>
                        <option>Font 3</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Primary Custom Font</label>
                      <div class="custom-file">
                        <input id="customFile" type="file" class="custom-file-input" />
                        <label class="custom-file-label" for="customFile">Choose file</label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label>Secondary Font</label>
                      <select class="form-control">
                        <option>Font 1</option>
                        <option>Font 2</option>
                        <option>Font 3</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label>Seconday Custom Font</label>
                      <div class="custom-file">
                        <input id="customFile" type="file" class="custom-file-input" />
                        <label class="custom-file-label" for="customFile">Choose file</label>
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
                        <img :src="`${theme.themePreview}`" alt="themePreview" class="card-img-top" />
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