import { z } from 'zod';

export interface Plant {
export const plantSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	species: z.string().min(1, 'Species is required'),
	location: z.string().min(1, 'Location is required'),
	image: z.string().url(),
	birthdate: z.string().min(1, 'Birthdate is required'),
	category: z.string().min(1, 'Category is required'),
	weeklyHydration: z.string().min(1, 'Weekly Hydration is required'),
	commentary: z.string().optional(),
});

export type PlantFormValues = z.infer<typeof plantSchema>;
