"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavHistory({currentPage} : {currentPage?: {name: string }}) {
  const paths = usePathname();
  const pathSegments = paths.split("/").filter((segment) => segment !== "");
  const firstIndex = 0;
  const secondLastIndex = pathSegments.length - 2;
  const lastIndex = pathSegments.length - 1;

  // Keeping the first index and the last two indices
  const arraysKept = [
    pathSegments[firstIndex],
    ...pathSegments.slice(secondLastIndex, lastIndex + 1),
  ];

  // Remove elements from the original pathSegments
  const elipsesArray = pathSegments.slice(firstIndex + 1, secondLastIndex);

  console.log({ last: pathSegments[lastIndex] });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.length > 3
          ? arraysKept.map((link, index, arr) => (
              <>
                {index === 0 && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={DEFAULT_LOGIN_REDIRECT}>
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {index !== arr.length && <BreadcrumbSeparator />}

                {index === 0 && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/"
                        className={cn(
                          "",
                          pathSegments[lastIndex] === DEFAULT_LOGIN_REDIRECT &&
                            "text-primary-60"
                        )}
                      >
                        {link}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {index === 0 && (
                  <>
                    {index !== arr.length && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                          <BreadcrumbEllipsis className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {elipsesArray.map((innerLink, index) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link
                                href={`/${[arr[0], ...arr.slice(1, index + 1)].join(
                                  "/"
                                )}`}
                              >
                                {innerLink}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                  </>
                )}
                {index > 0 && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/${[arr[0], ...arr.slice(1, index + 1)].join("/")}`}
                        className={cn(
                          "",
                          pathSegments[lastIndex] === link &&
                            arraysKept.length - 1 === index &&
                            "text-primary-60"
                        )}
                      >
                        {link}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            ))
          : pathSegments.map((link, index, arr) => {
              console.log({
                arr,
                index,
                pathSegments,
                href: [arr[0], ...arr.slice(1, index + 1)].join("/"),
              });
              const href = [arr[0], ...arr.slice(1, index + 1)].join("/");
              return (
                <>
                  {index === 0 && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={DEFAULT_LOGIN_REDIRECT}
                          className={cn(
                            "",
                            pathSegments[lastIndex] ===
                              DEFAULT_LOGIN_REDIRECT && "text-primary-60"
                          )}
                        >
                          Home
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={`/${href}`}
                          className={cn(
                            "",
                            pathSegments[lastIndex] === link &&
                              "text-primary-60"
                          )}
                        >
                          {link}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                  {index !== arr.length && index !== 0 && (
                    <BreadcrumbSeparator />
                  )}

                  {index !== 0 && index !== arr.length - 1 && (
                    <BreadcrumbItem>
                      <BreadcrumbLink
                         href={`/${href}`}
                        className={cn(
                          pathSegments[lastIndex] === link && "text-primary-60"
                        )}
                      >
                        {link}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}

                  {index === arr.length - 1 && (
                    <BreadcrumbItem>
                      <BreadcrumbLink
                         href={`/${href}`}
                        className={cn(
                          pathSegments[lastIndex] === link && "text-primary-60"
                        )}
                      >
                        {currentPage?.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                </>
              );
            })}

        {/* <BreadcrumbSeparator />

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
