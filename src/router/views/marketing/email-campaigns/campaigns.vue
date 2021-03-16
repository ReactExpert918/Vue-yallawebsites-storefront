<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";

import { allStatistics } from "./allStatistics-data";
import { mailingLists } from "./mailingLists-data";
import { recentCampaigns } from "./recentCampaigns-data";
import appConfig from "@/app.config";

/**
 * Block component
 */
export default { 
  page: {
    title: "Blocks",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      allStatistics: allStatistics,
      mailingLists: mailingLists,
      recentCampaigns: recentCampaigns,
      title: "Email Campaigns",
      items: [
        {
          text: "Marketing",
        },
        {
          text: "Email Campaigns",
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
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">All Statistics</h4>
            <div v-for="stats in allStatistics" :key="stats.id">
              <div>Sent Emails: {{stats.sentEmailsCount}}</div>
              <div>Drafts: {{stats.draftsCount}}</div>
              <div>Scheduled Emails: {{stats.scheduledEmailsCount}}</div>
              <div>Mailing Lists: {{stats.mailingListCount}}</div>
              <div>Total Subscribers: {{stats.subscriberCount}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Mailing Lists</h4>
            <div v-for="mailinglist in mailingLists" :key="mailinglist.id">
              <div>{{mailinglist.name}} - <span class="small-stat">{{mailinglist.subscriberCount}} subs</span><span class="actionsRight"><i class="bx bx-edit-alt"></i><i class="bx bx-trash-alt"></i></span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
              <h4 class="card-title mb-4">Recent Campaigns</h4>
              <div class="row">
                <div class="addCampaign col-3"><button type="button" class="btn btn-primary">Create New Campaign</button></div>
                <div class="col-3" v-for="campaigns in recentCampaigns" :key="campaigns.id">
                        <img :src="'/src/assets/images/marketing/email-campaigns/' + campaigns.image"/>
                        <div>{{campaigns.name}}</div>
                        <div>Date Sent: {{campaigns.dateSent}}</div>
                        <div>Emails Sent: {{campaigns.emailsSent}}</div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
