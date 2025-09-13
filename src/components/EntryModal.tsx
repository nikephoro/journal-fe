import React, { useState } from 'react';
import { X, Calendar, Clock, Trash2, Edit2, Play } from 'lucide-react';
import { JournalEntry } from '../types';
import { journalAPI } from '../services/api';

interface EntryModalProps {
  entry: JournalEntry;
  onClose: () => void;
  onUpdate?: (updatedEntry: JournalEntry) => void;
  onDelete?: (id: string) => void;
}

export function EntryModal({ entry, onClose, onUpdate, onDelete }: EntryModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setIsLoading(true);
      try {
        await journalAPI.deleteEntry(entry.id);
        onDelete?.(entry.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete entry:', error);
        alert('Failed to delete entry');
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
    if (editContent !== entry.content) {
      setIsLoading(true);
      try {
        const updatedEntry = await journalAPI.updateEntry(entry.id, editContent);
        onUpdate?.(updatedEntry);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update entry:', error);
        alert('Failed to update entry');
      } finally {
        setIsLoading(false);
      }
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
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  onClick={handleUpdate}
                  disabled={isLoading || editContent === entry.content}
                  className="absolute bottom-0 right-2 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Submit changes"
                >
                  <Play className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap h-full overflow-y-auto">
                {entry.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}