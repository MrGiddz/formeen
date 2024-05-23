"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { ShowPopover } from "@/components/show-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { BiCheck, BiCopy } from "react-icons/bi";

const ShareLink = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-9 w-full" />;
  }
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <ActionTooltip label={!isCopied ? "Copy" : "Copied"} side="right">
      <div className="relative my-4 flex gap-2 items-center w-full h-9 pb-4">
        <Input className="w-full" readOnly value={shareLink} />
        <ShowPopover open={isCopied} text="Copied to your clipboard">
          <Button
            className=" absolute h-full right-0"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
          >
            {!isCopied ? (
              <BiCopy className="h-5 w-5" />
            ) : (
              <BiCheck className="h-5 w-5" />
            )}
          </Button>
        </ShowPopover>
      </div>
    </ActionTooltip>
  );
};

export default ShareLink;
