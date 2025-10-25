'use client';

import { explainCodeSnippet } from '@/ai/flows/explain-code-snippet';
import { refactorCodeWithAI } from '@/ai/flows/refactor-code-with-ai';
import { suggestCodeOptimizations } from '@/ai/flows/suggest-code-optimizations';
import { generateCodeSnippet } from '@/ai/flows/generate-code-snippet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, FileCode, Lightbulb, Bot } from 'lucide-react';
import React, { useState, useTransition, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

type AIAction = 'explain' | 'refactor' | 'optimize' | 'generate';

const streamingActions: Record<
  string,
  (args: any) => Promise<ReadableStream<any>>
> = {
  explain: explainCodeSnippet,
  refactor: refactorCodeWithAI,
  optimize: suggestCodeOptimizations,
  generate: generateCodeSnippet,
};

interface AiPanelContentProps {
  code: string;
  language: string;
  type: AIAction;
}

export function AiPanelContent({ code, language, type }: AiPanelContentProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isGenerate = type === 'generate';

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [result]);

  const handleAction = async () => {
    startTransition(async () => {
      setResult('');
      const runner = streamingActions[type];
      if (!runner) return;

      let params;
      if (isGenerate) {
        if (!input.trim()) {
          toast({
            title: 'Error',
            description: 'Please enter a description for the code snippet.',
            variant: 'destructive',
          });
          return;
        }
        params = { description: input, language };
      } else {
        if (!code) {
          toast({
            title: 'Error',
            description: 'There is no code to analyze.',
            variant: 'destructive',
          });
          setResult(null);
          return;
        }
        params = { code, language };
      }

      try {
        const stream = await runner(params);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let aiResponse = '';

        const processStream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // The value is already a string, no need to decode
            const chunk = typeof value === 'string' ? value : decoder.decode(value);
            aiResponse += chunk;
            setResult(aiResponse);
          }
        };
        await processStream();
      } catch (error) {
        console.error('Error during AI action:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while communicating with the AI.',
          variant: 'destructive',
        });
        setResult('An error occurred. Please try again.');
      }
    });
  };
  
  const getButtonText = () => {
    switch (type) {
      case 'explain': return 'Explain Code';
      case 'refactor': return 'Refactor Code';
      case 'optimize': return 'Optimize Code';
      case 'generate': return 'Generate Code';
    }
  };
  
  const getButtonIcon = () => {
    switch (type) {
      case 'explain': return <Lightbulb className="mr-2 h-4 w-4" />;
      case 'refactor': return <Wand2 className="mr-2 h-4 w-4" />;
      case 'optimize': return <Bot className="mr-2 h-4 w-4" />;
      case 'generate': return <FileCode className="mr-2 h-4 w-4" />;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAction();
    }
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="prose prose-sm dark:prose-invert max-w-none p-4 space-y-4">
          { isPending && !result ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : result !== null ? (
              <ReactMarkdown>{result}</ReactMarkdown>
            ) : (
              <p className="text-sm text-muted-foreground">
                { isGenerate 
                  ? 'Describe the code you want to generate. The generated code will appear here.'
                  : 'The AI-generated result will appear here.'
                }
              </p>
            )
          }
        </div>
      </ScrollArea>
      <div className="p-2 border-t">
        {isGenerate ? (
           <div className="flex flex-col gap-2">
             <Textarea
                placeholder="e.g., a javascript function to find the max value in an array"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-16"
                rows={3}
                disabled={isPending}
             />
             <Button
                onClick={handleAction}
                disabled={isPending}
                className="w-full"
              >
                {getButtonIcon()}
                {isPending ? 'Generating...' : getButtonText()}
              </Button>
           </div>
        ) : (
          <Button onClick={handleAction} disabled={isPending} className="w-full">
            {getButtonIcon()}
            {isPending ? 'Generating...' : getButtonText()}
          </Button>
        )}
      </div>
    </div>
  );
}
