import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, Image } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { icons } from "@/constants";
import { calculateRegion, generateMarkersFromData, calculateDriverTimes } from "@/lib/map";
import { MarkerData } from "@/types/type";

const drivers = [
    {
        id: "1",
        first_name: "James",
        last_name: "Wilson",
        profile_image_url:
            "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        car_image_url:
            "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        car_seats: 4,
        rating: "4.80",
    },
    {
        id: "2",
        first_name: "David",
        last_name: "Brown",
        profile_image_url:
            "https://ucarecdn.com/6ea6d83d-ef1a-4838-8ce5-455a18b42636/-/preview/876x1000/",
        car_image_url:
            "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 5,
        rating: "4.60",
    },
    {
        id: "3",
        first_name: "Michael",
        last_name: "Johnson",
        profile_image_url:
            "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        car_image_url:
            "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        car_seats: 4,
        rating: "4.70",
    },
    {
        id: "4",
        first_name: "Robert",
        last_name: "Green",
        profile_image_url:
            "https://ucarecdn.com/fdfc4f8c-c96d-47bd-9818-3f26acd05641/-/preview/500x500/",
        car_image_url:
            "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        car_seats: 4,
        rating: "4.90",
    },
];

interface MapProps {
    destinationLatitude?: number;
    destinationLongitude?: number;
    onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
    selectedDriver?: number | null;
    onMapReady?: () => void;
}

const Map = ({
    destinationLatitude,
    destinationLongitude,
    onDriverTimesCalculated,
    selectedDriver,
    onMapReady,
}: MapProps) => {
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLocation) return;

            const newMarkers = generateMarkersFromData({
                data: drivers as any, // Cast to any to avoid id type mismatch for now
                userLatitude: userLocation.latitude,
                userLongitude: userLocation.longitude,
            });

            setMarkers(newMarkers);
        }
    }, [drivers, userLocation]);

    useEffect(() => {
        if (
            markers.length > 0 &&
            destinationLatitude &&
            destinationLongitude &&
            userLocation
        ) {
            calculateDriverTimes({
                markers,
                userLatitude: userLocation.latitude,
                userLongitude: userLocation.longitude,
                destinationLatitude,
                destinationLongitude,
            }).then((driverTimes) => {
                if (driverTimes) {
                    // We are not updating drivers here as we removed the store, 
                    // but we can pass it up if needed via onDriverTimesCalculated
                    // For now, just setting the route
                    setDestinationCoordinates(driverTimes.coordinates);
                }
            });
        }
    }, [markers, destinationLatitude, destinationLongitude, userLocation]);

    const region = calculateRegion({
        userLatitude: userLocation?.latitude || null,
        userLongitude: userLocation?.longitude || null,
        destinationLatitude: destinationLatitude || null,
        destinationLongitude: destinationLongitude || null,
    });

    if (!userLocation) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            style={{ width: "100%", height: "100%", borderRadius: 16 }}
            tintColor="black"
            mapType="standard"
            showsPointsOfInterest={false}
            initialRegion={region}
            showsUserLocation={true}
            userInterfaceStyle="light"
            onMapReady={onMapReady}
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                    title={marker.title}
                    image={
                        selectedDriver === marker.id ? icons.marker : icons.marker
                    }
                />
            ))}

            {destinationLatitude && destinationLongitude && (
                <>
                    <Marker
                        key="destination"
                        coordinate={{
                            latitude: Number(destinationLatitude),
                            longitude: Number(destinationLongitude),
                        }}
                        title="Destination"
                    >
                        <Image source={icons.pin} className="w-10 h-10" resizeMode="contain" />
                    </Marker>

                    <Polyline
                        coordinates={destinationCoordinates}
                        strokeColor="#0286FF"
                        strokeWidth={2}
                    />
                </>
            )}
        </MapView>
    );
};

export default Map;
