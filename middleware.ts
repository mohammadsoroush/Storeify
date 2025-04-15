import { NextResponse } from 'next/server';

export function middleware(req:any) {
  console.log('✅ MIDDLEWARE WORKS WITHOUT AUTH!');
  return NextResponse.next();
}
