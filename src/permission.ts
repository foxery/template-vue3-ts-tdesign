import { MessagePlugin } from 'tdesign-vue-next';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import { getPermissionStore, getUserStore } from '@/store';
import router from '@/router';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = getUserStore();
  const permissionStore = getPermissionStore();
  const { whiteListRouters, whiteAuthRouters, routers } = permissionStore;

  const { userInfo } = userStore;
  console.log(`output->userInfo`, userInfo);
  if (userInfo.token) {
    if (to.path === '/login') {
      next();
      return;
    }

    try {
      const { roles } = userStore;

      await permissionStore.initRoutes(roles);
      if (router.hasRoute(to.name) || whiteAuthRouters.includes(to.name?.toString())) {
        next();
      } else {
        next({
          name: 'Result403',
        });
      }
    } catch (error) {
      console.log(`output->error`, error);
      MessagePlugin.error(error);
      next({
        path: '/',
      });
      NProgress.done();
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
    }
    NProgress.done();
  }
});

router.afterEach((to) => {
  if (to.path === '/login') {
    const userStore = getUserStore();
    // const permissionStore = getPermissionStore();

    userStore.logout();
    // permissionStore.restore();
  }
  NProgress.done();
});
