import React from "react";

import Head from "next/head";
import type { NextPageWithLayout } from "~/types/common.types";

const Index: NextPageWithLayout<{}> = () => {
  return (
    <>
      <Head>
        <title>DaftAcademy - WebApp 2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>API Lesson</div>
    </>
  );
};

export default Index;
