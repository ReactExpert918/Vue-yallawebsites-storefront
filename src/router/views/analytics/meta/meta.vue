<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";

import appConfig from "@/app.config";
import { metaInfo } from "./meta-info";
/**
 * Block component
 */
export default { 
  page: {
    title: "Meta Tags",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      metaInfo: metaInfo,
      title: "Meta Tags",
      items: [
        {
          text: "Analytics",
        },
        {
          text: "Meta Tags",
          active: true
        }
      ]
    };
  }
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
                  <b-button v-b-modal.modal-scrollable variant="primary">
                  Save
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="form-group">
              <label for="sitetitle">Site Title</label>
              <input id="sitetitle" name="site title" type="text" class="form-control" />
            </div>
            <div class="form-group">
              <label for="sitekeywords">Site Keywords</label>
              <input 
                id="sitekeywords" 
                name="site keywords" 
                type="text" 
                class="form-control" 
              />
            </div>
            <div class="form-group">
              <label for="sitedescriiption">Site Description</label>
              <textarea 
                id="sitedescriiption" 
                name="site description" 
                type="text" 
                class="form-control"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
