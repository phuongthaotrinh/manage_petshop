import ProductAttribute from "../models/productAttribute.model"
import createHttpError from "http-errors";


 // ======== Product Attribute ========
export async function createProductAttribute(attributeData) {
    const existAttribute = await ProductAttribute.exists({name: attributeData.name});
    if(existAttribute)  throw createHttpError.BadRequest(`Can't duplicate attribute`);
     const existingSlugs = await ProductAttribute.distinct("attributes.slug");


    const existingAttributeSlugs = attributeData.attributes
        .filter(attribute => existingSlugs.includes(attribute.slug))
        .map(attribute => attribute.slug);

    if (existingAttributeSlugs.length > 0) {
        throw new Error(`slugs exist: ${existingAttributeSlugs.join(", ")}`);
    }
    if (attributeData.attributes.length === 0) {
        throw new Error("At least one attribute slug must be provided.");
    }

    return await ProductAttribute.findOneAndUpdate(
        { name: attributeData.name },
        { $push: { attributes: attributeData.attributes } },
        { new: true, upsert: true }
    );

}

export async function getProductAttribute () {
    return await ProductAttribute.find()
}

export async function updateProductAttribute(payload) {
    try {
        for (const attribute of payload.attributes) {
            const existingAttribute = await ProductAttribute.findOne({ 'attributes.slug': attribute.slug });
            if (existingAttribute) {
                await ProductAttribute.findOneAndUpdate(
                    { 'attributes.slug': attribute.slug },
                    { $set: { 'attributes.$.atbStt': attribute.atbStt } }
                );
            } else {
                const existingAttributeWithId = await ProductAttribute.findOne({ 'attributes._id': attribute._id });

                if (existingAttributeWithId) {
                    console.log(`Attribute with ID ${attribute._id} already exists.`);
                } else {
                    await ProductAttribute.findOneAndUpdate(
                        { _id: payload._id },
                        { $push: { attributes: attribute } }
                    );
                }
            }
        }

        return { success: true, message: 'Attributes updated successfully.' };
    } catch (error) {
        return { success: false, message: 'An error occurred while updating/creating attributes.' };
    }

}

// PRODUCTS


export const createProduct = (payload) =>{

}
