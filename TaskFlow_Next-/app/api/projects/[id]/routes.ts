import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET : récupérer un projet par id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return NextResponse.json(
      { error: 'Projet non trouvé' },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}

// PUT : modifier un projet
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await request.json();

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: body.name,
        // ajoute ici d'autres champs si besoin
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: 'Projet non trouvé ou erreur update' },
      { status: 404 }
    );
  }
}

// DELETE : supprimer un projet
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Projet supprimé',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Projet non trouvé' },
      { status: 404 }
    );
  }
}