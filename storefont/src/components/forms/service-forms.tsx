"use client";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { UseFormReturn} from "react-hook-form";
import {Switch} from "@/components/ui/switch";
import {Service} from "@/types/service";
import {setValuesOfForm} from "@/lib/helpers"
interface ServiceFormsProps {
    data?:Service,
    mode: 'create' | 'edit',
    onSubmit: (val:any) => void,
    form: UseFormReturn<any>
}

export function ServiceForms ({mode, data, onSubmit, form}:ServiceFormsProps) {
    React.useEffect(() => {
        if(data && mode =="edit") {
            setValuesOfForm(data, form)
        }
    },[data])

    return (
      <>
          <Form {...form}  >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                      <Input placeholder="name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="desc"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Desc</FormLabel>
                              <FormControl>
                                  <Input placeholder="desc" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="minTimeToDo"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Time to do</FormLabel>
                              <FormControl>
                                  <Input placeholder="desc" {...field} />
                              </FormControl>
                              <FormDescription>Enter min time to do this service <br />
                                  exmp: 45m

                              </FormDescription>
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