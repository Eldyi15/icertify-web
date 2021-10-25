import { Field, Section } from 'src/app/models/appforms.interface';
export const FormFields: Array<Section> = [
  {
    name: '',
    isVisible: true,
    fields: [
      {
        label: 'First Name',
        type: 'text',
        colspan: { xs: 12, md: 12, lg: 4, xl: 4, sm: 12 },
        isVisible: true,
        fcName: 'firstName',

      },
      {
        label: 'Middle Name',
        type: 'text',
        colspan: { xs: 12, md: 12, lg: 4, xl: 4, sm: 12 },
        isVisible: true,
        fcName: 'middleName',
        isOptional: true

      },
      {
        label: 'Last Name',
        type: 'text',
        colspan: { xs: 12, md: 12, lg: 4, xl: 4, sm: 12 },
        isVisible: true,
        fcName: 'lastName',
      },
      {
        label: 'Email',
        type: 'text',
        colspan: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12 },
        isVisible: true,
        fcName: 'email',
        isEmail: true

      },
      {
        label: 'Mobile Number',
        type: 'text',
        colspan: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12 },
        isVisible: true,
        fcName: 'mobileNumber',
        minLength: 10,
        maxLength: 10,
        isNumberonly: true
      },
    ],
  },
];
