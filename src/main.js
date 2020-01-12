import Vue from "vue";
import Vuetify from "vuetify";
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.use(Vuetify);
const opts = {};
Vue.config.productionTip = true;
const VBtn = Vue.component('VBtn');
VBtn.options.props.ripple.default = false;
import Home from "@/components/Home";

const routes = [
  { path: '/home', component: Home }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app');