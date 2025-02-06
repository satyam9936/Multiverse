
import React from "react";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodPageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodPage({
  params: { inviteCode }
}: InviteCodPageProps) {
  const profile = await currentprofile();

  if (!profile) return <RedirectToSignIn/>;

  if (!inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode
    },
    data: {
      members: {
        create: [{ profileId: profile.id }]
      }
    }
  });

  if (server) return redirect(`/servers/${server.id}`);

  return null;
}


