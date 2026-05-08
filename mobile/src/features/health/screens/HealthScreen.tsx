import { ApiHealthResponse } from '@prosper/shared';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { mobileEnv } from '../../../config/env';

export const HealthScreen = (): JSX.Element => {
  const [health, setHealth] = useState<ApiHealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHealth = async (): Promise<void> => {
      try {
        const response = await fetch(`${mobileEnv.apiBaseUrl}/api/health?verbose=true`);
        if (!response.ok) {
          throw new Error(`Health API returned ${response.status}`);
        }
        const payload = (await response.json()) as ApiHealthResponse;
        setHealth(payload);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void loadHealth();
  }, []);

  const subtitle = useMemo(() => {
    if (loading) return 'Checking backend health...';
    if (error) return error;
    return `Firebase: ${health?.services.firebase ?? 'unknown'}`;
  }, [error, health?.services.firebase, loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prosper Racquet League</Text>
      {loading ? <ActivityIndicator size="large" /> : null}
      <Text style={styles.subtitle}>{subtitle}</Text>
      {health ? <Text style={styles.timestamp}>Updated: {health.timestamp}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#667085',
  },
});
