/**
 * Platform data for game stores/launchers
 * Used across the app for displaying platform options
 */
export const PLATFORMS = [
  { name: 'Epic Games', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg', filter: false, color: '#374151' },
  { name: 'Steam', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', filter: false, color: '#1e3a8a' },
  { name: 'EA', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg', filter: true, color: '#4b5563' },
  { name: 'Riot Games', logo: 'https://static.wikia.nocookie.net/logopedia/images/6/65/Riot_Games_2022_(Symbol).svg', filter: true, color: '#ef4444' },
  { name: 'Ubisoft', logo: 'https://companieslogo.com/img/orig/UBI.PA-84c96b09.svg', filter: true, color: '#3b82f6' },
  { name: 'Microsoft Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Microsoft_Store.svg', filter: false, color: '#1e40af' },
  { name: 'Rockstar Games', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Rockstar_Games.svg', filter: true, color: '#fb923c' }
]

/**
 * Map of platform names to their data (for quick lookups)
 */
export const PLATFORM_MAP: { [key: string]: { logo: string; filter: boolean; color: string } } = {
  'Epic Games': { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg', filter: false, color: '#374151' },
  'Steam': { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', filter: false, color: '#1e3a8a' },
  'EA': { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg', filter: true, color: '#4b5563' },
  'Riot Games': { logo: 'https://static.wikia.nocookie.net/logopedia/images/6/65/Riot_Games_2022_(Symbol).svg', filter: true, color: '#ef4444' },
  'Ubisoft': { logo: 'https://companieslogo.com/img/orig/UBI.PA-84c96b09.svg', filter: true, color: '#3b82f6' },
  'Microsoft Store': { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Microsoft_Store.svg', filter: false, color: '#1e40af' },
  'Rockstar Games': { logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Rockstar_Games.svg', filter: true, color: '#fb923c' }
}

/**
 * Common input styles used across forms
 */
export const INPUT_STYLES = {
  default: "w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500",
  checkbox: "w-4 h-4 text-purple-600 bg-muted border-border rounded focus:ring-purple-500 focus:ring-2"
}
