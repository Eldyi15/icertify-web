import { Field, Section } from 'src/app/models/appforms.interface';
export const FormFields: Array<Section> = [
    {
        name: "",
        isVisible: true,
        fields: [{
            label: 'First Name',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'firstName'
        },
        {
            label: 'Middle Name',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'middleName'
        },
        {
            label: 'Last Name',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'lastName'
        },
        {
            label: 'Email',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'email',


        },
        {
            label: 'Mobile Number',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'mobileNumber',
            minLength: 10,
            maxLength: 10
        },]
    },


]