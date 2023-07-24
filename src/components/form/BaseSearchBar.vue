<!--
 * @FileDescription: 基础筛选栏
 -->
<template>
  <t-form :label-width="80" colon @reset="emits('reset')" @submit="emits('submit')">
    <t-row :gutter="[16, 24]">
      <t-col :span="10">
        <t-row :gutter="[16, 24]">
          <t-col :span="3" v-for="(item, index) in config" :key="index">
            <base-form-item :config="item" v-bind="item.attrs" v-model="item.value" v-model:typeValue="item.typeValue" @change="(value) => onChangeValue(value, item)" />
          </t-col>
        </t-row>
      </t-col>
      <t-col :span="2" class="text-right">
        <t-space>
          <t-button type="submit" theme="primary">查询</t-button>
          <t-button type="reset" variant="base" theme="default">重置</t-button>
        </t-space>
      </t-col>
    </t-row>
  </t-form>
</template>
<script setup lang="ts">
import BaseFormItem from './BaseFormItem.vue';
import { BaseFormItemType } from '@/types/components';

type Props = {
  config: BaseFormItemType[];
};

const props = defineProps<Props>();

const emits = defineEmits(['reset', 'submit']);

const onChangeValue = (value: any, item: BaseFormItemType) => {
  if (item.trigger === "immediately") {
    emits("submit");
  }
};
</script>
