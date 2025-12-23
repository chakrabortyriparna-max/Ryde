import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";

const SignUpForm = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerification({ ...verification, state: "pending" });
        } catch (err: any) {
            Alert.alert("Error", err.errors[0].longMessage);
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: "success" });
            } else {
                setVerification({ ...verification, error: "Verification failed. Please try again." });
            }
        } catch (err: any) {
            setVerification({ ...verification, error: err.errors[0].longMessage });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white">
                <View className="flex-1 bg-white">
                    {/* Car Wheel Image Header */}
                    <View className="relative w-full h-[250px] overflow-hidden">
                        <Image
                            source={require("@/assets/images/signup-form-bg.png")}
                            className="w-full h-[250px]"
                            resizeMode="cover"
                        />
                        {/* White gradient overlay for text readability */}
                        <View className="absolute bottom-0 left-0 right-0 h-24" style={{ backgroundColor: 'transparent' }}>
                            <View className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                            <View className="absolute bottom-6 left-6 right-6">
                                <Text className="text-3xl font-JakartaBold text-black">
                                    Create Your Account
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View className="px-6 mt-6">
                        {/* Name Input */}
                        <InputField
                            label="Name"
                            placeholder="Enter name"
                            value={form.name}
                            onChangeText={(value) => setForm({ ...form, name: value })}
                        />

                        {/* Email Input */}
                        <InputField
                            label="Email"
                            placeholder="Enter email"
                            textContentType="emailAddress"
                            value={form.email}
                            onChangeText={(value) => setForm({ ...form, email: value })}
                        />

                        {/* Password Input */}
                        <InputField
                            label="Password"
                            placeholder="Enter password"
                            secureTextEntry={true}
                            textContentType="password"
                            value={form.password}
                            onChangeText={(value) => setForm({ ...form, password: value })}
                        />

                        {/* Sign Up Button */}
                        <CustomButton
                            title="Sign Up"
                            onPress={onSignUpPress}
                            className="mt-6"
                        />

                        {/* Divider */}
                        <Text className="text-center text-gray-500 font-JakartaMedium my-4">
                            Or
                        </Text>

                        {/* Google Sign In Button */}
                        <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-200 rounded-full py-4 px-6 mb-6">
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

                    {/* Verification Modal */}
                    <Modal
                        isVisible={verification.state === "pending"}
                        onModalHide={() => {
                            if (verification.state === "success") setShowSuccessModal(true);
                        }}
                    >
                        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                            <Text className="font-JakartaExtraBold text-2xl mb-2">Verification</Text>
                            <Text className="font-Jakarta mb-5">
                                We've sent a verification code to {form.email}.
                            </Text>
                            <InputField
                                label={"Code"}
                                placeholder={"12345"}
                                value={verification.code}
                                keyboardType="numeric"
                                onChangeText={(code) => setVerification({ ...verification, code })}
                            />
                            {verification.error && (
                                <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>
                            )}
                            <CustomButton
                                title="Verify Email"
                                onPress={onPressVerify}
                                className="mt-5 bg-success-500"
                            />
                        </View>
                    </Modal>

                    {/* Success Modal */}
                    <Modal isVisible={showSuccessModal}>
                        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                            <Image
                                source={require("@/assets/images/check.png")}
                                className="w-[110px] h-[110px] mx-auto my-5"
                            />
                            <Text className="text-3xl font-JakartaBold text-center">Verified</Text>
                            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                                You have successfully verified your account.
                            </Text>
                            <CustomButton
                                title="Browse Home"
                                onPress={() => router.replace("/(root)/(tabs)/home")}
                                className="mt-5"
                            />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpForm;
