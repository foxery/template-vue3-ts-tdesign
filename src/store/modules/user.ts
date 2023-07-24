import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';

const InitUserInfo = {
  token: '',
  nickname: '',
  roles: [], //string[],路由权限，传入路由组件名称即代表该路由有访问权限，传入'all'即代表所有路由都有访问权限
};

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: { ...InitUserInfo },
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async setToken(token: string) {
      this.userInfo.token = token;
    },
    async setUserInfo({ nickname, roles }) {
      this.userInfo.nickname = nickname;
      this.userInfo.roles = roles;
      if (import.meta.env.MODE === 'test') {
        // 测试环境先不上
        // todo
        this.userInfo.roles = ['all'];
      }
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
    async removeToken() {
      this.token = '';
    },
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
