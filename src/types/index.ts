export type OrderStage = 
  | 'order_received' 
  | 'po_uploaded' 
  | 'material_allocation' 
  | 'printing_in_progress' 
  | 'quality_check' 
  | 'dispatched';

export type OrderStatus = 'pending' | 'in_progress' | 'completed';

export interface StageDetail {
  id: string;
  status: OrderStatus;
  notes: string;
  files: File[];
  completedAt?: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  clientName: string;
  currentStage: OrderStage;
  lastUpdated: Date;
  stages: Record<OrderStage, StageDetail>;
  created: Date;
  createdBy: string;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}

export type UserRole = 'admin' | 'purchase' | 'production' | 'qc' | 'worker';

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: Date;
}

export interface File {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
}