import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const flyers = [
  "/promo/flyer-1.jpg",
  "/promo/flyer-2.jpg",
  "/promo/flyer-3.jpg",
  "/promo/flyer-4.jpg",
];

const PromoPopup = () => {
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    // Show popup automatically on page load
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!api) return;

    // Optional: Add event listeners for carousel if needed
    api.on("select", () => {
      // Handle slide change if needed
    });
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl p-0 border-0 bg-transparent shadow-none">
        <div className="relative bg-background rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background rounded-full p-2 transition-all hover:scale-110 shadow-lg"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Carousel */}
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {flyers.map((flyer, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-[3/4] md:aspect-[4/3]">
                    <img
                      src={flyer}
                      alt={`Annual Subsidized Medical Check-up Promo ${index + 1}`}
                      className="w-full h-full object-contain bg-background"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="left-4 bg-background/90 hover:bg-background border-border shadow-md" />
            <CarouselNext className="right-4 bg-background/90 hover:bg-background border-border shadow-md" />
          </Carousel>

          {/* Festive decoration accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50"></div>
        </div>
      </DialogContent>

      {/* Custom overlay styling */}
      <style>{`
        [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.75) !important;
        }
      `}</style>
    </Dialog>
  );
};

export default PromoPopup;
