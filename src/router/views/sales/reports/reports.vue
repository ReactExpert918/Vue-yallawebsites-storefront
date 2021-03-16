<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import SalesChart from "./SalesChart";
import RevenueChart from "./RevenueChart";
import ShipmentsChart from "./ShipmentsChart";
import CustomersChart from "./CustomersChart";

/**
 * Chartjs-chart component
 */
export default {
  page: {
    title: "Reports",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    Layout,
    PageHeader,
    SalesChart,
    RevenueChart,
    ShipmentsChart,
    CustomersChart,
  },
  data() {
    return {
      title: "Reports",
      items: [
        {
          text: "Sales",
        },
        {
          text: "Reports",
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
      <div class="col-lg-12">

        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <b-button v-b-modal.modal-scrollable variant="primary">Export</b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Sales</span>
                </template>
                
                <div class="card-body">
                <h4 class="card-title mb-4">Orders</h4>
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
                <SalesChart :height="300" />
              </div>
                
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Revenue</span>
                </template>
                
                <div class="card-body">
                  <h4 class="card-title mb-4">Revenue</h4>
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
                  <RevenueChart :height="300" />
                </div>

              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Shipments</span>
                </template>

                <div class="card-body">
                  <h4 class="card-title mb-4">Shipemnts</h4>
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
                  <ShipmentsChart :height="300" />
                </div>

              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-cog"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Customers</span>
                </template>
                
                <div class="card-body">
                  <h4 class="card-title mb-4">Customers</h4>
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
                  <CustomersChart :height="300" />
                </div>

              </b-tab>
            </b-tabs>

            <b-modal id="modal-scrollable" scrollable title="Export Report" title-class="font-18" hide-footer>
              <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
                <b-tab active>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="fas fa-home"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Sales</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Timescale</label>
                      <select class="custom-select">
                        <option value="0">1 Day</option>
                        <option value="1">1 Week</option>
                        <option value="2">1 Month</option>
                        <option value="3">1 Year</option>
                        <option value="4">All</option>
                      </select>
                      <label class="mt-3">Include Charts</label>
                      <select class="custom-select">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <label class="mt-3">Orientation</label>
                      <select class="custom-select">
                        <option value="0">Landscape</option>
                        <option value="1">Horizontal</option>
                      </select>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Filetype</label>
                      <select class="custom-select">
                        <option value="0">PDF</option>
                        <option value="1">CSV</option>
                        <option value="2">XLS</option>
                      </select>
                    </div>
                  </div>
                  <div class="text-sm-right">
                    <b-button variant="primary">
                        <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                        Export
                    </b-button>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Revenue</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Timescale</label>
                      <select class="custom-select">
                        <option value="0">1 Day</option>
                        <option value="1">1 Week</option>
                        <option value="2">1 Month</option>
                        <option value="3">1 Year</option>
                        <option value="4">All</option>
                      </select>
                      <label class="mt-3">Include Charts</label>
                      <select class="custom-select">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <label class="mt-3">Orientation</label>
                      <select class="custom-select">
                        <option value="0">Landscape</option>
                        <option value="1">Horizontal</option>
                      </select>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Filetype</label>
                      <select class="custom-select">
                        <option value="0">PDF</option>
                        <option value="1">CSV</option>
                        <option value="2">XLS</option>
                      </select>
                    </div>
                  </div>
                  <div class="text-sm-right">
                    <b-button variant="primary">
                        <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                        Export
                    </b-button>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Shipments</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Timescale</label>
                      <select class="custom-select">
                        <option value="0">1 Day</option>
                        <option value="1">1 Week</option>
                        <option value="2">1 Month</option>
                        <option value="3">1 Year</option>
                        <option value="4">All</option>
                      </select>
                      <label class="mt-3">Include Charts</label>
                      <select class="custom-select">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <label class="mt-3">Orientation</label>
                      <select class="custom-select">
                        <option value="0">Landscape</option>
                        <option value="1">Horizontal</option>
                      </select>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Filetype</label>
                      <select class="custom-select">
                        <option value="0">PDF</option>
                        <option value="1">CSV</option>
                        <option value="2">XLS</option>
                      </select>
                    </div>
                  </div>
                  <div class="text-sm-right">
                    <b-button variant="primary">
                        <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                        Export
                    </b-button>
                  </div>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      <i class="far fa-user"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">Customers</span>
                  </template>
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="mt-3">Timescale</label>
                      <select class="custom-select">
                        <option value="0">1 Day</option>
                        <option value="1">1 Week</option>
                        <option value="2">1 Month</option>
                        <option value="3">1 Year</option>
                        <option value="4">All</option>
                      </select>
                      <label class="mt-3">Include Charts</label>
                      <select class="custom-select">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <label class="mt-3">Orientation</label>
                      <select class="custom-select">
                        <option value="0">Landscape</option>
                        <option value="1">Horizontal</option>
                      </select>
                    </div>
                    <div class="col-sm-6">
                      <label class="mt-3">Filetype</label>
                      <select class="custom-select">
                        <option value="0">PDF</option>
                        <option value="1">CSV</option>
                        <option value="2">XLS</option>
                      </select>
                    </div>
                  </div>
                  <div class="text-sm-right">
                    <b-button variant="primary">
                        <i class="bx bx-check-double font-size-16 align-middle mr-2"></i>
                        Export
                    </b-button>
                  </div>
                </b-tab>
              </b-tabs>
            </b-modal>
            
          </div>
        </div>

      </div>
    </div>
  </Layout>
</template>