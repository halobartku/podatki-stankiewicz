# Podatki Stankiewicz Website

Modern website for Kancelaria Podatkowa Jolanta Stankiewicz, featuring a responsive design, interactive components, and business verification tools.

## Features

- 🎨 Modern UI with smooth animations and transitions
- 📱 Fully responsive design for all devices
- 🔍 VAT number verification for Polish and EU businesses
- 🌐 Multi-section layout with:
  - Interactive landing page
  - Business solutions showcase
  - Service specializations
  - Business verification tools
  - Contact information

## Tech Stack

- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite
- **API Integration:** Vercel Serverless Functions
- **Deployment:** Vercel

## Project Structure

```
src/
├── components/         # React components
│   ├── animata/       # Animation components
│   ├── shared/        # Shared utilities
│   ├── ui/            # UI components
│   └── VatVerification/ # VAT verification features
├── lib/               # API integrations
├── styles/           # Global styles
├── utils/            # Utility functions
└── types.ts          # TypeScript types
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Generate favicons (if needed):
```bash
node scripts/generate-favicons.js
```

## VAT Verification Features

The website includes two types of VAT number verification:

1. **Polish VAT (NIP)** - Direct verification through the Polish Ministry of Finance API
2. **EU VAT (VIES)** - Verification through the EU VIES system

### API Integration

The VAT verification features are implemented using Vercel Serverless Functions located in the `api/` directory:
- `api/vat/[countryCode]/[vatNumber].ts` - Handles VAT verification requests

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate-favicons` - Generate favicon files

## Environment Variables

Required environment variables for deployment:

```env
# API URLs
VITE_API_URL=your_api_url
VITE_PROXY_URL=your_proxy_url

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=your_ga_id
```

## Deployment

The project is configured for deployment on Vercel with zero-configuration:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

The `vercel.json` configuration handles routing and serverless function setup automatically.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the terms specified in the `LICENSE` file.
