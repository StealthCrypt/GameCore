import Link from 'next/link';
import Image from 'next/image';
import {PLATFORM_MAP} from '@/stuff/constants';

interface GameCardProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  rating?: number;
  genre?: string;
  onSale?: boolean;
  originalPrice?: number;
  platform?: string;
}

export function GameCard({
  id,
  title,
  price,
  image,
  rating = 0,
  genre = 'Action',
  onSale,
  originalPrice,
  platform
}: GameCardProps) {
  return (
    <Link href={`/game/${id}`}>
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={image || '/file.svg'}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {onSale && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors truncate">{title}</h3>
            {platform && (
              <div className="flex items-center gap-1 ml-2">
                {platform.split(', ').map((platformName, index) => {
                  const platformData = PLATFORM_MAP[platformName.trim()];
                  if (!platformData) return null;
                  return (
                    <Image
                      key={index}
                      src={platformData.logo}
                      alt={platformName}
                      width={20}
                      height={20}
                      style={platformData.filter ? { filter: 'brightness(0) invert(1)' } : {}}
                      className="flex-shrink-0"
                      title={platformName}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-2">{genre}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {onSale && originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              {price === 0 ? (
                <span className="text-green-400 font-bold text-lg bg-green-500/20 px-3 py-1 rounded">
                  FREE
                </span>
              ) : (
                <span className="text-purple-400 font-bold text-lg">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart/purchase logic here
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium flex items-center"
            >
              {price === 0 ? 'Get Free' : 'Get Game'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
