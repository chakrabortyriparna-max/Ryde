<div align="center">

# 🚗 Ryde

### A Production-Grade Ride-Sharing Platform

A full-stack mobile application replicating the core functionalities of industry leaders like **Uber** and **Lyft**. Built with a mobile-first approach using React Native and Expo, featuring real-time geolocation, secure payments, and scalable serverless architecture.

---

![React Native](https://img.shields.io/badge/React_Native-0.81.5-white?style=for-the-badge&logo=react&logoColor=white&labelColor=61DAFB&color=20232A)
![Expo](https://img.shields.io/badge/Expo-54.0-white?style=for-the-badge&logo=expo&logoColor=white&labelColor=4630EB&color=000020)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-white?style=for-the-badge&logo=typescript&logoColor=white&labelColor=3178C6&color=235A97)
![React](https://img.shields.io/badge/React-19.1-white?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=20232A&color=61DAFB)
![Expo Router](https://img.shields.io/badge/Expo_Router-6.0-white?style=for-the-badge&logo=expo&logoColor=white&labelColor=7B61FF&color=4630EB)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-white?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=4169E1&color=336791)
![NeonDB](https://img.shields.io/badge/NeonDB-Serverless-white?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=00E599&color=00B87D)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-white?style=for-the-badge&logo=vercel&logoColor=black&labelColor=FFFFFF&color=000000)
![Stripe](https://img.shields.io/badge/Stripe-Payments-white?style=for-the-badge&logo=stripe&logoColor=white&labelColor=635BFF&color=0055FF)
![Clerk](https://img.shields.io/badge/Clerk-Auth-white?style=for-the-badge&logo=clerk&logoColor=white&labelColor=6C47FF&color=4B32C3)

![Google Maps](https://img.shields.io/badge/Google_Maps-SDK-white?style=for-the-badge&logo=googlemaps&logoColor=white&labelColor=34A853&color=4285F4)
![Geoapify](https://img.shields.io/badge/Geoapify-Geocoding-white?style=for-the-badge&logo=openstreetmap&logoColor=white&labelColor=00B4D8&color=0096C7)
![Google OAuth](https://img.shields.io/badge/Google-OAuth-white?style=for-the-badge&logo=google&logoColor=white&labelColor=EA4335&color=FBBC05)
![Uploadcare](https://img.shields.io/badge/Uploadcare-CDN-white?style=for-the-badge&logo=cloudflare&logoColor=white&labelColor=FF6B35&color=F7931E)

![NativeWind](https://img.shields.io/badge/NativeWind-4.2-white?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=38BDF8&color=0EA5E9)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-white?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=06B6D4&color=0891B2)
![Reanimated](https://img.shields.io/badge/Reanimated-4.1-white?style=for-the-badge&logo=react&logoColor=white&labelColor=FF4154&color=EC4899)
![React Navigation](https://img.shields.io/badge/React_Nav-7.0-white?style=for-the-badge&logo=react&logoColor=white&labelColor=6B52AE&color=8B5CF6)
![Bottom Sheet](https://img.shields.io/badge/BottomSheet-5.2-white?style=for-the-badge&logo=react&logoColor=white&labelColor=9333EA&color=A855F7)

![EAS Build](https://img.shields.io/badge/EAS-Build-white?style=for-the-badge&logo=expo&logoColor=white&labelColor=0EA5E9&color=4630EB)
![ESLint](https://img.shields.io/badge/ESLint-9.25-white?style=for-the-badge&logo=eslint&logoColor=white&labelColor=4B32C3&color=8080F2)
![Serverless](https://img.shields.io/badge/Serverless-Arch-white?style=for-the-badge&logo=serverless&logoColor=white&labelColor=FD5750&color=FF7B66)

</div>

---

## 📋 Table of Contents

- [🎯 Executive Summary](#-executive-summary)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Complete Technology Stack](#️-complete-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📡 API Documentation](#-api-documentation)
- [🗄️ Database Schema](#️-database-schema)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Executive Summary

**Ryde** is a feature-rich, production-ready ride-sharing application that demonstrates enterprise-grade mobile development practices. The platform enables users to:

- 🗺️ **Find Rides** - Search and book rides with real-time driver tracking
- 💳 **Secure Payments** - Process payments seamlessly via Stripe integration
- 🔐 **Authentication** - Secure user authentication with Clerk OAuth
- 📍 **Live Tracking** - Real-time GPS tracking with Google Maps
- 📊 **Ride History** - Complete ride history and trip management

### Business Value

| Metric | Description |
|--------|-------------|
| **Scalability** | Serverless architecture on NeonDB handles unlimited concurrent users |
| **Security** | Enterprise-grade auth with Clerk + PCI-compliant payments via Stripe |
| **Performance** | Optimized React Native with New Architecture for 60fps animations |
| **Cross-Platform** | Single codebase for iOS, Android, and Web |

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Clerk Integration** - OAuth, Email/Password, and Social logins
- **Secure Store** - Encrypted credential storage with Expo SecureStore
- **Session Management** - Automatic token refresh and session handling

### 🗺️ Maps & Navigation
- **Google Maps Native** - Real-time maps with custom markers and polylines
- **Geoapify Integration** - Address autocomplete and route calculation
- **Route Visualization** - Dynamic polyline rendering for trip routes
- **Driver Tracking** - Live driver location updates with custom pins

### 💳 Payment Processing
- **Stripe React Native SDK** - Native payment sheet integration
- **Payment Intents API** - Secure server-side payment processing
- **Customer Management** - Stripe customer creation and management
- **Fare Calculation** - Dynamic pricing based on distance and time

### 📱 User Experience
- **Bottom Sheet Navigation** - Smooth, gesture-based interactions with @gorhom/bottom-sheet
- **Onboarding Carousel** - Beautiful swiper-based onboarding screens
- **Haptic Feedback** - Tactile responses for key actions
- **Custom Typography** - Plus Jakarta Sans font family
- **Dark Mode Support** - Automatic theme switching

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph Client["📱 Mobile Client - React Native + Expo 54"]
        RN[React Native 0.81.5]
        TS[TypeScript 5.9]
        NW[NativeWind/TailwindCSS]
        RA[Reanimated 4.1]
    end

    subgraph Auth["🔐 Authentication Layer"]
        CLERK[Clerk SDK]
        SS[Expo SecureStore]
        TOKEN[Token Cache]
    end

    subgraph API["⚡ Serverless API Layer - Expo Router"]
        RIDE_API["/api/ride/*"]
        USER_API["/api/neondb"]
        STRIPE_API["/api/stripe/*"]
    end

    subgraph External["🌐 External Services"]
        MAPS[Google Maps Platform]
        GEO[Geoapify API]
        STRIPE[Stripe SDK]
        CDN[Uploadcare CDN]
    end

    subgraph Database["🗄️ Database Layer"]
        NEON[(NeonDB - Serverless PostgreSQL)]
    end

    RN --> TS
    TS --> NW
    NW --> RA
    
    RN --> CLERK
    CLERK --> SS
    SS --> TOKEN
    
    RN --> API
    API --> NEON
    
    RN --> MAPS
    RN --> GEO
    RN --> STRIPE
    STRIPE_API --> STRIPE
    RN --> CDN
```

### Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant C as Clerk
    participant G as Geoapify
    participant M as Maps
    participant S as Stripe
    participant N as NeonDB

    U->>A: Open App
    A->>C: Authenticate
    C-->>A: JWT Token
    
    U->>A: Search Location
    A->>G: Autocomplete Query
    G-->>A: Location Suggestions
    
    U->>A: Select Destination
    A->>G: Calculate Route
    G-->>A: Route + ETA + Price
    A->>M: Render Route Polyline
    
    U->>A: Confirm Ride
    A->>S: Create Payment Intent
    S-->>A: Payment Sheet
    U->>A: Complete Payment
    A->>N: Save Ride Record
    N-->>A: Confirmation
```

---

## 🛠️ Complete Technology Stack

### 📱 Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.81.5 | Cross-platform mobile framework |
| **Expo SDK** | 54.0 | Development platform & native APIs |
| **TypeScript** | 5.9 | Type-safe JavaScript |
| **React** | 19.1 | UI component library |
| **Expo Router** | 6.0 | File-based routing & API routes |

### 🎨 Styling & Animation

| Technology | Version | Purpose |
|------------|---------|---------|
| **NativeWind** | 4.2.1 | TailwindCSS for React Native |
| **TailwindCSS** | 3.4.18 | Utility-first CSS framework |
| **React Native Reanimated** | 4.1.1 | High-performance animations |
| **React Native Gesture Handler** | 2.28.0 | Touch gesture system |
| **clsx** | 2.1.1 | Conditional classname utility |
| **tailwind-merge** | 3.4.0 | Tailwind class conflict resolution |

### 🗺️ Maps & Location Services

| Technology | Purpose |
|------------|---------|
| **React Native Maps** | Native map component with markers & polylines |
| **Google Maps Platform** | Android map tiles & geocoding |
| **Geoapify API** | Address autocomplete & route calculation |
| **Expo Location** | GPS coordinates & permissions |

### 🔐 Authentication

| Technology | Version | Purpose |
|------------|---------|---------|
| **@clerk/clerk-expo** | 2.19.9 | OAuth & session management |
| **Expo SecureStore** | 15.0.8 | Encrypted token storage |
| **Expo Auth Session** | 7.0.10 | OAuth flow handling |
| **Expo Web Browser** | 15.0.10 | In-app browser for OAuth |

### 💳 Payments

| Technology | Version | Purpose |
|------------|---------|---------|
| **@stripe/stripe-react-native** | 0.50.3 | Native payment sheet UI |
| **stripe** (Server SDK) | 20.0.0 | Server-side payment intents |

### 🗄️ Database

| Technology | Version | Purpose |
|------------|---------|---------|
| **@neondatabase/serverless** | 1.0.2 | Serverless PostgreSQL client |
| **NeonDB** | - | Serverless PostgreSQL hosting |

### 🧩 UI Components

| Technology | Version | Purpose |
|------------|---------|---------|
| **@gorhom/bottom-sheet** | 5.2.8 | Gesture-driven bottom sheets |
| **react-native-swiper** | 1.6.0 | Onboarding carousel |
| **react-native-modal** | 14.0.0-rc.1 | Modal dialogs |
| **react-native-svg** | 15.12.1 | SVG rendering |
| **@expo/vector-icons** | 15.0.3 | Icon library |
| **expo-image** | 3.0.11 | Optimized image loading |

### 📝 Typography & Fonts

| Technology | Purpose |
|------------|---------|
| **@expo-google-fonts/plus-jakarta-sans** | Custom font family |
| **expo-font** | Font loading system |

### 📱 Native Features

| Technology | Purpose |
|------------|---------|
| **expo-haptics** | Tactile feedback |
| **expo-image-picker** | Photo selection |
| **expo-splash-screen** | Launch screen |
| **expo-status-bar** | Status bar customization |
| **expo-linking** | Deep linking |
| **expo-constants** | App configuration |

### 🛠️ Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.25.0 | Code linting |
| **eslint-config-expo** | 10.0.0 | Expo-specific lint rules |
| **@vercel/node** | 5.5.15 | Node.js runtime |
| **Metro** | - | JavaScript bundler |
| **Babel** | - | JavaScript transpiler |

### ☁️ Cloud Services

| Service | Purpose |
|---------|---------|
| **EAS Build** | Cloud-based app builds |
| **Uploadcare CDN** | Image hosting for drivers/vehicles |
| **NeonDB Cloud** | Serverless PostgreSQL hosting |
| **Stripe** | Payment processing |
| **Clerk** | Authentication service |

---

## 📁 Project Structure

```
ryde/
├── 📱 app/                          # Application screens & API routes
│   ├── (api)/                       # Serverless API endpoints
│   │   ├── neondb+api.ts           # Database initialization
│   │   ├── ride/                    # Ride management endpoints
│   │   │   ├── create+api.ts       # Create new ride
│   │   │   ├── recent+api.ts       # Get recent rides
│   │   │   └── all+api.ts          # Get all rides
│   │   └── stripe/                  # Payment endpoints
│   │       └── create+api.ts       # Create payment intent
│   ├── (auth)/                      # Authentication screens
│   │   ├── sign-in.tsx             # Sign in screen
│   │   ├── sign-up.tsx             # Sign up screen
│   │   └── welcome.tsx             # Onboarding carousel
│   ├── (root)/                      # Main app screens
│   │   ├── (tabs)/                  # Tab navigation
│   │   │   ├── home.tsx            # Home dashboard
│   │   │   ├── rides.tsx           # Ride history
│   │   │   ├── chat.tsx            # Messages
│   │   │   └── profile.tsx         # User profile
│   │   ├── find-ride.tsx           # Search for rides
│   │   ├── confirm-ride.tsx        # Driver selection
│   │   └── book-ride.tsx           # Payment & booking
│   ├── _layout.native.tsx          # Native root layout (Clerk + Stripe providers)
│   └── _layout.tsx                  # Web root layout
│
├── 🧩 components/                   # Reusable UI components
│   ├── Map.tsx                      # Google Maps with markers & polylines
│   ├── GoogleTextInput.tsx         # Geoapify autocomplete search
│   ├── DriverCard.tsx              # Driver information card
│   ├── RideCard.tsx                # Ride summary card
│   ├── RideLayout.tsx              # Bottom sheet layout
│   ├── RideInfo.tsx                # Ride details display
│   ├── CustomButton.tsx            # Styled button variants
│   ├── InputField.tsx              # Form input component
│   └── ui/                          # Base UI components
│
├── 📚 lib/                          # Utility libraries
│   ├── auth.ts                      # Clerk authentication helpers
│   ├── fetch.ts                     # API fetching with error handling
│   └── map.ts                       # Geoapify route & marker calculations
│
├── 🪝 hooks/                        # Custom React hooks
│   ├── useFetch.ts                 # Data fetching hook
│   └── useColorScheme.ts           # Theme detection hook
│
├── 📝 types/                        # TypeScript definitions
│   └── type.d.ts                   # Driver, Ride, Marker interfaces
│
├── 🎨 constants/                    # App constants
│   └── index.ts                     # Colors, icons, driver data
│
├── 🖼️ assets/                       # Static assets
│   └── images/                      # Icons, onboarding, splash
│
└── ⚙️ Configuration Files
    ├── app.json                     # Expo & EAS configuration
    ├── eas.json                     # EAS Build profiles
    ├── tailwind.config.js          # NativeWind theme
    ├── metro.config.js             # Metro bundler + NativeWind
    ├── babel.config.js             # Babel + Reanimated plugin
    ├── tsconfig.json               # TypeScript configuration
    └── global.css                   # Tailwind base styles
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** for builds (`npm install -g eas-cli`)
- **Android Studio** / **Xcode** for emulators

### Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# NeonDB Database
DATABASE_URL=postgresql://user:password@host/database

# Stripe Payments
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Geoapify (Geocoding & Routing)
EXPO_PUBLIC_GEOAPIFY_API_KEY=xxxxx

# Google Maps (Android)
# Configured in app.json → android.config.googleMaps.apiKey
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chakrabortyriparna-max/Ryde.git
   cd Ryde
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

### Building for Production

```bash
# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production

# Build APK for testing
eas build --platform android --profile preview
```

---

## 📡 API Documentation

### Base URL
All API routes are accessible via Expo Router API Routes at `/<origin>/api/*`

### Endpoints

#### 🚗 Rides

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ride/create` | Create a new ride |
| `GET` | `/api/ride/recent` | Get recent rides for user |
| `GET` | `/api/ride/all` | Get all rides for user |

#### Create Ride
```http
POST /api/ride/create
Content-Type: application/json

{
  "origin_address": "123 Main St, City",
  "destination_address": "456 Oak Ave, Town",
  "origin_latitude": 37.7749,
  "origin_longitude": -122.4194,
  "destination_latitude": 37.3382,
  "destination_longitude": -121.8863,
  "ride_time": 25,
  "fare_price": 24.50,
  "payment_status": "paid",
  "driver_id": 1,
  "user_id": "clerk_user_id",
  "user_name": "John Doe",
  "user_email": "john@example.com"
}
```

**Response:**
```json
{
  "data": {
    "ride_id": 1,
    "origin_address": "123 Main St, City",
    "destination_address": "456 Oak Ave, Town",
    "fare_price": 24.50,
    "created_at": "2024-01-15T10:30:00Z"
  },
  "success": true
}
```

#### 💳 Stripe Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/stripe/create` | Create Stripe payment intent |

#### Create Payment Intent
```http
POST /api/stripe/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 25
}
```

**Response:**
```json
{
  "paymentIntent": {
    "id": "pi_xxxxx",
    "client_secret": "pi_xxxxx_secret_xxxxx"
  },
  "ephemeralKey": {
    "secret": "ek_xxxxx"
  },
  "customer": "cus_xxxxx"
}
```

#### 👤 Database

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/neondb` | Database initialization & user management |

---

## 🗄️ Database Schema

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email UK
        string clerk_id UK
        timestamp created_at
    }

    DRIVERS {
        int id PK
        string first_name
        string last_name
        string profile_image_url
        string car_image_url
        int car_seats
        decimal rating
    }

    RIDES {
        int ride_id PK
        string origin_address
        string destination_address
        decimal origin_latitude
        decimal origin_longitude
        decimal destination_latitude
        decimal destination_longitude
        int ride_time
        decimal fare_price
        string payment_status
        int driver_id FK
        int user_id FK
        timestamp created_at
    }

    USERS ||--o{ RIDES : "takes"
    DRIVERS ||--o{ RIDES : "drives"
```

---

## 🔧 External API Integration

### Geoapify API

Used for geocoding and routing calculations:

```typescript
// Address Autocomplete
GET https://api.geoapify.com/v1/geocode/autocomplete
  ?text={query}
  &apiKey={GEOAPIFY_API_KEY}

// Route Calculation
GET https://api.geoapify.com/v1/routing
  ?waypoints={origin_lat},{origin_lng}|{dest_lat},{dest_lng}
  &mode=drive
  &apiKey={GEOAPIFY_API_KEY}
```

### Google Maps Platform

- **Maps SDK for Android/iOS** - Native map rendering
- **Geocoding API** - Coordinate to address conversion

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### Built with ❤️ by Riparna Chakraborty

Using **React Native** & **Expo**

[![GitHub](https://img.shields.io/badge/GitHub-chakrabortyriparna--max-181717?style=for-the-badge&logo=github)](https://github.com/chakrabortyriparna-max)

**[⬆ Back to Top](#-ryde)**

</div>
