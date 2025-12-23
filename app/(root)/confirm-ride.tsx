import { router, useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";
import { useState } from "react";

import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import CustomButton from "@/components/CustomButton";
import { drivers } from "@/constants";

const ConfirmRide = () => {
    const { userAddress, userLatitude, userLongitude, destinationAddress, destinationLatitude, destinationLongitude } = useLocalSearchParams();
    const [selectedDriver, setSelectedDriver] = useState<any>(null);

    return (
        <RideLayout title="Choose a Rider" snapPoints={["65%", "85%"]}>
            <FlatList
                data={drivers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <DriverCard
                        item={item}
                        selected={selectedDriver?.id === item.id}
                        setSelected={() => setSelectedDriver(item)}
                    />
                )}
                ListFooterComponent={() => (
                    <View className="mx-5 mt-10">
                        <CustomButton
                            title="Select Ride"
                            onPress={() => router.push({
                                pathname: "/(root)/book-ride",
                                params: {
                                    userAddress: userAddress as string,
                                    userLatitude: userLatitude as string,
                                    userLongitude: userLongitude as string,
                                    destinationAddress: destinationAddress as string,
                                    destinationLatitude: destinationLatitude as string,
                                    destinationLongitude: destinationLongitude as string,
                                    driverId: selectedDriver?.id,
                                },
                            })}
                            disabled={!selectedDriver}
                            className={!selectedDriver ? "bg-gray-300" : ""}
                        />
                    </View>
                )}
            />
        </RideLayout>
    );
};

export default ConfirmRide;
