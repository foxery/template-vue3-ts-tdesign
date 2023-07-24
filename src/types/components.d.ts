import {
  TdButtonProps,
  TdCascaderProps,
  TdFormItemProps,
  TdInputProps,
  TdSelectProps,
  TdTimePickerProps,
  TdTimeRangePickerProps,
  TdInputAdornmentProps
} from 'tdesign-vue-next';

export type BaseFormItemType = {
  name?: string;
  value: any;
  typeValue?: any;
  type:
    | 'INPUT'
    | 'SELECT'
    | 'DATE_PICKER'
    | 'DATE_RANGE_PICKER'
    | 'CASCADER'
    | 'ORGANIZE_TREE'
    | 'RADIO'
    | 'CHECKBOX'
    | 'TREE_SELECT'
    | 'DROPDOWN'
    | 'TYPE_SELECT';
  label?: string;
  typeWidth?: string;
  default?: any;
  attrs?: any;
  trigger?: string; //immediately-value变更后立即触发
} & TdFormItemProps;

export type BTN_LIST_BTN_TYPE = {
  attrs?: TdButtonProps;
  event?: EVENT_BTN;
  trigger?: any;
  url?: any;
  text: string;
  icn?: string;
};

export type BTN_LIST_TYPE = {
  title?: string;
  btn?: BTN_LIST_BTN_TYPE[];
  search?: BaseFormItemType[];
  dropdown?: { btn: BTN_LIST_BTN_TYPE; options: { content: string; value: any; event: EVENT_BTN }[] }[];
};
