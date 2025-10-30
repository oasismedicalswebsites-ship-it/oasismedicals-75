import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Chatbot = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/2347033600770?text=Hello! I would like to book a diagnostic test.', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openWhatsApp}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default Chatbot;