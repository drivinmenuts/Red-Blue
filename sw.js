// Service Worker for Color Notifications
self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked');
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('./')
    );
});

self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const color = event.data.color;
        
        self.registration.showNotification(color, {
            body: `${color} period - 4 hour notification`,
            tag: 'color-notification',
            requireInteraction: true,
            vibrate: [200, 100, 200],
            sticky: true,
            silent: false,
            renotify: true,
            timestamp: Date.now()
        });
    }
});

self.addEventListener('install', function(event) {
    console.log('Service worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service worker activated');
    event.waitUntil(clients.claim());
});
