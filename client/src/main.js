import Vue from 'vue'
import App from './App.vue'
import socketio from 'socket.io-client';
import * as VueSocketIO from 'vue-socket.io';
import BootstrapVue from 'bootstrap-vue';
import './global.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import moment from 'moment'
import Toasted from 'vue-toasted';

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('DD/MM/YYYY hh:mm')
  }
});

const SocketInstance = socketio.connect('localhost:5000', {
  path: '/socket.io-client',
  query: {
    token: 'myPrivateToken',
    id: 'dummyApp'
  }
});

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}));
Vue.use(BootstrapVue);
Vue.use(Toasted, {
  duration: 2200,
  keepOnHover: true
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')