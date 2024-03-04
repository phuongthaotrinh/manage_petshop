'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Icons} from "@/components/common/icon";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";
import {petsValidType, formSchema} from "@/validations/pets"

interface PetsFormsProps{
    form: UseFormReturn<petsValidType>,
    onSubmit:(values:petsValidType) => void


}
export function PetsForms ({form, onSubmit}:PetsFormsProps) {
    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pet Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="cat.." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a icon to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.entries(Icons).map(([key,value]) =>{
                                                const IconShow =  value as any
                                                return (
                                                    <SelectItem key={key} value={key}>
                                                        <div className="flex items-center">
                                                            <IconShow className="w-4 h-4 mr-2"/>
                                                            {key}
                                                        </div>

                                                    </SelectItem>
                                                )
                                            })
                                        }

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Status</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </>
    )
}