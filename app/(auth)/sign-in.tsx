import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { useWarmUpBrowser } from "@/lib/auth";

const SignIn = () => {
    useWarmUpBrowser();

    const { signIn, setActive, isLoaded } = useSignIn();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/(root)/(tabs)/home");
            } else if (signInAttempt.status === "needs_second_factor") {
                // Handle 2FA requirement
                Alert.alert(
                    "Two-Factor Authentication Required",
                    "Please check your email for a verification code to complete sign-in.",
                    [{ text: "OK" }]
                );
            } else {
                // Handle other statuses
                Alert.alert(
                    "Sign In Incomplete",
                    "Please complete the sign-in process. Check your email for verification.",
                    [{ text: "OK" }]
                );
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors?.[0]?.longMessage || "Sign in failed. Please try again.");
        }
    }, [isLoaded, form.email, form.password]);

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
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px] overflow-hidden">
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
                        source={require("@/assets/images/signin-bg.png")}
                        className="w-full h-[250px]"
                        resizeMode="cover"
                    />
                    {/* White gradient overlay for text readability */}
                    <View className="absolute bottom-0 left-0 right-0 h-24" style={{ backgroundColor: 'transparent' }}>
                        <View className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                        <View className="absolute bottom-5 left-5">
                            <Text className="text-2xl text-black font-JakartaSemiBold">
                                Welcome 👋
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        // icon={require("@/assets/icons/email.png")}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        // icon={require("@/assets/icons/lock.png")}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />
                    <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

                    <View className="flex-row items-center justify-center mt-4 gap-x-3">
                        <View className="flex-1 h-[1px] bg-general-100" />
                        <Text className="text-lg">Or</Text>
                        <View className="flex-1 h-[1px] bg-general-100" />
                    </View>

                    <CustomButton
                        title="Log In with Google"
                        onPress={onGooglePress}
                        className="mt-5 w-full shadow-none bg-white"
                        IconLeft={() => (
                            <Image
                                source={{ uri: "https://www.google.com/favicon.ico" }}
                                className="w-5 h-5 mx-2"
                                resizeMode="contain"
                            />
                        )}
                        bgVariant="outline"
                        textVariant="primary"
                    />
                    <Link href="/sign-up" asChild>
                        <TouchableOpacity>
                            <Text className="text-lg text-center text-gray-700 mt-10">
                                Don't have an account? <Text className="text-primary-500">Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignIn;
