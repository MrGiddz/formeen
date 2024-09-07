import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

const FormCard = async ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-sm">{form.name}</span>
          {form.published && <Badge className="text-xs">Published</Badge>}
          {!form.published && (
            <Badge className="text-sm" variant="destructive">
              Draft
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="text-sm">
            {formatDistance(form.createdAt, new Date(), {
              addSuffix: true,
            })}
          </div>
          {!form.published && (
            <div className="flex items-center gap-2">
              <ActionTooltip label="Visits" side="bottom">
                <div className="flex items-center justify-center gap-2">
                  <LuView className="text-muted-foreground" />
                  <span className="text-sm">
                    {form.visits.toLocaleString()}
                  </span>
                </div>
              </ActionTooltip>
              <ActionTooltip label="Submissions" side="bottom">
                <div className="flex items-center justify-center gap-2">
                  <FaWpforms className="text-muted-foreground" />
                  <span className="text-sm">
                    {form.submissions.toLocaleString()}
                  </span>
                </div>
              </ActionTooltip>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="truncate text-sm text-muted-foreground">
        {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button className="w-full mt-2 text-md gap-4" asChild>
            <Link href={`/forms/details/${form.id}`} className="text-xs p-2">
              View Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button className="w-full text-sm gap-4" asChild>
            <Link href={`/forms/builder/${form.id}`} className="text-xs">
              Edit Form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
