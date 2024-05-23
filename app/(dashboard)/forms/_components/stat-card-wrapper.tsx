import { GetFormStats } from "@/actions/form";

import StatCards from "./stat-cards";

export interface StatCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>> | null;
  loading: boolean;
}

const StatCardWrapper = async ({ data }: StatCardsProps ) => {
  return <StatCards loading={false} data={data} />;
};

export default StatCardWrapper;
