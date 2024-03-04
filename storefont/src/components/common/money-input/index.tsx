"use client";
import {KeyboardEventHandler, useReducer, useState,useEffect} from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import {setValuesOfForm} from "@/lib/helpers";

type TextInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    placeholder: string
};

const moneyFormatter2 = Intl.NumberFormat("vi-VN", {
    currency: "VND",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function MoneyInput(props: TextInputProps) {

    const [init, setInit] = useState<any>()

    useEffect(() => {
        const initialValue = props.form.getValues()[props.name]
            ? moneyFormatter2.format(props.form.getValues()[props.name])
            : "";
        setInit(initialValue)
    },[props.form.getValues(), props.name])



    const [value, setValue] = useReducer((_: any, next: string) => {
        const digits = next.replace(/\D/g, "");
        return moneyFormatter2.format(Number(digits) / 100);
    }, init);



    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        const realValue = Number(digits) / 100;
        realChangeFn(realValue);
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                field.value = value;

                const _change = field.onChange;
                return (
                    <FormItem>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={props.placeholder}
                                type="text"
                                {...field}
                                onChange={(ev) => {
                                    setValue(ev.target.value);
                                    handleChange(_change, ev.target.value);
                                }}
                                onKeyDown={(event) => {
                                    if(event.key == "Backspace") {
                                        const currentValue = value.replace(/\D/g, "");
                                        const newValue = currentValue.slice(0, -1);
                                        setValue(newValue);
                                        const realValue = Number(newValue) / 100;
                                        props.form.setValue(props.name, realValue);
                                    }
                                }}

                                value={value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}