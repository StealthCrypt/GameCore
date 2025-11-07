export const PLATFORMS = [
  { name: 'Epic Games', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg', filter: false },
  { name: 'Steam', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', filter: false },
  { name: 'EA', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg', filter: true },
  { name: 'Riot Games', logo: 'https://static.wikia.nocookie.net/logopedia/images/6/65/Riot_Games_2022_(Symbol).svg', filter: true },
  { name: 'Ubisoft', logo: 'https://companieslogo.com/img/orig/UBI.PA-84c96b09.svg', filter: true },
  { name: 'Microsoft Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Microsoft_Store.svg', filter: false },
  { name: 'Rockstar Games', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Rockstar_Games.svg', filter: true }
]

export const PLATFORM_MAP: { [key: string]: { logo: string; filter: boolean } } = {
  'Epic Games': { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg', filter: false },
  'Steam': { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', filter: false },
  'EA': { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg', filter: true },
  'Riot Games': { logo: 'https://static.wikia.nocookie.net/logopedia/images/6/65/Riot_Games_2022_(Symbol).svg', filter: true },
  'Ubisoft': { logo: 'https://companieslogo.com/img/orig/UBI.PA-84c96b09.svg', filter: true },
  'Microsoft Store': { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Microsoft_Store.svg', filter: false },
  'Rockstar Games': { logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Rockstar_Games.svg', filter: true }
}
