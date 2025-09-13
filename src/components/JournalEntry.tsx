import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { JournalEntry as JournalEntryType } from '../types';

interface JournalEntryProps {
  entry: JournalEntryType;
  onClick: (entry: JournalEntryType) => void;
}

export function JournalEntry({ entry, onClick }: JournalEntryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPreview = (content: string) => {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

  return (
    <button
      onClick={() => onClick(entry)}
      className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-amber-300 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-gray-700">
            {formatDate(entry.createdAt)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-500" />
          <span className="text-xs text-gray-500">
            {formatTime(entry.createdAt)}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
        {getPreview(entry.content)}
      </p>
      
      <div className="mt-3 w-full h-0.5 bg-gradient-to-r from-amber-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
}