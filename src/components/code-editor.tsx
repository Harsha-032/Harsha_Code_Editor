
'use client';

import type { editor } from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const { theme } = useTheme();

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
  ) => {
    editor.focus();
  };

  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  return (
    <div className="relative h-full w-full flex-1 overflow-hidden bg-card">
      <MonacoEditor
        height="100%"
        language={language}
        theme={editorTheme}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        loading={<Skeleton className="h-full w-full" />}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: {
            top: 80, 
            bottom: 80,
          },
        }}
      />
    </div>
  );
}
