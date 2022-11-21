/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DatagridColumns {
  name: string;
  label: string;
  field: string | ((row: any) => string | undefined);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: string, b: string) => number;
  sortOrder?: 'ad' | 'da';
  format?: (val: any, row?: any) => string;
  style?: string | ((row: any) => string);
  classes?: string | ((row: any) => string);
  headerStyle?: string;
  headerClasses?: string;
}
