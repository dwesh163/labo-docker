import { Category } from '@/types/categories';

export async function getCategories(): Promise<Category[]> {
	try {
		const response = await fetch('http://postg-rest:3000/categories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			let errorMessage = 'Unknown error';
			try {
				const errorData = await response.json();
				errorMessage = errorData.message || JSON.stringify(errorData);
			} catch {
				errorMessage = response.statusText;
			}

			console.error(`Error fetching categories: ${errorMessage}`);
			return [];
		}

		const categories = await response.json();
		return Array.isArray(categories) ? categories : [];
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
}
