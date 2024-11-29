import { useContext } from 'react';
import { AuthContext, AuthContextType } from './authUtils';

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};