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
    label: 'View',
    show: true
  },
  {
    label: 'Update',

    show: true
  },
  {
    label: 'Suspend',
    show: true

  },
  {
    label: 'Activate',
    show: true

  },
  {
    label: 'Delete',
    show: true

  },
]