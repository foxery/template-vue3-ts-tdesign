<!--
 * @FileDescription: 手动上传文件
 -->
<template>
  <t-upload
    ref="uploadRef"
    v-model="files"
    :multiple="multiple"
    :request-method="requestMethod"
    :before-upload="beforeUpload"
    :tips="props.limit.msg"
    :allowUploadDuplicateFile="true"
    :accept="accept"
    placeholder=""
  ></t-upload>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { MessagePlugin } from "tdesign-vue-next";

interface Props {
  limit?: any;
  multiple?: boolean;
  accept?: string;
  upload: Function;
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  limit: {
    require: true,
    size: 5 * 1024 * 1024,
    msg: "上传文件大小在 5M 以内",
  },
});

const emits = defineEmits(["request-method"]);

const files = ref([]);
const uploadRef = ref(null);

const requestMethod = (file) => {
  return props.upload(file);
};

const beforeUpload = (file) => {
  if (props.limit.require && file.size > props.limit.size) {
    MessagePlugin.warning(props.limit.msg);
    return false;
  }

  return true;
};
</script>
<style lang="less" scoped></style>
