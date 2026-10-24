import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { getMe } from '../../../services/authService';

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  if (!profile) return <ActivityIndicator style={{ flex: 1 }} color="#2563EB" />;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile.nama?.[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.profileName}>{profile.nama}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID Pengguna</Text>
          <Text style={styles.infoValue}>#{profile.id}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status Sesi</Text>
          <Text style={styles.statusBadge}>Terverifikasi (JWT)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0F5FA' },
  avatarContainer: { alignItems: 'center', marginVertical: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#FFF', fontSize: 32, fontWeight: '700' },
  profileName: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
  profileEmail: { fontSize: 14, color: '#64748B', marginTop: 2 },
  infoCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  infoLabel: { color: '#64748B', fontSize: 14, fontWeight: '500' },
  infoValue: { color: '#1E293B', fontSize: 14, fontWeight: '700' },
  statusBadge: { color: '#1D4ED8', backgroundColor: '#DBEAFE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontSize: 12, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 8 },
});