import {z} from "zod";

export interface IDiscount {
    discountType:string,
    allocation:null,
    general:{
        code: string,
        amount:number,
        desc:string
    },
    config:{
        startDate:{
            date:any,
            time:any,
            status:boolean
        },
        expiry:{
            date:any,
            time:any,
            status:boolean
        },
        unLimit:{
            status:boolean,
            quantity:number
        }

    },
    condition_option: string | null,
    condition_data:string[]

}
export const initDiscountForm = {
    discountType:"",
    allocation:null,
    general:{
        code: "",
        amount:1,
        desc:""
    },
    config:{
        startDate:{
            date:null,
            time:null,
            status:false
        },
        expiry:{
            date:null,
            time:null,
            status:false
        },
        unLimit:{
            status:false,
            quantity:0
        }
    },
    condition_option:null,
    condition_data:[]
}

export const schema = z.object({
    discountType: z.string().nonempty(),
    allocation:z.nullable(z.any()),
    general: z.object({
        code: z.string()
            .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, {message: "Code must start with a letter and not contain special characters."})
            .min(5, {message: "Code must be at least 5 characters"}),
        amount: z.coerce.number().positive(),
        desc: z.string().optional(),
    }),
}).superRefine((val,ctx) => {
    if (val.discountType === '1') {
        if (val.general.amount >= 90) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "should be <= 90%",
                fatal: true,
                path:["general.amount"]
            });
        }

    } else if (val.discountType === '2') {
        if (val.general.amount >= 1000000 ||  val.general.amount <1000) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "should be <= 1.000.000vnd and >=1000",
                path:["general.amount"]
            });
        }

        return val
    }
})




export type DiscountInfer = z.infer<typeof schema>