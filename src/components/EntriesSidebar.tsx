import React from 'react';
import { BookOpen } from 'lucide-react';
import { JournalEntry as JournalEntryType } from '../types';
import { JournalEntry } from './JournalEntry';

interface EntriesSidebarProps {
  entries: JournalEntryType[];
  onEntryClick: (entry: JournalEntryType) => void;
}

export function EntriesSidebar({ entries, onEntryClick }: EntriesSidebarProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-full overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-gray-900">Your Entries</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} total
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">No entries yet</p>
            <p className="text-gray-400 text-xs mt-1">Start writing to see them here</p>
          </div>
        ) : (
          entries.map((entry) => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              onClick={onEntryClick}
            />
          ))
        )}
      </div>
    </div>
  );
}