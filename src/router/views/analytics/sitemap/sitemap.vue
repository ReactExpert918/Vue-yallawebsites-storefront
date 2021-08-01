<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";

import appConfig from "@/app.config";
import { sitemapInfo } from "./sitemap-info";
/**
 * Block component
 */
export default { 
  page: {
    title: "Sitemap",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      sitemapInfo: sitemapInfo,
      title: "Sitemap",
      items: [
        {
          text: "Analytics",
        },
        {
          text: "Sitemap",
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
                  <b-button 
                    v-b-modal.modal-scrollable variant="primary"
                  >
                    Generate
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="form-group">
              <label for="sitetitle">Sitemap</label>
              <input 
                id="sitetitle" 
                name="site title" 
                type="text" 
                class="form-control" 
                value="https://mydomain.com/sitemap.xml" 
                disabled
              />
            </div>
            <div class="row">
              <div class="col-lg-4">
                <label for="sitetitle">Last Generated</label>
                <div>23/12/20</div>
              </div>
              <div class="col-lg-4">
                <label for="sitetitle">Pages Indexed</label>
                <div>31</div>
              </div>
              <div class="col-lg-4">
                <label for="sitetitle">Status</label>
                <div>Proccessed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
