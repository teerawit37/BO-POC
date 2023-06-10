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
import RuleContent from '@/components/rule-content'

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

interface RuleItem {
    number: string,
    limitTopTree: number,
    limitTodd: number,
    limitBottomTree: number,
    limitTopTwo: number,
    limitBottomTwo: number,
}

export default function Rule() {
    const [open, setOpen] = useState(false)
    const [value, onChange] = useState<Value>(new Date());

    const [activeTab, setActiveTab] = useState<number>(1);

    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };
    
    return (
        <Layout>
            <div className='p-6 w-full overflow-auto'>
                <div className='flex justify-between mb-4'>
                    <div className='text-2xl font-bold'>RULE</div>
                </div>
                <div className="flex flex-col">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                className={`${activeTab === 1
                                    ? 'border-b-2 border-indigo-500 text-indigo-500'
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } py-2 px-4 font-medium focus:outline-none`}
                                onClick={() => handleTabClick(1)}
                            >
                                3 ตัวบน
                            </button>
                            <button
                                className={`${activeTab === 2
                                    ? 'border-b-2 border-indigo-500 text-indigo-500'
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } py-2 px-4 font-medium focus:outline-none`}
                                onClick={() => handleTabClick(2)}
                            >
                                โต๊ด
                            </button>
                            <button
                                className={`${activeTab === 3
                                    ? 'border-b-2 border-indigo-500 text-indigo-500'
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } py-2 px-4 font-medium focus:outline-none`}
                                onClick={() => handleTabClick(3)}
                            >
                                3 ตัวล่าง
                            </button>
                            <button
                                className={`${activeTab === 4
                                    ? 'border-b-2 border-indigo-500 text-indigo-500'
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } py-2 px-4 font-medium focus:outline-none`}
                                onClick={() => handleTabClick(4)}
                            >
                                2 ตัวบน
                            </button>
                            <button
                                className={`${activeTab === 5
                                    ? 'border-b-2 border-indigo-500 text-indigo-500'
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } py-2 px-4 font-medium focus:outline-none`}
                                onClick={() => handleTabClick(5)}
                            >
                                2 ตัวล่าง
                            </button>
                        </div>
                    </div>
                    <div className="py-4">
                        {activeTab === 1 &&
                            <RuleContent point={3}></RuleContent>
                        }
                        {activeTab === 2 &&
                            <RuleContent point={3}></RuleContent>
                        }
                        {activeTab === 3 &&
                            <RuleContent point={3}></RuleContent>
                        }
                        {activeTab === 4 &&
                            <RuleContent point={2}></RuleContent>
                        }
                        {activeTab === 5 &&
                            <RuleContent point={2}></RuleContent>
                        }
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className='p-2'>
                    <div className='py-6'>
                        <div className='flex text-4xl'>เพิ่มผลประกาศรางวัล</div>
                        <div className='flex mt-4'>
                            <div className='flex me-2 text-xl w-[120px]'>งวดที่เท่าไร</div>
                            <DatePicker onChange={onChange} value={value} />

                        </div>

                        <div className='flex mt-4'>
                            <div className='flex me-2 text-xl w-[120px]'>3 ตัวบน</div>
                            <div className='flex flex-col'>
                                <input
                                    id="toptree"
                                    type="text"
                                    onChange={(e) => console.log('test')}
                                    className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* filter top spending | split 2number and tree number | show balance for seller | active tabs */}
                {/* แจกแจงส่วนลด เลขอั้นไม่นับรวมกับส่วนลดทั้งหมด แยกเสมอ | ซื้อเสร็จมี CRM กับลูกค้าหน่อย ซื้ออีกนะ หรือชักชวนเพื่อมาซื้อ*/}

                {/* แยก tabs เลขสามตัวบน สามตัวล่าง โต๊ด สองตัวบน สองตัวล่าง ผลรวม dashboard */}
                {/* อั้น + ปิดรับ + สรุปผล ตีออก แยก tabs */}

                {/* rule 1 (รับส่วนลด) / rule 2 (ไม่รับส่วนลด)=ยอดซื้อรวมแต่ละตัวเลข
                tabs 2 ตัวบน
                ยอดซื้อรวม 2 ตัวบน
                00  ยอดซื้อ=2000  ยอดอั้น=1000  ปิดรับ  */}
            </Modal>
        </Layout>
    )
}
