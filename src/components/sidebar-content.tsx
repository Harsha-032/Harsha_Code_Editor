
"use client";

import { HarshasEditorLogo } from '@/components/harshas-editor-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';

export function SidebarContent() {
  return (
    <div className="flex h-full flex-col items-center bg-card/40 backdrop-blur-sm">
      <div className="flex h-16 w-full items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <HarshasEditorLogo className="h-8 w-8 text-primary" />
        </div>
      </div>
      <Separator className="w-full" />
      <div className="flex-1 overflow-y-auto p-4">
        {/* Can add sidebar items here later */}
      </div>
      <Separator className="w-full" />
      <div className="p-4 text-center">
        <div className="flex flex-col items-center gap-4">
           <ThemeToggle />
           <p className="text-xs text-muted-foreground">
            Made by Harsha C &copy; {new Date().getFullYear()}
           </p>
        </div>
      </div>
    </div>
  );
}
