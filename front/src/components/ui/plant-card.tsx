'use client';

import { Plant } from '@/types/plant';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, MapPin, MoreVertical, Sprout } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

interface PlantCardProps {
	plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
	const router = useRouter();

	const deletePlant = async (plantId: string) => {
		try {
			const response = await fetch(`/api/plant/${plantId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const data = await response.json();
				console.error('Error deleting plant:', data);
				alert('Error deleting plant');
			}

			router.refresh();
		} catch (error) {
			console.error('Network or other error:', error);
			alert('Error deleting plant');
		}
	};

	return (
		<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
			<div className="relative aspect-square overflow-hidden">
				<div className={`absolute right-2 top-2 z-10 h-3 w-3 rounded-full health-status-${plant.healthStatus}`} />
				<img src={plant.image} alt={plant.name} className="object-cover w-full h-96 transition-transform duration-300 group-hover:scale-105" />
				<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="h-8 w-8">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem className="text-destructive">
								<Button variant={'ghost'} onClick={() => deletePlant(plant.id as string)}>
									Delete Plant
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<CardHeader className="space-y-2 bg-gradient-to-b from-background/50 to-background p-4 pb-0">
				<div>
					<h3 className="font-semibold tracking-tight">{plant.name}</h3>
					<p className="text-sm text-muted-foreground">{plant.species}</p>
				</div>
			</CardHeader>
			<CardContent className="grid gap-2 bg-background/50 p-4">
				<div className="grid grid-cols-2 gap-2">
					<div>
						<div className="flex items-center gap-2 text-sm">
							<MapPin className="h-4 w-4 text-primary" />
							<span>{plant.location}</span>
						</div>
						<div className="flex items-center gap-2 text-sm">
							<Droplet className="h-4 w-4 text-primary" />
							<span>{plant.weeklyHydration}</span>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-2 text-sm">
							<Sprout className="h-4 w-4 text-primary" />
							<span>{plant.category}</span>
						</div>
					</div>
				</div>

				{plant.commentary && <p className="mt-2 text-sm text-muted-foreground">{plant.commentary}</p>}
			</CardContent>
		</Card>
	);
}
