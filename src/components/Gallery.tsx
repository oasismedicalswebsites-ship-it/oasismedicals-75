import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, ImageIcon } from "lucide-react";
import { useState } from "react";
import hematologyAsset from "@/assets/oasis-hematology.jpeg.asset.json";
import chemistryAsset from "@/assets/chemistry-oasis.jpeg.asset.json";
import xrayAsset from "@/assets/xray.jpeg.asset.json";
import medicalTeamAsset from "@/assets/oasis-medical-team.jpeg.asset.json";
import laboAsset from "@/assets/labo.jpeg.asset.json";
import labo2Asset from "@/assets/labo-2.jpeg.asset.json";
import { resolveAssetUrl } from "@/lib/assetUrl";
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = [{
    src: "/lovable-uploads/waiting-area-new.png",
    name: "Waiting Area",
    category: "Facility"
  }, {
    src: "/lovable-uploads/external-view.jpg", 
    name: "External View",
    category: "Facility"
  }, {
    src: "/lovable-uploads/ultrasound-procedure.jpg",
    name: "Ultrasound department", 
    category: "Services"
  }, {
    src: resolveAssetUrl(xrayAsset.url),
    name: "Digital X-ray",
    category: "Services"
  }, {
    src: "/lovable-uploads/director-new.jpg",
    name: "Director",
    category: "Team"
  }, {
    src: "/lovable-uploads/3f2ea8ce-8e6d-4383-9fce-900ffef57f89.png",
    name: "Patient Reception Service",
    category: "Services"
  }, {
    src: "/lovable-uploads/scientist-at-work.png",
    name: "Scientist at work",
    category: "Services"
  }, {
    src: resolveAssetUrl(hematologyAsset.url),
    name: "Hematology Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/microbiology-department.png",
    name: "Microbiology Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/xray-department.png",
    name: "X-ray Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/ultrasound-department.jpg",
    name: "Ultrasound Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/chemistry-department-1.jpg",
    name: "Chemistry Department",
    category: "Services"
  }, {
    src: resolveAssetUrl(chemistryAsset.url),
    name: "Chemistry Department",
    category: "Services"
  }, {
    src: resolveAssetUrl(medicalTeamAsset.url),
    name: "Medical Team Photo",
    category: "Team"
  }];
  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredImages = selectedCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };
  const closeModal = () => {
    setSelectedImage(null);
  };
  const downloadImage = (src: string, name: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = name;
    link.click();
  };
  return <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Medical Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art medical facility, advanced equipment, and professional healthcare team
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="relative aspect-square overflow-hidden">
                <img src={image.src} alt={image.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <Badge className="mb-2 bg-white/20 text-white border-white/30">
                          {image.category}
                        </Badge>
                        <h3 className="text-white font-semibold text-sm leading-tight">
                          {image.name}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => handleImageClick(image.src)} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => downloadImage(image.src, image.name)} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {image.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {image.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {filteredImages.length === 0 && <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No images found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>}

        {/* Laboratorians at Work Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-foreground mb-4">Laboratorians at Work</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse of our dedicated medical laboratory scientists at work, delivering accurate and reliable results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{
              src: resolveAssetUrl(laboAsset.url),
              name: "O.A.S.I.S. Medicals Laboratory Team",
              caption: "Our laboratory team standing together in the lab"
            }, {
              src: resolveAssetUrl(labo2Asset.url),
              name: "Laboratorians Running Tests",
              caption: "Laboratorians analysing samples at the bench"
            }].map((image, index) => (
              <div key={index} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => handleImageClick(image.src)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                      <div>
                        <Badge className="mb-2 bg-white/20 text-white border-white/30">Laboratorians</Badge>
                        <h4 className="text-white font-semibold">{image.name}</h4>
                        <p className="text-white/80 text-sm">{image.caption}</p>
                      </div>
                      <Button size="sm" variant="secondary" onClick={() => handleImageClick(image.src)} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <h4 className="font-semibold text-foreground">{image.name}</h4>
                  <p className="text-sm text-muted-foreground">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="relative max-w-4xl max-h-full">
              <img src={selectedImage} alt="Selected gallery image" className="max-w-full max-h-full object-contain rounded-lg" onClick={e => e.stopPropagation()} />
              <Button variant="secondary" size="sm" onClick={closeModal} className="absolute top-4 right-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                ✕
              </Button>
            </div>
          </div>}
      </div>
    </section>;
};
export default Gallery;