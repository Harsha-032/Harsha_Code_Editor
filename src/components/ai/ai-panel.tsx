
'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Wand2, Lightbulb, Bot, FileCode } from 'lucide-react';
import { AiPanelContent } from '@/components/ai/ai-panel-content';

interface AiPanelProps {
  code: string;
  language: string;
}

export function AiPanel({ code, language }: AiPanelProps) {
  return (
    <div className="h-full w-full flex-shrink-0 border-l bg-card/40 p-2 shadow-lg backdrop-blur-sm transition-all duration-300 md:p-4">
      <div className="mb-4 flex flex-col gap-4 rounded-lg border bg-card p-3">
        <div className="flex items-center gap-3">
          <Bot className="h-7 w-7 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">AI Assistant</h2>
        </div>
      </div>
      <Tabs defaultValue="generate" className="flex h-[calc(100%-104px)] flex-col">
        <TabsList className="flex h-auto flex-wrap justify-center bg-card">
          <TabsTrigger value="generate" className="flex items-center gap-2"><FileCode className="h-4 w-4" />Generate</TabsTrigger>
          <TabsTrigger value="explain" className="flex items-center gap-2"><Lightbulb className="h-4 w-4" />Explain</TabsTrigger>
          <TabsTrigger value="refactor" className="flex items-center gap-2"><Wand2 className="h-4 w-4" />Refactor</TabsTrigger>
          <TabsTrigger value="optimize" className="flex items-center gap-2"><Bot className="h-4 w-4" />Optimize</TabsTrigger>
        </TabsList>
        <TabsContent value="generate" className="flex-1 overflow-auto pt-2">
          <AiPanelContent type="generate" code={code} language={language} />
        </TabsContent>
        <TabsContent value="explain" className="flex-1 overflow-auto pt-2">
          <AiPanelContent type="explain" code={code} language={language} />
        </TabsContent>
        <TabsContent value="refactor" className="flex-1 overflow-auto pt-2">
          <AiPanelContent type="refactor" code={code} language={language} />
        </TabsContent>
        <TabsContent value="optimize" className="flex-1 overflow-auto pt-2">
          <AiPanelContent type="optimize" code={code} language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
