import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

export default function Home() {
  return (
    <div className="w-full h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    {/* Header */}
    <Header />
    {/* Feed */}
    <Feed />
     {/* Modal */}
    <Modal />
    </div>
  )
}
