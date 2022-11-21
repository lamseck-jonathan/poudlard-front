export interface SideBarMenu {
  iconOff?: string;
  iconOn?: string;
  icon?: string;
  title: string;
  isExpanded?: boolean;
  routeName: string;
  path: string;
  children?: Array<SideBarMenu>;
}
