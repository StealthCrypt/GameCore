# GameCore API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 🎮 Games API

### Get All Games
```http
GET /api/games
```

**Response:**
```json
[
  {
    "id": "clxxx...",
    "title": "Cyberpunk 2077",
    "description": "Open-world action-adventure",
    "price": "59.99",
    "imageUrl": "/images/cyberpunk.jpg",
    "category": "RPG",
    "createdAt": "2025-10-01T...",
    "updatedAt": "2025-10-01T...",
    "purchases": []
  }
]
```

### Create New Game
```http
POST /api/games
Content-Type: application/json

{
  "title": "Game Title",
  "description": "Game description",
  "price": 59.99,
  "imageUrl": "/images/game.jpg",
  "category": "Action"
}
```

### Get Single Game
```http
GET /api/games/[id]
```

### Update Game
```http
PUT /api/games/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 49.99
}
```

### Delete Game
```http
DELETE /api/games/[id]
```

---

## 👤 Users API

### Get All Users
```http
GET /api/users
```

**Response:**
```json
[
  {
    "id": "clxxx...",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-01T...",
    "updatedAt": "2025-10-01T...",
    "purchases": []
  }
]
```

### Get Single User
```http
GET /api/users/[id]
```

### Update User
```http
PUT /api/users/[id]
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Delete User
```http
DELETE /api/users/[id]
```

---

## 🔐 Authentication API

### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "clxxx...",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-01T..."
  }
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "clxxx...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## 🛒 Purchases API

### Get All Purchases
```http
GET /api/purchases
```

**Response:**
```json
[
  {
    "id": "clxxx...",
    "userId": "clxxx...",
    "gameId": "clxxx...",
    "createdAt": "2025-10-01T...",
    "user": {
      "id": "clxxx...",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "game": {
      "id": "clxxx...",
      "title": "Cyberpunk 2077",
      "price": "59.99"
    }
  }
]
```

### Create Purchase
```http
POST /api/purchases
Content-Type: application/json

{
  "userId": "clxxx...",
  "gameId": "clxxx..."
}
```

---

## 🧪 Testing the API

### Using cURL (Command Line)

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","name":"Test User"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

**Create a game:**
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Game","description":"A test game","price":29.99,"category":"Action"}'
```

**Get all games:**
```bash
curl http://localhost:3000/api/games
```

### Using Thunder Client / Postman

1. Install Thunder Client extension in VS Code
2. Create a new request
3. Set method (GET, POST, etc.)
4. Set URL (e.g., `http://localhost:3000/api/games`)
5. For POST/PUT, add JSON body
6. Click Send

### Using Browser (GET requests only)

Simply navigate to:
- `http://localhost:3000/api/games`
- `http://localhost:3000/api/users`
- `http://localhost:3000/api/purchases`

---

## ⚠️ Error Responses

All errors return JSON with an `error` field:

```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

---

## 🔒 Security Notes

1. **Passwords are hashed** using bcrypt (never stored in plain text)
2. **Passwords are never returned** in API responses
3. **Email validation** checks for duplicates on registration
4. **Purchase validation** prevents buying the same game twice

---

## 📝 Example Workflows

### Register, Login, and Purchase a Game

1. **Register:**
```bash
POST /api/auth/register
{
  "email": "john@example.com",
  "password": "secure123",
  "name": "John"
}
# Save the returned user.id
```

2. **Login:**
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure123"
}
```

3. **Get games:**
```bash
GET /api/games
# Pick a game and save its id
```

4. **Purchase game:**
```bash
POST /api/purchases
{
  "userId": "clxxx...",  # from step 1
  "gameId": "clyyy..."   # from step 3
}
```

5. **View user's purchases:**
```bash
GET /api/users/[userId]
# Will show all games the user owns
```

---

## 🚀 Next Steps

- Add authentication middleware (JWT tokens)
- Add input validation (Zod)
- Add rate limiting
- Add pagination for large datasets
- Add search/filter endpoints
- Add image upload for games
- Add payment processing integration

---

## 📚 Related Files

- **Prisma Schema:** `prisma/schema.prisma`
- **Prisma Client:** `lib/prisma.ts`
- **API Routes:** `app/api/*/route.ts`
- **Environment:** `.env`
