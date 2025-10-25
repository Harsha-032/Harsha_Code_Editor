
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OutputShellProps {
  output: string;
  onClear: () => void;
}

export function OutputShell({ output, onClear }: OutputShellProps) {
  return (
    <Card className="h-full w-full flex flex-col rounded-none border-t border-l-0 border-r-0 border-b-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between p-3 border-b flex-shrink-0">
        <CardTitle className="text-base font-semibold">Output</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClear} className="h-7 w-7">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear Output</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-1 relative">
        <ScrollArea className="absolute inset-0">
          <pre
            className={cn(
              "p-4 text-sm font-mono whitespace-pre-wrap",
              !output && "text-muted-foreground"
            )}
          >
            {output || "Code output will appear here when you run it."}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
