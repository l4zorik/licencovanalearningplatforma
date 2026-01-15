// Temporarily disabled due to Prisma setup issues
export async function GET() {
  return new Response(JSON.stringify([]), { status: 200 })
}

export async function POST() {
  return new Response(JSON.stringify({}), { status: 200 })
}