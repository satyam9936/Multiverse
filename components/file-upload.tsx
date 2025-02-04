"use client"

import {X} from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploading";
import "@uploadthing/react/styles.css"
import { error } from "console";
interface FileUploadProps{
    onChange: (url?: string)=>void;
    value: string;
    endpoint: "messageFile"| "serverImage"
}
export const FileUpload=({
onChange,
value,
endpoint
}: FileUploadProps)=>{
    const filetype=value?.split(".").pop();
    if (value && filetype!="pdf"){
        return(
            <div className="relative h-20 w-20">
<Image
layout="fill"
src={value}
alt="Upload"
className="rounded-full"
/>
<button
onClick={()=>onChange("")}
className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
type="button"
>
    <X className="h-4 w-4"/>
</button>

            </div>
        )
    }
    
    return(
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res)=>{
        onChange(res?.[0].url); // Assuming 'url' is the correct property name
    }}
    onUploadError={(error:Error)=>{
        console.log(error);
    }}
    />
    )
}