import React from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { JournalEntry } from '../types';

interface EntryModalProps {
  entry: JournalEntry;
  onClose: () => void;
}

export function EntryModal({ entry, onClose }: EntryModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-amber-600">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{formatDate(entry.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatTime(entry.createdAt)}</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}