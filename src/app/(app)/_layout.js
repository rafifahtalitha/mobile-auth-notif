import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';

export default function AppLayout() {
  useEffect(() => {
    // Listener saat notifikasi masuk ketika aplikasi sedang dibuka (foreground)
    const received = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notifikasi diterima:', notification.request.content);
    });

    // Listener saat notifikasi diketuk oleh pengguna (navigasi otomatis)
    const response = Notifications.addNotificationResponseReceivedListener((event) => {
      const screen = event.notification.request.content.data?.screen;
      if (screen === 'profile') {
        router.push('/profile');
      }
    });

    return () => {
      received.remove();
      response.remove();
    };
  }, []);

  return <Stack />;
}