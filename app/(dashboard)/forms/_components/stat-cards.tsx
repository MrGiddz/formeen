import { GetFormStats } from "@/actions/form";
import StatCard from "./stat-card";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { StatCardsProps } from "./stat-card-wrapper";


const StatCards = async ({ data, loading }: StatCardsProps) => {
  return (
    <div className="w-full pt-2 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        loading={loading}
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText={"All time form visits"}
        value={data?.visits.toLocaleString() || ""}
        className="shadow-md"
      />
      <StatCard
        loading={loading}
        title="Total Submissions"
        icon={<FaWpforms className="text-green-600" />}
        helperText={"All time form submissions"}
        value={data?.submissions.toLocaleString() || ""}
        className="shadow-md"
      />
      <StatCard
        loading={loading}
        title={"Submission Rate"}
        icon={<HiCursorClick className="text-emerald-600" />}
        helperText="% of Users that have submitted successfully"
        value={data?.submissionRate.toLocaleString()+ "%"  || ""}
        className="shadow-md"
      />
      <StatCard
        loading={loading}
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-rose-400" />}
        helperText="% of Users that have visited without submitting"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        className="shadow-md"
      />
    </div>
  );
};

export default StatCards;
