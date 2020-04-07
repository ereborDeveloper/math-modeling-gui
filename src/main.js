import Vue from "vue";
import Vuetify from "vuetify";
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
import VueRouter from 'vue-router'
import store from "../store/store";

Vue.use(VueRouter);
Vue.use(Vuetify);
const opts = {};
Vue.config.productionTip = true;
const VBtn = Vue.component('VBtn');
VBtn.options.props.ripple.default = false;
import Home from "@/components/Home";
import Ecology from "@/ecology/Ecology";

const routes = [
  { path: '/home', component: Home },
  { path: '/ecology', component: Ecology }

];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app');