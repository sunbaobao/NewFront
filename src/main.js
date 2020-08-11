import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import '@/permission'; // permission control
import * as filters from './filters'; // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    console.log('401');
                    store.commit('deleteAuth');
                    store.commit('changeLogin', true);
            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    });

if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock');
    mockXHR();
}
Vue.use(VueAxios, axios);

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
