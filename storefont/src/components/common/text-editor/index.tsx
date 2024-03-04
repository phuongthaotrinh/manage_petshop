"use client";

import React, {useMemo, useCallback, lazy, Suspense} from "react";
import ReactQuill, {Quill} from "react-quill";
import ImageUploader from "quill-image-uploader";

import 'react-quill/dist/quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

Quill.register("modules/imageUploader", ImageUploader);

interface EditorProps {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot"
];

export const TextEditor: React.FC<EditorProps> = ({content, setContent}) => {

    const uploadImage = useCallback((file: File) => {
        return new Promise<string>((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "c8zrj0fl"); // Cloudinary upload preset key

            fetch("https://api.cloudinary.com/v1_1/dr9ebt5bg/upload", {
                method: "POST",
                body: formData
            })
                .then((response) => response.json())
                .then((result) => {
                    resolve(result.secure_url);
                })
                .catch((error) => {
                    reject("Upload failed");
                    console.error("Error:", error);
                });
        });
    }, []);

    const modules = useMemo(() => ({
        toolbar: [
            [{font: []}],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            ["bold", "italic", "underline", "strike"],
            [{color: []}, {background: []}],
            [{script: "sub"}, {script: "super"}],
            ["blockquote", "code-block"],
            [{list: "ordered"}, {list: "bullet"}],
            ["link", "image", "video"],
            ["clean"],
        ],
        imageUploader: {
            upload: uploadImage
        }
    }), [uploadImage]);


    const handleContentChange = (content: string) => {
        setContent(content);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleContentChange}
            />
        </Suspense>
    );
};



