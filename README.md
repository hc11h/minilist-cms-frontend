# Minilist CMS Frontend

A modern, beautiful frontend for a headless content management system. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## What is Minilist CMS?

Minilist CMS is a simple, powerful headless CMS that lets you manage content through an intuitive web interface and access it via a REST API. This is the frontend application that provides the admin dashboard and content management interface.

## Features

- 📝 **Content Management**
  - Create and manage blog posts with rich text editing
  - Draft, schedule, and publish content
  - Organize content with categories and tags

- ✍️ **Rich Text Editor**
  - Powered by TipTap with a full-featured toolbar
  - Support for headings, lists, links, images, and formatting
  - Clean, distraction-free writing experience

- 👥 **Author Management**
  - Create and manage blog authors
  - Assign authors to content
  - Profile management with avatars

- 📄 **Document Editor**
  - Create and edit reusable documents
  - Search and filter documents
  - Organize content efficiently

- 🔑 **API Key Management**
  - Generate and manage API keys
  - Secure access to your content via REST API
  - Easy key regeneration and deactivation

- 📊 **Dashboard & Analytics**
  - Overview of content metrics
  - Track published and draft content
  - Monitor login activity

- 🔐 **Authentication**
  - Google OAuth integration
  - Secure session management
  - User profile management

- 📚 **API Documentation**
  - Built-in API documentation
  - Interactive examples
  - Quick reference guide

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS, Radix UI
- **Editor**: TipTap 
- **Language**: TypeScript

## Self-Hosting with Docker

### Prerequisites

- Docker and Docker Compose installed
- Access to your backend API (this frontend connects to a separate backend)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minilist-cms-frontend
   ```

2. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://your-backend-api-url:8000
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   The application will be available at `http://localhost:3000`

### Manual Docker Build

If you prefer to build manually:

```bash
# Build the Docker image
docker build -t minilist-cms-frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://your-backend-api-url:8000 \
  minilist-cms-frontend
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | URL of your backend API | Yes | - |

### Production Deployment

For production, make sure to:

1. Set `NEXT_PUBLIC_API_BASE_URL` to your production backend URL
2. Configure proper CORS settings on your backend
3. Use a reverse proxy (nginx, Traefik, etc.) for SSL/TLS
4. Set up proper logging and monitoring

### Docker Compose Example with Nginx

```yaml
services:
  cms-frontend:
    build: .
    environment:
      - NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - cms-frontend
    restart: unless-stopped
```

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (dashboard)/       # Dashboard routes (protected)
│   │   ├── blogs/        # Blog management
│   │   ├── authors/      # Author management
│   │   ├── editor/       # Document editor
│   │   ├── api-keys/     # API key management
│   │   └── dashboard/    # Dashboard home
│   ├── login/            # Authentication
│   └── api/              # API routes
├── components/            # React components
│   ├── ui/               # UI primitives (shadcn/ui)
│   └── sections/         # Page sections
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and helpers
```

## Contributing

This is a fun, simple project! Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Fork and customize for your needs


