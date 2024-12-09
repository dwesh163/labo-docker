'use client';

import { Plant } from '@/types/plant';
import { PlantCard } from '@/components/ui/plant-card';
import { PlantListItem } from '@/components/ui/plant-list-item';

interface EmptyState {
	icon: React.ReactNode;
	title: string;
	description: string;
}

interface PlantCollectionProps {
	plants: Plant[];
	view: 'grid' | 'list';
	emptyState: EmptyState;
}

export function PlantCollection({ plants, view, emptyState }: PlantCollectionProps) {
	if (plants.length === 0) {
		return (
			<div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
				{emptyState.icon}
				<h3 className="mt-4 text-lg font-semibold">{emptyState.title}</h3>
				<p className="mt-2 text-sm text-muted-foreground">{emptyState.description}</p>
			</div>
		);
	}

	if (view === 'list') {
		return (
			<div className="space-y-4">
				{plants.map((plant) => (
					<PlantListItem key={plant.id} plant={plant} />
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{plants.map((plant) => (
				<PlantCard key={plant.id} plant={plant} />
			))}
		</div>
	);
}
