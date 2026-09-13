import { auth } from '@clerk/nextjs/server'
import { connectDB } from '../../lib/mongodb'
import Watchlist from '../../models/Watchlist'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 })
    return Response.json({ success: true, data: items })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    const existing = await Watchlist.findOne({ userId, malId: body.malId })
    if (existing) {
      return Response.json({ success: false, error: 'Already in watchlist' }, { status: 400 })
    }

    const item = await Watchlist.create({ ...body, userId })
    return Response.json({ success: true, data: item }, { status: 201 })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { searchParams } = new URL(request.url)
    const malId = searchParams.get('malId')

    await Watchlist.deleteOne({ userId, malId: Number(malId) })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}