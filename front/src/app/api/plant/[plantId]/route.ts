import { deletePlant } from '@/lib/plants';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ plantId: string }> }) {
	try {
		const { plantId } = await params;

		const plant = await deletePlant(plantId);

		if (plant?.error) {
			return NextResponse.json({ error: plant.error }, { status: plant.status || 500 });
		}

		return NextResponse.json(plant, { status: 200 });
	} catch (err) {
		console.error('Error deleting plant:', err);
		return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
}
