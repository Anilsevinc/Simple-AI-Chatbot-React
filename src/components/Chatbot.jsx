import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export function Chatbot({ text }) {
  return (
    <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        <div className="rounded-full bg-gray-100 border p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
        </div>
      </span>
      <div className="leading-relaxed flex-1 min-w-0 overflow-hidden break-words">
        <span className="block font-bold text-gray-700 mb-1">AI</span>
        <div className="prose prose-sm prose-gray max-w-none break-words">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: '0.5rem 0',
                      borderRadius: '0.375rem',
                      fontSize: '0.8125rem',
                      maxWidth: '100%',
                      overflow: 'auto',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 break-all" {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="my-1">{children}</p>,
              ul: ({ children }) => <ul className="my-2 list-disc pl-4">{children}</ul>,
              ol: ({ children }) => <ol className="my-2 list-decimal pl-4">{children}</ol>,
              strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
