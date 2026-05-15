import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { validateIdeaFields, validateFile } from '@/lib/validation';

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'submitter') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const ideas = await prisma.idea.findMany({
    where: { submitterId: user.id },
    include: { attachments: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ ideas });
}

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'submitter') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const formData = await req.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const categoryData = formData.get('categoryData') as string | null;
  const isDraft = formData.get('isDraft') === 'true';
  const draftId = formData.get('draftId') as string | null;

  if (!isDraft) {
    const fieldError = validateIdeaFields({ title, description, category });
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 });
  } else {
    if (!title?.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const files = formData.getAll('files') as File[];
  const validFiles = files.filter((f) => f && f.size > 0);

  const uploadDir = join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });

  const attachmentDataList: { fileName: string; filePath: string; fileType: string; fileSize: number }[] = [];

  for (const file of validFiles) {
    const fileError = validateFile({ type: file.type, size: file.size });
    if (fileError) return NextResponse.json({ error: fileError }, { status: 400 });

    const uniqueName = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const uploadPath = join(uploadDir, uniqueName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(uploadPath, buffer);

    attachmentDataList.push({
      fileName: file.name,
      filePath: `uploads/${uniqueName}`,
      fileType: file.type,
      fileSize: file.size,
    });
  }

  // If updating an existing draft
  if (draftId) {
    const existing = await prisma.idea.findUnique({ where: { id: draftId } });
    if (!existing || existing.submitterId !== user.id) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    const idea = await prisma.idea.update({
      where: { id: draftId },
      data: {
        title: title.trim(),
        description: description?.trim() ?? '',
        category: category as 'TECHNICAL_INNOVATION' | 'PROCESS_IMPROVEMENT' | 'CLIENT_SOLUTION' | 'OTHER',
        categoryData: categoryData ?? null,
        isDraft,
        ...(attachmentDataList.length > 0 && {
          attachments: { create: attachmentDataList },
        }),
      },
      include: { attachments: true },
    });
    return NextResponse.json(idea, { status: 200 });
  }

  const idea = await prisma.idea.create({
    data: {
      title: title.trim(),
      description: description?.trim() ?? '',
      category: category as 'TECHNICAL_INNOVATION' | 'PROCESS_IMPROVEMENT' | 'CLIENT_SOLUTION' | 'OTHER',
      categoryData: categoryData ?? null,
      isDraft,
      submitterId: user.id,
      ...(attachmentDataList.length > 0 && {
        attachments: { create: attachmentDataList },
      }),
    },
    include: { attachments: true },
  });

  return NextResponse.json(idea, { status: 201 });
}
