import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/manage',
    name: 'DataManage',
    component: Layout,
    meta: {
      title: '数据管理',
    },
    children: [
      {
        path: '/manage/list',
        name: 'DataList',
        component: () => import('@/pages/demo/index.vue'),
        meta: {
          title: '数据列表页',
        },
      },
    ],
  }
];
