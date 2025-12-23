
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect, router } from "expo-router";
import { useCallback, useState } from "react";
import {
    FlatList,
    Image,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchAPI } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { images, icons } from "@/constants";

const Chat = () => {
    const { user } = useUser();
    const [recentRides, setRecentRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchRides = async () => {
                if (user?.id) {
                    setLoading(true);
                    try {
                        const response = await fetchAPI(`/api/ride/recent?id=${user.id}`);
                        if (response.data) {
                            setRecentRides(response.data);
                        }
                    } catch (error) {
                        console.error("Error fetching recent rides for chat:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            };

            fetchRides();
        }, [user?.id])
    );

    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <View className="mb-5">
                <Text className="text-2xl font-JakartaBold">Chat List</Text>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : recentRides.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={images.message || images.map}
                        className="w-full h-40"
                        resizeMode="contain"
                    />
                    <View className="mt-5">
                        <Text className="text-3xl font-JakartaBold text-center">
                            No Messages, yet.
                        </Text>
                        <Text className="text-base font-JakartaRegular text-gray-400 text-center mt-2 px-10">
                            No messages in your inbox, yet!
                        </Text>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={recentRides}
                    keyExtractor={(item) => item.ride_id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="flex-row items-center p-3 mb-2 bg-white rounded-xl border border-gray-100 shadow-sm"
                            onPress={() =>
                                router.push({
                                    pathname: "/(root)/chat/[id]",
                                    params: {
                                        id: item.driver.driver_id,
                                        name: `${item.driver.first_name} ${item.driver.last_name}`,
                                        avatar: item.driver.profile_image_url,
                                    },
                                })
                            }
                        >
                            <Image
                                source={
                                    [images.driver1, images.driver2, images.driver3][item.driver.driver_id % 3] || icons.profile
                                }
                                className="w-14 h-14 rounded-full"
                            />
                            <View className="flex-1 ml-3">
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-lg font-JakartaSemiBold">
                                        {item.driver.first_name} {item.driver.last_name}
                                    </Text>
                                    <Text className="text-sm text-gray-400 font-JakartaRegular">
                                        {new Date(item.created_at).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Text>
                                </View>
                                <Text
                                    className="text-gray-500 font-JakartaMedium mt-1"
                                    numberOfLines={1}
                                >
                                    Tap to chat with driver
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}
        </SafeAreaView>
    );
};

export default Chat;
