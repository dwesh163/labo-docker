export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  location: string;
  wateringFrequency: string;
  lastWatered?: string;
  notes?: string;
  category: string;
  healthStatus: 'healthy' | 'needsAttention' | 'critical';
}