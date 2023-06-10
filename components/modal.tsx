interface Props {
    className?: string;
    children?: any;
    open: boolean;
    onClose: () => void;
  }

export default function Modal( props: Props ) {
    return (
        <div className={`fixed inset-0 ${props.open ? '' : 'pointer-events-none'}`}>
            {/* backdrop */}
            <div 
                className={`fixed inset-0 bg-black ${props.open ? 'opacity-50' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`} 
               onClick={props.onClose} 
            />

            {/* content */}
            <div className={`bg-gray-04  fixed right-0 h-full bg-white shadow-lg w-full max-w-screen-sm p-4 ${props.open ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`}>
                <div>
                    <button onClick={props.onClose}>CLOSE</button>
                </div>
                { props.children }
            </div>
        </div>
    )
}