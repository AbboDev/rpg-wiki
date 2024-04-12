'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
  count: number;
  perPage: number;
  offset?: number;
}

export function Pagination({ count, perPage, offset }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const appendPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));

      return params.toString();
    },
    [searchParams],
  );

  const length = Math.ceil(count / perPage);
  const currentPage = Number(searchParams?.get('page')) || 1;

  let left: number[] = [];
  let right: number[] = [];
  if (offset) {
    for (let index = 1; index <= offset; index++) {
      const prevPage = currentPage - index;
      if (prevPage > 0) {
        left.unshift(prevPage);
      }

      const nextPage = currentPage + index;
      if (nextPage < length) {
        right.push(nextPage);
      }
    }
  }

  return (
    <UIPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${pathname}?${appendPage(currentPage - 1)}`}
            />
          </PaginationItem>
        )}

        {!offset ? (
          Array.from({ length }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`${pathname}?${appendPage(i + 1)}`}
                isActive={i + 1 === currentPage}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            {left[0] !== 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {left.map((i) => (
              <PaginationItem key={i}>
                <PaginationLink href={`${pathname}?${appendPage(i)}`}>
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?${appendPage(currentPage)}`}
                isActive
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {right.map((i) => (
              <PaginationItem key={i}>
                <PaginationLink href={`${pathname}?${appendPage(i)}`}>
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}
            {right[right.length - 1] !== length - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {currentPage < length && (
          <PaginationItem>
            <PaginationNext
              href={`${pathname}?${appendPage(currentPage + 1)}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
}
