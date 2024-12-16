'use client';

import { useState } from 'react';
import { Plant } from '@/types/plant';
import { Search } from '@/components/ui/search';
import { Leaf } from 'lucide-react';
import { PlantCategories } from '@/components/plant-categories';
import { PlantCollection } from '@/components/plant-collection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/types/categories';
import { CreatePlantDialog } from './forms/CreatePlant';

export default function HomePage({ plants, plantCategories }: { plants: Plant[]; plantCategories: Category[] }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');

	const filteredPlants = plants.filter((plant) => (selectedCategory === 'all' || plant.category === selectedCategory) && (plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || plant.species.toLowerCase().includes(searchQuery.toLowerCase())));

	return (
		<div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background">
			<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-primary/10 p-2">
								<Leaf className="h-6 w-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold text-primary">HomeBotany</h1>
						</div>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8 space-y-4">
					<h2 className="text-4xl font-bold tracking-tight text-primary">Your Plant Collection</h2>
					<p className="text-muted-foreground">Track and manage your indoor garden with ease.</p>
				</div>

				<div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="w-full sm:w-72">
						<Search value={searchQuery} onChange={setSearchQuery} />
					</div>
					<CreatePlantDialog categoriesData={plantCategories.map((category) => category.name)} />
				</div>

				<PlantCategories plantCategories={plantCategories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

				<Tabs defaultValue="grid" className="mt-8">
					<div className="mb-4 flex items-center justify-between">
						<TabsList className="rounded-full">
							<TabsTrigger value="grid" className="rounded-full">
								Grid View
							</TabsTrigger>
							<TabsTrigger value="list" className="rounded-full">
								List View
							</TabsTrigger>
						</TabsList>
						<p className="text-sm text-muted-foreground">{filteredPlants.length} plants</p>
					</div>

					<TabsContent value="grid" className="mt-6">
						<PlantCollection
							plants={filteredPlants}
							view="grid"
							emptyState={{
								icon: <Leaf className="h-12 w-12 text-primary/50" />,
								title: 'No plants found',
								description: 'Try adjusting your search or category filter.',
							}}
						/>
					</TabsContent>

					<TabsContent value="list" className="mt-6">
						<PlantCollection
							plants={filteredPlants}
							view="list"
							emptyState={{
								icon: <Leaf className="h-12 w-12 text-primary/50" />,
								title: 'No plants found',
								description: 'Try adjusting your search or category filter.',
							}}
						/>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
