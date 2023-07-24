<template>
  <div></div>
</template>

<script lang="ts">
export default {
  name: 'QRCodeLogin',
};
</script>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import { nextTick, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
console.log(route.query.code);
console.log(userStore.loginTmpCode);

const initialize = ()=>{

  try {
    const payload = {
      code: route.query.code,
      state: route.query.state
    };

    // userStore.setToken(token);
    // MessagePlugin.success("登录成功");
    // const redirect = route.query.redirect as string;
    // const redirectUrl = redirect ? decodeURIComponent(redirect) : "/";
    // router.push(redirectUrl);
  }catch (error) {
    MessagePlugin.error(error);
  }


}


onMounted(async () => {
  initialize()
  // try {
  //   await userStore.Dinglogin({ authCode: route.query.code });
  //   setTimeout(() => {
  //     router.push('/list/log');
  //   }, 1000);
  // } catch (error) {
  //   MessagePlugin.error(error);
  // }
});
</script>

<style lang="scss" scoped></style>
