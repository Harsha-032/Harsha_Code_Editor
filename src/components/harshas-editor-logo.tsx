
import type { SVGProps } from 'react';

export function HarshasEditorLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16">
        <path d="M88,192L88,64" />
        <path d="M168,192L168,64" />
        <path d="M88,128L168,128" />
        <rect width="192" height="192" x="32" y="32" rx="8" stroke="none" fill="currentColor" fillOpacity="0.1" />
      </g>
    </svg>
  );
}
