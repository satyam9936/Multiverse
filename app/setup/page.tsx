import React from 'react'
import { initialProfile } from '@/lib/initial-profile';
import { db } from '@/lib/db';
import { redirect } from "next/navigation"

const SetupPage=async ()=> {
    const profile= await initialProfile();

    let server = null;
    if (profile && 'id' in profile) {
        server = await db.server.findFirst({
            where:{
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            }
        });
    }

if (server){
    return redirect(`/servers/${server.id}`);

}
  return <div>Create a server</div>
}
export default SetupPage;
