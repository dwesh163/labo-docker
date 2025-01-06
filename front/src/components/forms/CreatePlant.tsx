import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PlantFormValues, plantSchema } from '@/types/plant';
import { useRouter } from 'next/navigation';

export function CreatePlantDialog({ categoriesData }: { categoriesData: string[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const [newCategory, setNewCategory] = useState({
		name: '',
		error: '',
		isOpen: false,
	});
	const [categories, setCategories] = useState(categoriesData);
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
			weeklyHydration: undefined,
			commentary: '',
		},
	});

	const router = useRouter();

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
					router.refresh();
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

					<div className="flex items-center gap-4">
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<div className="w-full">
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
						<Dialog open={newCategory.isOpen} onOpenChange={(isOpen) => setNewCategory((prev) => ({ ...prev, isOpen }))}>
							<DialogTrigger asChild>
								<Button variant="outline" className="">
									Add Category
								</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogHeader>
									<DialogTitle>Add a New Category</DialogTitle>
									<DialogDescription>Fill out the form below to add a new category to your collection.</DialogDescription>
								</DialogHeader>
								<div className="flex flex-row gap-2">
									<Input
										value={newCategory.name}
										onChange={(e) =>
											setNewCategory((prev) => ({
												...prev,
												name: e.target.value,
												error: '',
											}))
										}
										placeholder="Category Name"
									/>
									<Button
										onClick={() => {
											if (newCategory.name.trim() === '') {
												setNewCategory((prev) => ({
													...prev,
													error: 'Category name cannot be empty',
												}));
											} else {
												setCategories((prev) => [...prev, newCategory.name.trim()]);
												setNewCategory({
													name: '',
													error: '',
													isOpen: false,
												});
											}
										}}>
										Add Category
									</Button>
								</div>
								{newCategory.error && <p className="text-red-500 mt-1 text-sm">{newCategory.error}</p>}
							</DialogContent>
						</Dialog>
					</div>

					<Controller
						name="weeklyHydration"
						control={control}
						render={({ field }) => (
							<div>
								<Input type="number" min={1} placeholder="Weekly Hydration" value={field.value || ''} onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 1)} />
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
