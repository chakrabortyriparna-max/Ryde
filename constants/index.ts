import check from "@/assets/images/check.png";
import icon from "@/assets/images/icon.png"; // Fallback for missing icons
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signupCar from "@/assets/images/signup-car.png";
import map from "@/assets/images/map.png";
import driver1 from "@/assets/images/driver1.png";
import driver2 from "@/assets/images/driver2.png";
import driver3 from "@/assets/images/driver3.png";

import out from "@/assets/icons/out.png";
import search from "@/assets/icons/search.png";
import point from "@/assets/icons/point.png";
import to from "@/assets/icons/to.png";
import marker from "@/assets/icons/marker.png";
import backArrow from "@/assets/icons/back-arrow.png";
import star from "@/assets/icons/star.png";
import dollar from "@/assets/icons/dollar.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import chat from "@/assets/icons/chat.png";
import profile from "@/assets/icons/profile.png";
import pin from "@/assets/icons/pin.png";

export const images = {
    onboarding1,
    onboarding2,
    onboarding3,
    signupCar,
    check,
    map,
    driver1,
    driver2,
    driver3,
};

export const icons = {
    marker,
    point,
    search,
    home,
    list,
    chat,
    profile,
    out,
    to,
    backArrow,
    star,
    dollar,
    pin,
};

export const recentRides = [
    {
        ride_id: "1",
        origin_address: "Kathmandu, Nepal",
        destination_address: "Pokhara, Nepal",
        origin_latitude: "27.7172",
        origin_longitude: "85.3240",
        destination_latitude: "28.2096",
        destination_longitude: "83.9856",
        ride_time: 391,
        fare_price: "19500.00",
        payment_status: "paid",
        driver_id: 2,
        user_id: "1",
        created_at: "2024-08-12 05:19:20.620007",
        driver: {
            first_name: "David",
            last_name: "Brown",
            car_seats: 5,
        },
        ride_map: images.map,
    },
    {
        ride_id: "2",
        origin_address: "Jalkot, MH",
        destination_address: "Pune, Maharashtra, India",
        origin_latitude: "18.6024",
        origin_longitude: "73.8167",
        destination_latitude: "18.5204",
        destination_longitude: "73.8567",
        ride_time: 491,
        fare_price: "24500.00",
        payment_status: "paid",
        driver_id: 1,
        user_id: "1",
        created_at: "2024-08-12 06:12:17.683046",
        driver: {
            first_name: "James",
            last_name: "Wilson",
            car_seats: 4,
        },
        ride_map: images.map,
    },
    {
        ride_id: "3",
        origin_address: "Zagreb, Croatia",
        destination_address: "Rijeka, Croatia",
        origin_latitude: "45.8150",
        origin_longitude: "15.9819",
        destination_latitude: "45.3271",
        destination_longitude: "14.4422",
        ride_time: 124,
        fare_price: "6200.00",
        payment_status: "paid",
        driver_id: 1,
        user_id: "1",
        created_at: "2024-08-12 08:49:01.809053",
        driver: {
            first_name: "James",
            last_name: "Wilson",
            car_seats: 4,
        },
        ride_map: images.map,
    },
    {
        ride_id: "4",
        origin_address: "Okayama, Japan",
        destination_address: "Osaka, Japan",
        origin_latitude: "34.6555",
        origin_longitude: "133.9198",
        destination_latitude: "34.6937",
        destination_longitude: "135.5023",
        ride_time: 159,
        fare_price: "7900.00",
        payment_status: "paid",
        driver_id: 3,
        user_id: "1",
        created_at: "2024-08-12 18:43:54.297838",
        driver: {
            first_name: "Michael",
            last_name: "Johnson",
            car_seats: 4,
        },
        ride_map: images.map,
    },
];

import esther from "@/assets/images/esther.png";
import robert from "@/assets/images/robert.png";

export const drivers = [
    {
        id: "1",
        first_name: "Jane",
        last_name: "Cooper",
        profile_image_url:
            "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        car_image_url:
            "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        car_seats: 4,
        rating: "4.80",
        price: "60.00",
        time: "10 min",
    },
    {
        id: "2",
        first_name: "Esther",
        last_name: "Howard",
        profile_image_url: esther,
        car_image_url:
            "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 4,
        rating: "3.50",
        price: "65.00",
        time: "12 min",
    },
    {
        id: "3",
        first_name: "Leslie",
        last_name: "Alexander",
        profile_image_url:
            "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        car_image_url:
            "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        car_seats: 4,
        rating: "5.00",
        price: "70.00",
        time: "10 min",
    },
    {
        id: "4",
        first_name: "Robert",
        last_name: "Fox",
        profile_image_url: robert,
        car_image_url:
            "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        car_seats: 4,
        rating: "4.50",
        price: "68.00",
        time: "16 min",
    },
];
