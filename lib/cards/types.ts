export interface CardData {
  id: string;
  type: 'standard' | 'featured' | 'minimal' | 'rich-media' | 'link' | 'custom';
  source: 'internal' | 'external' | 'hybrid';
  title: string;
  description: string;
  slug?: string;
  variant?: string;
  image?: string;
  icon?: string;
  date?: string;
  tags?: string[];
  links?: {
    github?: string;
    demo?: string;
    npm?: string;
    external?: string;
  };
  externalData?: Record<string, unknown>;
  lastFetched?: number;
  expiresAt?: number;
}

export interface CardInteraction {
  cardId: string;
  viewCount: number;
  lastViewed: number;
  expanded: boolean;
  favorited: boolean;
}

export interface UserPreference {
  key: string;
  value: unknown;
}
