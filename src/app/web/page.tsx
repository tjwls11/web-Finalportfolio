import Image from 'next/image'
import React from 'react'

export default function WebPage() {
  const folders = [
    {
      name: 'test',
      github: 'https://github.com/tjwls11/test-1',
      page: 'https://test-1-henna-xi.vercel.app/',
      image: '/test.png',
    },

    {
      name: 'hcjdemo',
      github: 'https://github.com/tjwls11/hcjdemo-2024-1',
      page: 'https://hcjdemo-2024-1-steel.vercel.app/',
      image: '/hcjdemo.png',
    },
    {
      name: 'clierk-api',
      github: 'https://github.com/tjwls11/clierk-api',
      page: 'https://clierk-api.vercel.app/',
      image: '/clierk-api.png',
    },
    {
      name: 'crud',
      github: 'https://github.com/tjwls11/mongo-CRUD',
      page: 'https://mongo-crud-psi.vercel.app/',
      image: '/crud.png',
    },
    {
      name: 'crud - action',
      github: 'https://github.com/tjwls11/mongo-crud-action',
      page: 'https://mongo-crud-action-nu.vercel.app/',
      image: '/crud-action.png',
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mt-11 pt-8 mb-5">
        웹서버보안프로그래밍 수업시간에 실습한 내용입니다
      </h1>
      <div className="text-center mb-11 pb-11">
        <a href="https://web-portfolio-zeta-mauve.vercel.app/">
          <button className="bg-gray-900 text-white px-4 py-2 rounded mr-2">
            중간고사 포트폴리오
          </button>
        </a>
        <a href="https://goyanghub.vercel.app/" className="mr-2">
          <button className="bg-gray-900 text-white px-4 py-2 rounded">
            중간고사 팀프로젝트
          </button>
        </a>
        <a href="https://goyanghub.vercel.app/">
          <button className="bg-gray-900 text-white px-4 py-2 rounded">
            기말고사 팀프로젝트
          </button>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto px-4 mt-11 pt-4">
        {folders.map((folder) => (
          <div
            key={folder.name}
            className="bg-white border border-gray-300 rounded-lg m-4 mb-8 p-5"
          >
            <h2 className="text-2xl text-center font-semibold text-blue-950 m-6 overflow-hidden">
              {folder.name}
            </h2>
            <Image
              src={folder.image}
              alt={folder.name}
              width={500}
              height={400}
              className="rounded-lg mb-4 shadow-lg"
            />
            <div className="text-center mt-9 mb-6">
              <a
                href={folder.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mr-4"
              >
                GitHub
              </a>
              <a
                href={folder.page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Page
              </a>
            </div>
          </div>
        ))}
        <p className="mb-10 pb-4"></p>
      </div>
    </div>
  )
}
