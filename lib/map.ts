import { Driver, MarkerData } from "@/types/type";

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

export const generateMarkersFromData = ({
    data,
    userLatitude,
    userLongitude,
}: {
    data: Driver[];
    userLatitude: number;
    userLongitude: number;
}): MarkerData[] => {
    return data.map((driver) => {
        const latOffset = (Math.random() - 0.5) * 0.01;
        const lngOffset = (Math.random() - 0.5) * 0.01;

        return {
            latitude: userLatitude + latOffset,
            longitude: userLongitude + lngOffset,
            title: `${driver.first_name} ${driver.last_name}`,
            ...driver,
        };
    });
};

export const calculateRegion = ({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
}: {
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude?: number | null;
    destinationLongitude?: number | null;
}) => {
    if (!userLatitude || !userLongitude) {
        return {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
    }

    if (!destinationLatitude || !destinationLongitude) {
        return {
            latitude: userLatitude,
            longitude: userLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
    }

    const minLat = Math.min(userLatitude, destinationLatitude);
    const maxLat = Math.max(userLatitude, destinationLatitude);
    const minLng = Math.min(userLongitude, destinationLongitude);
    const maxLng = Math.max(userLongitude, destinationLongitude);

    const latitudeDelta = (maxLat - minLat) * 1.3; // Add some padding
    const longitudeDelta = (maxLng - minLng) * 1.3; // Add some padding

    const latitude = (maxLat + minLat) / 2;
    const longitude = (maxLng + minLng) / 2;

    return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
    };
};

export const calculateDriverTimes = async ({
    markers,
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
}: {
    markers: MarkerData[];
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude: number | null;
    destinationLongitude: number | null;
}) => {
    if (
        !userLatitude ||
        !userLongitude ||
        !destinationLatitude ||
        !destinationLongitude
    ) {
        return;
    }

    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/routing?waypoints=${userLatitude},${userLongitude}|${destinationLatitude},${destinationLongitude}&mode=drive&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
        );

        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const route = data.features[0];
            const time = route.properties.time; // in seconds
            const distance = route.properties.distance; // in meters
            const price = (distance / 1000) * 0.5 + (time / 60) * 0.2 + 40; // Base calculation

            return {
                time: Math.round(time / 60), // in minutes
                price: Math.round(price),
                distance: Math.round(distance / 1000), // in km
                coordinates: route.geometry.coordinates[0].map(([lon, lat]: any) => ({
                    latitude: lat,
                    longitude: lon,
                })),
            };
        }
    } catch (error) {
        console.error("Error calculating driver times:", error);
    }
};

export const getRoute = async ({
    originLatitude,
    originLongitude,
    destinationLatitude,
    destinationLongitude,
}: {
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
}) => {
    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/routing?waypoints=${originLatitude},${originLongitude}|${destinationLatitude},${destinationLongitude}&mode=drive&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
        );

        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const route = data.features[0];
            const time = route.properties.time; // in seconds
            const distance = route.properties.distance; // in meters
            const price = (distance / 1000) * 0.5 + (time / 60) * 0.2 + 40; // Base calculation

            return {
                time: Math.round(time / 60), // in minutes
                price: Math.round(price),
                distance: Math.round(distance / 1000), // in km
                coordinates: route.geometry.coordinates[0].map(([lon, lat]: any) => ({
                    latitude: lat,
                    longitude: lon,
                })),
            };
        }
    } catch (error) {
        console.error("Error fetching route:", error);
    }
};
