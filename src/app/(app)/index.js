import { router } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { kirimNotifikasiUji, simpanPushToken } from '../../../services/notificationService';
import { getExpoPushToken } from '../../../utils/notifications';

export default function HomeScreen() {
  const { user, token, signOut } = useAuth();

  async function aktifkanNotifikasi() {
    try {
      const expoPushToken = await getExpoPushToken();
      await simpanPushToken(token, expoPushToken);
      Alert.alert('Berhasil', 'Perangkat terdaftar untuk notifikasi');
    } catch (e) {
      Alert.alert('Notifikasi Error', e.message);
    }
  }

  async function testNotifikasi() {
    try {
      const data = await kirimNotifikasiUji(token);
      Alert.alert('Server', data.pesan);
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* Header Card Biru Utam */}
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Selamat Datang 👋</Text>
        <Text style={styles.nameText}>{user?.nama}</Text>
        <Text style={styles.subText}>Sesi Anda aktif menggunakan JWT token.</Text>
      </View>

      {/* Tombol-Tombol Nuansa Biru */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.btnPrimary} onPress={aktifkanNotifikasi}>
          <Text style={styles.btnTextPrimary}>🔔 Aktifkan Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={testNotifikasi}>
          <Text style={styles.btnTextSecondary}>🚀 Kirim Notifikasi Uji</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/profile')}>
          <Text style={styles.btnTextOutline}>👤 Lihat Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDanger} onPress={signOut}>
          <Text style={styles.btnTextDanger}>🚪 Keluar (Logout)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0F5FA', justifyContent: 'center' },
  card: { backgroundColor: '#1E40AF', borderRadius: 16, padding: 24, marginBottom: 24, elevation: 4 },
  welcomeText: { color: '#BFDBFE', fontSize: 14, fontWeight: '600' },
  nameText: { color: '#FFFFFF', fontSize: 26, fontWeight: '700', marginVertical: 4 },
  subText: { color: '#DBEAFE', fontSize: 13 },
  actionSection: { gap: 12 },
  btnPrimary: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnTextPrimary: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  btnSecondary: { backgroundColor: '#3B82F6', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnTextSecondary: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  btnOutline: { borderWidth: 1.5, borderColor: '#2563EB', backgroundColor: '#EFF6FF', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnTextOutline: { color: '#2563EB', fontWeight: '700', fontSize: 15 },
  btnDanger: { backgroundColor: '#FEE2E2', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  btnTextDanger: { color: '#DC2626', fontWeight: '700', fontSize: 15 },
});