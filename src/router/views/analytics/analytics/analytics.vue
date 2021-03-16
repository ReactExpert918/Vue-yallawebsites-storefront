<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import AnalyticsChart from "./AnalyticsChart";
import { mostAdded } from "./mostAdded";
import { mostBought } from "./mostBought";
import { mostViewedPages } from "./mostViewedPages";

/**
 * Chartjs-chart component
 */
export default {
  page: {
    title: "Analytics",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    Layout,
    PageHeader,
    AnalyticsChart,
  },
  data() {
    return {
      mostAdded: mostAdded,
      mostBought: mostBought,
      mostViewedPages: mostViewedPages,
      title: "Analytics",
      items: [
        {
          text: "Analytics",
        },
        {
          text: "Analytics",
          active: true
        }
      ],
      lgchecked: '',
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">

      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
                <h4 class="card-title mb-4">Analytics</h4>
                <div class="row text-center">
                  <div class="col-sm-4">
                    <h5 class="mb-0">86541</h5>
                    <p class="text-muted">Activated</p>
                  </div>
                  <div class="col-sm-4">
                    <h5 class="mb-0">2541</h5>
                    <p class="text-muted">Pending</p>
                  </div>
                  <div class="col-sm-4">
                    <h5 class="mb-0">102030</h5>
                    <p class="text-muted">Deactivated</p>
                  </div>
                </div>
                <!-- Line Chart -->
                <AnalyticsChart :height="300" />
            </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
                <h4 class="card-title mb-4">Most Added To Cart</h4>
                <div class="mostAdded" v-for="mostAdded in mostAdded" :key="mostAdded.id">
                      <div class="productAdded">{{mostAdded.productName}}</div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
                <h4 class="card-title mb-4">Most Viewed Pages</h4>
                <div class="mostViewedPages" v-for="mostViewedPage in mostViewedPages" :key="mostViewedPage.id">
                      <div class="productAdded">{{mostViewedPage.link}} <span class="count">{{mostViewedPage.views}}</span></div>
                </div>
            </div>
        </div>
      </div>

    <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
                <h4 class="card-title mb-4">Most Bought</h4>
                <div class="mostBought" v-for="mostBought in mostBought" :key="mostBought.id">
                      <div class="productAdded">{{mostBought.productName}} <span class="count">{{mostBought.boughtCount}}</span></div>
                </div>
            </div>
        </div>
      </div>

    </div>
  </Layout>
</template>