import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex justify-center gap-4 md:h-24">
        <p className="text-center text-xs leading-loose text-muted-foreground flex items-center justify-center gap-2">
          Made by <Heart className="size-4 text-red-500 fill-red-500" /> Pradeep
        </p>
      </div>
    </footer>
  );
};

export default Footer;
