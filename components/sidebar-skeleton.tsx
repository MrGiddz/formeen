import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const DesktopSidebarSkeleton = () => {
  return (
    <div>
      <aside
        className={cn(
          "w-[250px] max-w-xs h-screen hidden md:block fixed left-0 top-0 z-40 border-r"
        )}
      >
        <div className="h-full flex flex-col px-2 py-4">
          <Skeleton className="h-4 mx-3" />
          <div className="mt-8 flex flex-col h-full mb-8">
            <div className="flex flex-col gap-4 w-full">
              {Array.from({ length: 5 }).map((link, index) => (
                <Skeleton className="h-6" key={index} />
              ))}
              <Skeleton className="h-6 my-4"  />
              <Skeleton className="h-6 my-4"  />
            </div>
            <div className="mt-auto w-full px-3 ">
     
              <div className="py-4 pb-8">
              <Skeleton className="h-6 my-4"  />
              </div>
              <Skeleton className="h-6 my-4 rounded-full"  />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DesktopSidebarSkeleton;
