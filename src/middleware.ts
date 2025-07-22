import { NextResponse, NextRequest } from 'next/server'
import withAuth from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { Pages, Routes, UserRole } from './app/constants/enums'
export default withAuth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname


  const isAuth = await getToken({ req: request })
  const isAuthPage = pathname.startsWith('/auth')
  const protectedRoute = [Routes.ADMIN, Routes.PROFILE]
  const isProtectedRoute = protectedRoute.some((route) => pathname.startsWith(`/${route}`))
  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
    )
  }
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${Routes.PROFILE}`, request.url)
    )
  }
  if(isAuth && pathname.startsWith(`/${Routes.ADMIN}`) && isAuth.role !== UserRole.ADMIN) {
    return NextResponse.redirect(
      new URL(`/${Routes.PROFILE}`, request.url)
    )
  }
  if (isAuth && pathname.startsWith(`/${Routes.PROFILE}`) && isAuth.role === UserRole.ADMIN) {
    return NextResponse.redirect(
      new URL(`/${Routes.ADMIN}`, request.url)
    )
  }
}, {
  callbacks: {
    authorized() {
      return true;
    },
  },
}
)



export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}