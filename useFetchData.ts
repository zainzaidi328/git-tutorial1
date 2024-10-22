import { useState, useEffect } from 'react';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DataItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface FetchResult {
  data: DataItem[];
  loading: boolean;
  error: Error | null;
}

const useFetchData = (apiUrl: string): FetchResult => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check network connection
        const networkStatus = await Network.getNetworkStateAsync();
        if (networkStatus.isConnected) {
          // Fetch data from API
          const response = await fetch(apiUrl);
          const result: DataItem[] = await response.json();
          setData(result);

          // Save fetched data in AsyncStorage for offline use
          await AsyncStorage.setItem('offlineData', JSON.stringify(result));
        } else {
          // Load data from AsyncStorage if offline
          const offlineData = await AsyncStorage.getItem('offlineData');
          if (offlineData) {
            setData(JSON.parse(offlineData));
          } else {
            throw new Error('No internet connection and no offline data available.');
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, loading, error };
};

export default useFetchData;
