<template>
  <div v-if="type === 'file' || type === 'picture'" class="edit-text">
    <t-upload v-if="isEdit" v-model="files" :action="UPLOAD_URL" :headers="headers" :multiple="false" :theme="type === 'picture' ? 'image' : 'file'" @remove="removeFile" />
    <a v-else-if="value" :href="value" target="_blank">点击下载</a>
    <template v-else>-</template>
  </div>
  <div v-else-if="type === 'datetime'" class="edit-text">
    <template v-if="!isEdit">{{ value ? value : '-' }}</template>
    <t-date-picker v-else v-model="value" />
  </div>
  <div v-else class="edit-text">
    <template v-if="!isEdit">{{ value ? value : '-' }}</template>
    <t-input v-else v-model="value" size="medium" placeholder="" />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store';
const host =
  import.meta.env.MODE === 'mock' || !import.meta.env.VITE_IS_REQUEST_PROXY
    ? ''
    : import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_REAL
    : import.meta.env.VITE_API_URL;
const UPLOAD_URL = host + '/data/admin/upload';
import { computed } from 'vue';
type propsType = {
  modelValue?: string;
  type?: string;
  isEdit: boolean;
};

// 请求之前处理config
const userStore = useUserStore();
const token = userStore.userInfo.token || '';
const headers = {
  Authorization: `Bearer ${token}`,
};

const props = defineProps<propsType>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'update:type', value: any): void;
  (e: 'change', value: any): void;
}>();

const files = computed({
  get() {
    return value.value ? [{ url: value.value, name: '已上传文件' }] : []
  },
  set(val) {
    value.value = val[0].response.data
    console.log(value)
  }
});

const value = computed({
  get() {
    return props?.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
    emits('change', value);
  },
});

const removeFile = (e) => {
  console.log(e)
  value.value === ''
}
</script>
<style lang="less">
.edit-text {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px;
  line-height: 32px;
}
</style>