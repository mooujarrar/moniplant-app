import { useEffect, useState } from 'react';

export type ApiPlant = {
    id: string;
    name: string;
    description: string;
    plantTypeAlias: string;
    location: string;
    adoptionDate: string; // ISO format
};

export type PlantType = {
    alias: string;
    full_name: string;
    description: string;
};

export const usePlants = () => {
  const [plants, setPlants] = useState<ApiPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch('/api/plant/plants');
        if (!res.ok) throw new Error('Failed to fetch plants');
        const data = await res.json();
        setPlants(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return { plants, loading, error };
};

export const usePlantTypes = () => {
  const [types, setTypes] = useState<PlantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch('/api/plant/plant_types');
        if (!res.ok) throw new Error('Failed to fetch plant types');
        const data = await res.json();
        setTypes(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading, error };
};

// Define the Sensor type based on the response structure
interface Sensor {
  id: string;
  label: string;
  quantity: string;
  unit: string;
  plantId: string;
}

export const useRetrieveSensors = (plantId: string) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await fetch(`/sensor/sensors/${plantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sensors');
        }
        const data = await response.json();
        setSensors(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (plantId) {
      fetchSensors();
    }
  }, [plantId]);

  return { sensors, loading, error };
};
