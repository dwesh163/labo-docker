'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/categories';

interface PlantCategoriesProps {
	plantCategories: Category[];
	selectedCategory: string;
	onSelectCategory: (category: string) => void;
}

export function PlantCategories({ plantCategories, selectedCategory, onSelectCategory }: PlantCategoriesProps) {
	return (
		<div className="scrollbar-hide -mx-4 flex space-x-4 overflow-x-auto px-4">
			<Button variant="ghost" size="sm" onClick={() => onSelectCategory('all')} className={cn('whitespace-nowrap', selectedCategory === 'all' && 'bg-primary hover:text-white/90 text-primary-foreground hover:bg-primary/90')}>
				All Plants
			</Button>
			{plantCategories.map((category) => (
				<Button key={category.id} variant="ghost" size="sm" onClick={() => onSelectCategory(category.id)} className={cn('whitespace-nowrap', selectedCategory === category.id && 'bg-primary hover:text-white/90 text-primary-foreground hover:bg-primary/90')}>
					{category.name}
				</Button>
			))}
		</div>
	);
}
