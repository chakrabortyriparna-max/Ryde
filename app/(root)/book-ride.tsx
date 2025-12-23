import { useUser } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

import RideLayout from "@/components/RideLayout";
import RideInfo from "@/components/RideInfo";
import CustomButton from "@/components/CustomButton";
import { icons, drivers } from "@/constants";
import { images } from "@/constants";
import { getRoute } from "@/lib/map";
import { fetchAPI } from "@/lib/fetch";

const BookRide = () => {
    const { user } = useUser();
    const { userAddress, userLatitude, userLongitude, destinationAddress, destinationLatitude, destinationLongitude, driverId } = useLocalSearchParams();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [success, setSuccess] = useState(false);
    const [rideDetails, setRideDetails] = useState<any>(null);
    const [isPaymentInitialized, setIsPaymentInitialized] = useState(false);

    const driver = drivers.find((d) => d.id === driverId) || drivers[0];

    useEffect(() => {
        const fetchRoute = async () => {
            if (userLatitude && userLongitude && destinationLatitude && destinationLongitude) {
                const details = await getRoute({
                    originLatitude: parseFloat(userLatitude as string),
                    originLongitude: parseFloat(userLongitude as string),
                    destinationLatitude: parseFloat(destinationLatitude as string),
                    destinationLongitude: parseFloat(destinationLongitude as string),
                });
                setRideDetails(details);
            }
        };
        fetchRoute();
    }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

    useEffect(() => {
        const initializePaymentSheet = async () => {
            if (!user?.emailAddresses?.[0]?.emailAddress) return;

            try {
                const response = await fetchAPI(`/api/stripe/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user?.fullName || user?.emailAddresses[0].emailAddress,
                        email: user?.emailAddresses[0].emailAddress,
                        amount: rideDetails?.price || driver.price,
                    }),
                });

                const { paymentIntent, ephemeralKey, customer } = response;

                const { error } = await initPaymentSheet({
                    merchantDisplayName: "Uber Clone",
                    paymentIntentClientSecret: paymentIntent.client_secret,
                    customerEphemeralKeySecret: ephemeralKey.secret,
                    customerId: customer,
                    returnURL: "uber-clone://book-ride",
                    allowsDelayedPaymentMethods: true,
                    defaultBillingDetails: {
                        name: user?.fullName || "User",
                        email: user?.emailAddresses[0].emailAddress || "user@example.com",
                    },
                });

                if (error) {
                    Alert.alert("Error", "Unable to initialize payment sheet. Please try again.");
                } else {
                    setIsPaymentInitialized(true);
                }
            } catch (error) {
                console.error(error);
                // Don't alert immediately to avoid blocking UI, but log it
            }
        };

        initializePaymentSheet();
    }, [rideDetails, user]);

    const openPaymentSheet = async () => {

        const { error } = await presentPaymentSheet();

        if (error) {
            if (error.code !== 'Canceled') {
                Alert.alert(`Error code: ${error.code}`, error.message);
            }
        } else {
            try {
                await fetchAPI("/api/ride/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        origin_address: userAddress,
                        destination_address: destinationAddress,
                        origin_latitude: parseFloat(userLatitude as string),
                        origin_longitude: parseFloat(userLongitude as string),
                        destination_latitude: parseFloat(destinationLatitude as string),
                        destination_longitude: parseFloat(destinationLongitude as string),
                        ride_time: rideDetails?.time || 0,
                        fare_price: rideDetails?.price || 0,
                        payment_status: "paid",
                        driver_id: parseInt(driverId as string),
                        user_id: user?.id,
                        user_email: user?.emailAddresses[0].emailAddress,
                        user_name: user?.fullName,
                    }),
                });
                setSuccess(true);
            } catch (error) {
                console.error("Error creating ride:", error);
                Alert.alert("Error", "Failed to create ride");
            }
        }
    };

    const driverWithRealDetails = {
        ...driver,
        price: rideDetails?.price ? `${rideDetails.price}` : driver.price,
        time: rideDetails?.time ? `${rideDetails.time} min` : driver.time,
    };

    return (
        <RideLayout
            title="Book Ride"
            snapPoints={["50%", "85%"]}
            userLatitude={parseFloat(userLatitude as string)}
            userLongitude={parseFloat(userLongitude as string)}
            destinationLatitude={parseFloat(destinationLatitude as string)}
            destinationLongitude={parseFloat(destinationLongitude as string)}
        >
            <>
                <RideInfo
                    driver={driverWithRealDetails}
                    userLocation={{ address: userAddress as string }}
                    destination={{ address: destinationAddress as string }}
                    onConfirm={openPaymentSheet}
                    loading={false}
                />

                {/* Success Modal */}
                {success && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 bg-white items-center justify-center z-50 rounded-t-3xl">
                        <Image source={images.check} className="w-28 h-28 mt-5" />
                        <Text className="text-2xl font-JakartaBold text-center mt-5">
                            Booking placed successfully
                        </Text>
                        <Text className="text-md text-gray-500 font-JakartaRegular text-center mt-3 px-10">
                            Thank you for your booking! Your reservation has been successfully placed. Please proceed with your trip.
                        </Text>
                        <View className="w-full px-5 mt-5">
                            <CustomButton
                                title="Go Track"
                                onPress={() => {
                                    setSuccess(false);
                                    router.replace("/(root)/(tabs)/home");
                                }}
                                className="mt-5"
                            />
                            <CustomButton
                                title="Back Home"
                                onPress={() => {
                                    setSuccess(false);
                                    router.replace("/(root)/(tabs)/home");
                                }}
                                bgVariant="secondary"
                                textVariant="secondary"
                                className="mt-5"
                            />
                        </View>
                    </View>
                )}
            </>
        </RideLayout>
    );
};

export default BookRide;
