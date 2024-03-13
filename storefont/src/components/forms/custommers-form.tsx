"use client";

import * as React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
    FormDescription
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Calendar as CalendarIcon, Trash} from "lucide-react";
import {format} from "date-fns"
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useFieldArray} from "react-hook-form";
import type {UseFormReturn} from "react-hook-form"
import { ICustomers } from "@/validations/customers"
import {userRoles} from "@/constants/fakeData"
import {ShellAction} from "@/components/common/shell-action";
import {Uploads} from "@/components/common/uploads";
import {RenderImage} from "@/components/common/render-image";
import {GHNProvinces} from "@/components/common/provinces/GHNProvinces";

interface ICustommersForm {
    onSubmit:(values:Omit<ICustomers, '_id'>) => void,
    form: UseFormReturn<Omit<ICustomers, '_id'>>,
    reset:() => void,
    images:string[],
    setImages:  React.Dispatch<React.SetStateAction<string[]>>,
    date:Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    isEditMode:boolean,
    updateProvince:(value:any) => void,
    userProvince:any

}


export function CustommersForm({onSubmit,updateProvince,  userProvince, isEditMode, form, reset, images,setImages}:ICustommersForm) {

    const {fields, append, remove, prepend} = useFieldArray({
        name: "socials",
        control: form.control,
    });

    return (
        <>
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Button type="submit">Submit</Button>
                        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
                    </div>
                    <div className="grid md:grid-cols-2 sx:grid-cols-1 gap-6">
                        <div className="space-y-3 ">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tên hiển thị </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tên người đặt lịch" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tên nguời dùng</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tên người đặt lịch" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tên người đặt lịch" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Số điện thoại" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phân quyền</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Phân quyền"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {userRoles.map((item, index) => (
                                                    <SelectItem key={index} value={item.value}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                        </div>
                        <div className="space-y-3">

                            <FormField
                                control={form.control}
                                name="images"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Media</FormLabel>
                                       <div>
                                           <Uploads value={images} max={2} onChange={(value:any) => {
                                               if (value !== null && value !== undefined) {
                                                   const newImages = [...images, value] as any
                                                   setImages(newImages);
                                               }
                                           }} />
                                       </div>
                                        <RenderImage images={images} setImages={setImages} isPreviewMode={false} />
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <GHNProvinces  form={form} updateProvince={updateProvince} userProvince={userProvince}/>

                            <FormField
                            control={form.control}
                            name="bio"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div>
                            <FormLabel >
                                URLs
                            </FormLabel>
                            <FormDescription >
                                Add links to your website, blog, or social media profiles.
                            </FormDescription>

                                {fields.map((field, index) => (
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`socials.${index}.url`}
                                        render={({field}) => {
                                            return (
                                                <FormItem className="space-y-3 my-3">
                                                    <div className="flex items-center gap-3">
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <ShellAction actionVoid={() =>remove(index)}
                                                                     type="link"  actionName="" icon={Trash}
                                                        />
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({
                                    url:""
                                })}
                            >
                                Add Social Links
                            </Button>
                        </div>


                    </div>
                    </div>

                </form>
            </Form>
        </>
    )
}