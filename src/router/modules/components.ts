import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/welcome',
    name: 'Welcome',
    component: Layout,
    meta: {
      title: '首页',
      hidden: true,
      isWhiteAuth: true, //是否需要菜单权限控制
    },
    children: [
      {
        path: '/welcome/index',
        name: 'WelcomeIndex',
        component: () => import('@/pages/welcome/index.vue'),
        meta: {
          title: '欢迎页',
          hiddenBreadcrumb: true,
        },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    component: Layout,
    // redirect: '/result/success',
    meta: {
      title: '结果页',
      // icon: 'check-circle',
      hidden: true,
      hiddenBreadcrumb: true,
    },
    children: [
      {
        path: '/result/success',
        name: 'ResultSuccess',
        component: () => import('@/pages/result/success/index.vue'),
        meta: {
          title: '成功页',
        },
      },
      {
        path: '/result/fail',
        name: 'ResultFail',
        component: () => import('@/pages/result/fail/index.vue'),
        meta: {
          title: '失败页',
        },
      },
      {
        path: '/result/network-error',
        name: 'ResultNetworkError',
        component: () => import('@/pages/result/network-error/index.vue'),
        meta: {
          title: '网络异常',
        },
      },
      {
        path: '/result/403',
        name: 'Result403',
        component: () => import('@/pages/result/403/index.vue'),
        meta: {
          title: '无权限',
        },
      },
      {
        path: '/result/404',
        name: 'Result404',
        component: () => import('@/pages/result/404/index.vue'),
        meta: {
          title: '访问页面不存在页',
        },
      },
      {
        path: '/result/500',
        name: 'Result500',
        component: () => import('@/pages/result/500/index.vue'),
        meta: {
          title: '服务器出错页',
        },
      },
      {
        path: '/result/browser-incompatible',
        name: 'ResultBrowserIncompatible',
        component: () => import('@/pages/result/browser-incompatible/index.vue'),
        meta: {
          title: '浏览器不兼容页',
        },
      },
      {
        path: '/result/maintenance',
        name: 'ResultMaintenance',
        component: () => import('@/pages/result/maintenance/index.vue'),
        meta: {
          title: '系统维护页',
        },
      },
    ],
  },
];
