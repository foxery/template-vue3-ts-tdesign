<!--
 * @FileDescription: 基础表格
 -->
<template>
  <t-table
    ref="tableRef"
    :data="data"
    :columns="columns"
    :row-key="rowKey"
    vertical-align="top"
    :hover="true"
    :pagination="pagination"
    :loading="dataLoading"
    :header-affixed-top="headerAffixedTop"
    :selected-row-keys="selectedRowKeys"
    :editable-row-keys="editableRowKeys"
    v-bind="$attrs"
    @select-change="rehandleSelectChange"
    @page-change="rehandlePageChange"
    @change="rehandleChange"
    @row-edit="onRowEdit"
    @row-validate="onRowValidate"
    @validate="onValidate"
  />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { PageInfo, TableRowData } from 'tdesign-vue-next';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';

const props = defineProps([
  'columns',
  'data',
  'dataLoading',
  'pagination',
  'rowKey',
  'selectedRowKeys',
  'editableRowKeys',
  'tableRef',
]);

const emits = defineEmits(['page-change', 'change', 'select-change', 'row-edit', 'row-validate', 'validate']);

const store = useSettingStore();

const tableRef = ref(null);

const rehandleSelectChange = (value: number[], { selectedRowData }) => {
  emits('select-change', value, { selectedRowData });
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  emits('page-change', pageInfo, newDataSource);
};
const rehandleChange = (changeParams, triggerAndData) => {
  emits('change', changeParams, triggerAndData);
};

const onRowEdit = (params) => {
  emits('row-edit', params);
};

// 行校验反馈事件，tableRef.value.validateRowData 执行结束后触发
const onRowValidate = (params) => {
  console.log('Event Table Row Validate:', params);
  emits('row-validate', params);
};

// 表格全量数据校验反馈事件，tableRef.value.validateTableData() 执行结束后触发
const onValidate = (params) => {
  console.log('Event Table Data Validate:', params);
  emits('validate', params);
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

// 触发行校验
const triggerRowValidate = (id) => {
  tableRef.value.validateRowData(id).then((params) => {
    console.log('Event Table Promise Validate:', params);
  });
};

defineExpose({
  triggerRowValidate,
});
</script>
