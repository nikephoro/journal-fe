# Journal App

A beautiful, modern journal application built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration system
- **Daily Entries**: Write and save your daily thoughts and experiences
- **Entry History**: View all your past entries in a clean sidebar
- **Entry Details**: Click on any entry to view it in a detailed popup
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd journal-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Setup

This application requires a backend API. Configure the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3001/api'; // Update this to match your backend
```

### Required API Endpoints

Your backend should implement the following endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current authenticated user

#### Journal Entries
- `GET /api/journal/entries` - Get user's journal entries
- `POST /api/journal/entries` - Create a new journal entry
- `GET /api/journal/entries/:id` - Get a specific journal entry

### API Request/Response Format

#### Authentication Requests
```typescript
// Login/Register
{
  email: string;
  password: string;
  name?: string; // Only for registration
}

// Response
{
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}
```

#### Journal Entry Requests
```typescript
// Create Entry
{
  content: string;
}

// Entry Response
{
  id: string;
  content: string;
  createdAt: string; // ISO date string
  userId: string;
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # Login/registration form
│   ├── Header.tsx      # App header with navigation
│   ├── NewEntryForm.tsx # Form for creating new entries
│   ├── JournalEntry.tsx # Individual entry component
│   ├── EntriesSidebar.tsx # Sidebar with entry list
│   └── EntryModal.tsx  # Modal for viewing entries
├── services/           # API services
│   └── api.ts         # Axios configuration and API calls
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles (Tailwind)
```

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize the design by:
- Modifying the Tailwind configuration in `tailwind.config.js`
- Updating component styles in the respective component files
- Adding custom CSS in `src/index.css`

### API Configuration
Update the API base URL and endpoints in `src/services/api.ts` to match your backend implementation.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.