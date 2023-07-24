import { BTN_LIST_TYPE, BaseFormItemType } from '@/types/components';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

export const baseSearchConfig: BaseFormItemType[] = [
  {
    name: '',
    value: '',
    default:'',
    type: 'INPUT',
    label: '职务名称',
    attrs: {
      placeholder: '请输入',
    },
  },
  {
    name: '',
    value: '',
    default:'',
    type: 'CASCADER',
    label: '所属部门',
    attrs: {
      options: [],
      clearable: true,
      keys: {
        value: 'deptId',
        label: 'name',
        children: 'childs',
      },
      showAllLevels: false,
      multiple: true,
      filterable: true,
      minCollapsedNum: 1,
      checkStrictly: true,
    },
  },
  {
    name: '',
    value: '',
    default:'',
    type: 'SELECT',
    label: '状态',
    attrs: {
      options: [
        { key: '1', label: '启用', value: 1 },
        { key: '2', label: '禁用', value: 2 },
      ],
      clearable: true,
    },
  },
];

export const JobTableHeadConfig: BTN_LIST_TYPE = {
  title: '职务列表',
  btn: [{ attrs: { theme: 'primary' }, event: { type: 'OPEN_PAGE', url: '/auth/job/add/0' }, text: '新增职务' }],
};

export const JobTableColumns = (onEdit, onDel, onChangeStatus): PrimaryTableCol<TableRowData>[] => {
  return [
    {
      title: '序号',
      width: 50,
      colKey: 'id',
    },
    {
      title: '职务名称',
      colKey: 'name',
      width: 100,
    },
    {
      title: '职务描述',
      colKey: 'description',
      width: 150,
    },
    {
      title: '所属部门',
      colKey: 'deptName',
      width: 150,
    },
    {
      title: '状态',
      colKey: 'status',
      width: 150,
      cell: (h, { row }) => {
        return (
          <t-popconfirm content={row.status === 1 ? '确认禁用吗' : '确认启用吗'} onConfirm={() => onChangeStatus(row)}>
            <t-switch size="large" value={row.status === 1} label={['启用', '禁用']}></t-switch>
          </t-popconfirm>
        );
      },
    },
    {
      title: '创建时间',
      colKey: 'createTime',
      width: 150,
    },
    {
      title: '操作',
      width: 100,
      colKey: 'op',
      cell: (h, { row, rowIndex }) => {
        return (
          <t-space>
            <a class="t-button-link" onClick={() => onEdit(row)}>
              编辑
            </a>
            <t-popconfirm content="确认删除吗" onConfirm={() => onDel(row)}>
              <a class="t-button-link">删除</a>
            </t-popconfirm>
          </t-space>
        );
      },
    },
  ];
};
