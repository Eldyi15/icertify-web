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
export const TABLE_MERCHANT_DATA =
    [
        {
            _id: "616d244a4fdbc3da2daf631d",
            firstName: "Francis",
            lastName: "Antonio",
            middleName: "",
            email: "ma2233@gmail.com",
            passwordExpiry: 1634715466423,
            mobileNumber: "9576788374",
            type: "Merchant",
            status: "Pending",
            selfie: {
                name: "1.png",
                path_lower: "/icertify/1.png",
                path_display: "/ICertify/1.png",
                id: "id:o1Uw3rTcV8AAAAAAAACceA",
                client_modified: "2021-10-15T05:27:31Z",
                server_modified: "2021-10-15T05:27:31Z",
                rev: "015ce5d73aa977d00000001e7c7a640",
                size: 61875,
                is_downloadable: true,
                content_hash: "44bdfb767b3a35beee88a94c1ffbb36b6fbbfe12e169cbbd054f5f842918cac1"
            },
            ibp_id: {
                name: "1.png",
                path_lower: "/icertify/1.png",
                path_display: "/ICertify/1.png",
                id: "id:o1Uw3rTcV8AAAAAAAACceA",
                client_modified: "2021-10-15T05:27:31Z",
                server_modified: "2021-10-15T05:27:31Z",
                rev: "015ce5d73aa977d00000001e7c7a640",
                size: 61875,
                is_downloadable: true,
                content_hash: "44bdfb767b3a35beee88a94c1ffbb36b6fbbfe12e169cbbd054f5f842918cac1"
            }
        },

    ]

export const MOCK_USER_DATA = {
    _id: "616d244a4fdbc3da2daf631d",
    firstName: "Francis",
    lastName: "Antonio",
    middleName: '',
    email: "ma2233@gmail.com",
    passwordExpiry: 1634715466423,
    mobileNumber: "9576788374",
    type: "User",
    status: "Pending",
    selfie: {
        name: "1.png",
        path_lower: "/icertify/1.png",
        path_display: "/ICertify/1.png",
        id: "id:o1Uw3rTcV8AAAAAAAACceA",
        client_modified: "2021-10-15T05:27:31Z",
        server_modified: "2021-10-15T05:27:31Z",
        rev: "015ce5d73aa977d00000001e7c7a640",
        size: 61875,
        is_downloadable: true,
        content_hash: "44bdfb767b3a35beee88a94c1ffbb36b6fbbfe12e169cbbd054f5f842918cac1"
    },
    ibp_id: {
        name: "1.png",
        path_lower: "/icertify/1.png",
        path_display: "/ICertify/1.png",
        id: "id:o1Uw3rTcV8AAAAAAAACceA",
        client_modified: "2021-10-15T05:27:31Z",
        server_modified: "2021-10-15T05:27:31Z",
        rev: "015ce5d73aa977d00000001e7c7a640",
        size: 61875,
        is_downloadable: true,
        content_hash: "44bdfb767b3a35beee88a94c1ffbb36b6fbbfe12e169cbbd054f5f842918cac1"
    }
}

export const MOCK_TABLE_COLUMNS = [
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
        selected: false,
    },
]