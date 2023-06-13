import { Post } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("rust", rust);

export type PostContent = Pick<Post, "title" | "content" | "createdAt">;

const Code: React.FC<CodeProps> = ({ node, inline, className, ...rest }) => {
  const language = /language-(\w+)/.exec(className || "");
  const codePadding = inline ? "p-1" : "p-2";

  if (!language)
    return (
      <code
        className={`rounded-md border border-background-accent bg-zinc-900 ${codePadding}`}
        {...rest}
      />
    );

  return (
    <SyntaxHighlighter
      style={oneDark}
      language={language[1]}
      PreTag="div"
      className="syntaxhighlighter"
      showLineNumbers={true}
      useInlineStyles={true}
    >
      {(rest.children as string[]).map((c) => c.trim())}
    </SyntaxHighlighter>
  );
};

export const PostView: React.FC<{
  post: PostContent;
}> = ({ post }) => {
  return (
    <div className="md:w-7/8 flex w-full flex-col self-center lg:w-3/4">
      <div className="mb-8 flex flex-col items-center gap-y-4 border-b border-background-accent pb-8">
        <h1 className="text-center text-4xl font-bold leading-10 tracking-tight text-foreground-accent">
          {post.title}
        </h1>
        <p>{post?.createdAt?.toLocaleDateString("RU")}</p>
      </div>
      <div className="flex flex-col break-words text-lg leading-snug tracking-wide">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
          components={{
            pre: (props) => <pre className="flex flex-col" {...props} />,
            code: Code,
            hr: () => (
              <div className="flex flex-col border-b border-background-accent" />
            ),
            a: (props) => (
              <a
                className="text-blue-500 hover:underline"
                target="_blank"
                {...props}
              />
            ),
            h2: (props) => (
              <h2
                className="text-2xl font-semibold leading-tight tracking-tight text-foreground-accent"
                {...props}
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
