
import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
    const { user } = useUser();

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [phone, setPhone] = useState(user?.unsafeMetadata?.phone as string || user?.primaryPhoneNumber?.phoneNumber || "");
    const [loading, setLoading] = useState(false);

    const onScanImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert("Permission Required", "Please allow access to your photos to upload a profile picture.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true,
            });

            if (!result.canceled && result.assets[0].base64) {
                setLoading(true);
                const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
                await user?.setProfileImage({
                    file: base64,
                });
                Alert.alert("Success", "Profile image updated successfully");
            }
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to update profile image");
        } finally {
            setLoading(false);
        }
    };

    const onSave = async () => {
        setLoading(true);
        try {
            await user?.update({
                firstName: firstName,
                lastName: lastName,
                unsafeMetadata: {
                    phone: phone
                }
            });
            Alert.alert("Success", "Profile details updated successfully");
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                className="px-5"
            >
                <Text className="text-2xl font-JakartaBold my-5">My Profile</Text>

                <View className="flex items-center justify-center my-5">
                    <View className="relative">
                        <Image
                            source={{
                                uri: user?.imageUrl || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                            }}
                            className="w-28 h-28 rounded-full border-[3px] border-white shadow-sm"
                        />
                        <TouchableOpacity
                            onPress={onScanImage}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full items-center justify-center shadow-md p-1"
                        >
                            <Feather name="camera" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-white rounded-2xl shadow-sm p-5 mb-5 border border-gray-100/50">
                    {/* First Name */}
                    <View className="relative">
                        <InputField
                            label="First Name"
                            placeholder="First name"
                            value={firstName}
                            onChangeText={setFirstName}
                            containerStyle="bg-gray-50 border-gray-100"
                        />
                        <View className="absolute right-4 bottom-5 pointer-events-none">
                            <Feather name="edit-2" size={18} color="#C8C8C8" />
                        </View>
                    </View>

                    {/* Last Name */}
                    <View className="relative">
                        <InputField
                            label="Last Name"
                            placeholder="Last name"
                            value={lastName}
                            onChangeText={setLastName}
                            containerStyle="bg-gray-50 border-gray-100"
                        />
                        <View className="absolute right-4 bottom-5 pointer-events-none">
                            <Feather name="edit-2" size={18} color="#C8C8C8" />
                        </View>
                    </View>

                    {/* Email (Read Only) */}
                    <View className="relative">
                        <InputField
                            label="Email"
                            placeholder="Email"
                            value={user?.emailAddresses[0].emailAddress}
                            editable={false}
                            containerStyle="bg-gray-50 border-gray-100 opacity-80"
                        />
                        <View className="absolute right-4 bottom-5 pointer-events-none">
                            <Feather name="lock" size={18} color="#C8C8C8" />
                        </View>
                    </View>

                    {/* Email Status Badge */}
                    {user?.emailAddresses[0].verification.status === 'verified' && (
                        <View className="flex flex-row items-center justify-center bg-green-100 px-4 py-1.5 rounded-full self-start mb-5 -mt-2 ml-1">
                            <Feather name="check-circle" size={14} color="#0CC25F" />
                            <Text className="text-[#0CC25F] font-JakartaMedium text-xs ml-1.5">Verified</Text>
                        </View>
                    )}

                    {/* Phone (Editable now - saves to unsafeMetadata) */}
                    <View className="relative">
                        <InputField
                            label="Phone"
                            placeholder="Phone number"
                            value={phone}
                            onChangeText={setPhone}
                            containerStyle="bg-gray-50 border-gray-100"
                        />
                        <View className="absolute right-4 bottom-5 pointer-events-none">
                            <Feather name="edit-2" size={18} color="#C8C8C8" />
                        </View>
                    </View>
                </View>

                <CustomButton
                    title={loading ? "Saving..." : "Save Changes"}
                    onPress={onSave}
                    disabled={loading}
                    className="mt-2"
                />

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
