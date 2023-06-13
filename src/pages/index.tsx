import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Loading } from "~/components/loading";
import { RouterOutputs, api } from "~/utils/api";

const PostPreview: React.FC<{
  post: RouterOutputs["posts"]["getAll"][number];
}> = ({ post }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex h-48 flex-col rounded-lg border border-background-accent p-8 text-foreground-accent transition-all hover:scale-110 hover:bg-background-accent"
    >
      <div className="flex flex-grow flex-col justify-items-center gap-y-2">
        <h2 className="text-2xl font-semibold leading-6 tracking-wide">
          {post.title}
        </h2>
      </div>
      <div>{post.createdAt.toLocaleDateString("RU")}</div>
    </Link>
  );
};

const IndexPage: NextPage = () => {
  const postsQuery = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>TrixiS' Blog</title>
        <meta name="description" content="TrixiS' Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {postsQuery.isLoading ? (
        <Loading>Загружаем посты...</Loading>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {postsQuery.data?.map((post, i) => (
            <PostPreview key={i.toString()} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default IndexPage;
