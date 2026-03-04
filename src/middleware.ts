
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {

  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  console.log("-----------called------------");

  const current_req = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL(`/auth/login?next=${current_req}`, request.url));
  }

  //send to profile
  if (current_req.includes('/profile')) {
    try {
      // Decode and validate the access token
      const { role } = jwtDecode<{ role: 'User' | 'Vendor' }>(accessToken);

      return NextResponse.redirect(new URL(role == "User" ? `/user` : `/vendor`, request.url));

    } catch (error) {
      return NextResponse.redirect(new URL(`/auth/login?next=${current_req}`, request.url));
    }
  }

  //check vendor
  if (current_req.includes('/vendor') || current_req.includes('/post')) {
    try {
      // Decode and validate the access token
      const { role } = jwtDecode<{ role: 'User' | 'Vendor' }>(accessToken);

      if (role !== 'Vendor') {
        return NextResponse.redirect(new URL(`/auth/login?next=${current_req}`, request.url));
      }
      else {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.redirect(new URL(`/auth/login?next=${current_req}`, request.url));
    }
  }

  //check user
  if ((current_req.includes('/user'))) {

    try {
      // Decode and validate the access token
      const { role } = jwtDecode<{ role: 'User' | 'Vendor' }>(accessToken);

      if (role !== 'User') {
        return NextResponse.redirect(new URL(`/auth/login`, request.url));
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
    }
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    // "/profile",
    // "/user/:path*",
    // '/vendor/:path*',
    // '/post/:path*',

    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ],
};
