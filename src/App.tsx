import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { Header } from './components/Header';
import { NewEntryForm } from './components/NewEntryForm';
import { EntriesSidebar } from './components/EntriesSidebar';
import { EntryModal } from './components/EntryModal';
import { authAPI, journalAPI } from './services/api';
import { User, JournalEntry, AuthFormData } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [entryLoading, setEntryLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const currentUser = await authAPI.getCurrentUser();
          setUser(currentUser);
          await loadEntries();
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loadEntries = async () => {
    try {
      const userEntries = await journalAPI.getEntries();
      // Sort entries by creation date (newest first)
      setEntries(userEntries.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Failed to load entries:', error);
    }
  };

  const handleAuth = async (formData: AuthFormData, isLogin: boolean) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const result = isLogin 
        ? await authAPI.login(formData)
        : await authAPI.register(formData);

      localStorage.setItem('token', result.token);
      setUser(result.user);
      await loadEntries();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Authentication failed';
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setEntries([]);
    setSelectedEntry(null);
  };

  const handleNewEntry = async (content: string) => {
    setEntryLoading(true);
    try {
      const newEntry = await journalAPI.createEntry(content);
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error('Failed to create entry:', error);
    } finally {
      setEntryLoading(false);
    }
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthForm 
        onAuth={handleAuth} 
        loading={authLoading}
        error={authError}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header user={user} onSignOut={handleSignOut} />
      
      <div className="flex-1 flex">
        <EntriesSidebar 
          entries={entries}
          onEntryClick={handleEntryClick}
        />
        
        <main className="flex-1 p-8">
          <div className="max-w-2xl">
            <NewEntryForm 
              onSubmit={handleNewEntry}
              loading={entryLoading}
            />
          </div>
        </main>
      </div>

      {selectedEntry && (
        <EntryModal 
          entry={selectedEntry}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;