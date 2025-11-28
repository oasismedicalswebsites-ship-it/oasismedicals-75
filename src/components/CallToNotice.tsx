import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const CallToNotice = () => {
  const { t } = useTranslation();
  
  const openWhatsApp = () => {
    window.open('https://wa.me/2347033600770', '_blank');
  };

  return (
    <section className="py-8 md:py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5 shadow-lg">
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{t('notice.title')}</h3>
                </div>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-accent">👉</span> <em className="font-medium">{t('notice.message')}</em>
                </p>
                
                {/* WhatsApp Contact Button */}
                <div className="pt-2">
                  <Button 
                    onClick={openWhatsApp}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 text-sm md:text-base"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('notice.whatsappButton')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToNotice;