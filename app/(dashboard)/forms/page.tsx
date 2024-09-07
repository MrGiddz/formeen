

import React, { Suspense } from "react";
import StatCardWrapper from "./_components/stat-card-wrapper";
import { Separator } from "@/components/ui/separator";
import StatCards from "./_components/stat-cards";
import CreateFormBtn from "./_components/create-form-btn";
import FormCards from "./_components/form-cards";
import FormCardSkeleton from "./_components/form-card-skeleton";
import { GetFormStats } from "@/actions/form";
import { currentUser } from "@/lib/auth";
import { redirectToSignIn } from "@/lib/redirect-to-signin";

type Props = {};

async function Forms({}: Props) {
  const user = await currentUser();
  
  if (!user) {
    return redirectToSignIn();
  }
  const stats = await GetFormStats();
  return (
    <div className="container pt-2">
      <Suspense fallback={<StatCards loading={false} />}>
        <StatCardWrapper data={stats} loading={false}  />
      </Suspense>

      <Separator className="my-4" />

      <h2 className="text-xl font-bold col-span-2">Your Forms</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
        <CreateFormBtn />
        <Suspense fallback={[1,2,3,4].map(el => <FormCardSkeleton key={el} />)}>
          <FormCards />
        </Suspense>
      </div>
      <Separator className="my-4" />
    </div>
  );
}

export default Forms;
