import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    email: string;
    name: string;
    attManager: boolean;
    id: number;
    permissionCode: number;
    phone: string;
    profileMessage: string;
    semester: number;
    teamCode: number;
    // ... 다른 필요한 필드
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;  // 추가된 부분
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;  // 추가된 부분
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  // 추가된 부분

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, isLoggedIn, setIsLoggedIn }}>  {/* 수정된 부분 */}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
