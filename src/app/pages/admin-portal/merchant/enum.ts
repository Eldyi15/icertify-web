import { Column } from 'src/app/models/column.interface';

export const MERCHANT_COLUMNS: Array<Column> = [
  {
    title: 'First Name',
    path: 'firstName',
    breakpoint: 'xs',
    type: 'text',
    selected: true,
  },
  {
    title: 'Last Name',
    path: 'lastName',
    breakpoint: 'xs',
    type: 'text',
    selected: true,
  },
  {
    title: 'Email',
    path: 'email',
    breakpoint: 'xs',
    type: 'text',
    selected: true,
  },
  {
    title: 'Mobile Number',
    path: 'mobileNumber',
    breakpoint: 'xs',
    type: 'text',
    selected: true,
  },
  {
    title: 'Status',
    path: 'status',
    breakpoint: 'xs',
    type: 'text',
    selected: true,
  },
];



export const MAT_BOTTOM_SHEET_CONF = [
  {
    label: 'Update',
    show: true,
    icon: 'edit',
    color: 'custom-hover-update'
  },
  {
    label: 'Suspend',
    show: true,
    icon: 'block',
    color: 'custom-hover-suspend'

  },
  {
    label: 'Activate',
    show: true,
    icon: 'done',
    color: 'custom-hover-activate'
  },
  {
    label: 'Delete',
    show: true,
    icon: 'delete',
    color: 'custom-hover-delete'

  },
]