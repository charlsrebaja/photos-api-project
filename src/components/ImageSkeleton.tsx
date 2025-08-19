import { Card } from "./ui/card";

export function ImageSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-muted h-64 w-full" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    </Card>
  );
}
