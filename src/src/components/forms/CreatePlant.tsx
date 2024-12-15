import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const plantSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	species: z.string().min(1, 'Species is required'),
	location: z.string().min(1, 'Location is required'),
	image: z.string().url(),
	birthdate: z.string().min(1, 'Birthdate is required'),
	category: z.string().min(1, 'Category is required'),
	weeklyHydration: z.string().min(1, 'Weekly Hydration is required'),
	commentary: z.string().optional(),
});

type PlantFormValues = z.infer<typeof plantSchema>;

export function CreatePlantDialog({ categories }: { onCreate: (plant: PlantFormValues) => void; categories: string[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PlantFormValues>({
		resolver: zodResolver(plantSchema),
		defaultValues: {
			name: '',
			species: '',
			location: '',
			image: '',
			birthdate: '',
			category: '',
			weeklyHydration: '',
			commentary: '',
		},
	});

	const onSubmit = (data: PlantFormValues) => {
		fetch('/api/plant', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((plant) => {
				if (!plant.error) {
					setIsOpen(false);
					reset();
				}
			});
	};

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2 rounded-full bg-primary">
					<Plus className="h-4 w-4" />
					Add New Plant
				</Button>
			</DialogTrigger>
			<DialogContent tabIndex={undefined}>
				<DialogHeader>
					<DialogTitle>Add a New Plant</DialogTitle>
					<DialogDescription>Fill out the form below to add a new plant to your collection.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<div>
								<Input placeholder="Plant Name" {...field} />
								{errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
							</div>
						)}
					/>

					<Controller
						name="species"
						control={control}
						render={({ field }) => (
							<div>
								<Input placeholder="Species" {...field} />
								{errors.species && <p className="text-red-500 mt-1 text-sm">{errors.species.message}</p>}
							</div>
						)}
					/>

					<Controller
						name="location"
						control={control}
						render={({ field }) => (
							<div>
								<Input placeholder="Location" {...field} />
								{errors.location && <p className="text-red-500 mt-1 text-sm">{errors.location.message}</p>}
							</div>
						)}
					/>

					<Controller
						name="image"
						control={control}
						render={({ field }) => (
							<div>
								<Input placeholder="Image url" {...field} />
								{errors.image && <p className="text-red-500 mt-1 text-sm">{errors.image.message}</p>}
							</div>
						)}
					/>

					<Controller
						name="birthdate"
						control={control}
						render={({ field }) => (
							<div>
								<Input type="date" placeholder="Birthdate" {...field} />
								{errors.birthdate && <p className="text-red-500 mt-1 text-sm">{errors.birthdate.message}</p>}
							</div>
						)}
					/>

					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<div>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Select Category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((cat) => (
											<SelectItem key={cat} value={cat}>
												{cat}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errors.category && <p className="text-red-500 mt-1 text-sm">{errors.category.message}</p>}
							</div>
						)}
					/>

					<Controller
						name="weeklyHydration"
						control={control}
						render={({ field }) => (
							<div>
								<Input type="number" placeholder="Weekly Hydration (ml)" {...field} />
								{errors.weeklyHydration && <p className="text-red-500 mt-1 text-sm">{errors.weeklyHydration.message}</p>}
							</div>
						)}
					/>

					<Controller name="commentary" control={control} render={({ field }) => <Textarea placeholder="Commentary (optional)" {...field} />} />

					<DialogFooter>
						<Button
							variant="outline"
							type="button"
							onClick={() => {
								reset();
								setIsOpen(false);
							}}>
							Cancel
						</Button>
						<Button type="submit">Create Plant</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
