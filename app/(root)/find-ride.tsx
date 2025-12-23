import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const FindRide = () => {
    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
        address: "",
    });

    const params = useLocalSearchParams();
    const [destinationLocation, setDestinationLocation] = useState({
        latitude: params.latitude ? parseFloat(params.latitude as string) : 0,
        longitude: params.longitude ? parseFloat(params.longitude as string) : 0,
        address: (params.address as string) || "",
    });

    useEffect(() => {
        const requestLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setUserLocation((prev) => ({ ...prev, latitude, longitude }));

            try {
                const response = await fetch(
                    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
                );
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    setUserLocation({
                        latitude,
                        longitude,
                        address: data.features[0].properties.formatted,
                    });
                }
            } catch (error) {
                console.error("Error reverse geocoding:", error);
            }
        };

        requestLocation();
    }, []);

    const handleFindNow = () => {
        router.push({
            pathname: "/(root)/confirm-ride",
            params: {
                userAddress: userLocation.address,
                userLatitude: userLocation.latitude,
                userLongitude: userLocation.longitude,
                destinationAddress: destinationLocation.address,
                destinationLatitude: destinationLocation.latitude,
                destinationLongitude: destinationLocation.longitude,
            },
        });
    };

    return (
        <RideLayout title="Ride">
            <View className="my-3">
                <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
                <GoogleTextInput
                    icon={icons.point}
                    initialLocation={userLocation.address}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="#f5f5f5"
                    handlePress={(location) => setUserLocation(location)}
                />
            </View>

            <View className="my-3">
                <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
                <GoogleTextInput
                    icon={icons.to}
                    initialLocation={destinationLocation.address}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="transparent"
                    handlePress={(location) => setDestinationLocation(location)}
                />
            </View>

            <CustomButton
                title="Find Now"
                onPress={handleFindNow}
                className="mt-5"
            />
        </RideLayout>
    );
};

export default FindRide;
