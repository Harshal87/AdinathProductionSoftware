import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material, Order, User } from '../types';

interface AppState {
  orders: Order[];
  materials: Material[];
  users: User[];
  currentUser: User | null;
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

interface AppContextType extends AppState {
  updateOrder: (order: Order) => Promise<void>;
  selectOrder: (order: Order | null) => void;
  updateMaterial: (material: Material) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    orders: [],
    materials: [],
    users: [],
    currentUser: null,
    selectedOrder: null,
    loading: true,
    error: null,
  });

  const refreshData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      // Fetch all data in parallel
      const [
        { data: orders, error: ordersError },
        { data: materials, error: materialsError },
        { data: users, error: usersError }
      ] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('materials').select('*'),
        supabase.from('users').select('*')
      ]);

      if (ordersError) throw ordersError;
      if (materialsError) throw materialsError;
      if (usersError) throw usersError;

      // Fetch current user data if session exists
      let currentUser = null;
      if (session?.user?.id) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userError) {
          console.error('Error fetching current user:', userError);
        } else {
          currentUser = userData;
        }
      }

      setState(prev => ({
        ...prev,
        orders: orders || [],
        materials: materials || [],
        users: users || [],
        currentUser,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  };

  useEffect(() => {
    refreshData();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateOrder = async (order: Order) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { error } = await supabase
        .from('orders')
        .update(order)
        .eq('id', order.id);

      if (error) throw error;

      await refreshData();
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  };

  const selectOrder = (order: Order | null) => {
    setState(prev => ({ ...prev, selectedOrder: order }));
  };

  const updateMaterial = async (material: Material) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { error } = await supabase
        .from('materials')
        .update(material)
        .eq('id', material.id);

      if (error) throw error;

      await refreshData();
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateOrder,
        selectOrder,
        updateMaterial,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};