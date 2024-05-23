import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { ReactNode } from "react";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  helperText: string;
  icon: ReactNode;
  loading: boolean;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, loading, title, value, helperText, icon, ...props }, ref) => {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading && (
              <Skeleton>
                <span className="opacity-0">0</span>
              </Skeleton>
            )}
            {!loading && value}
          </div>
          <p className="text-xs text-muted-foreground-pt-1">{helperText}</p>
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
