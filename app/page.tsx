import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiArrowRightSLine } from 'react-icons/ri';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start gap-4 text-start">
      <div className="container">
        <Button asChild>
          <Link href="/articles" className="group">
            Articles{' '}
            <RiArrowRightSLine className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </Button>
      </div>

      <div className="container">
        <Button asChild>
          <Link href="/maps" className="group">
            Maps Editor{' '}
            <RiArrowRightSLine className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </Button>
      </div>

      <div className="container">
        <Button asChild>
          <Link href="/world" className="group">
            World Map{' '}
            <RiArrowRightSLine className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </Button>
      </div>

      <div className="container">
        <Button asChild>
          <Link href="/connections" className="group">
            Connections{' '}
            <RiArrowRightSLine className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
