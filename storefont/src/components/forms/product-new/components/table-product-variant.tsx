'use client';
import React, { InputHTMLAttributes } from "react";
import {FormItems} from "@/components/forms/product-new";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

type IProductVariants = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems
};


export function ProductVariantsNewTable ({formData,updateForm}:IProductVariants) {
    const [controlName, setControlName] = React.useState<string | null>(null);
    const [formVariant, setFormVariant] = React.useState<any[]>([])

    const id = React.useId()

    console.log("form",formVariant);


    const updateForm2 = (fieldToUpdate: any) => {
        const payload = {...formVariant, ...fieldToUpdate};
        setFormVariant(payload);
    }

    return (
        <div className="space-y-5">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {formData.variants.map((variant, index) => (
                        <TableHeader content={variant.name ? variant.name : `variant no.${index + 1}`} key={`${index}.${id}`}  />
                    ))}

                    <TableHeader content="Price" isActive={controlName == "price"} />
                    <TableHeader content="Stock" isActive={controlName == "stock"} />
                    <TableHeader content="SKU" isActive={controlName == "sku"} />

                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {formData.variants[0].value.length == 0 ? (
                    <> <tr>
                        <TableD hidden />
                        <TableD placeholder="price" content={<></>} isActive={controlName == "price"}/>
                        <TableD placeholder="stock" content={<></>} isActive={controlName == "stock"}/>
                        <TableD placeholder="sku" content={<></>} isActive={controlName == "sku"}/>
                    </tr></>
                ):null}
                {formData.variants[0].value.map((color, colorIndex) => (
                    <React.Fragment key={`${colorIndex}.${id}`}>
                        {!formData.variants[1] ? (
                            <>
                                    <tr>
                                        <TableD content={<>{color.value}</>} />
                                        <TableD content={<Input
                                                                placeholder={`price:${color.value}`}
                                                                onChange={(e) => {
                                                                    const data = {
                                                                        variant_name: color.value,
                                                                        variant_value: formData.variants[0]?.name,
                                                                        price:  e.target.value
                                                                    };

                                                                    updateForm2([...formVariant, data])

                                                                }}
                                        />}
                                                                isActive={controlName == "price"}



                                        />
                                        <TableD content={<Input  placeholder={`stock:${color.value}`}
                                                                 onChange={(e) => {
                                                                     console.log("!formData.variants[1]stock",e.target.value)
                                                                 }}

                                        />} isActive={controlName == "stock"}

                                        />
                                        <TableD content={<Input  placeholder={`sku:${color.value}`}
                                                                 onChange={(e) => {
                                                                     console.log("!!formData.variants[1].sku",e.target.value)
                                                                 }}


                                        />} isActive={controlName == "sku"}

                                        />
                                    </tr>
                            </>
                        ) : (
                            <>
                                {formData.variants[1].value.length ==0 ? (
                                    <>
                                        <tr key={`${colorIndex}`}>
                                            <TableD rowSpan={1} content={<span>{color.value}</span>}/>
                                            <TableD content={<p></p>}/>

                                            <TableD isActive={controlName == "price"} content={
                                                <Input required
                                                       onChange={(e) => {
                                                            console.log("formData.variants[1].value.length ==0.sku",e.target.value)
                                                        }}
                                                />}

                                            />
                                            <TableD isActive={controlName == "stock"} content={
                                                <Input required
                                                       onChange={(e) => {
                                                           console.log("formData.variants[1].value.length ==0.stock",e.target.value)
                                                       }}
                                                />}

                                            />
                                            <TableD isActive={controlName == "sku"} content={
                                                <Input required
                                                       onChange={(e) => {
                                                           console.log("!formData.variants[1].sku",e.target.value)
                                                       }}
                                                />}

                                            />
                                        </tr>
                                    </>
                                ):(
                                    <>
                                        {formData.variants[1]?.value.map((size, sizeIndex) => (
                                            <tr key={`${colorIndex}-${sizeIndex}-${id}`}>
                                                {sizeIndex === 0 && (
                                                        <TableD rowSpan={formData.variants[1].value.length == 0 ?  1 : formData.variants[1].value.length}
                                                                content={<> {color.value}</>}
                                                                onChange={(e) => {
                                                                    console.log("e",e.target.value)
                                                                }}
                                                        />
                                                )}
                                                <TableD content={<>{size.value}</>} />
                                                <TableD content={
                                                    <Input
                                                        placeholder={`price:${color.value}.${size.value}`}/>}
                                                        isActive={controlName == "price"}
                                                        onChange={(e) => {
                                                            console.log("formData.variants[1]?.value.price",e.target.value)
                                                        }}
                                                />
                                                <TableD content={
                                                    <Input
                                                        placeholder={`stock:${color.value}.${size.value}`}/>}
                                                        isActive={controlName == "stock"}
                                                        onChange={(e) => {
                                                            console.log("formData.variants[1]?.value.stock",e.target.value)
                                                        }}
                                                />
                                                <TableD content={
                                                    <Input
                                                        placeholder={`sku:${color.value}.${size.value}`}/>}
                                                        isActive={controlName == "sku"}
                                                        onChange={(e) => {
                                                            console.log("formData.variants[1]?.value.sku",e.target.value)
                                                        }}
                                                />
                                            </tr>
                                        ))}

                                    </>
                                )}
                            </>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>

        </div>
    )
}

interface TableCellProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'content'> {
    content?: React.ReactNode;
    className?: string;
    isActive?: boolean;
    placeholder?: string;
    name?: string;
    hidden?: boolean;
    rowSpan?: number;
}

const TableHeader: React.FC<TableCellProps> = ({ content, className = "",isActive }) => (
    <th scope="col"
        className={cn(
            'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
            className,
            { 'border border-orange-500': isActive, }
        )}
    >
        {content}
    </th>
);

const TableD: React.FC<TableCellProps> = ({ rowSpan,content, className = "",isActive,...props }) => (
    <td className={cn(
        'px-6 py-4  text-sm font-medium text-gray-900',
        { 'border border-orange-500': isActive }, // Đảm bảo đặt border ở đây
        className
    )}
        rowSpan={rowSpan}
    >
        {content}
    </td>
);



// <div id="input_control" className="flex gap-3">
//     <Input placeholder="price" onBlur={() => setControlName(null)} onClick={() => setControlName('price')}  ></Input>
//     <Input placeholder="stock" onBlur={() => setControlName(null)} onClick={() => setControlName('stock')}></Input>
//     <Input placeholder="sku"  onBlur={() => setControlName(null)} onClick={() => setControlName('sku')}></Input>
//     <Button variant="orange" type="button">Appy for all</Button>
// </div>