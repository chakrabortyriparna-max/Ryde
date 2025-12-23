import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-ExtraLight": PlusJakartaSans_200ExtraLight,
    "Jakarta-Light": PlusJakartaSans_300Light,
    "Jakarta-Regular": PlusJakartaSans_400Regular,
    "Jakarta-Medium": PlusJakartaSans_500Medium,
    "Jakarta-SemiBold": PlusJakartaSans_600SemiBold,
    "Jakarta-Bold": PlusJakartaSans_700Bold,
    "Jakarta-ExtraBold": PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        merchantIdentifier="merchant.com.uber"
        urlScheme="uber-clone"
      >
        <ClerkLoaded>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
          </GestureHandlerRootView>
        </ClerkLoaded>
      </StripeProvider>
    </ClerkProvider>
  );
}
