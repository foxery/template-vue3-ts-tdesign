 <!--
 * @FileDescription: 表格头部标题+按钮栏
 -->
<template>
  <div class="fcb my-table-head-wrapper">
    <div class="flex items-center">
      <div class="title">{{ props.config?.title }}</div>
      <slot></slot>
    </div>
    <t-space>
      <span v-for="(item, index) in props.config.btn" :key="index">
        <t-button v-if="item.url" v-bind="item.attrs" @click.stop="openPage(item.url)">{{ item.text }}</t-button>
        <t-button v-else v-bind="item.attrs" @click.stop="emits('click', item.event)">{{ item.text }}</t-button>
      </span>
      <t-dropdown
        v-for="(item, index) in props.config.dropdown"
        :key="index"
        :options="item.options"
        @click="(dropdownItem: DropdownOption)=>emits('click', dropdownItem)"
      >
        <t-button v-bind="item.btn.attrs"
          >{{ item.btn.text }}
          <t-icon style="margin-top: 2px; margin-left: 2px" v-if="item.btn.icn" :name="item.btn.icn"></t-icon
        ></t-button>
      </t-dropdown>
      <t-form colon layout="inline">
        <base-form-item
          v-for="(item, index) in searchArr"
          :key="index"
          :config="item"
          v-bind="item.attrs"
          v-model="item.value"
          @change="(value) => onChangeValue(value, item)"
        />
      </t-form>
      <slot name="btns" />
    </t-space>
  </div>
</template>
<script setup lang="ts">
import { BTN_LIST_TYPE, BaseFormItemType } from '@/types/components';
import { useClickDebounce } from '@/hooks/event/useClickDebounce';
import { DropdownOption } from 'tdesign-vue-next/es/dropdown/type';
import BaseFormItem from '@/components/form/BaseFormItem.vue';
import { computed, ref } from 'vue';

const { openPage } = useClickDebounce();

type ConfigType = {
  config: BTN_LIST_TYPE;
};

const emits = defineEmits<{
  (value: any, event): void;
}>();

const props = defineProps<ConfigType>();

const searchArr = ref<BaseFormItemType[]>(props.config.search);

const onChangeValue = (value: any, item: BaseFormItemType) => {
  emits('submit', item);
};
</script>
<style lang="less" scoped>
.my-table-head-wrapper {
  .title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 32px;
    font-weight: 500;
  }
  :deep(.t-form-inline) {
    .t-form__item {
      margin-right: 0;
      + .t-form__item {
        margin-left: var(--td-comp-margin-xxl);
      }
    }
  }
}
</style>
