import '@/styles/globals.css'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
