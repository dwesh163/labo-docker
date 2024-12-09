'use server';

import { Plant } from '@/types/plant';
import HomePage from '@/components/home';
import { getPlants } from '@/lib/plants';

export default async function Home() {
	const plants: Plant[] = await getPlants();

	return <HomePage plants={plants} />;
}
