import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { registerUser } from '../../services/authService';

export default function RegisterScreen() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      await registerUser(nama, email, password);
      Alert.alert('Berhasil', 'Akun dibuat. Silakan login.');
      router.replace('/sign-in');
    } catch (e) {
      Alert.alert('Registrasi gagal', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Akun</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nama" 
        placeholderTextColor="#888"
        value={nama} 
        onChangeText={setNama} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#888"
        autoCapitalize="none" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password min. 8 karakter" 
        placeholderTextColor="#888"
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Daftar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, color: '#000', backgroundColor: '#f9f9f9' },
});