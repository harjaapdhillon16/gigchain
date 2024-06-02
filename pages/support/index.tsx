// pages/support.js
import Head from "next/head";
import SupportForm from "../../components/supportForm";
import DefaultLayout from "@/layouts/default";

const Support = () => {
  return (
    <DefaultLayout>
      <div className="min-h-screen py-12">
        <Head>
          <title>Support Page</title>
          <meta
            name="description"
            content="Support page for users to send queries regarding bugs or issues"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-8">GigChain Support</h1>
          <p className="text-lg mb-8 text-center">
            If you have any issues or queries, please fill out the form below
            and we will get back to you as soon as possible.
          </p>
          <SupportForm />
        </main>
      </div>
    </DefaultLayout>
  );
};

export default Support;
