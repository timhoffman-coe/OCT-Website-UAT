import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-sans text-4xl font-bold text-dark-blue mt-10 mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-sans text-3xl font-bold text-dark-blue mt-10 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-sans text-2xl font-semibold text-dark-blue mt-8 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-sans text-xl font-semibold text-dark-blue mt-6 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-text-dark leading-relaxed mb-6 text-lg">{children}</p>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-process-blue hover:text-primary-blue underline transition-colors">
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-text-dark text-lg">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-text-dark text-lg">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-process-blue pl-6 my-6 text-text-secondary italic text-lg">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={`block bg-structural-light-gray rounded-lg p-4 mb-6 text-sm overflow-x-auto font-mono ${className}`}>
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-structural-light-gray px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-structural-light-gray rounded-lg p-4 mb-6 overflow-x-auto">{children}</pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-left">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-structural-light-gray">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="font-sans font-semibold text-dark-blue px-4 py-3 border-b-2 border-structural-gray-blue">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-structural-gray-blue text-text-dark">{children}</td>
          ),
          hr: () => (
            <hr className="my-8 border-structural-gray-blue" />
          ),
          img: ({ src, alt }) => (
            <figure className="my-8">
              <img src={src} alt={alt || ""} className="w-full rounded-lg" />
              {alt && <figcaption className="text-text-secondary text-sm mt-2 text-center">{alt}</figcaption>}
            </figure>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-dark-blue">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
