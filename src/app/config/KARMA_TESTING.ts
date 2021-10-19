import { NgxFileDropEntry } from "ngx-file-drop";
import { Field, Section } from "../models/appforms.interface";

export const NGXFILEDROP_TEST_DATA: NgxFileDropEntry = {
    relativePath: "245200335_1516402238719358_222797104298487271_n.jpg",
    fileEntry: {
        isFile: true,
        isDirectory: false,
        name: "245200335_1516402238719358_222797104298487271_n.jpg",
    }
}

export const MOCK_FORM_FIELDS: Array<Section> = [
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