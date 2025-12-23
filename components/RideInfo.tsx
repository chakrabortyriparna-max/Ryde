import { Image, Text, View, TouchableOpacity } from "react-native";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface RideInfoProps {
    driver: {
        first_name: string;
        last_name: string;
        profile_image_url: string | number;
        rating: string;
        car_seats: number;
        price: string;
        time: string;
    };
    userLocation: {
        address: string;
    };
    destination: {
        address: string;
    };
    onConfirm: () => void;
    loading?: boolean;
}

const RideInfo = ({
    driver,
    userLocation,
    destination,
    onConfirm,
    loading = false,
}: RideInfoProps) => {
    return (
        <View className="flex flex-col w-full items-center justify-center bg-white rounded-t-3xl mt-5">
            {/* Header */}
            <View className="flex flex-row items-center justify-between w-full px-5 pt-5 border-b border-gray-100 pb-5">
                <Text className="text-xl font-JakartaBold">Ride Information</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Driver Details */}
            <View className="flex flex-col w-full items-center justify-center mt-6">
                <Image
                    source={
                        typeof driver.profile_image_url === "string"
                            ? { uri: driver.profile_image_url }
                            : driver.profile_image_url
                    }
                    className="w-24 h-24 rounded-full"
                />
                <View className="flex flex-row items-center justify-center mt-4 space-x-2">
                    <Text className="text-xl font-JakartaSemiBold">
                        {driver.first_name} {driver.last_name}
                    </Text>
                    <View className="flex flex-row items-center space-x-0.5">
                        <Image source={icons.star} className="w-5 h-5" resizeMode="contain" />
                        <Text className="text-xl font-JakartaRegular">{driver.rating}</Text>
                    </View>
                </View>
            </View>

            {/* Ride Details List */}
            <View className="flex flex-col w-full items-center justify-center mt-8 px-5">
                <View className="flex flex-col w-full bg-general-100 rounded-2xl px-5 py-3">
                    {/* Price Row */}
                    <View className="flex flex-row items-center justify-between w-full py-4 border-b border-gray-100">
                        <Text className="text-lg font-JakartaRegular text-gray-500">Ride Price</Text>
                        <Text className="text-lg font-JakartaBold text-[#0CC25F]">${driver.price}</Text>
                    </View>

                    {/* Time Row */}
                    <View className="flex flex-row items-center justify-between w-full py-4 border-b border-gray-100">
                        <Text className="text-lg font-JakartaRegular text-gray-500">Pickup time</Text>
                        <Text className="text-lg font-JakartaBold text-black">{driver.time}</Text>
                    </View>

                    {/* Seats Row */}
                    <View className="flex flex-row items-center justify-between w-full py-4">
                        <Text className="text-lg font-JakartaRegular text-gray-500">Car Seats</Text>
                        <Text className="text-lg font-JakartaBold text-black">{driver.car_seats}</Text>
                    </View>
                </View>
            </View>

            {/* Route */}
            <View className="flex flex-col w-full items-start justify-center mt-5 px-5">
                <View className="flex flex-row items-center py-4 border-b border-gray-100 w-full">
                    <Image source={icons.to} className="w-6 h-6" resizeMode="contain" />
                    <Text className="text-lg font-JakartaRegular ml-4 flex-1" numberOfLines={2}>
                        {userLocation.address}
                    </Text>
                </View>
                <View className="flex flex-row items-center py-4 w-full">
                    <Image source={icons.point} className="w-6 h-6" resizeMode="contain" />
                    <Text className="text-lg font-JakartaRegular ml-4 flex-1" numberOfLines={2}>
                        {destination.address}
                    </Text>
                </View>
            </View>

            {/* Confirm Button */}
            <View className="w-full mt-5 px-5 pb-5">
                <CustomButton
                    title="Confirm Ride"
                    onPress={onConfirm}
                    className="w-full bg-general-500"
                />
            </View>
        </View>
    );
};

export default RideInfo;
