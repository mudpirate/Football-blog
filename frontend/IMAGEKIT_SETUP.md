# ImageKit Setup Guide

## Overview

This project uses ImageKit for optimized image delivery and transformation. ImageKit provides:

- Automatic image optimization
- Responsive images
- Multiple format support (WebP, AVIF)
- Real-time transformations

## Configuration

### 1. Update ImageKit Credentials

Edit `src/config/imagekit.js` and replace the placeholder values:

```javascript
export const imageKitConfig = {
  urlEndpoint: "https://ik.imagekit.io/YOUR_ENDPOINT_ID",
  publicKey: "public_YOUR_ACTUAL_PUBLIC_KEY",
  authenticationEndpoint: "https://your-backend.com/auth", // Optional
};
```

### 2. Get Your ImageKit Credentials

1. Sign up at [ImageKit.io](https://imagekit.io)
2. Create a new project
3. Go to Settings → API Keys
4. Copy your URL Endpoint and Public Key

## Usage

### Using the Reusable Component

```jsx
import ImageKitImage from './components/ImageKitImage';

// With preset transformation
<ImageKitImage
  path="/path/to/image.jpg"
  transformation="hero"
  alt="Description"
  className="w-full h-64"
/>

// With custom transformation
<ImageKitImage
  path="/path/to/image.jpg"
  transformation={[
    { height: "400", width: "600", quality: "80" }
  ]}
  alt="Description"
/>
```

### Available Transformation Presets

- `hero`: 800x600, 80% quality
- `thumbnail`: 300x200, 70% quality
- `blog`: 600x400, 85% quality

### Direct ImageKit Usage

```jsx
import { Image, ImageKitProvider } from "@imagekit/react";
import { imageKitConfig } from "../config/imagekit";

<ImageKitProvider
  urlEndpoint={imageKitConfig.urlEndpoint}
  publicKey={imageKitConfig.publicKey}
>
  <Image
    path="/path/to/image.jpg"
    transformation={[{ height: "400", width: "600" }]}
    alt="Description"
  />
</ImageKitProvider>;
```

## Image Upload (Optional)

For image uploads, you'll need to set up a backend authentication endpoint:

```javascript
// Backend endpoint example (Node.js/Express)
app.get("/auth", (req, res) => {
  const signature = req.query.signature;
  const expire = req.query.expire;
  const token = req.query.token;

  // Verify signature and return authentication token
  // See ImageKit docs for implementation details
});
```

## Best Practices

1. Always use `path` instead of `src` for ImageKit images
2. Set appropriate `alt` text for accessibility
3. Use transformation presets for consistency
4. Enable lazy loading for better performance
5. Use responsive transformations for different screen sizes

## Environment Variables (Recommended)

Create a `.env` file in the frontend directory:

```
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/YOUR_ENDPOINT_ID
VITE_IMAGEKIT_PUBLIC_KEY=public_YOUR_ACTUAL_PUBLIC_KEY
```

Then update `src/config/imagekit.js`:

```javascript
export const imageKitConfig = {
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
};
```
