export interface Repository {
  id: string;
  name: string;
  lastUpdated: Date;
  versionsCount: number;
  isShared?: boolean;
}

export interface Version {
  id: string;
  commitMessage: string;
  timestamp: Date;
  previewUrl: string;
  downloadUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}