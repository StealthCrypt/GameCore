# Frontend Database Integration Guide

## ✅ What's Been Set Up

Your GameCore frontend is now connected to the MySQL database! Here's what was created:

### 1. API Utilities (`lib/api.ts`)
Centralized API functions for making requests to your backend:
- `gamesAPI` - Games CRUD operations
- `usersAPI` - Users CRUD operations  
- `authAPI` - Register and login
- `purchasesAPI` - Purchase operations

### 2. Custom React Hooks
- `hooks/useGames.ts` - Fetch all games or a single game
- `hooks/useUsers.ts` - Fetch all users or a single user

### 3. Updated Pages
- `app/page.tsx` - Home page now displays real games from database
- `app/admin/page.tsx` - Admin page to add/delete games

---

## 🚀 How to Use

### Start Your App

```bash
npm run dev
```

### View Pages

1. **Home Page** - `http://localhost:3000`
   - Displays all games from database
   - Shows loading state
   - Shows error if connection fails

2. **Admin Page** - `http://localhost:3000/admin`
   - Add new games
   - Delete existing games
   - View all games

---

## 📝 Adding Sample Data

### Option 1: Using Admin Page

1. Go to `http://localhost:3000/admin`
2. Fill out the form:
   - **Title:** Cyberpunk 2077
   - **Description:** Open-world action-adventure RPG
   - **Price:** 59.99
   - **Category:** RPG
   - **Image URL:** (optional)
3. Click "Add Game"

### Option 2: Using Prisma Studio

```bash
npx prisma studio
```

1. Opens at `http://localhost:5555`
2. Click on "Game" table
3. Click "Add record"
4. Fill in the fields
5. Click "Save"

### Option 3: Using API Directly

```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cyberpunk 2077",
    "description": "Futuristic RPG",
    "price": 59.99,
    "category": "RPG"
  }'
```

---

## 🎯 Using in Your Components

### Fetch and Display Games

```typescript
'use client'

import { useGames } from '@/hooks/useGames'

export default function MyComponent() {
  const { games, loading, error } = useGames()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {games.map(game => (
        <div key={game.id}>
          <h2>{game.title}</h2>
          <p>${game.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Create a New Game

```typescript
'use client'

import { gamesAPI } from '@/lib/api'
import { useState } from 'react'

export default function AddGameForm() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await gamesAPI.create({
        title,
        price: parseFloat(price)
      })
      alert('Game added!')
    } catch (error) {
      alert('Error adding game')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Game title"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button type="submit">Add Game</button>
    </form>
  )
}
```

### User Authentication

```typescript
'use client'

import { authAPI } from '@/lib/api'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await authAPI.login({ email, password })
      console.log('Logged in:', result.user)
      // Store user data, redirect, etc.
    } catch (error) {
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

---

## 🔧 API Functions Available

### Games
```typescript
import { gamesAPI } from '@/lib/api'

// Get all games
const games = await gamesAPI.getAll()

// Get single game
const game = await gamesAPI.getById('game_id')

// Create game
await gamesAPI.create({
  title: 'Game Title',
  price: 59.99,
  description: 'Description',
  category: 'RPG'
})

// Update game
await gamesAPI.update('game_id', {
  title: 'New Title',
  price: 49.99
})

// Delete game
await gamesAPI.delete('game_id')
```

### Authentication
```typescript
import { authAPI } from '@/lib/api'

// Register
const result = await authAPI.register({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe'
})

// Login
const result = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
})
```

### Purchases
```typescript
import { purchasesAPI } from '@/lib/api'

// Get all purchases
const purchases = await purchasesAPI.getAll()

// Create purchase
await purchasesAPI.create({
  userId: 'user_id',
  gameId: 'game_id'
})
```

---

## 🎨 Example: Complete Game Card Component

```typescript
'use client'

import Image from 'next/image'
import { gamesAPI } from '@/lib/api'

type GameCardProps = {
  game: {
    id: string
    title: string
    price: string
    imageUrl?: string
    category?: string
  }
  userId?: string
}

export function GameCard({ game, userId }: GameCardProps) {
  const handlePurchase = async () => {
    if (!userId) {
      alert('Please login first')
      return
    }

    try {
      await purchasesAPI.create({
        userId,
        gameId: game.id
      })
      alert('Game purchased!')
    } catch (error) {
      alert('Purchase failed')
    }
  }

  return (
    <div className="bg-card border rounded-lg p-4">
      {game.imageUrl && (
        <Image
          src={game.imageUrl}
          alt={game.title}
          width={200}
          height={200}
          className="rounded"
        />
      )}
      <h3 className="text-xl font-semibold mt-4">{game.title}</h3>
      {game.category && (
        <span className="text-sm text-purple-400">{game.category}</span>
      )}
      <p className="text-2xl font-bold text-green-500 mt-2">
        ${Number(game.price).toFixed(2)}
      </p>
      <button
        onClick={handlePurchase}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded mt-4"
      >
        Buy Now
      </button>
    </div>
  )
}
```

---

## 🐛 Troubleshooting

### No Games Showing Up?

1. Check if your dev server is running: `npm run dev`
2. Make sure MySQL is running
3. Add games via admin page or Prisma Studio
4. Check browser console for errors

### API Errors?

1. Check `.env` file has correct `DATABASE_URL`
2. Make sure migrations are applied: `npx prisma migrate dev`
3. Check terminal for error messages
4. Verify API routes at `http://localhost:3000/api/games`

### TypeScript Errors?

1. Regenerate Prisma Client: `npx prisma generate`
2. Restart VS Code TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## 🚀 Next Steps

1. **Add Authentication Context** - Store logged-in user globally
2. **Add Protected Routes** - Restrict admin pages
3. **Add User Profile** - Show user's purchased games
4. **Add Shopping Cart** - Allow multiple purchases
5. **Add Search/Filter** - Search games by title/category
6. **Add Pagination** - For large game lists
7. **Add Image Upload** - Upload game images
8. **Add Reviews/Ratings** - Let users rate games

---

## 📚 Related Files

- **API Utils:** `lib/api.ts`
- **Hooks:** `hooks/useGames.ts`, `hooks/useUsers.ts`
- **Pages:** `app/page.tsx`, `app/admin/page.tsx`
- **API Routes:** `app/api/*/route.ts`
- **Database:** `prisma/schema.prisma`

Your database is now fully integrated with your frontend! 🎮
