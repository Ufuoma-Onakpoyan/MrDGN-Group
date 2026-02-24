import { useState, useEffect } from 'react';
import { apiService, Property } from '@/services/api';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPublishedProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { properties, loading, error, refetch: fetchProperties };
};

export const useFeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getFeaturedProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to load featured properties. Please try again later.');
      console.error('Error fetching featured properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  return { properties, loading, error, refetch: fetchFeaturedProperties };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProperty(id);
        setProperty(data);
      } catch (err) {
        setError('Failed to load property. Please try again later.');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
};