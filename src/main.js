import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import VueFusionCharts from 'vue-fusioncharts';

Charts(FusionCharts);
PowerCharts(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);

// Global registration of components for project-wide use
Vue.use(VueFusionCharts, FusionCharts);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");