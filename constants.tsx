
import { UserProfile } from './types';

export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Ms. Charlotte',
    username: 'char_design',
    age: 24,
    jobTitle: 'UX Designer',
    bio: 'Looking for a pioneer to build a sustainable future plan with. Expert in Web3 aesthetics.',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80'],
    location: 'Paris, France',
    interests: ['Design', 'Future Planning', 'Sustainability'],
    isPremium: true,
    stats: { activities: 24, likes: 85, moments: 46 }
  },
  {
    id: '2',
    name: 'Marcus Chen',
    username: 'marcus_vibe',
    age: 29,
    jobTitle: 'Plan Architect',
    bio: 'I trade future blueprints for Pi. Let’s collaborate on something bigger than us.',
    images: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'],
    location: 'Singapore',
    interests: ['Architecture', 'Pi Token', 'Strategy'],
    isPremium: false,
    stats: { activities: 12, likes: 230, moments: 15 }
  },
  {
    id: '3',
    name: 'Maria Clara',
    username: 'maria_pioneer',
    age: 22,
    jobTitle: 'Digital Artist',
    bio: 'Proud Pioneer from the Philippines! 🇵🇭 Looking for meaningful connections and trading art.',
    images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80'],
    location: 'Manila, PH',
    interests: ['Art', 'Island Life', 'Blockchain'],
    isPremium: true,
    stats: { activities: 56, likes: 412, moments: 120 }
  },
  {
    id: '4',
    name: 'Akinyi',
    username: 'akinyi_eco',
    age: 27,
    jobTitle: 'Agri-Tech Founder',
    bio: 'Connecting Africa through Pi. 🇰🇪 Let’s talk about sustainability and social impact.',
    images: ['https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=800&q=80'],
    location: 'Nairobi, Kenya',
    interests: ['Farming', 'Innovation', 'Travel'],
    isPremium: false,
    stats: { activities: 34, likes: 189, moments: 67 }
  },
  {
    id: '5',
    name: 'Siti Aminah',
    username: 'siti_vibe',
    age: 25,
    jobTitle: 'Content Creator',
    bio: 'Sharing the beauty of Indonesia 🇮🇩. Always down for coffee and crypto talk.',
    images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'],
    location: 'Jakarta, ID',
    interests: ['Fashion', 'Coffee', 'Vlogging'],
    isPremium: true,
    stats: { activities: 89, likes: 1024, moments: 340 }
  }
];
