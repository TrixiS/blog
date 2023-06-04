import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>TrixiS' Blog</title>
        <meta name="description" content="TrixiS' Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
