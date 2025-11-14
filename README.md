# Remove Background App

A modern, beautiful web application for removing backgrounds from images using the remove.bg API.

## Features

- 🚀 **Fast Processing** - Get results in seconds with AI-powered technology
- 🎨 **High Quality** - Professional-grade background removal with precision
- 🔒 **Secure & Private** - Your images are processed securely and never stored
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎯 **Drag & Drop** - Easy file upload with drag and drop support
- 💾 **Download Results** - Download your processed images instantly

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A remove.bg API key ([Get one here](https://www.remove.bg/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movera
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
REMOVE_BG_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Get API Key

1. Visit [remove.bg API page](https://www.remove.bg/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

## Usage

1. Upload an image by clicking "Browse Files" or drag and drop
2. Click "Remove Background" to process your image
3. Download the result when processing is complete

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **remove.bg API** - Background removal service

## Project Structure

```
movera/
├── app/
│   ├── api/
│   │   └── remove-bg/
│   │       └── route.ts    # API route for background removal
│   ├── page.tsx            # Home page
│   └── layout.tsx          # Root layout
├── .env.local              # Environment variables (create this)
└── package.json
```

## License

MIT
