"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const VisitButton = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return  <Skeleton className="h-9 w-[200px]" />;;
  }

  const shareLink = `${window.location.origin}/form/${shareUrl}`;
  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
};

export default VisitButton;
