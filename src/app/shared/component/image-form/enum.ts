import { Section } from 'src/app/models/appforms.interface';
export const ImageFields: Array<Section> = [
    {
        name: "",
        isVisible: true,
        fields: [{
            label: 'Selfie',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'selfie'
        },
        {
            label: 'IBP ID',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'ibp_id'
        }, {
            label: 'Valid ID',
            type: "text",
            colspan: { xs: 12, md: 12, lg: 12, xl: 12, sm: 12 },
            isVisible: true,
            fcName: 'valid_id'
        },
        ]
    },


]