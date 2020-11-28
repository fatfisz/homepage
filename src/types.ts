import { ReactNode } from 'react';

export interface ApiPostContent {
  date: string;
  title: string;
  excerpt: string;
  body: string;
}

export interface ApiPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
}

export interface ApiShortPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
}

export interface Post {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  body: ReactNode;
}
