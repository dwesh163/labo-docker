const insertPlants = async () => {
	try {
		const plants = [
			{
				name: 'Monstera Deliciosa',
				species: 'Monstera',
				image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80',
				location: 'Living Room',
				weeklyHydration: 1,
				birthdate: '2024-03-01',
				commentary: 'Thriving in bright indirect light',
				category: 'tropical',
				healthStatus: 'good',
			},
			{
				name: 'Peace Lily',
				species: 'Spathiphyllum',
				image: 'https://images.unsplash.com/photo-1521503862198-2ae9a997bbc9?auto=format&fit=crop&q=80',
				location: 'Bedroom',
				weeklyHydration: 2,
				birthdate: '2024-03-05',
				commentary: 'Droops when needs water',
				category: 'flowering',
				healthStatus: 'bad',
			},
			{
				name: 'Snake Plant',
				species: 'Sansevieria',
				image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&q=80',
				location: 'Study',
				weeklyHydration: 4,
				birthdate: '2024-03-10',
				commentary: 'Low maintenance, perfect for low light',
				category: 'succulent',
				healthStatus: 'ugly',
			},
			{
				name: 'Fiddle Leaf Fig',
				species: 'Ficus lyrata',
				image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
				location: 'Living Room',
				weeklyHydration: 1,
				birthdate: '2024-03-15',
				commentary: 'Sensitive to changes in environment',
				category: 'foliage',
				healthStatus: 'dead',
			},
		];

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

		const Allplants = await response.json();
		plants.forEach(async (plant) => {
			const plantExists = Allplants.some((p) => p.name === plant.name);
			if (!plantExists) {
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
				}
			}
		});
	} catch (error) {
		console.error('Error fetching plants', error);
		return [];
	}
};

insertPlants();
console.log('Development data inserted');
