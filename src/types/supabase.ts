export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: string
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: string
          avatar_url?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          client_name: string
          current_stage: string
          created_at: string
          last_updated: string
          created_by: string
        }
        Insert: {
          id: string
          client_name: string
          current_stage: string
          created_at?: string
          last_updated?: string
          created_by: string
        }
        Update: {
          id?: string
          client_name?: string
          current_stage?: string
          created_at?: string
          last_updated?: string
          created_by?: string
        }
      }
      order_stages: {
        Row: {
          id: string
          order_id: string
          stage: string
          status: string
          notes: string | null
          completed_at: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          id?: string
          order_id: string
          stage: string
          status: string
          notes?: string | null
          completed_at?: string | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          id?: string
          order_id?: string
          stage?: string
          status?: string
          notes?: string | null
          completed_at?: string | null
          updated_at?: string
          updated_by?: string
        }
      }
      order_files: {
        Row: {
          id: string
          order_id: string
          stage: string
          name: string
          url: string
          type: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          id?: string
          order_id: string
          stage: string
          name: string
          url: string
          type: string
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          id?: string
          order_id?: string
          stage?: string
          name?: string
          url?: string
          type?: string
          uploaded_at?: string
          uploaded_by?: string
        }
      }
      materials: {
        Row: {
          id: string
          name: string
          quantity: number
          unit: string
          min_threshold: number
          created_at: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          id?: string
          name: string
          quantity: number
          unit: string
          min_threshold: number
          created_at?: string
          updated_at?: string
          updated_by: string
        }
        Update: {
          id?: string
          name?: string
          quantity?: number
          unit?: string
          min_threshold?: number
          created_at?: string
          updated_at?: string
          updated_by?: string
        }
      }
    }
  }
}