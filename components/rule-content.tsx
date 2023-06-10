import { useEffect, useState } from "react"
import Modal from "./modal";

interface RuleItem {
    number: string,
    limitTopTree: number,
    limitTodd: number,
    limitBottomTree: number,
    limitTopTwo: number,
    limitBottomTwo: number,
}

interface Props {
    point: number,
}

export default function RuleContent(props: Props) {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [numberTree, setNumberTree] = useState<RuleItem[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filteredNumbers, setFilteredNumbers] = useState(numberTree);
    const [total, setTotal] = useState<number>(100);

    const [open, setOpen] = useState(false)

    const dataNumber = ['92', '29']

    useEffect(() => {
        numbersThreeDigits();
    }, []);

    useEffect(() => {
        setFilteredNumbers(numberTree);
    }, [numberTree]);

    const numbersThreeDigits = () => {
        const numberResult: RuleItem[] = [];
        const loop = props.point === 2 ? 99 : 999
        for (let i = 0; i <= loop; i++) {
            const number = i.toString().padStart(props.point, '0');

            const data = {
                number: number.toString(),
                limitTopTree: 10000,
                limitTodd: 10000,
                limitBottomTree: 10000,
                limitTopTwo: 0,
                limitBottomTwo: 0,

            }
            numberResult.push(data);
        }
        setNumberTree(numberResult)
    }

    const toggleRow = (rowNumber: number) => {
        const isRowExpanded = expandedRows.includes(rowNumber);
        if (isRowExpanded) {
            setExpandedRows(expandedRows.filter((row: number) => row !== rowNumber));
        } else {
            setExpandedRows([...expandedRows, rowNumber]);
        }
    };
    const handleSearchChange = (e: any) => {
        const searchText = e.target.value;
        setSearchText(searchText);

        // กรองรายการตามข้อความค้นหา
        const filtered = numberTree.filter(item => item.number.includes(searchText));
        setFilteredNumbers(filtered.length > 0 ? filtered : [...numberTree]);
    };
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className="text-xl">ยอดรวม: {0}</div>
                <input
                    id="search"
                    type="text"
                    placeholder='ค้นหา'
                    value={searchText}
                    onChange={handleSearchChange}
                    className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <div className='cursor-pointer button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75' onClick={() => setOpen(true)}>เพิ่มกฏ</div> */}
            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">สถานะ</th>
                                        <th scope="col" className="px-6 py-4">หมายเลข</th>
                                        <th scope="col" className="px-6 py-4">ยอดซื้อ</th>
                                        <th scope="col" className="px-6 py-4">ยอดอั้น</th>
                                        <th scope="col" className="px-6 py-4">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {numberTree.length > 0 && (
                                        filteredNumbers.map((item, row) => (
                                            <>
                                                <tr
                                                    onClick={() => toggleRow(row)}
                                                    key={item.number}
                                                    className="border-b transition duration-300 ease-in-out dark:border-neutral-500 ">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        <div className={`w-5 h-5 rounded-full ${Number(item.limitTodd) > total ? 'bg-primary' : 'bg-secondary'}`}></div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{item.number}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        {total}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        {item.limitTodd}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 flex">
                                                        <button className="me-1 button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75">ปิดรับ</button>
                                                        <button className="me-1 button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75">ตีออก</button>
                                                        <button className="button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75" onClick={() => setOpen(true)}>ตั้งค่า</button>
                                                    </td>
                                                </tr>
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
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className='p-2'>
                    <div className='py-6'>
                        <div className='flex text-4xl'>ตั้งค่า</div>

                        <div className='flex items-center mt-4'>
                            <div className='flex me-2 text-xl w-[120px]'>ยอดอั้น</div>
                            <div className='flex flex-col'>
                                <input
                                    id="toptree"
                                    type="text"
                                    onChange={(e) => console.log('test')}
                                    className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className='flex items-center mt-4'>
                            <div className='flex me-2 text-xl w-[120px]'>ลดเรตจ่าย</div>
                            <div className='flex flex-col'>
                                <input
                                    id="toptree"
                                    type="text"
                                    onChange={(e) => console.log('test')}
                                    className="border border-gray-300 m-2 rounded-md px-4 py-2 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className='w-100 flex items-center justify-end mt-4'>
                            <button className="me-1 button-text text-white bg-primary relative flex rounded py-3 px-4 hover:bg-primary hover:opacity-75">บันทึก</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}