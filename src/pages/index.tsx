import Head from "next/head";
import Link from "next/link";
import Calendar from '@/components/Calendar'


import { api } from "@/utils/api";

export default function Home() {


  return (
    <>
      <Head>
        <title>Entretien téléphonique</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-b from-indigo-300 to-indigo-600">
        <Calendar />
      </main>
    </>
  );
}
