<!--
 * @FileDescription: 上传图片
 -->
<template>
  <div class="g-uploader">
    <t-upload
      ref="uploadRef1"
      v-model="list"
      :action="UPLOAD_URL"
      :theme="theme"
      :tips="tips"
      :accept="accept"
      :headers="headers"
      :max="max"
      :disabled="disabled"
      :abridge-name="[6, 3]"
      multiple
      allowUploadDuplicateFile
      :auto-upload="autoUpload"
      :format-response="formatImgResponse"
      :upload-all-files-in-one-request="uploadAllFilesInOneRequest"
      @validate="validateFile"
      :beforeUpload="beforeUpload"
      :locale="{
        triggerUploadText: {
          image: '请选择图片',
        },
      }"
      @fail="handleFail"
      v-bind="$attrs"
    ></t-upload>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { useUserStore } from '@/store';

interface Props {
  modelValue?: any;
  autoUpload?: boolean;
  acceptRegex?: any;
  accept?: string;
  theme?: 'image' | 'file' | 'custom' | 'file-input' | 'file-flow' | 'image-flow';
  tips?: string;
  max?:number
}

const props = withDefaults(defineProps<Props>(), {
  autoUpload: true,
  tips: '允许图片最大 5MB，最多只能上传 9 张图片',
  theme: 'image',
  max:0
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const host =
  import.meta.env.MODE === 'mock' || !import.meta.env.VITE_IS_REQUEST_PROXY
    ? ''
    : import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_REAL
    : import.meta.env.VITE_API_URL;
const UPLOAD_URL = host + '/data/admin/upload';

// 请求之前处理config
const userStore = useUserStore();
const token = userStore.userInfo.token || '';
const headers = {
  Authorization: `Bearer ${token}`,
};

const disabled = ref(false);
const uploadAllFilesInOneRequest = ref(false);

const list = computed({
  get() {
    return props?.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

const formatImgResponse = (res) => {
  const { name } = res.XMLHttpRequest.upload.requestParams.file;
  return { name, url: res.data };
};

const validateFile = (evt) => {
  if (evt.type === 'CUSTOM_BEFORE_UPLOAD') return;
  if (evt.type === 'FILES_OVER_LENGTH_LIMIT') {
    MessagePlugin.warning('文件超过限制！');
    return;
  }
  if (evt.files.length > 0) {
    MessagePlugin.warning(evt.files[0].response.error);
  }
};
const beforeUpload = (evt) => {
  if (!props.acceptRegex) return true;
  if (!new RegExp(props.acceptRegex).test(evt.type)) {
    MessagePlugin.warning('文件格式不正确！');
    return false;
  }
  return true;
};

defineExpose({ list });
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<style scoped lang="less"></style>
