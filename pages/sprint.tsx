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

interface Sprint {
  sprintdate: string;
  toptree: string;
  bottomtree: string;
  todd: string;
  toptwo: string;
  bottomtwo: string;
}

export default function Sprint() {
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [open, setOpen] = useState(false)
  const [value, onChange] = useState<Value>(new Date());
  const [topTree, setToptree] = useState<string>('')
  const [bottomTree1, setBottomtree1] = useState<string>('')
  const [bottomTree2, setBottomtree2] = useState<string>('')
  const [bottomTree3, setBottomtree3] = useState<string>('')
  const [bottomTree4, setBottomtree4] = useState<string>('')
  const [todd1, setTodd1] = useState<string>('')
  const [todd2, setTodd2] = useState<string>('')
  const [todd3, setTodd3] = useState<string>('')
  const [todd4, setTodd4] = useState<string>('')
  const [todd5, setTodd5] = useState<string>('')
  const [todd6, setTodd6] = useState<string>('')
  const [topTwo, setToptwo] = useState<string>('')
  const [bottomTwo, setBottomTwo] = useState<string>('')

  const handleChange = (stateName: string, value: string) => {
    switch (stateName) {
      case 'topTree':
        setToptree(value);
        break;
      case 'bottomTree1':
        setBottomtree1(value);
        break;
      case 'bottomTree2':
        setBottomtree2(value);
        break;
      case 'bottomTree3':
        setBottomtree3(value);
        break;
      case 'bottomTree4':
        setBottomtree4(value);
        break;
      case 'todd1':
        setTodd1(value);
        break;
      case 'todd2':
        setTodd2(value);
        break;
      case 'todd3':
        setTodd3(value);
        break;
      case 'todd4':
        setTodd4(value);
        break;
      case 'todd5':
        setTodd5(value);
        break;
      case 'todd6':
        setTodd6(value);
        break;
      case 'topTwo':
        setToptwo(value);
        break;
      case 'bottomTwo':
        setBottomTwo(value);
        break;
      default:
        break;
    }
  };

  const combineText1 = () => {
    const combined = `${todd1},${todd2},${todd3},${todd4},${todd5},${todd6}`;
    return combined;
  };

  const combineText2 = () => {
    const combined = `${bottomTree1},${bottomTree2},${bottomTree3},${bottomTree4}`;
    return combined;
  };

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





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = value;
    if (!(date instanceof Date)) {
      console.log('Invalid date');
      return;
    }

    const formattedDate = format(date, 'MM/dd/yyyy');
    const data = {
      date: formattedDate,
      toptree: topTree,
      bottomtree: combineText2(),
      todd: combineText1(),
      toptwo: topTwo,
      bottomtwo: bottomTwo
    };

    try {
      const response = await fetch('http://localhost:8080/api/sprint/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        fetchSprints();
        // ส่วนประมวลผลเมื่อสำเร็จ
      } else {
        console.log('เกิดข้อผิดพลาดในการส่งข้อมูล:', response.status);
      }
    } catch (error) {
      console.log('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
    }
  };



  return (
    <Layout>
      <div className='p-6 w-full'>
        <div className='flex justify-between'>
          <div className='text-2xl font-bold'>DASHBOARD</div>
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
                      <th scope="col" className="px-6 py-4">3 ตัวบน</th>
                      <th scope="col" className="px-6 py-4">3 ตัวล่าง</th>
                      <th scope="col" className="px-6 py-4">โต๊ด</th>
                      <th scope="col" className="px-6 py-4">2 ตัวบน</th>
                      <th scope="col" className="px-6 py-4">2 ตัวล่าง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprints.length > 0 && (
                      sprints.map(item => (
                        <tr
                        key={item.sprintdate}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{item.sprintdate}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.toptree}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.todd}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.bottomtree}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.toptwo}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.bottomtwo}</td>
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
                  onChange={(e) => handleChange('topTree', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='flex me-2 text-xl w-[120px]'>3 ตัวล่าง</div>
              <div className='class="grid grid-rows-2 gap-4"'>
                <input
                  id="bottomtree1"
                  type="text"
                  onChange={(e) => handleChange('bottomTree1', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="bottomtree2"
                  type="text"
                  onChange={(e) => handleChange('bottomTree2', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="bottomtree3"
                  type="text"
                  onChange={(e) => handleChange('bottomTree3', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="bottomtree4"
                  type="text"
                  onChange={(e) => handleChange('bottomTree4', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='flex me-2 text-xl w-[120px]'>โต๊ด</div>
              <div className='class="grid grid-rows-1 gap-4"'>
                <input
                  id="todd1"
                  type="text"
                  onChange={(e) => handleChange('todd1', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="todd2"
                  type="text"
                  onChange={(e) => handleChange('todd2', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="todd3"
                  type="text"
                  onChange={(e) => handleChange('todd3', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="todd4"
                  type="text"
                  onChange={(e) => handleChange('todd4', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="todd5"
                  type="text"
                  onChange={(e) => handleChange('todd5', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  id="todd6"
                  type="text"
                  onChange={(e) => handleChange('todd6', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='flex me-2 text-xl w-[120px]'>2 ตัวบน</div>
              <div className='flex flex-col'>
                <input
                  id="toptwo"
                  type="text"
                  onChange={(e) => handleChange('topTwo', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='flex me-2 text-xl w-[120px]'>2 ตัวล่าง</div>
              <div>
                <input
                  id="bottomtwo"
                  type="text"
                  onChange={(e) => handleChange('bottomTwo', e.target.value)}
                  className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className='cursor-pointer button-text text-white bg-primary relative flex justify-center rounded py-3 px-4 hover:bg-primary hover:opacity-75' onClick={handleSubmit}>เพิ่มผลประกาศรางวัล</div>
        </div>
      </Modal>
    </Layout>
  )
}
