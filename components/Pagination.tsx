'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const LINK_CLASS =
  'rounded w-full p-1 flex items-center justify-center aspect-square border border-gray-200 transition-colors hover:border-gray-400 hover:text-gray-400';

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
  const currentPage = Number(searchParams?.get('page')) || 1;

  return (
    <ol className="grid grid-flow-col auto-cols-fr gap-1 text-center text-gray-200 leading-none">
      {currentPage > 1 && (
        <li className="block">
          <Link
            href={`${pathname}?${appendPage(currentPage - 1)}`}
            className={LINK_CLASS}
          >
            <RiArrowLeftSLine />
          </Link>
        </li>
      )}

      {Array.from({ length }, (_, i) => (
        <li className="block" key={i + 1}>
          <Link
            href={`${pathname}?${appendPage(i + 1)}`}
            className={LINK_CLASS}
          >
            {i + 1}
          </Link>
        </li>
      ))}

      {currentPage < length && (
        <li className="block">
          <Link
            href={`${pathname}?${appendPage(currentPage + 1)}`}
            className={LINK_CLASS}
          >
            <RiArrowRightSLine />
          </Link>
        </li>
      )}
    </ol>
  );
}
