<template>
  <div class="login-wrapper">
   <login-header />

    <div class="login-container">
      <div class="title-container">

        <h1 class="title">登录</h1>
        <div class="sub-title">
          <p class="tip">{{ type == 'register' ? '已有账号?' : '没有账号吗?' }}</p>
          <p class="tip" @click="switchType(type == 'register' ? 'login' : 'register')">
            {{ type == 'register' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <t-tabs :default-value="1" class="w-full" @change="changeTab">
        <t-tab-panel :value="1" label="账户密码登录" >
          <login v-if="type == 'login'" />
          <register v-else @register-success="switchType('login')" />
          <tdesign-setting />

        </t-tab-panel>
        <t-tab-panel :value="2" label="钉钉扫码登录">
          <div class="w-full">
            <div class="qrcode">
              <!-- <qrcode-vue value="" :size="242" level="H" /> -->
              <div id="dd-login"></div>
            </div>
          </div>
        </t-tab-panel>

      </t-tabs>

      <footer class="copyright flex justify-center">Copyright © 2022-{{ new Date().getFullYear() }}</footer>
    </div>


  </div>
</template>
<script lang="ts">

export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import {onMounted, ref,nextTick } from 'vue';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import LoginHeader from './components/Header.vue';
import TdesignSetting from '@/layouts/setting.vue';

import Dingtalk from "@/utils/dingtalk";
let dingtalk = new Dingtalk()
dingtalk.init();
// console.log('dd',dd)

const type = ref('login');
const switchType = (val: string) => {
  type.value = val;
};

const changeTab = (val)=>{
  if(val===2){
    nextTick(() => {
      dingtalk.showCode('dd-login');
    });
  }
}


onMounted(()=>{


})
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
