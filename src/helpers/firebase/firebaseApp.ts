import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_AUTH_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_AUTH_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_AUTH_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_AUTH_SENDER,
  appId: process.env.NEXT_PUBLIC_AUTH_APP,
  measurementId: process.env.NEXT_PUBLIC_AUTH_MEASURE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase analytics
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  analytics = null;
}

export { auth, analytics };
