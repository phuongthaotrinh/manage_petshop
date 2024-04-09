export const weights = [
    {
        value: "lower_2kg",
        name: "< 2kg"
    },
    {
        value: "from_2_to_5kg",
        name: "2 - 5kg"
    },
    {
        value: "greater_than_5_to_7kg",
        name: ">5 - 7kg"
    },
    {
        value: "greater_than_7_to_10kg",
        name: ">7 - 10kg"
    },
    {
        value: "greater_than_10_to_15kg",
        name: ">10 - 15kg"
    },
    {
        value: "greater_than_15_to_20kg",
        name: ">15 - 20kg"
    },
    {
        value: "greater_than_20_to_30kg",
        name: ">20 - 30kg"
    },
    {
        value: "greater_than_30_to_40kg",
        name: ">30 - 40kg"
    }
];

export const services = [
    {
        name: "cạo lông"
    },
    {
        name: "tắm vệ sinh"
    },
    {
        name: "tắm cạo toàn thân"
    },
    {
        name: "tắm cạo thẩm mỹ"
    },
    {
        name: "tắm cắt tạo kiểu (full option)"
    },
    {
        name: "tắm cạo trừ 4 chân & đầu"
    }
]


export const discount_type = [
    {
        name: "percentage",
        desc: "Discount applied in %",
        id: 'percentage'
    },
    {
        name: "fixed amount",
        desc: "Discount in whole numbers",
        id: 'amount',
        children:[
            {
                name: "Total amount",
                desc:"Apply to the total amount",
                id: 'total_amount',
            },
            {
                name: "Item specific",
                desc:"Apply to every allowed item",
                id: 'item_specific',
            }

        ]
    }
];

export const discount_conditions = [
    { value:'products', name: 'Product', desc:"Only for specific products "},
    { value:'customer_group', name: 'Customer group', desc:"Only for specific customer group "},
    { value:'services', name: 'Service', desc:"Only for specific services"},

];