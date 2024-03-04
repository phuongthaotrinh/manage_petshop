import createHttpError from "http-errors";

import Product from '../models/product.model';
import Images from '../models/images.model';
import ProductImage from '../models/productImages.model';
import ProductOption from '../models/productOption.model';
import ProductOptionValue from '../models/productOptionValue.model';
import ProductVariant from '../models/productVariant.model';

export async function createProduct(draftProduct) {
    try {
        // 1. Lưu thông tin Product
        const product_info = {...draftProduct.generalInfo, ...draftProduct.organize}
        const product = await Product.create(product_info);


        // 2. Lưu thông tin Image
        // const galleries = draftProduct.galleries;
        // if (galleries) {
        //     const images = await Images.create(galleries);
        //
        //     // 3. Lưu thông tin ProductImage
        //     for (const image of images) {
        //         const productImage = new ProductImage({
        //             product_id: product._id,
        //             image_id: image._id
        //         });
        //         await productImage.save();
        //     }
        // }

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
                            product_option_id: productOption._id,
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

