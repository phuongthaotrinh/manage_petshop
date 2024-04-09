'use client';

import {AccordionTrigger, Accordion, AccordionContent, AccordionItem} from "@/components/ui/accordion";
import React from "react";
import {DiscountType} from "@/components/forms/discount/components/discountType";
import {DiscountGeneral} from "@/components/forms/discount/components/general";
import {DiscountConfiguration} from "@/components/forms/discount/components/discount-configuaration";
import {Conditions} from "@/components/forms/discount/components/conditions/index";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {CancelAlert} from "@/components/cancel-alert";
import {useRouter} from "next/navigation";
import {AnimatePresence} from "framer-motion";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { IDiscount, DiscountInfer, initDiscountForm,schema } from "@/validations/discount";
import {Form} from "@/components/ui/form";
import {useCreateDiscount} from "@/actions/queries/discount";

const DiscountTypeMemo = React.memo(DiscountType);
const DiscountGeneralMemo = React.memo(DiscountGeneral);
const DiscountConfigurationMemo = React.memo(DiscountConfiguration);
const ConditionsMemo = React.memo(Conditions);
import { Loader2 } from "lucide-react"
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";



export function DiscountTemplate () {
    const [formState,setFormState] = React.useState<IDiscount>(initDiscountForm);
    const [cancel, setCancel] = React.useState<boolean>(false)
    const router = useRouter();
    const [_, startTransition] = React.useTransition()
    const {mutateAsync:createFn, isPending} = useCreateDiscount();



    const updateData = React.useCallback((fieldToUpdate: Partial<IDiscount>) => {
        setFormState((prevState:any) => ({...prevState, ...fieldToUpdate}));
    }, [formState]);

    const form = useForm<DiscountInfer>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues:initDiscountForm
    });

    const stepForm = React.useMemo(() => {
        const { discountType, general: { code, amount } } = form.getValues();
        const errors = form.formState.errors.general
        let init = ["item-1"];
        if (discountType)  init.push("item-2");
        if (code && amount > 0 && !errors) init.push("item-3", "item-4");
        return init;
    }, [form.getValues(),form.formState.errors]);

    const handleOnSubmit = (values:DiscountInfer) => {
        const payload = {
            ...values,
            condition_data:formState.condition_data,
            condition_option:formState.condition_option,
            config: formState.config
        }

        startTransition(() => {
            toast.promise((createFn(payload)),{
                loading: "Creating...",
                success:() => {
                    form.reset();
                    setFormState(initDiscountForm);

                    return "Creating success"
                },
                error:(err) => catchError(err)
            })
        })
    }

    return (
        <AnimatePresence mode="wait">
            <div className="relative h-screen min-w-full">
                <Form {...form} >
                    <form
                        onSubmit={form.handleSubmit(handleOnSubmit)}
                        className="w-full flex flex-col justify-between"
                    >
                        <div id="form_content" className="h-auto min-h-screen relative">
                            <Accordion type="multiple" defaultValue={["item-1"]} value={stepForm}>
                                <AccordionItem value="item-1" >
                                    <AccordionTrigger>
                                            <span className="font-semibold text-base relative
                                                  after:relative after:bottom-0 after:left-2 after:content-['*']
                                                  after:text-2xl after:text-red-600 ">
                                                Discount type
                                            </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <DiscountTypeMemo  form={form}/>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                    <span className="font-semibold text-base relative
                                          after:relative after:bottom-0 after:left-2 after:content-['*']
                                          after:text-2xl after:text-red-600 ">
                                        General
                                    </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <DiscountGeneralMemo form={form}  />
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger>
                                    <span className="font-semibold text-base relative">
                                        Configuration
                                    </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <DiscountConfigurationMemo updateData={updateData} {...formState} />
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-4">
                                    <AccordionTrigger>
                                    <span className="font-semibold text-base relative">
                                        Conditions
                                    </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-3">
                                            {formState.condition_option && formState.condition_data?.length && (
                                                <Alert variant="notification">
                                                    <AlertTitle>Heads up!</AlertTitle>
                                                    <AlertDescription>
                                                        You has chosen <b>{formState.condition_option}</b>, apply for {formState.condition_data?.length} items                                </AlertDescription>
                                                </Alert>
                                            )}
                                            <ConditionsMemo  updateData={updateData} formState={formState} form={form}/>
                                        </div>

                                    </AccordionContent>
                                </AccordionItem>


                            </Accordion>
                        </div>

                       <div className="sticky h-16 bg-gray-100 bottom-0 w-full rounded-lg   ">
                          <div className="h-full grid place-items-center">
                              <div className="grid grid-cols-2 gap-3 w-full">
                                  <Button type="button" variant="link" disabled={isPending} onClick={() => setCancel(true)}>
                                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Cancel
                                  </Button>
                                  <Button type="submit" variant="orange" disabled={isPending}>
                                      Submit
                                      {isPending ? <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>
                                          : "Submit"}
                                  </Button>
                              </div>
                          </div>
                       </div>
                        {cancel && <CancelAlert
                                        title="Cancel this tabs"
                                        actionBtnText="OK"
                                        handleOk={() => router.replace('/admin/discount')}
                                        open={cancel}
                                        setOpen={setCancel}
                                    />}
                    </form>
                </Form>
            </div>
        </AnimatePresence>
    )
}