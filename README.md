# GitHub Actions/LFS Usage Dashboard

A comprehensive React dashboard for visualizing and analyzing GitHub Actions and LFS usage reports from CSV files.

## Features

### Data Visualization
- **Summary Cards**: Quick overview of total usage, costs, users, and repositories
- **Daily Usage Trends**: Line chart showing usage patterns over time
- **SKU Breakdown**: Pie chart with detailed SKU usage distribution
- **Top Users**: Bar chart of the 10 most active users
- **Top Repositories**: Bar chart of the 10 most used repositories
- **Cost Analysis**: Multi-line chart comparing gross, net, and discount amounts
- **Data Table**: Searchable, sortable, paginated table with all raw data

### User Experience
- Drag-and-drop CSV file upload
- Real-time data processing with loading states
- Responsive design for all screen sizes
- Accessible UI with ARIA labels and keyboard navigation
- Error handling and validation

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **PapaParse** for CSV parsing
- **Lucide React** for icons

## Getting Started

### Installation

```bash
# Navigate to the project directory
cd github-lfs-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Upload CSV File**: Drag and drop or click to browse for your GitHub Actions/LFS usage report CSV file
2. **View Dashboard**: Once uploaded, the dashboard will automatically display all visualizations
3. **Explore Data**:
   - Use the search box in the data table to filter records
   - Click column headers to sort data
   - Navigate through pages using pagination controls
4. **Upload New File**: Click the "Upload New File" button to analyze a different report

## CSV Format

The application expects CSV files with the following columns:

- `date`: Date of usage (YYYY-MM-DD format)
- `product`: Product name (e.g., "actions")
- `sku`: SKU type (e.g., "actions_linux", "actions_self_hosted_linux")
- `quantity`: Number of minutes used
- `unit_type`: Unit type (e.g., "minutes")
- `applied_cost_per_quantity`: Cost per unit
- `gross_amount`: Gross cost
- `discount_amount`: Discount applied
- `net_amount`: Net cost after discount
- `username`: GitHub username
- `organization`: GitHub organization
- `repository`: Repository name
- `workflow_path`: Path to workflow file
- `cost_center_name`: Cost center (optional)

## Component Architecture

```
src/
├── components/
│   ├── FileUpload.tsx          # CSV upload with drag-and-drop
│   ├── SummaryCards.tsx        # Overview statistics cards
│   ├── DailyUsageChart.tsx     # Daily usage line chart
│   ├── SkuChart.tsx            # SKU breakdown pie chart
│   ├── TopUsersChart.tsx       # Top users bar chart
│   ├── TopRepositoriesChart.tsx # Top repos bar chart
│   ├── CostAnalysisChart.tsx   # Cost comparison chart
│   └── DataTable.tsx           # Searchable data table
├── types/
│   └── usage.ts                # TypeScript interfaces
├── utils/
│   └── dataProcessing.ts       # Data transformation utilities
├── App.tsx                     # Main application component
└── index.css                   # Global styles with Tailwind
```

## Performance Optimizations

- **Memoization**: Uses `useMemo` for expensive data transformations
- **Pagination**: Data table loads only 20 rows at a time
- **Lazy Loading**: Components render only when data is available
- **Efficient Sorting**: Client-side sorting with optimized algorithms
- **Code Splitting**: Vite automatically splits code for optimal loading

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators on all interactive elements
- Screen reader friendly
- Proper heading hierarchy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
