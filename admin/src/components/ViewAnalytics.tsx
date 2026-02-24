import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export function ViewAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Blog Analytics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Connect your backend to see view counts and engagement metrics.
        </p>
      </CardHeader>
      <CardContent>
        <div className="py-12 text-center text-muted-foreground">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No analytics data yet.</p>
          <p className="text-sm mt-2">Analytics will appear when blog posts are published and tracked.</p>
        </div>
      </CardContent>
    </Card>
  );
}
