'use client'

import { formatPrice } from "@/lib/helpers";
import * as React from "react";
import { useGetPetWeight, useGetServiceOfPets } from "@/actions/queries/services";
import { useParams } from "next/navigation";

export function ServiceOfPetPriceTable() {
    const { petId } = useParams();

    const { data: servicesOfPets, isPending: serviceOfPetSpin } = useGetServiceOfPets(petId.toString());
    const { data: weights, isPending } = useGetPetWeight();

    return (
        <section id="pet_table_services">
            {serviceOfPetSpin || !servicesOfPets?.data ? <p>Pending</p> : (
                <>
                    {servicesOfPets?.data && (
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table-auto">
                                    <thead>
                                    <tr>
                                        <th className="border border-orange-400 cursor-pointer">
                                            {servicesOfPets?.petId?.name}
                                        </th>
                                        {Object.keys(servicesOfPets?.data)?.map((key, index) => {
                                            const serviceInfo = servicesOfPets?.data[key]?.[0]?.serviceId?.name;
                                            return (
                                                <th key={index} className="border border-orange-400 px-4 py-2">{serviceInfo}</th>
                                            )
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {weights?.map((weight, weightIndex) => (
                                        <tr key={weightIndex} className="relative">
                                            <td className="border border-orange-400 px-4 py-2 h-[41px]">{weight?.name}</td>
                                            {Object.keys(servicesOfPets?.data)?.map((key, index) => {
                                                return (
                                                    <td key={index}>
                                                        <>
                                                            {servicesOfPets?.data[key]?.map((service:any, serviceIndex:any) => {
                                                                if (service.weightId?.id === weight.id) {
                                                                    return (
                                                                        <tr key={`${index}-${serviceIndex}`} className="border w-full border-orange-400 ">
                                                                            <td className="h-[41px] w-full ">
                                                                                <input className=" rounded w-[90%]  text-center" type="text" readOnly={true} value={service?.price ? formatPrice(service?.price) : ""} />
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return <td key={`${index}-${serviceIndex}`}></td>;
                                                                }
                                                            })}
                                                        </>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}
