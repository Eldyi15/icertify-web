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
    color: 'blue'
  },
  {
    label: 'Suspend',
    show: true,
    icon: 'block',
    color: 'orange'

  },
  {
    label: 'Activate',
    show: true,
    icon: 'done',
    color: 'green'
  },
  {
    label: 'Delete',
    show: true,
    icon: 'delete',
    color: 'red'

  },
]