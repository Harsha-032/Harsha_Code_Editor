
'use client';

import { Play, PanelRightOpen, PanelRightClose } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorControlsProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  languages: { value: string; label: string }[];
  isAiPanelOpen: boolean;
  toggleAiPanel: () => void;
}

export function EditorControls({
  language,
  onLanguageChange,
  onRun,
  languages,
  isAiPanelOpen,
  toggleAiPanel,
}: EditorControlsProps) {
  return (
    <TooltipProvider>
      <div className="absolute top-4 right-8 z-20 flex items-center gap-2">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[130px] bg-card/80 backdrop-blur-sm md:w-[150px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleAiPanel} className="hidden md:inline-flex">
              {isAiPanelOpen ? <PanelRightClose /> : <PanelRightOpen />}
              <span className="sr-only">Toggle AI Panel</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle AI Panel</p>
          </TooltipContent>
        </Tooltip>

      </div>
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onRun} size="icon" className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105">
              <Play className="h-6 w-6 fill-current" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Run Code (Ctrl+Enter)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
