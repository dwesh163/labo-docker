import { ErrorType } from '@/types/error';
import { Plant } from '@/types/plant';

export async function getPlants(): Promise<Plant[]> {
	try {
		const response = await fetch('http://postg-rest:3000/get_plants', {
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

			console.error(`Error fetching plants: ${errorMessage}`);
			return [];
		}

		const plants = await response.json();
		return plants.map((plant: any) => ({
			id: plant.id,
			name: plant.name,
			species: plant.species,
			category: plant.categories,
			image: plant.image_url,
			location: plant.position_in_house,
			weeklyHydration: plant.weekly_hydration,
			age: plant.age,
			commentary: plant.commentary,
		}));
	} catch (error) {
		console.error('Error fetching plants', error);
		return [];
	}
}

export async function createPlant(plant: Plant): Promise<ErrorType> {
	try {
		const response = await fetch('http://postg-rest:3000/rpc/add_plant', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_name: plant.name,
				_species: plant.species,
				_categories: plant.category,
				_position_in_house: plant.location,
				_birthdate: plant.birthdate,
				_image_url: plant.image,
				_weekly_hydration: plant.weeklyHydration,
				_commentary: plant.commentary,
			}),
		});

		if (!response.ok) {
			const data = await response.json();
			console.error('Error creating plant:', data);

			return {
				error: 'Server error',
				status: response.status,
			};
		}

		return {
			error: '',
			status: 201,
		};
	} catch (error) {
		console.error('Network or other error:', error);
		return {
			error: 'Server error',
			status: 500,
		};
	}
}

export async function deletePlant(plantId: string): Promise<ErrorType> {
	try {
		const response = await fetch(`http://postg-rest:3000/plants?id=eq.${plantId}`, {
			method: 'DELETE',
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

			console.error(`Error deleting plant: ${errorMessage}`);
			return {
				error: errorMessage,
				status: response.status,
			};
		}

		return {
			error: '',
			status: 200,
		};
	} catch (error) {
		console.error('Network or other error:', error);
		return {
			error: 'Network or server error',
			status: 500,
		};
	}
}
