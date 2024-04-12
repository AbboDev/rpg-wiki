'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  value: string | number;
}

export function Select({ value }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePage = (count: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('count', count);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <UISelect onValueChange={changePage} defaultValue={value.toString()}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Record per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </UISelect>
  );
}
