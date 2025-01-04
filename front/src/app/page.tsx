'use server';

import { Plant } from '@/types/plant';
import HomePage from '@/components/home';
import { getPlants } from '@/lib/plants';
import { Category } from '@/types/categories';
import { getCategories } from '@/lib/categories';

export default async function Home() {
	const plants: Plant[] = await getPlants();
	const plantCategories: Category[] = await getCategories();

	return <HomePage plantCategories={plantCategories} plants={plants} />;
}
