import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="space-y-2">
        <div className="text-6xl font-mono font-bold text-accent">404</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Page Not Found</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          The requested page or deck does not exist or has been moved.
        </p>
      </div>
      <Button asChild size="sm" className="font-mono text-xs">
        <Link href="/">
          <ArrowLeft className="mr-2 h-3.5 w-3.5" />
          <span>Return Home</span>
        </Link>
      </Button>
    </div>
  );
}
