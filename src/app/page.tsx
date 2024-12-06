import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'
import GuestbookPreview from './guestbook/preview'

export default function Home() {
  return (
    <div className="isolate min-h-full bg-gray-950">
      {/* 배경 위 */}
      <div className="flex flex-col justify-center items-center min-h-screen relative animate-slideUp text-center p-4">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Hello I&apos;m SeoJin
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          안녕하세요 정보보호학과 23학번 백서진입니다
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="https://github.com/tjwls11"
            className="flex items-center text-sm font-semibold leading-7 text-white transition-transform duration-200 transform hover:scale-105"
          >
            <MdArrowForward className="mr-2 transition-transform duration-200 transform hover:translate-x-1" />
            github link
          </Link>
        </div>
      </div>

      {/* 최근 방명록 미리보기 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Messages
        </h2>
        <GuestbookPreview />
      </div>
      <div className="text-center mt-8">
        <Link
          href="/guestbook"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <span>방명록 작성하기</span>
          <MdArrowForward className="ml-2" />
        </Link>
      </div>

      <footer className="bg-gray-900 text-white py-4 mt-10 text-center w-screen">
        <p className="text-sm">중부대학교 92313386 백서진</p>
      </footer>
    </div>
  )
}
