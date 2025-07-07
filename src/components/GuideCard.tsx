import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Eye, Heart } from 'lucide-react';

interface GuideCardProps {
  id: string;
  title: string;
  content: string;
  authors: string[];
  views?: number;
  duration?: string;
  likes?: number;
  thumbnail?: string;
  tags?: string[];
  createdAt?: string;
  onClick?: () => void;
}

const GuideCard = ({ 
  title, 
  content, 
  authors, 
  views = 0, 
  duration = "10 min", 
  likes = 0,
  thumbnail,
  tags = [],
  createdAt,
  onClick 
}: GuideCardProps) => {
  // Truncate content for card preview
  const truncatedContent = content.length > 120 ? content.substring(0, 120) + "..." : content;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] bg-gradient-card border-0 animate-scale-in"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-t-lg">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-code-bg to-youtube-dark flex items-center justify-center">
            <div className="text-code-text text-6xl font-mono opacity-50">{"</>"}</div>
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {truncatedContent}
        </p>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between">
        {/* Authors */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {authors.slice(0, 2).map((author, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {authors.length > 2 ? `${authors[0]} +${authors.length - 1}` : authors.join(', ')}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{views > 1000 ? `${(views/1000).toFixed(1)}K` : views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>{likes}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GuideCard;