import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ ok: true, service: 'fxc-bills', timestamp: new Date().toISOString() })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function HEAD() {
  return new Response(null, { status: 204 })
}
