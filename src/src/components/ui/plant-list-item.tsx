'use client';

import { Plant } from '@/types/plant';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, MapPin, Calendar, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PlantListItemProps {
	plant: Plant;
}

export function PlantListItem({ plant }: PlantListItemProps) {
	return (
		<Card className="flex overflow-hidden transition-all duration-300 hover:shadow-lg">
			<div className="relative h-32 w-32 flex-shrink-0">
				<div className={`absolute right-2 top-2 z-10 h-2 w-2 rounded-full health-status-${plant.healthStatus}`} />
				<img src={plant.image} alt={plant.name} className="object-cover h-32 w-full" />
			</div>
			<div className="flex flex-1 items-center justify-between p-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<h3 className="font-semibold">{plant.name}</h3>
						<Badge className={`category-badge-${plant.category}`}>{plant.category}</Badge>
					</div>
					<p className="text-sm text-muted-foreground">{plant.species}</p>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 text-sm">
							<MapPin className="h-4 w-4 text-primary" />
							<span>{plant.location}</span>
						</div>
						<div className="flex items-center gap-2 text-sm">
							<Droplet className="h-4 w-4 text-primary" />
							<span>{plant.weeklyHydration}</span>
						</div>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="text-destructive">Delete Plant</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</Card>
	);
}
