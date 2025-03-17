import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let title, description;
    try {
      const body = await request.json();
      title = body.title;
      description = body.description;
    } catch (e) {
      return NextResponse.json({ error: 'Cuerpo de solicitud JSON inválido' }, { status: 400 });
    }

    if (!title || !description) {
      return NextResponse.json({ error: 'Título y descripción son obligatorios' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { title, description, completed: false },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

}