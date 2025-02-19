import React, { ForwardedRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownViewerProps {
  content: string;
  contentRef?: ForwardedRef<HTMLDivElement>; // Accepts a forwarded ref
}

interface CustomComponentProps {
  children?: React.ReactNode;
  href?: string;
  inline?: boolean;
  className?: string;
}

// Forwarding ref to correctly pass `contentRef`
const MarkdownViewer = React.forwardRef<HTMLDivElement, MarkdownViewerProps>(
  ({ content }) => {
    const customComponents = {
      h1: ({ children }: CustomComponentProps) => (
        <h1 className='text-2xl font-bold mb-4 mt-6 text-gray-800'>
          {children}
        </h1>
      ),
      h2: ({ children }: CustomComponentProps) => (
        <h2 className='text-xl font-bold mb-3 mt-5 text-gray-800'>
          {children}
        </h2>
      ),
      p: ({ children }: CustomComponentProps) => (
        <p className='mb-4 text-gray-700 leading-relaxed whitespace-pre-line'>
          {children}
        </p>
      ),
      ul: ({ children }: CustomComponentProps) => (
        <ul className='list-disc list-outside mb-4 ml-6 text-gray-700 space-y-1'>
          {children}
        </ul>
      ),
      ol: ({ children }: CustomComponentProps) => (
        <ol className='list-decimal list-outside mb-4 ml-6 text-gray-700 space-y-2'>
          {children}
        </ol>
      ),
      li: ({ children }: CustomComponentProps) => (
        <li className='mb-2 pl-2'>{children}</li>
      ),
      code: ({ inline, className, children }: CustomComponentProps) => {
        const match = /language-(\w+)/.exec(className || '');
        return inline ? (
          <code className='bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-gray-800'>
            {children}
          </code>
        ) : (
          <SyntaxHighlighter
            language={match ? match[1] : 'plaintext'}
            style={vscDarkPlus}
            className='rounded-lg mb-4 whitespace-pre-wrap'>
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      },
      blockquote: ({ children }: CustomComponentProps) => (
        <blockquote className='border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700'>
          {children}
        </blockquote>
      ),
      a: ({ href, children }: CustomComponentProps) => (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:text-blue-800 underline'>
          {children}
        </a>
      ),
      hr: () => <hr className='my-6 border-t border-gray-300' />,
    };

    return (
      <div className='prose prose-lg max-w-none'>
        {/* Markdown Content to be Printed */}
        <div className='p-4 rounded-md shadow-md'>
          <ReactMarkdown components={customComponents} skipHtml>
            {content.trim()}
          </ReactMarkdown>
        </div>
      </div>
    );
  }
);

export default MarkdownViewer;
