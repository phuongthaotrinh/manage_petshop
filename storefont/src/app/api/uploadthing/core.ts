import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
    productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 100 } })
        .middleware(async ({ req }) => {
            const user = await auth(req);

            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId };
        })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;