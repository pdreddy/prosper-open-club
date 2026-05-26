import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type LeagueSection = {
  name: string;
  description: string;
  seasons: string[];
};

const sections: LeagueSection[] = [
  {
    name: 'Prosper Open',
    description: 'The main Prosper Open umbrella with all competitions in one place.',
    seasons: ['Season 1', 'Season 2', 'Season 3', 'Season 4'],
  },
  {
    name: 'KOC',
    description: 'KOC matches, draws, and standings by season.',
    seasons: ['Season 1', 'Season 2', 'Season 3'],
  },
  {
    name: 'Triace',
    description: 'Triace tournament schedule and season summaries.',
    seasons: ['Season 1', 'Season 2'],
  },
];

export const HealthScreen = () => {
  const totalSeasons = useMemo(() => sections.reduce((count, section) => count + section.seasons.length, 0), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Prosper Open</Text>
      <Text style={styles.subtitle}>One website for Prosper Open, KOC, and Triace.</Text>
      <Text style={styles.meta}>Total seasons listed: {totalSeasons}</Text>

      {sections.map((section) => (
        <View key={section.name} style={styles.card}>
          <Text style={styles.sectionTitle}>{section.name}</Text>
          <Text style={styles.sectionDescription}>{section.description}</Text>

          <View style={styles.seasonList}>
            {section.seasons.map((season) => (
              <Text key={`${section.name}-${season}`} style={styles.seasonItem}>
                • {season}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 14,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
  },
  meta: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#334155',
  },
  seasonList: {
    marginTop: 2,
    gap: 4,
  },
  seasonItem: {
    fontSize: 15,
    color: '#0f172a',
  },
});
