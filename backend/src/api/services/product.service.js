import createHttpError from "http-errors";

import Product from '../models/product.model';
import Images from '../models/images.model';
import ProductImage from '../models/productImages.model';
import ProductOption from '../models/productOption.model';
import ProductOptionValue from '../models/productOptionValue.model';
import ProductVariant from '../models/productVariant.model';
import mongoose from "mongoose";

export async function createProduct(draftProduct) {
    try {
        // 1. Lưu thông tin Product
            const isHasVariant = draftProduct.variants.length > 0
        const product_info = {...draftProduct.generalInfo, ...draftProduct.organize, isHasVariant:isHasVariant, price:draftProduct.price, inventory_quantity: draftProduct.inventory_quantity};

        const product = await Product.create(product_info)

        // 4. Lưu thông tin ProductOption
        const variants = draftProduct.variants;
        if (variants) {
            for (const variant of variants) {
                const productOption = new ProductOption({
                    product_id: product._id,
                    title: variant.name
                });
                await productOption.save();

                // 5. Lưu thông tin ProductVariant
                const productVariants = draftProduct.productVariants;
                if (productVariants) {
                    for (const productVariant of productVariants) {
                        const productVariantData = new ProductVariant({
                            ...productVariant,
                            product_id: product._id,
                        });
                        await productVariantData.save();
                    }
                }

                // 6. Lưu thông tin ProductOptionValue
                const values = variant.value;
                if (values) {
                    for (const value of values) {
                        const productOptionValue = new ProductOptionValue({
                            value: value.value,
                            product_option_id: productOption._id,
                            // Lấy product_variant_id từ ProductVariant đã được lưu
                            product_variant_id: productVariants.find(pv => pv.title === value.label)?._id
                        });
                        await productOptionValue.save();
                    }
                }
            }
        }

        console.log('Product created successfully.');
    } catch (error) {
        console.error('Error creating product:', error);
    }
}



export async function getListProduct () {
   const data =  await Product.aggregate()
       .lookup({
            from: 'brands',
           localField: 'brand_id',
           foreignField: '_id',
           as: 'brand'
       })
       .addFields({
           brand: { $arrayElemAt: ["$brand", 0] }
       })
       .lookup({
            from: 'categories',
               localField: 'category_ids',
               foreignField: '_id',
               as: 'categories'
       })

  return data
}

export async function getDetailProduct({id}) {
    const existProduct = await Product.exists({_id: id});
    if(!existProduct) throw createHttpError.NotFound('Cannot find product');

    const productInfo = await Product.aggregate()
        .match({
            _id:new mongoose.Types.ObjectId(id)
        })
        .lookup({
            from: 'brands',
            localField: 'brand_id',
            foreignField: '_id',
            as: 'brand'
        })
        .addFields({
            brand: { $arrayElemAt: ["$brand", 0] }
        })
        .lookup({
            from: 'categories',
            localField: 'category_ids',
            foreignField: '_id',
            as: 'categories'
        })

    const productImages = await ProductImage.aggregate()
        .match({
            product_id:new mongoose.Types.ObjectId(id)
        })
        .lookup({
            from: 'images',
            foreignField: '_id',
            localField: '_image_id',
            as: 'images'
        })


    const productVariant = await ProductVariant.find({
        product_id: id
    })



    const newData = {...productInfo[0], images:productImages,productVariant:productVariant}


    return newData
}

