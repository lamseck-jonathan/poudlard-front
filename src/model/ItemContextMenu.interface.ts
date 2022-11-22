export interface ItemContextMenu {
  label: string;
  isDisabled: boolean;
  event?: string;
  prependIcon?: string;
  appendIcon?: string;
  iconColor?: string;
  separator?: boolean;
  submenu?: Array<ItemContextMenu>;
}
