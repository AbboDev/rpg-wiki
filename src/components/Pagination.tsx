'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function Pagination({
  count,
  perPage,
}: {
  count: number;
  perPage: number;
}) {
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

  return (
    <ol className="grid grid-flow-col auto-cols-fr gap-1 text-center text-gray-200 leading-none">
      {Array.from({ length }, (_, i) => (
        <li
          className="block"
          key={i + 1}
        >
          <Link
            href={`${pathname}?${appendPage(i + 1)}`}
            className="rounded w-full p-1 flex items-center justify-center aspect-square border border-gray-200 transition-colors hover:border-gray-400 hover:text-gray-400"
          >
            {i + 1}
          </Link>
        </li>
      ))}
    </ol>
  );
}
