import React from 'react';
import { BookOpen, LogOut } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onSignOut: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-amber-100 rounded-lg">
          <BookOpen className="h-6 w-6 text-amber-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Journal</h1>
          <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
        </div>
      </div>
      
      <button
        onClick={onSignOut}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </header>
  );
}