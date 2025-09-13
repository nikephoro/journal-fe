import React, { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

interface NewEntryFormProps {
  onSubmit: (content: string) => Promise<void>;
  loading: boolean;
}

export function NewEntryForm({ onSubmit, loading }: NewEntryFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Entry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="entry-content" className="sr-only">
            Write your thoughts
          </label>
          <textarea
            id="entry-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            required
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {content.length} characters
          </span>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span>{loading ? 'Saving...' : 'Add Entry'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}