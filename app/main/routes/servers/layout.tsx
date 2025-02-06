import React from "react";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";


export default async function ServerIdLayout({
    children,
    params,
}:{
children:React.ReactNode;
params: {serverId: string};
}){
   const profile= await currentprofile();

   if(!profile) return RedirectToSignIn;

   const server= await db.server.findUnique({
where:{
    id: params.serverId,
    members:{
        some:{
        profileId:profile.id
    }
    }
}
   })

   if(!server) return redirect("/");

return(
   <div className=" h-full">
    <div className= "hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId}/>
    </div>
    <main className="h-full md:p1-60">{children}</main>
   </div>
)
}