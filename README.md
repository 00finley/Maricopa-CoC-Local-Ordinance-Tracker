# Local Policy Landscape Review Dashboard

An interactive dashboard displaying urban camping prohibitions and related ordinances across Maricopa County jurisdictions.

## Features

- **Category View**: Browse ordinances grouped by type (Camping, Loitering, Marijuana, etc.)
- **Matrix View**: Compare all 25 jurisdictions across all ordinance types at a glance
- **Search & Filter**: Find specific jurisdictions, categories, or keywords
- **Statistics**: Jurisdiction counts and land area coverage for each category
- **Responsive Design**: Works on desktop and mobile devices

## Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repository**
   - Go to [github.com](https://github.com) and create a new repository
   - Upload all files from this folder to the repository

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/log in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite and configure build settings
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project folder and deploy**
   ```bash
   cd ordinance-dashboard-vercel
   vercel
   ```

3. **Follow the prompts** to link/create a project

### Option 3: Drag and Drop

1. Run the build locally:
   ```bash
   npm install
   npm run build
   ```

2. Go to [vercel.com](https://vercel.com)

3. Drag and drop the `dist` folder to deploy

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

### Updating Ordinance Data

Edit the `ordinanceData` array in `src/App.jsx`. Each ordinance object should have:

```javascript
{
  "City": "City Name",
  "Topic": "Category Name",
  "OrdinanceNumber": "Section Number",
  "Ordinance": "Full ordinance text...",
  "Penalty": "Penalty description...",
  "Link": "https://source-url.com" // optional
}
```

### Adding New Categories

Add new topic colors in the `topicColors` object:

```javascript
'New Category': { 
  bg: 'bg-color-50', 
  border: 'border-color-200', 
  badge: 'bg-color-100 text-color-800'
}
```

### Updating Jurisdictions

1. Add/remove cities from the `allJurisdictions` array
2. Update `jurisdictionLandArea` with land area in square miles
3. Update `TOTAL_JURISDICTIONS` constant

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Vercel** - Hosting

## Data Source

Maricopa Association of Governments, Community Initiatives Division, 2025.

Ordinance text excerpted from municipal codes. Verify current language with official sources before citation.
