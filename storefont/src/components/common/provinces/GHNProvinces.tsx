'use client'

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useQuery} from "@tanstack/react-query"
import * as React from "react";
import {UseFormReturn} from "react-hook-form";

const URL ="https://dev-online-gateway.ghn.vn/shiip/public-api/master-data"
export function GHNProvinces ({form, updateProvince, userProvince}:{form:UseFormReturn<any>, updateProvince:(value:any) => void,userProvince:any}) {



    const [citySelect, setCitySelect] = React.useState<string>("");
    const [districtSelect, setDistrictSelect] = React.useState<string>("")
    const [wardSelect, setWardSelect] = React.useState<string>("")

    const [trigger, setTrigger] = React.useState(false)

    const {data:province} = useQuery({
        queryKey:['Provinces'],
        queryFn: async ()  => {
            const data =await(await fetch(`${URL}/province`,{
                headers: {
                    token:process.env.NEXT_PUBLIC_GHN_TOKEN!!
                },
            })).json()
            return data.data
        },
        enabled:!trigger,
        retry: 1,
        refetchInterval: 0
    })


    const {data:si} = useQuery({
        queryKey:['districts',citySelect],
        queryFn: async ()  => {
            const data =await( await fetch(`${URL}/district?province_id=${citySelect}`,{
                headers: {
                    token:process.env.NEXT_PUBLIC_GHN_TOKEN!!
                },
            })).json()
            return data.data
        },
        enabled:!!citySelect,
        retry: 1,
        refetchInterval: 0
    })
    const {data:ward} = useQuery({
        queryKey:['ward',districtSelect],
        queryFn: async ()  => {
            const data =await( await fetch(`${URL}/ward?district_id=${districtSelect}`,{
                headers: {
                    token:process.env.NEXT_PUBLIC_GHN_TOKEN!!
                },
            })).json()
            return data.data
        },
        enabled:!!districtSelect,
        retry: 1,
        refetchInterval: 0
    })



    return  (
        <>
            <div className="grid md:grid-cols-3 sx:grid-cols-1 gap-3">
                <FormField
                    control={form.control}
                    name="city"
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select onValueChange={(event) => {
                                    field.onChange(event);
                                    setCitySelect(event);
                                    updateProvince({...userProvince, city: event})
                                }}
                                        value={field.value}
                                        onOpenChange={(open) => setTrigger(true)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose city"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {province && province.map((item:{ProvinceID: number,ProvinceName:string }, index:number) => {
                                            return (
                                                <SelectItem key={index} value={item.ProvinceID.toString()}>
                                                    {item.ProvinceName}
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
                                <FormLabel>District</FormLabel>
                                <Select onValueChange={(event) => {
                                    field.onChange(event);
                                    setDistrictSelect(event);
                                    updateProvince({...userProvince, district: event})

                                }}
                                        value={field.value!}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose district"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {si && si.map((item:{DistrictID:number, DistrictName:string}, index:number) => {
                                            return (
                                                <SelectItem key={index} value={item.DistrictID.toString()}>
                                                    {item.DistrictName}
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
                                <FormLabel>Ward</FormLabel>
                                <Select onValueChange={(event) => {
                                    field.onChange(event);
                                    setWardSelect(event);
                                    updateProvince({...userProvince, ward: event})

                                }}
                                        value={field.value!}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose ward"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {ward && ward.map((item:{WardCode: number, WardName:string}, index:number) => {
                                            return (
                                                <SelectItem key={index} value={item.WardCode.toString()}>
                                                    {item.WardName}
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