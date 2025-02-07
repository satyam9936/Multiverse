import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerIdPageProps {
   params:{ serverId:string}
}

export default async function Server({params}: ServerIdPageProps) {
    const profile= await currentprofile();
    if(!profile) return <RedirectToSignIn/>;
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    id: profile.id
                }
            }
        },
include:{
    channels:{
        where:{
            name: "general"
        },
        orderBy :{createdAt: "asc"}
    }
}

    });

    const  initialChannel= server?.channels[0];
    if (initialChannel?.name!== "general") return null;


    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}