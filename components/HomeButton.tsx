import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiHome4Line } from 'react-icons/ri';

export function HomeButton() {
  return (
    <Button asChild>
      <Link href="/" className="gap-1">
        <RiHome4Line className="inline-block" />
        <span>Back to homepage</span>
      </Link>
    </Button>
  );
}
