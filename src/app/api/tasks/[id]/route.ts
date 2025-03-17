import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 📖 Obtiene una tarea específica por su ID
 * 
 * @param request - Solicitud HTTP
 * @param params - Parámetros de la ruta que contienen el ID de la tarea
 * @returns La tarea solicitada o un mensaje de error
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(params.id) },
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * 🔄 Actualiza una tarea existente
 * 
 * @param request - Solicitud HTTP con los datos actualizados
 * @param params - Parámetros de la ruta que contienen el ID de la tarea
 * @returns La tarea actualizada o un mensaje de error
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let title, description, completed;
    try {
      const body = await request.json();
      title = body.title;
      description = body.description;
      completed = body.completed;
    } catch (e) {
      return NextResponse.json({ error: 'Cuerpo de solicitud JSON inválido' }, { status: 400 });
    }

    if (!title || !description || completed === undefined) {
      return NextResponse.json({ error: 'Título, descripción y completado son obligatorios' }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(params.id) },
      data: { title, description, completed },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * 🗑️ Elimina una tarea específica
 * 
 * @param request - Solicitud HTTP
 * @param params - Parámetros de la ruta que contienen el ID de la tarea a eliminar
 * @returns Respuesta vacía con código 204 o un mensaje de error
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(params.id) },
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    await prisma.task.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}