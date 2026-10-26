export const brand = {
  name: 'Pathora',
  tagline: 'Turning Skills Into Opportunities',
  logo: 'P',
  demoMode: true,
  colors: {
    forest: '#243B35',
    amber: '#E8B77D',
    ivory: '#F7F5EF',
    coral: '#D97768',
    white: '#FFFFFF',
    text: '#252A28',
    secondary: '#777D78',
    border: '#E4E1D8'
  },
  navigation: [
    { label: 'Overview', path: '/app', icon: 'LayoutDashboard' },
    { label: 'Labour market', path: '/app/market', icon: 'ChartNoAxesCombined' },
    { label: 'Skill gap', path: '/app/skills', icon: 'Target' },
    { label: 'Career paths', path: '/app/careers', icon: 'Compass' },
    { label: 'Hiring console', path: '/app/hiring', icon: 'Users' },
    { label: 'Reports', path: '/app/reports', icon: 'FileChartColumn' }
  ]
} as const