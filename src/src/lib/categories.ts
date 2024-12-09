import { Category } from '@/types/categories';

export async function getCategories(): Promise<Category[]> {
	try {
		const categories: Category[] = [
			{ id: 'tropical', name: 'Tropical' },
			{ id: 'succulent', name: 'Succulent' },
			{ id: 'herb', name: 'Herb' },
			{ id: 'flowering', name: 'Flowering' },
			{ id: 'foliage', name: 'Foliage' },
		];

		return categories;
	} catch (error) {
		console.error('Error fetching categories', error);
		return [];
	}
}
