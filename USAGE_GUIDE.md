# Usage Guide

## Starting the Dashboard

1. Open your terminal
2. Navigate to the dashboard directory:
   ```bash
   cd /Users/vu.truongduc/Projects/github-lfs-report-dashboard/github-lfs-dashboard
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to: http://localhost:5173

## Uploading Your CSV File

### Method 1: Drag and Drop
1. Locate your CSV file on your computer
2. Drag the file over the upload area on the dashboard
3. Drop the file when the area highlights
4. The dashboard will automatically process and display the data

### Method 2: File Picker
1. Click anywhere in the upload area
2. Browse to your CSV file location
3. Select the file
4. Click "Open"
5. The dashboard will automatically process and display the data

### Sample File Location
Your sample file is located at:
```
/Users/vu.truongduc/Projects/github-lfs-report-dashboard/usageReport_1_42961bea97b14618b7488d86a61ad9c5.csv
```

## Understanding the Dashboard

### Top Section: Summary Cards
Four cards showing:
- **Total Usage**: Sum of all minutes used across all workflows
- **Total Cost**: Sum of all gross costs in USD
- **Unique Users**: Number of different users who triggered workflows
- **Repositories**: Number of different repositories with activity

### First Row: Trend Analysis

#### Daily Usage Chart (Left)
- **X-axis**: Dates from your CSV file
- **Y-axis**: Total minutes used each day
- **Tooltip**: Hover over points to see detailed breakdown
- **Purpose**: Identify usage patterns and spikes

#### Usage by SKU (Right)
- **Pie Chart**: Visual breakdown of different SKU types
- **Labels**: Show SKU name and percentage
- **Legend**: List of all SKUs with color coding
- **Below Chart**: Detailed list with minutes and costs
- **Purpose**: Understand which runner types are used most

Common SKU types:
- `actions_linux`: GitHub-hosted Linux runners
- `actions_self_hosted_linux`: Self-hosted Linux runners
- `actions_windows`: GitHub-hosted Windows runners
- `actions_macos`: GitHub-hosted macOS runners

### Second Row: User and Repository Analysis

#### Top 10 Users by Usage (Left)
- **Horizontal bars**: Longer bars = more usage
- **Tooltip**: Shows exact minutes, cost, and repository count
- **Colors**: Each user has a unique color
- **Purpose**: Identify heavy users and potential optimization targets

#### Top 10 Repositories by Usage (Right)
- **Horizontal bars**: Longer bars = more usage
- **Tooltip**: Shows exact minutes, cost, and user count
- **Colors**: Each repository has a unique color
- **Purpose**: Identify which repositories consume most resources

### Third Row: Cost Analysis
- **Three lines**: Gross Amount, Net Amount, and Discount
- **X-axis**: Dates
- **Y-axis**: Cost in USD
- **Summary Cards Below**: Total values for each metric
- **Purpose**: Track spending and discount effectiveness

### Bottom Section: Data Table

#### Search Functionality
- **Search box**: Top right of the table
- **Searches**: Users, repositories, SKU, workflow paths, and dates
- **Real-time**: Results update as you type
- **Clear**: Delete search text to see all data again

#### Sorting
- **Click column headers** to sort by that column
- **First click**: Sort descending (highest first)
- **Second click**: Sort ascending (lowest first)
- **Visual indicator**: Arrow shows current sort direction

#### Pagination
- **20 rows per page**: Keeps the table manageable
- **Page numbers**: Click to jump to specific page
- **Previous/Next**: Navigate one page at a time
- **Counter**: Shows "X to Y of Z results"

#### Columns Displayed
1. **Date**: When the workflow ran
2. **User**: Who triggered the workflow
3. **Repository**: Which repository
4. **SKU**: Type of runner used
5. **Minutes**: How many minutes consumed
6. **Gross Cost**: Cost before discounts
7. **Net Cost**: Cost after discounts
8. **Workflow**: Path to the workflow file

## Common Use Cases

### 1. Finding Cost Drivers
1. Look at Summary Cards to see total cost
2. Check SKU chart to see which runner types cost most
3. Review Top Repositories to find expensive projects
4. Use Data Table to drill into specific workflows

### 2. Optimizing Usage
1. Identify high-usage repositories
2. Check which users trigger most workflows
3. Look for patterns in Daily Usage Chart
4. Search for specific repositories or workflows in Data Table

### 3. Budget Tracking
1. Monitor Cost Analysis chart for trends
2. Compare Gross vs Net to see discount impact
3. Use Daily Usage to predict monthly costs
4. Filter by date range (via search)

### 4. Audit and Reporting
1. Sort Data Table by cost
2. Search for specific users or repositories
3. Export findings (note: export feature can be added)
4. Share insights from visualizations

## Tips and Tricks

### Efficient Searching
- Search by date: Type "2025-12" to see all December data
- Search by user: Type username to see their activity
- Search by repo: Find all workflows for a specific repository
- Combine filters: Use pagination to browse filtered results

### Understanding Patterns
- **Daily spikes**: May indicate scheduled workflows or special events
- **Consistent usage**: Normal CI/CD activity
- **Weekend drops**: Typical for development teams
- **Self-hosted vs GitHub-hosted**: Compare costs and usage patterns

### Performance
- The dashboard handles large CSV files efficiently
- All processing happens in your browser
- No data is sent to external servers
- Pagination keeps the UI responsive

## Keyboard Shortcuts

- **Tab**: Navigate between interactive elements
- **Enter**: Activate buttons and controls
- **Escape**: Close modals or clear focus
- **Arrow keys**: Navigate paginated results

## Accessibility Features

- Screen reader support
- Keyboard navigation
- High contrast mode compatible
- Focus indicators on all interactive elements
- ARIA labels for charts and tables

## Troubleshooting

### CSV File Won't Upload
- **Check file format**: Must be .csv extension
- **Verify structure**: Should have the required columns
- **File size**: Large files may take longer to process
- **Browser console**: Check for error messages

### Charts Not Displaying
- **Refresh the page**: Sometimes needed after upload
- **Check data**: Ensure CSV has valid data
- **Browser compatibility**: Use latest Chrome, Firefox, or Safari
- **Clear cache**: If seeing old data

### Performance Issues
- **Large files**: Files with 100,000+ rows may be slow
- **Close other tabs**: Free up browser memory
- **Use pagination**: Don't try to view all rows at once
- **Consider filtering**: Use search to reduce dataset

### Data Looks Wrong
- **Verify CSV format**: Check column names match expected format
- **Check data types**: Numbers should be numbers, not strings
- **Date format**: Should be YYYY-MM-DD
- **Currency values**: Should be numeric

## Uploading New Files

To analyze a different CSV file:
1. Scroll to bottom of dashboard
2. Click "Upload New File" button
3. Upload new CSV using drag-and-drop or file picker
4. Dashboard will clear old data and load new data

## Next Steps

After analyzing your data, you might want to:
1. Optimize expensive workflows
2. Set up usage alerts
3. Implement cost controls
4. Share findings with team
5. Schedule regular reviews

## Need Help?

Check the README.md for:
- Detailed feature documentation
- Technical specifications
- Component architecture
- Development information
