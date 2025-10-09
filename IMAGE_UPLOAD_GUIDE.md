# Image Upload Feature

## Overview
Admins can now upload game images directly instead of using URLs.

## How It Works

### 1. **Admin Page** (`app/admin/page.tsx`)
- Drag & drop or click to upload images
- Real-time image preview
- Supports PNG, JPG, WEBP formats
- Maximum file size: 5MB
- Alternative: Still can use image URLs

### 2. **Upload API** (`app/api/upload/route.ts`)
- Receives image file via FormData
- Validates file type and size
- Generates unique filename with timestamp
- Saves to `public/uploads/` directory
- Returns image URL: `/uploads/filename.jpg`

### 3. **Storage**
- Images stored in: `public/uploads/`
- Publicly accessible via URL
- Filenames include timestamp to prevent conflicts

## Usage

### Adding a Game with Image Upload:

1. Go to `/admin`
2. Fill in game details
3. **Upload Image:**
   - Drag image onto upload box, OR
   - Click upload box to select file
4. Preview appears automatically
5. Click "Add Game"
6. Image is uploaded and game is created!

### Alternative - Using Image URL:

1. Leave upload empty
2. Paste image URL in "Image URL" field
3. Submit as before

## File Structure

```
public/
└── uploads/
    ├── .gitkeep
    ├── 1696789012345-fortnite.jpg
    ├── 1696789123456-minecraft.png
    └── ... (uploaded images)
```

## Features

✅ **Drag & Drop Upload**
✅ **Image Preview** before submitting
✅ **File Validation** (type & size)
✅ **Remove Image** button on preview
✅ **Fallback to URL** if needed
✅ **Unique Filenames** (timestamp-based)
✅ **Auto-create uploads folder**

## Technical Details

### File Upload Process:
1. User selects file
2. JavaScript FileReader creates preview
3. On form submit:
   - File sent to `/api/upload` via FormData
   - Server validates and saves file
   - Returns URL: `/uploads/filename.jpg`
4. Game created with returned image URL
5. Image accessible at: `http://localhost:3000/uploads/filename.jpg`

### Validation:
- **Type:** Must be `image/*` (PNG, JPG, WEBP, etc.)
- **Size:** Maximum 5MB
- **Filename:** Sanitized (spaces replaced with hyphens)

### API Response:
```json
{
  "url": "/uploads/1696789012345-game-image.jpg"
}
```

## Security Considerations

⚠️ **Current Implementation:**
- Anyone can upload images (no authentication)
- Files stored locally in `public/` folder
- No image optimization

✅ **Recommended for Production:**
1. Add authentication to `/api/upload`
2. Use cloud storage (AWS S3, Cloudinary, Vercel Blob)
3. Add image optimization
4. Implement rate limiting
5. Scan for malicious files

## Future Enhancements

- [ ] Multiple image upload (gallery)
- [ ] Image cropping/editing
- [ ] Cloud storage integration
- [ ] Image optimization (compression)
- [ ] Thumbnail generation
- [ ] Delete uploaded images
- [ ] Admin panel to manage all uploads

## Troubleshooting

### Image not appearing after upload:
- Check `public/uploads/` folder exists
- Verify file was saved
- Check console for errors
- Ensure file size < 5MB

### Upload fails:
- Check file type is image
- Check file size < 5MB
- Check server has write permissions
- Check console/terminal for errors

## Migration Note

**Existing games with URL images:**
- Will continue to work normally
- No migration needed
- New games can use either method

**When deploying to Vercel:**
- Uploaded files are NOT persisted (ephemeral filesystem)
- **Must use cloud storage** for production
- Consider: Vercel Blob, Cloudinary, AWS S3, or ImgBB API

---

**Images are now easier to add! Just drag, drop, and done!** 🎮📸
