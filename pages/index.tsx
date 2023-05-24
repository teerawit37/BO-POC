import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import DashboardMenuIcon from '@/components/svgs/dashboard-menu-icon'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className='w-80'>B</div>
      <div className='flex-1 bg-purple-400'>C</div>
    </Layout>
  )
}
