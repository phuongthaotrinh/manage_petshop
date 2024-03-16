import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const privatePaths = ['/']
const authPaths = ['/signin', '/signup']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookieStore = cookies();

    const { pathname } = request.nextUrl
    const sessionToken = request.cookies.get('sessionToken')?.value

    // Đăng nhập rồi thì không cho vào login/register nữa
    if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/signin', '/signup']
}