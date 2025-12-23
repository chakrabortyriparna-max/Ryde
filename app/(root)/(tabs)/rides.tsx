
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { Ride } from "@/types/type";
import { fetchAPI } from "@/lib/fetch";

const Rides = () => {
    const { user } = useUser();
    const [recentRides, setRecentRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchRides = async () => {
                if (user?.id) {
                    // Log the ID to verify it's present
                    console.log("Fetching history for user ID:", user.id);
                    setLoading(true);

                    try {
                        const response = await fetchAPI(`/api/ride/all?id=${user.id}`);

                        // fetchAPI in lib/fetch.ts throws an error if !response.ok
                        // so if we get here, response is the parsed JSON.
                        if (response.data) {
                            setRecentRides(response.data);
                        } else {
                            console.error("No data property in response:", response);
                        }

                    } catch (error) {
                        console.error("Block 2 error fetching rides:", error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    console.log("User ID is missing or undefined");
                    setLoading(false);
                }
            };

            fetchRides();
        }, [user?.id])
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={recentRides}
                renderItem={({ item }) => <RideCard ride={item} />}
                keyExtractor={(item, index) => index.toString()}
                className="px-5"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListHeaderComponent={
                    <>
                        <Text className="text-2xl font-JakartaBold my-5">All Rides</Text>
                    </>
                }
                ListEmptyComponent={() => (
                    <View className="flex flex-col items-center justify-center">
                        {!loading ? (
                            <>
                                <Image
                                    source={images.map}
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
            />
        </SafeAreaView>
    );
};

export default Rides;
