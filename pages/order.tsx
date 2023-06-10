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

import img from '../public/image/R.jpg'

const inter = Inter({ subsets: ['latin'] })

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Sprint {
  sprintdate: string;
  toptree: string;
  bottomtree: string;
  todd: string;
  toptwo: string;
  bottomtwo: string;
}

export default function Order() {
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [open, setOpen] = useState(false)
  const [value, onChange] = useState<Value>(new Date());
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (rowNumber: number) => {
    const isRowExpanded = expandedRows.includes(rowNumber);
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((row: number) => row !== rowNumber));
    } else {
      setExpandedRows([...expandedRows, rowNumber]);
    }
  };

  const order = [
    {
      lot: '06/01/2023',
      order: '911SEL00001',
      customer: 't4iiz♾️',
      prize: '600',
      discount: '120',
      total_prize: '480'
    },
  ]

  const fetchSprints = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sprint/all');

      if (response.ok) {
        const data: Sprint[] = await response.json();
        console.log(data)
        setSprints(data);
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
          <div className='cursor-pointer button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75' onClick={() => setOpen(true)}>ประกาศผล</div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">งวด(วันที่ออก)</th>
                      <th scope="col" className="px-6 py-4">เลข order</th>
                      <th scope="col" className="px-6 py-4">ลูกค้า</th>
                      <th scope="col" className="px-6 py-4">จ่าย</th>
                      <th scope="col" className="px-6 py-4">ส่วนลด</th>
                      <th scope="col" className="px-6 py-4">ราคาสุทธิ</th>
                      <th scope="col" className="px-6 py-4">slip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.length > 0 && (
                      order.map((item, row) => (
                        <>
                          <tr
                            onClick={() => toggleRow(row)}
                            key={item.order}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item.lot}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.order}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.customer}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.prize}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.discount}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.total_prize}</td>
                            <td className="whitespace-nowrap px-6 py-4" onClick={() => setOpen(true)}>image</td>
                          </tr>
                          {expandedRows.includes(row) && (
                            <>
                            <tr className="border-b transition duration-300 ease-in-out dark:border-neutral-500 bg-primary text-white">
                              <td className="whitespace-nowrap px-6 py-4">
                                เลข
                              </td>
                              <td className="whitespace-nowrap px-10 py-4">
                                92
                              </td>
                              <td className="whitespace-nowrap px-10 py-4">
                                ยอดซื้อ
                              </td>
                              <td className="whitespace-nowrap px-10 py-4">
                                300
                              </td>
                              <td className="whitespace-nowrap px-10 py-4">
                                ยอดจ่าย
                                {/* {dataNumber.includes(item.number) ? '300' : '0'} */}
                              </td>
                              <td className="whitespace-nowrap px-10 py-4">
                                0
                                {/* {dataNumber.includes(item.number) ? '300' : '0'} */}
                              </td>
                            </tr>
                            <tr className="border-b transition duration-300 ease-in-out dark:border-neutral-500 bg-primary text-white">
                            <td className="whitespace-nowrap px-6 py-4">
                              เลข
                            </td>
                            <td className="whitespace-nowrap px-10 py-4">
                              29
                            </td>
                            <td className="whitespace-nowrap px-10 py-4">
                              ยอดซื้อ
                            </td>
                            <td className="whitespace-nowrap px-10 py-4">
                              300
                            </td>
                            <td className="whitespace-nowrap px-10 py-4">
                              ยอดจ่าย
                              {/* {dataNumber.includes(item.number) ? '300' : '0'} */}
                            </td>
                            <td className="whitespace-nowrap px-10 py-4">
                              0
                              {/* {dataNumber.includes(item.number) ? '300' : '0'} */}
                            </td>
                          </tr>
                          </>
                          )}
                        </>
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='p-2'>
          <Image src={img} alt="ground" />
        </div>
      </Modal>
    </Layout>
  )
}
