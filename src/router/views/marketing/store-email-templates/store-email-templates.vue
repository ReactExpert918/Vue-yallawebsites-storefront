<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { storeEmailTemplates } from "./store-email-templates-data";

/**
 * Contacts-grid component
 */
export default {
  page: {
    title: "Contact User Grid",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      storeEmailTemplates: storeEmailTemplates,
      title: "Store Email Templates",
      items: [
        {
          text: "Marketing",
          href: "/"
        },
        {
          text: "Store Email Templates",
          active: true
        }
      ]
    };
  }
};
</script>
<!--<div v-if="storeemailtemplate.image" class="mb-4">
                        <img class="rounded-circle avatar-sm" :src="`${storeemailtemplate.image}`" alt />
                      </div>-->
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
              <div class="row mb-2">
                <div v-for="storeemailtemplate in storeEmailTemplates" :key="storeemailtemplate.id" class="col-12">
                    <div class="card-body">
                      <h4 class="card-title">{{storeemailtemplate.name}}</h4>
                      <div class="row">
                        <div v-for="template in storeemailtemplate.templates" :key="template.id" class="col-xl-3 col-sm-6">
                          <div class="template">
                            <span class="storeEmailImage"><img :src="`${template.imagePreview}`" alt /></span>
                            <h6 class="storeTemplateName">{{ template.name }}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <!-- end col -->
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- end row -->
  </Layout>
</template>