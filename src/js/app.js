import Vue from 'vue';
import Vuex from 'vuex';
import Event from './event';
import store from './store';

import App from './components/App';

window.EventBus = Event;

let app = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    store,
});
