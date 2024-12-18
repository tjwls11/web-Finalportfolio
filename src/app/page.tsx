import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'
import GuestbookPreview from './guestbook/preview'
import Github from '@/components/Github'

export default function Home() {
  return (
    <div className="isolate min-h-full bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col justify-center items-center min-h-screen relative animate-slideUp text-center p-4">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
          Hello I&apos;m SeoJin
        </h1>
        <Github />
        <div className="mt-10 flex justify-center">
          <Link
            href="https://github.com/tjwls11"
            className="flex items-center text-sm font-semibold leading-7 text-gray-900 hover:text-blue-600 transition-all duration-200 ease-in-out hover:scale-105"
          >
            <MdArrowForward className="mr-2 transition-transform duration-200 group-hover:translate-x-1" />
            github link
          </Link>
        </div>
      </div>

      {/* 최근 방명록 미리보기 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold  text-center mb-6">최근 방명록</h2>
        <GuestbookPreview />
      </div>
      <div className="text-center mt-8">
        <Link
          href="/guestbook"
          className="inline-flex items-center px-6 py-3 bg-gray-900  text-white font-medium rounded-lg transition-colors duration-200"
        >
          <span>방명록 작성하기</span>
          <MdArrowForward className="ml-2" />
        </Link>
      </div>
    </div>
  )
}
