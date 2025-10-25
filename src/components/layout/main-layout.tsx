'use client';

import { useEffect, useState, useCallback } from 'react';
import { AiPanel } from '@/components/ai/ai-panel';
import { CodeEditor } from '@/components/code-editor';
import { EditorControls } from '@/components/editor-controls';
import { SidebarContent } from '@/components/sidebar-content';
import { DEFAULT_CODE, LANGUAGES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { OutputShell } from '@/components/output-shell';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { executeCodeSnippet } from '@/ai/flows/execute-code-snippet';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Bot } from 'lucide-react';
import { HarshasEditorLogo } from '@/components/harshas-editor-logo';

export function MainLayout() {
  const [language, setLanguage] = useState(LANGUAGES[0].value);
  const [code, setCode] = useState(DEFAULT_CODE[language]);
  const [output, setOutput] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const savedLang =
      localStorage.getItem('harshas-editor-language') || LANGUAGES[0].value;
    const savedCode =
      localStorage.getItem(`harshas-editor-code-${savedLang}`) ||
      DEFAULT_CODE[savedLang];

    setLanguage(savedLang);
    setCode(savedCode);

    // Default AI panel to closed on smaller screens
    if (window.innerWidth < 768) {
      setIsAiPanelOpen(false);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    const savedCodeForLang = localStorage.getItem(`harshas-editor-code-${lang}`);
    setCode(savedCodeForLang || DEFAULT_CODE[lang]);
    setLanguage(lang);
    localStorage.setItem('harshas-editor-language', lang);
  };

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
      localStorage.setItem(`harshas-editor-code-${language}`, newCode);
    }
  };

  const handleSave = useCallback(() => {
    localStorage.setItem(`harshas-editor-code-${language}`, code);
    toast({
      title: 'Code Saved!',
      description: 'Your code has been saved to local storage.',
    });
  }, [code, language, toast]);

  const handleRun = useCallback(async () => {
    setOutput('Executing code...');
    try {
      const result = await executeCodeSnippet({ code, language });
      setOutput(result.output);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred.';
      toast({
        title: 'Error Running Code',
        description: errorMessage,
        variant: 'destructive',
      });
      setOutput(`An error occurred while executing the code: ${errorMessage}`);
    }
  }, [code, language, toast]);

  const handleClearOutput = () => {
    setOutput('');
  };

  const toggleAiPanel = () => {
    setIsAiPanelOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 's') {
          event.preventDefault();
          handleSave();
        }
        if (event.key === 'Enter') {
          event.preventDefault();
          handleRun();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSave, handleRun]);

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background md:flex-row">
      {/* Mobile Header */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open Sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Sidebar</SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <HarshasEditorLogo className="h-8 w-8 text-primary" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bot />
              <span className="sr-only">Toggle AI Panel</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] p-0 md:hidden">
            <SheetHeader>
              <SheetTitle className="sr-only">AI Assistant</SheetTitle>
            </SheetHeader>
            <AiPanel code={code} language={language} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden w-[72px] flex-shrink-0 border-r transition-all duration-300 md:block">
        <SidebarContent />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={30}>
                <div className="relative h-full">
                  <CodeEditor
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                  />
                  <EditorControls
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    onRun={handleRun}
                    languages={LANGUAGES}
                    isAiPanelOpen={isAiPanelOpen}
                    toggleAiPanel={toggleAiPanel}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle className="hidden md:flex" />
              <ResizablePanel defaultSize={30} minSize={15}>
                <OutputShell output={output} onClear={handleClearOutput} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          {isAiPanelOpen && (
            <>
              <ResizableHandle withHandle className="hidden md:flex" />
              <ResizablePanel
                defaultSize={25}
                maxSize={40}
                minSize={20}
                collapsible
                className="hidden md:block"
              >
                <AiPanel code={code} language={language} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
