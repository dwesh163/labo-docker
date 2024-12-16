import { createPlant } from '@/lib/plants';
import { plantSchema } from '@/types/plant';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const validationResult = plantSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json({ error: 'Invalid request body', details: validationResult.error.errors }, { status: 400 });
		}

		const plant = await createPlant(validationResult.data);

		if (plant.error) {
			return NextResponse.json({ error: plant.error }, { status: plant.status || 500 });
		}

		return NextResponse.json(plant, { status: 201 });
	} catch (err) {
		console.error('Error creating plant:', err);
		return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
}
