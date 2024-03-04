"use client";

import * as React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Calendar as CalendarIcon} from "lucide-react";
import {addDays, format} from "date-fns"
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {stores, dog_services, cat_services} from "@/constants/fakeData";
import {cn} from "@/lib/utils";
import {IBooking} from "@/validations/booking";
import {UseFormReturn} from "react-hook-form";

interface BookingFormProps {
    form: UseFormReturn<IBooking>,
    onSubmit:(values:any) =>void,
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>

}

export function BookingForm({form,onSubmit,setDate,date}:BookingFormProps) {
    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-[50px] py-[30px]">
                    <h2 className="text-center font-bold text-dream text-2xl">ĐIỀN FORM ĐẶT LỊCH</h2>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Tên người đặt lịch" {...field} />
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
                                <FormControl>
                                    <Input placeholder="Số điện thoại" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({field}) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Loại thú cưng"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="dog">Chó</SelectItem>
                                        <SelectItem value="cat">Mèo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="storeId"
                        render={({field}) => (
                            <FormItem>
                                {/*<FormLabel className="font-bold text-lg my-2">Địa chỉ</FormLabel>*/}
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Địa chỉ"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {stores.map((item, index) => (
                                            <SelectItem key={index} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />



                    <div>
                        <h3 className="font-bold text-lg my-2"> Dịch vụ cún</h3>
                        <div className="border border-dashed p-2.5 rounded">
                            <FormField
                                control={form.control}
                                name="dog_service"
                                render={({field}) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                {dog_services?.map((item, index) => (
                                                    <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                        <FormControl>
                                                            <RadioGroupItem value={item.id}/>
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                   <div>
                       <h3 className="font-bold text-lg my-2"> Dịch vụ mèo </h3>
                      <div className="border border-dashed p-2.5 rounded">
                          <FormField
                              control={form.control}
                              name="cat_service"
                              render={({field}) => (
                                  <FormItem className="space-y-3">
                                      <FormControl>
                                          <RadioGroup
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                              className="flex flex-col space-y-1"
                                          >
                                              {cat_services?.map((item, index) => (
                                                  <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                      <FormControl>
                                                          <RadioGroupItem value={item.id}/>
                                                      </FormControl>
                                                      <FormLabel className="font-normal">
                                                          {item.name}
                                                      </FormLabel>
                                                  </FormItem>
                                              ))}
                                          </RadioGroup>
                                      </FormControl>
                                      <FormMessage/>
                                  </FormItem>
                              )}
                          />
                      </div>
                   </div>

                    <FormField
                        control={form.control}
                        name="booking_time"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-bold text-lg">Ngày đặt lịch</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                        <Select
                                            onValueChange={(value) =>
                                                setDate(addDays(new Date(), parseInt(value)))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="0">Today</SelectItem>
                                                <SelectItem value="1">Tomorrow</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="rounded-md border">
                                            <Calendar mode="single" selected={date} onSelect={setDate}/>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    <Button type="submit">Submit</Button>
                </form>
            </Form>


        </>
    )
}