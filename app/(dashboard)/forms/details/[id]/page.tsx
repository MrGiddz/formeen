import { GetFormById, GetFormStatsById } from "@/actions/form";
import React, { Suspense } from "react";
import VisitButton from "../../_components/visit-btn";
import ShareLink from "../../_components/share-link";
import StatCards from "../../_components/stat-cards";
import StatCardWrapper from "../../_components/stat-card-wrapper";
import SubmissionsTable from "../../_components/submissions-table";
import { NavHistory } from "@/components/nav-history";

async function FormDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormById(id);
  const formStat = await GetFormStatsById(id);

  if (!form) {
    return <div className="border border-rose-500 border-muted">
      <div className="p-4">
        <h2 className="text-rose-500 text-muted">Form Not Found</h2>
      </div>
    </div>;
  }

  return (
    <div className="py-10 border-b border-muted">
      <div className="container my-5 mb-6">
        <NavHistory currentPage={{ name: form.name }} />
      </div>
      <div className="flex justify-between container">
        <h1 className="text-2xl font-bold truncate">{form.name}</h1>
        <VisitButton shareUrl={form.shareURL} />
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <ShareLink shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 container">
        <Suspense fallback={<StatCards loading={false} />}>
          <StatCardWrapper data={formStat} loading={false} />
        </Suspense>
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={id} />
      </div>
    </div>
  );
}

export default FormDetails;
