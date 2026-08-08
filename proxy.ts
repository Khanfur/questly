import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {isLocalhost} from "@/lib/utils";

export function proxy(request: NextRequest) {
    if (!isLocalhost(request.nextUrl.hostname))  {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/component-library',
}