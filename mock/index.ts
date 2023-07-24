import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
  {
    url: '/login',
    method: 'post',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          token: 'mocktoken',
          user: {
            account: '用户名',
            routes: [
              {
                id: 1,
                parentId: null,
                name: '数据管理',
                route: 'DataManage',
                children: [
                  {
                    id: 11,
                    parentId: 1,
                    name: '数据列表页',
                    route: 'DataList',
                    children: [],
                  },
                ],
              },
            ],
          },
        }),
      },
    }),
  },
] as MockMethod[];
