import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET!

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl
  const isAuthRoute = pathname.startsWith('/auth')
  const isHomeRoute = pathname === '/'
  const isAboutRoute = pathname === '/about'

  const authCookie = req.cookies.get('auth')?.value

  if (isAuthRoute || isHomeRoute || isAboutRoute) {
    return NextResponse.next()
  }

  if (!authCookie) {
    return NextResponse.redirect(`${origin}/auth`)
  }

  try {
    const { payload } = await jwtVerify(
      authCookie,
      new TextEncoder().encode(JWT_SECRET)
    )

    return NextResponse.next()
  } catch (err) {
    return NextResponse.json(
      { message: 'Unauthorized access' },
      { status: 403 }
    )
  }
}

export const config = {
  matcher: ['/((?!auth|_next/static|_next/image|api/).*?)'],
}
