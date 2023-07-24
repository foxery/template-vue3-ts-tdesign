<template>
  <t-space direction="vertical" style="width: 100%">
    <t-card :bordered="false">
      <BaseSearchBar :config="searchConfig" @reset="onReset" @submit="onSubmit"></BaseSearchBar>
    </t-card>
    <t-card :bordered="false">
      <t-space direction="vertical" style="width: 100%">
        <BaseTableHead :config="JobTableHeadConfig" @click="onClickTableHead"></BaseTableHead>
        <BaseTable
          :columns="tableColumns"
          :data="tableData"
          :data-loading="tableLoading"
          :pagination="pagination"
          row-key="index"
          @page-change="onPageChange"
        ></BaseTable>
      </t-space>
    </t-card>
  </t-space>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseSearchBar from '@/components/form/BaseSearchBar.vue';
import { BaseFormItemType } from '@/types/components';
import { baseSearchConfig, JobTableHeadConfig, JobTableColumns } from './constants';
import BaseTableHead from '@/components/table/BaseTableHead.vue';
import BaseTable from '@/components/table/BaseTable.vue';
import { MessagePlugin, PageInfo } from 'tdesign-vue-next';

const router = useRouter();

const searchConfig = ref<BaseFormItemType[]>(baseSearchConfig);

const tableData = ref([]);
const tableLoading = ref(false);
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
});

// 删除职务
const onDel = (row) => {
};

// 禁用/启用
const onChangeStatus = (row) => {
};

// 编辑职务
const onEdit = (row) => {
};

const tableColumns = JobTableColumns(onEdit, onDel, onChangeStatus);

onMounted(() => {
});

// 查询
const onSubmit = () => {
  pagination.value.current = 1;
  getList();
};

// 重置
const onReset = () => {
  searchConfig.value.forEach((el) => {
    el.value = el.default;
  });
  pagination.value.current = 1;
  getList();
};

// 获取列表
const getList = async () => {
  tableLoading.value = true;
};

const btnMethods = {};

// 新增职务
const onClickTableHead = (params) => {
  let { type, url, method } = params.event ?? params;
  if (type === 'OPEN_PAGE') {
    router.push(url);
  } else if (type == 'METHOD') {
    btnMethods[method]();
  }
};

// 分页器
const onPageChange = (pageInfo: PageInfo) => {
  pagination.value.current = pageInfo.current;
  pagination.value.pageSize = pageInfo.pageSize;
  getList();
};
</script>
<style lang="less" scoped>
.data-lg-card {
  :deep(.title) {
    font-size: 20px;
    font-weight: 600;
  }
  :deep(.my-card-conetnt) {
    text-align: center;
    margin-bottom: 20px;
  }
  :deep(.card-value) {
    font-size: 24px;
  }
  :deep(.my-data-card) {
    flex-direction: column;
    align-items: initial;
  }
  :deep(.t-card__body) {
    height: 100%;
    .my-data-card {
      height: 100%;
      justify-content: initial;
    }
    .my-card-conetnt-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
    }
  }
}

.data-card {
  color: @ant-primary-color;
  .number-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    background-color: @ant-primary-color;
    margin: auto;
    .inner {
      text-align: center;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
    }
  }
  .title {
    font-size: 10px;
  }
}

.my-card-row {
  :deep(.t-col:nth-child(n + 4) ~ *) {
    margin-top: 24px;
  }
}
</style>
