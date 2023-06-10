import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import DashboardMenuIcon from '@/components/svgs/dashboard-menu-icon'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import Modal from '@/components/modal'
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';

const inter = Inter({ subsets: ['latin'] })

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Profile {
  user_id: string;
  name: string;
  phone: string;
  bank_number: string;
  bank_name: string;
}

export default function User() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [open, setOpen] = useState(false)
  const [value, onChange] = useState<Value>(new Date());
  const [status, setStatus] = useState<string>('')

  const fetchSprints = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/profile/getall');

      if (response.ok) {
        const data: Profile[] = await response.json();
        console.log(data)
        setProfiles(data);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  return (
    <Layout>
      <div className='p-6 w-full'>
        <div className='flex justify-between'>
          <div className='text-2xl font-bold'>ORDER</div>
          {/* <div className='cursor-pointer button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75' onClick={() => setOpen(true)}>ประกาศผล</div> */}
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">user_id</th>
                      <th scope="col" className="px-6 py-4">ชื่อลูกค้า</th>
                      <th scope="col" className="px-6 py-4">เบอร์โทร</th>
                      <th scope="col" className="px-6 py-4">ธนาคาร</th>
                      <th scope="col" className="px-6 py-4">เลขบัญชี</th>
                      <th scope="col" className="px-6 py-4">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.length > 0 && (
                      profiles.map(item => (
                        <tr
                          key={item.user_id}
                          className="border-b transition duration-300 ease-in-out dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4">{item.user_id}</td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{item.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.bank_name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.bank_number}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                          <div className='flex justify-center cursor-pointer button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75' onClick={() => setOpen(true)}>waiting</div>
                            </td>
                        </tr>
                      )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
