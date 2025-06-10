// Core interfaces for FeedCard component

interface Position {
  latitude: number;
  longitude: number;
}

interface Location {
  city: string;
  country: string;
  position: Position;
}

interface Exif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

interface Tag {
  title: string;
}

interface Collection {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: string | null;
  user: string | null;
}

interface PhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface PhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

interface UserProfilePhoto {
  small: string;
  medium: string;
  large: string;
}

interface UserBadge {
  title: string;
  primary: boolean;
  slug: string;
  link: string;
}

export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  links: UserLinks;
  downloads: number;
  profile_image: UserProfilePhoto;
  badge: UserBadge;
}

// Main FeedCard interface
interface FeedCard {
  alt_description: string;
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  public_domain: boolean;
  description: string;
  exif: Exif;
  location: Location;
  tags: Tag[];
  current_user_collections: Collection[];
  urls: PhotoUrls;
  links: PhotoLinks;
  user: User;
}

// Export the main interface
export type { FeedCard };

