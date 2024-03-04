'use client';


import * as React from "react";
import type {UseFormReturn} from "react-hook-form";
import {http} from "@/config/axiosClient";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import useIsomorphicLayoutEffect from "@/hooks/use-isomorphic-layout-effect"

interface IProvinces {
    form: UseFormReturn<any>,
    citySelect: any,
    districtSelect: any,
    wardSelect:any,
    setCitySelect: any,
    setDistrictSelect: any,
    setWardSelect: any,
    isEditMode:boolean
}

export function Provinces({
                              form,
                              districtSelect,
                              citySelect,
                              setCitySelect,
                              setWardSelect,
                              setDistrictSelect,
                              isEditMode

                          }: IProvinces) {
    const [trigger, setTrigger] = React.useState<boolean>(false);
    const [trigger2, setTrigger2] = React.useState<boolean>(false);
    const [trigger3, setTrigger3] = React.useState<boolean>(false)

    const [cities, setCities] = React.useState<any[]>([]);
    const [districts, setDistricts] = React.useState<any[]>([]);
    const [wards, setWards] = React.useState<any[]>([]);


    React.useEffect(() => {
        if (trigger || isEditMode) {
            (async () => {
                const {data} = await http.get('https://provinces.open-api.vn/api/p');
                setCities(data);
            })()
            setTrigger(false)
        }
    }, [trigger,isEditMode]);


    const fetchData = async () => {
        try {
            if ((citySelect.length > 0 && trigger2) || (isEditMode && citySelect.length > 0)) {

                const response = await http.get(`https://provinces.open-api.vn/api/p/${Number(citySelect)}?depth=2`);
                setDistricts(response.data?.districts || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [citySelect, trigger2,isEditMode]);


    React.useEffect(() => {
        if ((districtSelect.length > 0 && trigger3)|| (isEditMode && districtSelect.length > 0)) {
            (async () => {
                const {data} = await http.get(`https://provinces.open-api.vn/api/d/${Number(districtSelect)}?depth=2`);
                setWards(data?.wards as any[]);
            })()
        }
    }, [districtSelect, trigger3,isEditMode])


    return (
        <>
            <div className="grid md:grid-cols-3 sx:grid-cols-1 gap-3">
                <FormField
                    control={form.control}
                    name="city"
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Thành phố</FormLabel>
                                <Select onValueChange={(event) => {
                                        field.onChange(event);
                                        setCitySelect(event)
                                }}
                                        value={field.value}
                                        onOpenChange={(open) => setTrigger(true)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose city"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cities && cities.map((item, index) => {
                                            return (
                                                <SelectItem key={index} value={item.code.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="district"
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Quận / Huyện</FormLabel>
                                <Select onValueChange={(event) => {
                                    field.onChange(event);
                                    setDistrictSelect(event)
                                }} value={field.value!}
                                        onOpenChange={(open) => setTrigger2(true)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose district"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {districts && districts.map((item, index) => {
                                            return (
                                                <SelectItem key={index} value={item.code.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="ward"
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Phường / Xã</FormLabel>
                                <Select onValueChange={(event) => {
                                    field.onChange(event);
                                    setWardSelect(event)
                                }}
                                        value={field.value!}
                                        onOpenChange={(open) => setTrigger3(true)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose ward"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {wards && wards.map((item, index) => {
                                            return (
                                                <SelectItem key={index} value={item.code.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                        )
                    }}
                />
            </div>

        </>
    )
}


