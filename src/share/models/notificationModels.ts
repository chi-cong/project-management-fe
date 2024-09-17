export interface Notification {
  is_read?: boolean;
  notifications: {
    content: string;
    createdAt?: string;
    createdBy?: string;
    modifiedBy?: string | null;
    notification_id: string;
  };
  user_notifications_id: string;
}

export interface NotificationResp {
  currentPage: number;
  itemsPerPage: number;
  nextPage?: number;
  previousPage?: number;
  total: number;
  notifications: Notification[];
}
