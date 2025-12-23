import { Link, router } from "expo-router";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";

import { useWarmUpBrowser } from "@/lib/auth";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const SignUp = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onGooglePress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                // @ts-ignore
                await setActive({ session: createdSessionId });
                router.replace("/(root)/(tabs)/home");
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, []);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white">
                <View className="flex-1 bg-white">
                    {/* Car Wheel Image Header */}
                    <View className="relative w-full h-[280px] overflow-hidden">
                        <TouchableOpacity
                            onPress={() => router.replace("/(auth)/welcome")}
                            className="absolute top-12 left-5 z-10 p-2"
                        >
                            <Image
                                source={icons.backArrow}
                                className="w-6 h-6"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Image
                            source={require("@/assets/images/signup-bg.png")}
                            className="w-full h-[280px]"
                            resizeMode="cover"
                        />
                        {/* White gradient overlay for smooth transition */}
                        <View className="absolute bottom-0 left-0 right-0 h-40" style={{ backgroundColor: 'transparent' }}>
                            <View className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />
                        </View>
                    </View>

                    {/* Content Section - Positioned below the image */}
                    <View className="px-6 mt-6">
                        {/* Title */}
                        <Text className="text-3xl font-JakartaBold text-center mb-2">
                            Let's get started
                        </Text>
                        <Text className="text-base font-Jakarta text-center text-gray-500 mb-8">
                            Sign up or log in to find out the best car for you
                        </Text>

                        {/* Sign Up Button */}
                        <CustomButton
                            title="Sign Up"
                            onPress={() => router.push("/(auth)/sign-up-form")}
                            className="mb-4"
                        />

                        {/* Divider */}
                        <Text className="text-center text-gray-500 font-JakartaMedium my-4">
                            Or
                        </Text>

                        {/* Google Sign In Button */}
                        <TouchableOpacity
                            onPress={onGooglePress}
                            className="flex-row items-center justify-center bg-white border border-gray-200 rounded-full py-4 px-6 mb-6"
                        >
                            <Image
                                source={{ uri: "https://www.google.com/favicon.ico" }}
                                className="w-5 h-5 mr-3"
                            />
                            <Text className="text-base font-JakartaSemiBold text-gray-700">
                                Log In with Google
                            </Text>
                        </TouchableOpacity>

                        {/* Log In Link */}
                        <View className="flex-row justify-center items-center mb-8">
                            <Text className="text-base font-Jakarta text-gray-500">
                                Already have an account?{" "}
                            </Text>
                            <Link href="/(auth)/sign-in" asChild>
                                <TouchableOpacity>
                                    <Text className="text-base font-JakartaSemiBold text-[#0286FF]">
                                        Log in
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
