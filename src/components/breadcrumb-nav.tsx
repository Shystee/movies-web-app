"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export function BreadcrumbNav() {
  const pathname = usePathname();

  // Show only Home on the homepage
  if (pathname === "/") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Split and decode the pathname segments
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      // Handle dynamic route parameters (segments starting with [)
      const isParam = segment.startsWith("[") && segment.endsWith("]");
      // Remove the brackets if it's a param
      const cleanSegment = isParam ? segment.slice(1, -1) : segment;

      return {
        name: cleanSegment
          // Convert kebab case or snake case to title case
          .replace(/-|_/g, " ")
          // Capitalize first letter of each word
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        path: segment,
        isParam,
      };
    });

  // Generate breadcrumb items with proper links
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home link always shows */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          // Build up the path for this segment
          const href = `/${segments
            .slice(0, index + 1)
            .map((s) => s.path)
            .join("/")}`;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === segments.length - 1 ? (
                  // Last segment is the current page
                  <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                ) : (
                  // Other segments are links
                  <BreadcrumbLink href={href}>{segment.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
