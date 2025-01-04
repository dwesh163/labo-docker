import { Plant } from '@/types/plant';
import { PlantCard } from '@/components/ui/plant-card';

interface PlantGridProps {
	plants: Plant[];
}

export function PlantGrid({ plants }: PlantGridProps) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{plants.map((plant, index) => (
				<PlantCard key={'plant' + index} plant={plant} />
			))}
		</div>
	);
}
