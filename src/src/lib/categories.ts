import { Category } from '@/types/categories';

export async function getCategories(): Promise<Category[]> {
	const categories: Category[] = [
		{ id: 'tropical', name: 'Tropical' },
		{ id: 'succulent', name: 'Succulent' },
		{ id: 'herb', name: 'Herb' },
		{ id: 'flowering', name: 'Flowering' },
		{ id: 'foliage', name: 'Foliage' },
	];

	return categories;
}
