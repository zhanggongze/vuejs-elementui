import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/views/login/login';
import VueResource from 'vue-resource';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
              component: login
        },
        {
            path: '/home',
            component: resoleve => require(['../components/common/layout.vue'], resoleve),
            children: [
                {
                    path: '/',
                    name: '首页',
                    component: resoleve => require(['../components/views/home/home.vue'], resoleve)
                },
                {
                    path: '/articles/HTML',
                    name: 'HTML',
                    component: resoleve => require(['../components/views/articles/articles.html.vue'], resoleve)
                },
                {
                    path: '/articles/CSS',
                    name: 'CSS',
                    component: resoleve => require(['../components/views/articles/articles.css.vue'], resoleve)
                },
                {
                    path: '/articles/JavaScript',
                    name: 'JavaScript',
                    component: resoleve => require(['../components/views/articles/articles.js.vue'], resoleve)
                },
                {
                    path: '/articles/essay',
                    name: 'essay',
                    component: resoleve => require(['../components/views/articles/articles.essay.vue'], resoleve)
                },
                {
                    path: '/image/fj',
                    name: '风景',
                    component: resoleve => require(['../components/views/images/images.fj.vue'], resoleve)
                },
                {
                    path: '/image/cs',
                    name: '城市',
                    component: resoleve => require(['../components/views/images/images.cs.vue'], resoleve)
                },
                {
                    path: '/image/ms',
                    name: '美食',
                    component: resoleve => require(['../components/views/images/images.ms.vue'], resoleve)
                },
                {
                    path: '/image/yx',
                    name: '游戏',
                    component: resoleve => require(['../components/views/images/images.yx.vue'], resoleve)
                },
                {
                    path: '/image/dy',
                    name: '电影',
                    component: resoleve => require(['../components/views/images/images.dy.vue'], resoleve)
                }
            
            ],
        },
       
        {
            path: '/**',
            name: '404页面',
            component: resoleve => require(['../components/views/404/page404.vue'], resoleve)
        }
    ]
});
