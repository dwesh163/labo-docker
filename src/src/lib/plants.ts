import { Plant } from '@/types/plant';

export async function getPlants(): Promise<Plant[]> {
	const plants: Plant[] = [
		{
			id: '1',
			name: 'Monstera Deliciosa',
			species: 'Monstera',
			image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80',
			location: 'Living Room',
			wateringFrequency: 'Weekly',
			lastWatered: '2024-03-20',
			notes: 'Thriving in bright indirect light',
			category: 'tropical',
			healthStatus: 'healthy',
		},
		{
			id: '2',
			name: 'Peace Lily',
			species: 'Spathiphyllum',
			image: 'https://images.unsplash.com/photo-1521503862198-2ae9a997bbc9?auto=format&fit=crop&q=80',
			location: 'Bedroom',
			wateringFrequency: 'Bi-weekly',
			lastWatered: '2024-03-15',
			notes: 'Droops when needs water',
			category: 'flowering',
			healthStatus: 'needsAttention',
		},
		{
			id: '3',
			name: 'Snake Plant',
			species: 'Sansevieria',
			image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&q=80',
			location: 'Study',
			wateringFrequency: 'Monthly',
			lastWatered: '2024-03-10',
			notes: 'Low maintenance, perfect for low light',
			category: 'succulent',
			healthStatus: 'healthy',
		},
		{
			id: '4',
			name: 'Fiddle Leaf Fig',
			species: 'Ficus lyrata',
			image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
			location: 'Living Room',
			wateringFrequency: 'Weekly',
			lastWatered: '2024-03-18',
			notes: 'Sensitive to changes in environment',
			category: 'foliage',
			healthStatus: 'critical',
		},
	];
	return plants;
}
