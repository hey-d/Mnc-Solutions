import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ message: 'Please fill your name, email and message.' }, { status: 400 });
  }

  const mailto = `mailto:dushyantmanghani@gmail.com?subject=${encodeURIComponent('New inquiry from ' + (body.company || 'website visitor'))}&body=${encodeURIComponent(
    `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company || '-'}\nProject Type: ${body.projectType || '-'}\n\nMessage:\n${body.message}`
  )}`;

  return NextResponse.json({ message: 'Thanks! Your inquiry is ready to be emailed.', mailto });
}
