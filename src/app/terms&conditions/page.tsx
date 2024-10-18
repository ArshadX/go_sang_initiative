"use client";
import TermsAndConditions from '@/components/terms&conditions/TermsAndConditions';
import Head from 'next/head';

const Page = () => {
  return (
    <div>
      <Head>
        <title>Car Pooling and Bike Sharing</title>
        <meta name="description" content="Car pooling and bike sharing services FAQ" />
      </Head>
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
       <TermsAndConditions/>
      </main>
    </div>
  );
};

export default Page;
