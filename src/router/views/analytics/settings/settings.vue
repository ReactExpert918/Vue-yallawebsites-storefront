<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";

import appConfig from "@/app.config";
import { settingsData } from "./settings-data";

/**
 * Block component
 */
export default { 
  page: {
    title: "Settings",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      settingsData: settingsData,
      title: "Settings",
      items: [
        {
          text: "Analytics",
        },
        {
          text: "Settings",
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
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-12">
                <div class="text-sm-right">
                  <b-button v-b-modal variant="primary">
                    Save
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <h4 class="card-title">Google Analytics</h4>
                <b-form>
                  <div class="row">
                    <div class="col-md-3">
                      <b-form-group 
                        label="Enabled" 
                        label-for="formrow-enabled-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        ></b-form-checkbox>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <b-form-group 
                        label="Account Number" 
                        label-for="formrow-accountnumber-input"
                      >
                        <b-form-input 
                          id="formrow-accountnumber-input" 
                          type="text"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <b-form-group 
                        label="Annonymise IP" 
                        label-for="formrow-annonymiseip-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        ></b-form-checkbox>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <b-form-group 
                        label="Enhanced eCommerce Tracking" label-for="formrow-enablernhancedecommercetracking-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        ></b-form-checkbox>
                      </b-form-group>
                    </div>
                  </div>
                </b-form>
              </div>

              <div class="form-group">
                <h4 class="card-title">Google Adwords</h4>
                <b-form>
                  <div class="row">
                    <div class="col-md-3">
                      <b-form-group 
                        label="Enabled" 
                        label-for="formrow-adwordsenabled-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        ></b-form-checkbox>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group 
                          label="Conversion ID" 
                          label-for="formrow-conversionid-input"
                        >
                          <b-form-input 
                            id="formrow-conversionid-input" 
                            type="text"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group 
                          label="Conversion Language" label-for="formrow-coonversionlanguage-input"
                        >
                          <select class="form-control">
                            <option value="ar">العربية / Arabic (ar)</option>
                            <option value="bg">Български / Bulgarian (bg)</option>
                            <option value="ca">Català / Catalan (ca)</option>
                            <option value="cs">Čeština / Czech (cs)</option>
                            <option value="da">Dansk / Danish (da)</option>
                            <option value="de">Deutsch / German (de)</option>
                            <option value="el">Ελληνικά / Greek (el)</option>
                            <option value="en" selected="selected">English / English (en)</option>
                            <option value="es">Español / Spanish (es)</option>
                            <option value="et">Eesti / Estonian (et)</option>
                            <option value="fi">Suomi / Finnish (fi)</option>
                            <option value="fr">Français / French (fr)</option>
                            <option value="hi">हिन्दी / Hindi (hi)</option>
                            <option value="hr">Hrvatski / Croatian (hr)</option>
                            <option value="hu">Magyar / Hungarian (hu)</option>
                            <option value="id">Indonesia / Indonesian (id)</option>
                            <option value="is">Íslenska / Icelandic (is)</option>
                            <option value="it">Italiano / Italian (it)</option>
                            <option value="iw">עברית / Hebrew (iw)</option>
                            <option value="ja">日本語 / Japanese (ja)</option>
                            <option value="ko">한국어 / Korean (ko)</option>
                            <option value="lt">Lietuvių / Lithuanian (lt)</option>
                            <option value="lv">Latviešu / Latvian (lv)</option>
                            <option value="nl">Nederlands / Dutch (nl)</option>
                            <option value="no">Norsk / Norwegian (no)</option>
                            <option value="pl">Polski / Polish (pl)</option>
                            <option value="pt">Português / Portuguese (pt)</option>
                            <option value="ro">Română / Romanian (ro)</option>
                            <option value="ru">Русский / Russian (ru)</option>
                            <option value="sk">Slovenčina / Slovak (sk)</option>
                            <option value="sl">Slovenščina / Slovenian (sl)</option>
                            <option value="sr">Српски / Serbian (sr)</option>
                            <option value="sv">Svenska / Swedish (sv)</option>
                            <option value="th">ไทย / Thai (th)</option>
                            <option value="tl">Tagalog / Tagalog (tl)</option>
                            <option value="tr">Türkçe / Turkish (tr)</option>
                            <option value="uk">Українська / Ukrainian (uk)</option>
                            <option value="ur">اردو / Urdu (ur)</option>
                            <option value="vi">Tiếng Việt / Vietnamese (vi)</option>
                            <option value="zh_TW">中文 / Chinese (zh_TW)</option>
                            <option value="zh_CN">中文 / Chinese (zh_CN)</option>
                          </select>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group 
                          label="Conversion Format" label-for="formrow-conversionformat-input"
                        >
                          <b-form-input 
                            id="formrow-conversionformat-input" 
                            type="text"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group 
                          label="Conversion Color" 
                          label-for="formrow-conversioncolor-input"
                        >
                          <b-form-input 
                            id="formrow-conversioncolor-input" 
                            type="text"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group 
                          label="Conversion Label"
                          label-for="formrow-conversionlabel-input"
                        >
                          <b-form-input 
                            id="formrow-conversionlabel-input" 
                            type="text"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group 
                          label="Conversion Value Type"
                          label-for="formrow-conversionvaluetype-input"
                        >
                          <select class="form-control">
                            <option value="1" selected="selected">Dynamic</option>
                            <option value="0">Constant</option>
                          </select>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                </b-form>
              </div>

              <div class="form-group">
                <h4 class="card-title">Google Remarketing</h4>
                <b-form>
                  <div class="row">
                    <div class="col-md-3">
                      <b-form-group 
                        label="Enabled" 
                        label-for="formrow-remarketingenabled-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        ></b-form-checkbox>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <b-form-group label="Conversion ID" label-for="formrow-conversionid-input">
                          <b-form-input id="formrow-conversionid-input" type="text"></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <b-form-group 
                        label="Enable Tracking For Other Sites" label-for="formrow-enabletracking-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        ></b-form-checkbox>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <b-form-group 
                        label="Dynamic Remarking tags" label-for="formrow-dynamicremarkingtags-input"
                      >
                        <b-form-checkbox 
                          switch size="lg"
                        >
                        </b-form-checkbox>
                      </b-form-group>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
