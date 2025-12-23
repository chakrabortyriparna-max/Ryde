import { useClerk, useUser } from "@clerk/clerk-expo";
import { useFocusEffect, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "@/components/Map";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideCard from "@/components/RideCard";
import { icons } from "@/constants";

import { Ride } from "@/types/type";

const Home = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [recentRides, setRecentRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(true);
    const [destinationLocation, setDestinationLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    useFocusEffect(
        useCallback(() => {
            const fetchRecentRides = async () => {
                if (user?.id) {
                    setLoading(true);
                    try {
                        const response = await fetch(`https://uber-clone-e2w1.vercel.app/api/ride/recent?id=${user.id}`);
                        const result = await response.json();
                        if (result.data) {
                            setRecentRides(result.data);
                            if (result.data.length > 0) {
                                setDestinationLocation({
                                    latitude: result.data[0].destination_latitude,
                                    longitude: result.data[0].destination_longitude,
                                });
                            }
                        }
                    } catch (error) {
                        console.error("Error fetching recent rides:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            };

            fetchRecentRides();
        }, [user?.id])
    );

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleDestinationPress = (location: {
        latitude: number;
        longitude: number;
        address: string;
    }) => {
        router.push({
            pathname: "/(root)/find-ride",
            params: location,
        });
    };

    return (
        <SafeAreaView className="bg-general-100 h-full">
            <FlatList
                data={recentRides}
                renderItem={({ item }) => <RideCard ride={item} />}
                keyExtractor={(item) => item.ride_id.toString()}
                className="px-5"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListEmptyComponent={() => (
                    <View className="flex flex-col items-center justify-center">
                        {!loading ? (
                            <>
                                <Image
                                    source={icons.point}
                                    className="w-40 h-40"
                                    alt="No recent rides found"
                                    resizeMode="contain"
                                />
                                <Text className="text-sm">No recent rides found</Text>
                            </>
                        ) : (
                            <ActivityIndicator size="small" color="#000" />
                        )}
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="flex flex-row items-center justify-between my-5">
                            <Text className="text-2xl font-JakartaExtraBold">
                                Welcome {user?.emailAddresses[0].emailAddress.split("@")[0]}
                            </Text>
                            <TouchableOpacity
                                onPress={handleSignOut}
                                className="justify-center items-center w-10 h-10 rounded-full bg-white"
                            >
                                <Image source={icons.out} className="w-4 h-4" />
                            </TouchableOpacity>
                        </View>

                        <GoogleTextInput
                            icon={icons.search}
                            containerStyle="bg-white shadow-md"
                            handlePress={handleDestinationPress}
                        />

                        <Text className="text-xl font-JakartaBold mt-5 mb-3">
                            Your current location
                        </Text>
                        <View className="flex flex-row items-center bg-transparent h-[300px]">
                            <Map
                                destinationLatitude={destinationLocation?.latitude}
                                destinationLongitude={destinationLocation?.longitude}
                            />
                        </View>

                        <Text className="text-xl font-JakartaBold mt-5 mb-3">
                            Recent Rides
                        </Text>
                    </>
                )}
            />
        </SafeAreaView>
    );
};

export default Home;
