import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";

const Page = () => {
    const { isSignedIn } = useAuth();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
            if (isSignedIn) {
                router.replace("/(root)/(tabs)/home");
            } else {
                router.replace("/(auth)/welcome");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isSignedIn]);

    if (showSplash) {
        return (
            <View className="flex-1 items-center justify-center bg-[#2F80ED]">
                <Image
                    source={require("@/assets/images/splash.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
        );
    }

    return null;
};

export default Page;
