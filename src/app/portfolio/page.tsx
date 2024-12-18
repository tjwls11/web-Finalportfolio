import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          포트폴리오 프로젝트 개발 과정
        </h2>
        <p className="text-lg text-gray-600 text-center mb-16">
          이번 기말 포트폴리오 개발 과정을 소개합니다
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-8 shadow-lg">
          <div>
            <Image
              src="/DB.png"
              alt="몽고디비"
              width={1000}
              height={1000}
              className="w-full object-cover"
            />
          </div>

          <div>
            <Image
              src="/guest.png"
              alt="방명록"
              width={1000}
              height={1000}
              className="w-full object-cover"
            />
          </div>

          <div className="col-span-2 text-center">
            <p className="text-gray-700 leading-relaxed space-y-4 text-lg">
              <span className="block">
                몽고디비를 활용해 저의 포트폴리오에 방명록을 남길 수 있게
                하였습니다
              </span>
              <span className="block">
                수업시간에 실습한 깃허브와 구글 연동 로그인을 활용하여
                로그인하고 방명록을 남길 수 있습니다
              </span>
              <span className="block">
                익명 버튼을 누르면 익명으로 방명록을 남길 수 있습니다
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-8 shadow-lg">
          <div>
            <Image
              src="/web.png"
              alt="웹보안"
              width={1000}
              height={1000}
              className="w-full object-cover justify-center items-center"
            />
          </div>

          <div className="col-span-2 text-center">
            <p className="text-gray-700 leading-relaxed space-y-4 text-lg">
              <span className="block">
                웹서버보안프로그래밍 시간에 실습한 페이지를 정리하였습니다
              </span>
              <span className="block">
                깃허브 페이지와 실제 페이지로 이동할 수 있습니다
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
