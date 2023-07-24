import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRouterList } from '@/router';
import { store } from '@/store';

function filterPermissionsRouters(routes: Array<RouteRecordRaw>, roles: Array<unknown>) {
  const res = [];
  const removeRoutes = [];
  console.log(`output->routes`, routes);
  routes.forEach((route) => {
    const children = [];
    route.children?.forEach((childRouter) => {
      const roleCode = (childRouter.meta?.roleCode || childRouter.name) as string;
      console.log(`output->roleCode`, roleCode, roles);
      let flag = false;
      roles.forEach((v: { route: string; children?: any[] }) => {
        v.children?.forEach((sub: { route: string }) => {
          if (sub.route === roleCode) {
            flag = true;
            children.push(childRouter);
          }
        });
      });
      if (!flag) {
        removeRoutes.push(childRouter);
      }
      // if (roles.indexOf(roleCode) !== -1) {
      //   children.push(childRouter);
      // } else {
      //   removeRoutes.push(childRouter);
      // }
    });
    console.log(`output->children`, children);
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'], //无需登录的白名单
    whiteAuthRouters: [
      'WelcomeIndex',
      'ResultSuccess',
      'ResultFail',
      'ResultNetworkError',
      'Result403',
      'Result404',
      'Result500',
      'ResultBrowserIncompatible',
      'ResultMaintenance',
    ], //无需访问权限的白名单
    routers: [],
    removeRoutes: [],
  }),
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters = [];

      let removeRoutes = [];
      // special token
      if (roles.includes('all')) {
        accessedRouters = asyncRouterList;
      } else {
        const res = filterPermissionsRouters(asyncRouterList, roles);
        accessedRouters = res.accessedRouters;
        removeRoutes = res.removeRoutes;
      }
      console.log(`output->accessedRouters`, accessedRouters);
      this.routers = accessedRouters;
      this.removeRoutes = removeRoutes;

      // removeRoutes.forEach((item: RouteRecordRaw) => {
      //   if (router.hasRoute(item.name)) {
      //     router.removeRoute(item.name);
      //   }
      // });
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
