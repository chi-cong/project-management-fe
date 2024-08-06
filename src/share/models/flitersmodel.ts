import type { DefaultOptionType } from "antd/es/select";

export interface MngFilterItem {
  label: string;
  selector: selectorOptions;
}

export interface selectorOptions {
  options: DefaultOptionType[];
  defaultValue: string | null | undefined;
}
