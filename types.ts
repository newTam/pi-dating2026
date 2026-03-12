
export interface UserProfile {
  id: string;
  name: string;
  username: string;
  age: number;
  bio: string;
  images: string[];
  location: string;
  interests: string[];
  isPremium: boolean;
  premiumTier?: 'BRONZE' | 'SILVER' | 'GOLD' | null;
  piBalance?: number;
  stats: {
    activities: number;
    likes: number;
    moments: number;
  };
  jobTitle?: string;
}

export interface ServerConfig {
  baseUrl: string;
  apiKey: string;
  isConnected: boolean;
  lastSync: number | null;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface MarketListing {
  id: string;
  title: string;
  seller: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  regions?: string[];
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  DISCOVER = 'DISCOVER',
  MATCHES = 'MATCHES',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  WALLET = 'WALLET',
  SHOP = 'SHOP',
  MARKET = 'MARKET',
  SETTINGS = 'SETTINGS'
}

export interface AuthState {
  isLoggedIn: boolean;
  isShowcase: boolean;
  user: UserProfile | null;
  method: 'PI' | 'EMAIL' | 'SHOWCASE' | null;
}
