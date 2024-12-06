import mongoose from 'mongoose'

export default async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('몽고디비에 연결되었습니다')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

// connectToDB 함수 추가
export async function connectToDB() {
  return connectMongoDB()
}
