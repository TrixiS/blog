import { Post } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { PostView } from "~/components/postView";
import { prisma } from "~/server/db";

const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  return <PostView post={post} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const stringPostId = ctx.params?.id;
  const redirect: Awaited<ReturnType<GetServerSideProps>> = {
    redirect: { destination: "/", permanent: false },
    props: {},
  };

  if (typeof stringPostId !== "string") return redirect;

  const postId = parseInt(stringPostId);

  if (Number.isNaN(postId)) return redirect;

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) return redirect;

  return { props: { post } };
};

export default PostPage;
