import { Check } from "lucide-react";
import { type NextPage } from "next";
import { useRef, useState } from "react";
import { PostView } from "~/components/postView";
import { api } from "~/utils/api";

const AdminPage: NextPage = () => {
  const createPostMutation = api.posts.add.useMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const insertTab = () => {
    const current = textAreaRef.current;

    if (!current) return;

    const start = current.selectionStart;
    const end = current.selectionEnd;

    current.value =
      current.value.substring(0, start) + "\t" + current.value.substring(end);

    current.selectionStart = current.selectionEnd = start + 1;
  };

  return (
    <div className="flex w-full flex-row gap-x-8">
      <div className="flex w-1/3 flex-col gap-y-2">
        <input
          className="rounded-lg border border-background-accent bg-background p-2 outline-none"
          placeholder="Введите заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          ref={textAreaRef}
          className="rounded-lg border border-background-accent bg-background p-2 outline-none"
          placeholder="Введите текст поста"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Tab") return;
            e.preventDefault();
            insertTab();
          }}
        />
        <input
          className="rounded-lg border border-background-accent bg-background p-2 outline-none"
          placeholder="Введите Access Token"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />
        <button
          className="flex flex-row justify-center gap-x-2 rounded-lg border border-background-accent p-2 outline-none transition-all hover:bg-background-accent"
          onClick={async () => {
            await createPostMutation.mutateAsync({
              title,
              content,
              accessToken,
            });

            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 5000);
          }}
        >
          {isAdded && <Check className="text-green-500" />}
          <span className="font-semibold">Опубликовать пост</span>
        </button>
      </div>
      <div className="flex w-2/3 flex-col overflow-y-auto">
        <PostView post={{ title, content, createdAt: new Date() }} />
      </div>
    </div>
  );
};

export default AdminPage;
