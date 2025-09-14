import React, { useState } from 'react';
import { X, Calendar, Clock, Trash2, Edit2, Play } from 'lucide-react';
import { JournalEntry } from '../types';

interface EntryModalProps {
  entry: JournalEntry;
  onClose: () => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function EntryModal({ entry, onClose, onUpdate, onDelete }: EntryModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const CHARACTER_LIMIT = 255;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setIsLoading(true);
      try {
        await onDelete(entry.id);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setEditContent(entry.content); // Reset content when toggling edit mode
  };

  const handleUpdate = async () => {
    if (editContent !== entry.content && editContent.length <= CHARACTER_LIMIT) {
      setIsLoading(true);
      try {
        await onUpdate(entry.id, editContent);
        setIsEditing(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= CHARACTER_LIMIT) {
      setEditContent(newContent);
    }
  };

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
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleEditMode}
              disabled={isLoading}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
              title={isEditing ? "Cancel editing" : "Edit entry"}
            >
              <Edit2 className="h-5 w-5 text-blue-400" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete entry"
            >
              <Trash2 className="h-5 w-5 text-red-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 min-h-0">
          <div className="h-full relative">
            {isEditing ? (
              <div className="h-full pb-14 relative">
                <textarea
                  value={editContent}
                  onChange={handleChange}
                  className="w-full h-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-y-auto break-words whitespace-pre-wrap"
                  disabled={isLoading}
                  autoFocus
                  maxLength={CHARACTER_LIMIT}
                  style={{ overflowX: 'hidden', wordWrap: 'break-word' }}
                />

                <button
                  onClick={handleUpdate}
                  disabled={isLoading || editContent === entry.content || editContent.length > CHARACTER_LIMIT}
                  className="absolute bottom-0 right-2 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Submit changes"
                >
                  <Play className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap h-full overflow-y-auto break-words" style={{ overflowX: 'hidden', wordWrap: 'break-word' }}>
                {entry.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}