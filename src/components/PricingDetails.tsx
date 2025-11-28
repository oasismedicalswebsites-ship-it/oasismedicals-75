import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Heart, TestTube, Activity, X, Search, ChevronDown, MessageCircle, Thermometer, Users, UserCheck, Stethoscope, Gift, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PricingDetails = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const pricingData = {
    subsidized: {
      title: "🎄 End of Year Subsidized Medical Check-up",
      icon: Gift,
      color: "from-red-600 via-green-600 to-red-600",
      isPromo: true,
      promoDate: "8th Dec 2025 - 4th Jan 2026",
      description: "As you map out plans for the new year, let your total wellness be your priority. It is another season of our annual SUBSIDIZED MEDICAL CHECK-UP starting from 8th of December 2025 to 4th January 2026. Other complementary tests are also available. For booking and enquiries visit our website: oasismedicals.com or Call/WhatsApp: 08058135226",
      tests: [
        { name: "HealthyPreg\n\t•\tObstetrics scan\n\t•\tPCV\n\t•\tUrinalysis", price: "₦4,500", savings: "₦2,000" },
        { name: "HealthyPreg Pro\n\t•\tObstetrics scan\n\t•\tPCV\n\t•\tUrinalysis\n\t•\tBlood grouping\n\t•\tRh Factor\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tHepatitis C Virus Antibody (HCV) Rapid", price: "₦13,000", savings: "₦6,000" },
        { name: "Prime40+\n\t•\tProstate Specific Antigen (PSA)\n\t•\tProstate Scan", price: "₦14,000", savings: "₦5,000" },
        { name: "GyneWell\n\t•\tPelvic scan\n\t•\tHVS for M/C/S", price: "₦7,000", savings: "₦2,000" },
        { name: "ReproCare\n\t•\tEstradiol\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProgesterone\n\t•\tProlactin", price: "₦40,000", savings: "₦10,000" },
        { name: "ReproCare Pro\n\t•\tEstradiol\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProgesterone\n\t•\tProlactin\n\t•\tAnti Mullerian Hormone (AMH)", price: "₦60,000", savings: "₦25,000" },
        { name: "ReproCare Pro Max\n\t•\tThyroid Function Test (TFT)\n\t•\tEstradiol\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProgesterone\n\t•\tProlactin\n\t•\tAnti Mullerian Hormone (AMH)", price: "₦80,000", savings: "₦50,000" },
        { name: "GenZ\n\t•\tBlood group\n\t•\tGenotype", price: "₦2,500", savings: "₦2,000" },
        { name: "GenZ Pro\n\t•\tFull blood count\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tUrinalysis\n\t•\tBody mass index", price: "₦10,000", savings: "₦3,000" },
        { name: "Prime Pro\n\t•\tLiver function test\n\t•\tKidney Function test\n\t•\tFull Lipid profile\n\t•\tFBS/RBS", price: "₦40,000", savings: "₦15,000" },
        { name: "Prime Pro Max\n\t•\tLiver function test\n\t•\tKidney Function test\n\t•\tFull Lipid profile\n\t•\tFBS/RBS\n\t•\tUrinalysis\n\t•\tFull blood count\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tBody mass index", price: "₦55,000", savings: "₦20,000" }
      ]
    },
    fever: {
      title: "Fever Tests",
      icon: Thermometer,
      color: "from-orange-500 to-red-500",
      description: "Know the cause of your reoccurring Fever and get proper treatment now. It's not always malaria. A proper test will help you understand the root cause and save you from wasting time and money on ineffective treatment. Get tested and discuss the result with a doctor.",
      tests: [
        { name: "Basic Package\n\t•\tFull Blood Count\n\t•\tMalaria (Thick and Thin Films)\n\t•\tWidal (Typhoid Test)\n\t•\tUrinalysis", price: "₦15,000" },
        { name: "Comprehensive Package\n\t•\tErythrocyte Sedimentation Rate\n\t•\tFull Blood Count\n\t•\tMalaria (Thick and Thin Films)\n\t•\tWidal (Typhoid Test)\n\t•\tStool Microscopy\n\t•\tUrinalysis\n\t•\tSputum AFB – Tuberculosis test", price: "₦30,000" }
      ]
    },
    menPackages: {
      title: "Men's Health",
      icon: Users,
      color: "from-blue-600 to-blue-800",
      description: "Get a clear picture of your health, then take control. Stay in touch with your general health today. Your time, your convenience, your choice. Our comprehensive health screening packages are designed to provide a detailed overview of your general body health, including cardiovascular health, blood sugar levels, kidney and liver function, and more.",
      tests: [
        { name: "Full Body Checkup (Opal)\n\t•\tFasting Blood Sugar (FBS)\n\t•\tTotal Cholesterol\n\t•\tFull Blood Count\n\t•\tUrinalysis\n\t•\tLiver Function Test\n\t•\tKidney Function Test", price: "₦45,000" },
        { name: "Full Body Checkup (Ruby)\n\t•\tFasting Blood Sugar (FBS)\n\t•\tLipid Profile\n\t•\tFull Blood Count\n\t•\tProstate Specific Antigen (Quantitative) >40yrs\n\t•\tStool Microscopy\n\t•\tUrinalysis\n\t•\tLiver Function Test\n\t•\tKidney Function Test", price: "₦80,000" },
        { name: "Full Body Checkup (Diamond)\n\t•\tFasting Blood Sugar (FBS)\n\t•\tHbA1C (Glycated Heamoglobin)\n\t•\tLipid Profile\n\t•\tLiver Function Test\n\t•\tKidney Function Test\n\t•\tUric Acid\n\t•\tC-Reactive Protein CRP\n\t•\tThyroid Function Test 1 (Free T3, Free T4, TSH)\n\t•\tFull Blood Count\n\t•\tProstate Specific Antigen (Quantitative) >40yrs\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tHepatitis C Virus Antibody (HCV) Rapid\n\t•\tStool Occult Blood\n\t•\tStool Microscopy\n\t•\tUrinalysis", price: "₦180,000" },
        { name: "Fertility/Hormonal Tests (Basic)\n\t•\tSeminal Fluid Analysis\n\t•\tSemen: Microscopy, Culture and Sensitivity", price: "₦15,000" },
        { name: "Fertility/Hormonal Tests (Standard)\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tTestosterone (Total)\n\t•\tSeminal Fluid Analysis\n\t•\tSemen: Microscopy, Culture and Sensitivity", price: "₦60,000" },
        { name: "Erectile Dysfunction Package\n\t•\tFasting Blood Sugar (FBS)\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProlactin\n\t•\tTestosterone (Total)\n\t•\tSeminal Fluid Analysis\n\t•\tSemen: Microscopy, Culture and Sensitivity", price: "₦100,000" },
        { name: "Prime40+\n\t•\tProstate Scan\n\t•\tQuantitative Prostate Specific Antigen (PSA)", price: "₦17,000" }
      ]
    },
    womenPackages: {
      title: "Women's Health",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      description: "Get a clear picture of your health, then take control. Stay in touch with your general health today. Your time, your convenience, your choice. Our comprehensive health screening packages are designed to provide a detailed overview of your general body health, including cardiovascular health, blood sugar levels, kidney and liver function, and more.",
      tests: [
        { name: "Full Body Checkup (Opal)\n\t•\tFasting Blood Sugar (FBS)\n\t•\tTotal Cholesterol\n\t•\tFull Blood Count\n\t•\tUrinalysis\n\t•\tLiver Function Test\n\t•\tKidney Function Test", price: "₦45,000" },
        { name: "Full Body Checkup (Ruby)\n\t•\tFasting Blood Sugar (FBS)\n\t•\tLipid Profile\n\t•\tFull Blood Count\n\t•\tStool Microscopy\n\t•\tUrinalysis\n\t•\tLiver Function Test\n\t•\tKidney Function Test", price: "₦70,000" },
        { name: "Full Body Checkup (Diamond)\n\t•\tFasting Blood Sugar (FBS)\n\t•\tHbA1C (Glycated Heamoglobin)\n\t•\tLipid Profile\n\t•\tLiver Function Test\n\t•\tKidney Function Test\n\t•\tUric Acid\n\t•\tC-Reactive Protein CRP\n\t•\tThyroid Function Test 1 (Free T3, Free T4, TSH)\n\t•\tFull Blood Count\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tHepatitis C Virus Antibody (HCV) Rapid\n\t•\tStool Occult Blood\n\t•\tStool Microscopy\n\t•\tUrinalysis\n\t•\tLiquid Based Cytology (LBC)", price: "₦200,000" },
        { name: "Fertility/Hormonal Tests (Basic)\n\t•\tProgesterone\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProlactin", price: "₦40,000" },
        { name: "Fertility/Hormonal Tests (Standard)\n\t•\tEstradiol\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProgesterone\n\t•\tProlactin", price: "₦55,000" },
        { name: "Fertility/Hormonal Tests (Comprehensive)\n\t•\tThyroid-Stimulating Hormone (TSH)\n\t•\tEstradiol\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProgesterone\n\t•\tProlactin\n\t•\tAnti Mullerian Hormone (AMH)", price: "₦150,000" },
        { name: "Radiance Package\n\t•\tPelvic Scan\n\t•\tHigh Vaginal Swab (HVS) M/C/S", price: "₦9,000" }
      ]
    },
    domesticStaff: {
      title: "Domestic Staff Screening",
      icon: UserCheck,
      color: "from-green-600 to-emerald-600",
      description: "Are you employing the services of stewards, home caregivers, nannies, drivers, cooks, gardeners, etc? Here are some important tests you need to do on them to know more about their health status and ensure a safe working environment.",
      tests: [
        { name: "Basic Screening Package\n\t•\tPCV\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tBHCG- Qualitative (Pregnancy Test) for female\n\t•\tSputum AFB - Tuberculosis test\n\t•\tHepatitis A Rapid", price: "₦20,000" },
        { name: "Standard Screening Package\n\t•\tHb Electrophoresis/Genotype (Qualitative)\n\t•\tPCV\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tBHCG- Qualitative (Pregnancy Test) for female\n\t•\tHepatitis C Virus Antibody (HCV) Rapid\n\t•\tSputum AFB - Tuberculosis test\n\t•\tHepatitis A Rapid", price: "₦30,000" }
      ]
    },
    premarital: {
      title: "Pre-marital Screening",
      icon: Heart,
      color: "from-purple-600 to-violet-600",
      description: "Our Pre-Marital Tests Packages provide essential health evaluations to ensure you and your partner are in optimal health before your wedding day. These comprehensive screenings help identify any health concerns early and ensure a healthy start to your marriage.",
      tests: [
        { name: "Pre-marital Test (Basic) - Male and Female\n\t•\tBlood Grouping (ABO & Rh Typing)\n\t•\tHb Electrophoresis/Genotype (Qualitative)\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid", price: "₦12,000" },
        { name: "Pre-marital Test (Standard) - Female\n\t•\tBlood Grouping (ABO & Rh Typing)\n\t•\tHb Electrophoresis/Genotype (Qualitative)\n\t•\tFull Blood Count\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHepatitis C Antibody (HCV) Rapid\n\t•\tHIV I & II Rapid\n\t•\tBHCG- Qualitative (Pregnancy Test)", price: "₦20,000" },
        { name: "Pre-marital Test (Comprehensive) - Female\n\t•\tBlood Grouping (ABO & Rh Typing)\n\t•\tHb Electrophoresis/Genotype (Qualitative)\n\t•\tFull Blood Count\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tProlactin\n\t•\tProgesterone\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHepatitis C Antibody (HCV) Rapid\n\t•\tHIV I & II Rapid\n\t•\tBHCG- Qualitative (Pregnancy Test)", price: "₦100,000" },
        { name: "Pre-marital Test (Comprehensive) - Male\n\t•\tBlood Grouping (ABO & Rh Typing)\n\t•\tHb Electrophoresis/Genotype (Qualitative)\n\t•\tFull Blood Count\n\t•\tFollicule Stimulating Hormone (FSH)\n\t•\tLH - Luteinizing Hormone\n\t•\tTestosterone (Total)\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHepatitis C Antibody (HCV) Rapid\n\t•\tHIV I & II Rapid\n\t•\tSeminal Fluid Analysis\n\t•\tSemen: Microscopy, Culture and Sensitivity", price: "₦120,000" }
      ]
    },
    antenatal: {
      title: "Antenatal Packages",
      icon: Stethoscope,
      color: "from-teal-500 to-cyan-600",
      description: "Antenatal tests are crucial for monitoring the health of both the mother and baby, allowing for the early detection and management of potential complications like gestational diabetes or anemia. They also help track the baby's development through ultrasounds, screen for genetic conditions, and provide a platform for health education and planning for birth and the postpartum period.",
      tests: [
        { name: "Basic Package\n\t•\tObstetrics Scan\n\t•\tPCV\n\t•\tUrinalysis", price: "₦5,000" },
        { name: "Standard Package\n\t•\tObstetrics Scan\n\t•\tPCV\n\t•\tUrinalysis\n\t•\tBlood Grouping\n\t•\tRh Factor\n\t•\tHepatitis B Surface Antigen (HBsAg) Rapid\n\t•\tHIV I & II Rapid\n\t•\tHepatitis C Virus Antibody (HCV) Rapid", price: "₦15,000" }
      ]
    },
    ultrasound: {
      title: "Ultrasound Scan",
      icon: Heart,
      color: "from-medical-cyan to-blue-500",
      description: "Our advanced ultrasound imaging services provide detailed visualization of internal organs and structures. These non-invasive diagnostic scans help detect and monitor various medical conditions with precision and safety.",
      tests: [
        { name: "Pelvic/ Obstetrics", price: "₦3,000" },
        { name: "Abdominal", price: "₦7,000" },
        { name: "Abdominopelvic", price: "₦10,000" },
        { name: "Upper Abdominal", price: "₦5,000" },
        { name: "Lower Abdominal", price: "₦5,000" },
        { name: "Breast", price: "₦7,000" },
        { name: "Neck/Thyroid", price: "₦10,000" },
        { name: "Transvaginal Pelvic Scan (TVS)", price: "₦10,000" },
        { name: "Prostate scan (Transrectal)", price: "₦10,000" },
        { name: "Folliculometry", price: "₦30,000" },
        { name: "Scrotal Scan", price: "₦7,000" },
        { name: "For other areas of Scan", price: "CALL" }
      ]
    },
    haematology: {
      title: "Haematology",
      icon: TestTube,
      color: "from-red-500 to-pink-500",
      description: "Our comprehensive blood analysis services evaluate your blood cells, clotting function, and related disorders. These tests are essential for diagnosing anemia, bleeding disorders, infections, and blood cancers.",
      tests: [
        { name: "Full Blood count (Automation)", price: "₦7,000" },
        { name: "Haemoglobin (HB)", price: "₦2,000" },
        { name: "Pack cell volume (PCV)", price: "₦2,000" },
        { name: "WBC (Total)", price: "₦3,000" },
        { name: "WBC (Differential)", price: "₦4,000" },
        { name: "Platelet Count", price: "₦5,000" },
        { name: "E.S.R", price: "₦3,000" },
        { name: "HB Genotype", price: "₦2,000" },
        { name: "Bleeding time (BT)", price: "₦5,000" },
        { name: "Clotting Time", price: "₦5,000" },
        { name: "Thrombin time (TT)", price: "₦10,000" },
        { name: "Prothrombin time (PT)", price: "₦10,000" },
        { name: "Blood Grouping (ABO & Rh)", price: "₦2,000" }
      ]
    },
    chemistry: {
      title: "Chemistry",
      icon: TestTube,
      color: "from-green-500 to-emerald-500",
      description: "Our chemical pathology tests analyze blood and body fluids to assess organ function, metabolic processes, and detect diseases. These tests are crucial for monitoring diabetes, kidney function, liver health, and cardiovascular risk factors.",
      tests: [
        { name: "Fasting blood sugar", price: "₦2,000" },
        { name: "Random blood sugar", price: "₦2,000" },
        { name: "2Hr Post-P blood sugar", price: "₦5,000" },
        { name: "Glucose tolerance test G.T.T", price: "₦10,000" },
        { name: "HbA1c", price: "₦10,000" },
        { name: "E/U/Cr", price: "₦18,000" },
        { name: "Urea", price: "₦5,000" },
        { name: "Full electrolytes", price: "₦10,000" },
        { name: "Creatinine", price: "₦5,000" },
        { name: "Liver Function Test (LFT)", price: "₦18,000" },
        { name: "Total Billirubin", price: "₦5,000" },
        { name: "Direct Billirubin", price: "₦5,000" },
        { name: "Full Lipid Profile", price: "₦18,000" },
        { name: "Total Cholesterol", price: "₦5,000" },
        { name: "For others", price: "CALL" }
      ]
    },
    microbiology: {
      title: "Microbiology & Serology",
      icon: TestTube,
      color: "from-purple-500 to-violet-500",
      description: "Our microbiology and serology services identify infectious diseases, parasites, and immune responses. These tests help diagnose bacterial, viral, and parasitic infections while monitoring your immune system status.",
      tests: [
        // STOOL
        { name: "STOOL: Microscopy", price: "₦3,000" },
        { name: "STOOL: M/C/S", price: "₦7,000" },
        { name: "STOOL: Occult Blood", price: "₦7,000" },
        // BLOOD
        { name: "BLOOD: Malaria Parasites", price: "₦2,000" },
        { name: "BLOOD: Widal Reaction", price: "₦2,000" },
        { name: "BLOOD: V.D.R.L", price: "₦2,000" },
        { name: "BLOOD: Culture & Sensitivity", price: "₦12,000" },
        { name: "BLOOD: H.Pylori", price: "₦5,000" },
        { name: "BLOOD: TB (Serum)", price: "₦5,000" },
        { name: "BLOOD: Microfilaria", price: "₦5,000" },
        { name: "BLOOD: Trypanosome", price: "₦5,000" },
        { name: "BLOOD: Leishmania", price: "₦5,000" },
        // URINE
        { name: "URINE: Microscopy for Shistosoma oval", price: "₦3,000" },
        { name: "URINE: Urinalysis", price: "₦2,000" },
        { name: "URINE: M/C/S", price: "₦7,000" },
        // SPUTUM
        { name: "SPUTUM: ZN Stain (A-AFB) x 1", price: "₦5,000" },
        { name: "SPUTUM: M/C/S", price: "₦10,000" },
        { name: "SPUTUM: GenXpert", price: "₦7,000" },
        // SEMINAL FLUID
        { name: "SEMINAL FLUID: Analysis", price: "₦10,000" },
        { name: "SEMINAL FLUID: M/C/S", price: "₦15,000" },
        // SKIN
        { name: "SKIN: Snips For Microfilaria", price: "₦10,000" },
        { name: "SKIN: Fungal Element", price: "₦10,000" },
        // SWAB
        { name: "SWAB: HVS M/C/S", price: "₦6,000" },
        { name: "SWAB: Urethral M/C/S", price: "₦8,000" },
        { name: "SWAB: OTHERS M/C/S", price: "₦10,000" },
        // SCREENING TESTS
        { name: "HIV Screening test", price: "₦4,000" },
        { name: "Hepatitis 'A' Screening", price: "₦5,000" },
        { name: "Hepatitis 'B' Screening", price: "₦2,000" },
        { name: "Hepatitis 'C' Screening", price: "₦3,000" },
        { name: "Hepatitis Profile", price: "CALL" },
        { name: "Viral Load", price: "CALL" },
        // PREGNANCY TEST
        { name: "PREGNANCY TEST: Blood (for early detection)", price: "₦2,000" }
      ]
    },
    hormonal: {
      title: "Hormonal/Endocrine Profiles",
      icon: Heart,
      color: "from-medical-magenta to-pink-500",
      description: "Our hormonal testing services evaluate your endocrine system function, fertility status, and hormonal balance. These tests are essential for diagnosing hormonal disorders, fertility issues, and metabolic conditions.",
      tests: [
        { name: "Male Infertility/erectile dysfunction (FSH, LH, PRL, Test/Prog, E2)", price: "₦50,000" },
        { name: "Female Infertility/Hirsutism (FSH, LH, PRL, Test/Prog, E2)", price: "₦50,000" },
        { name: "FSH", price: "₦10,000" },
        { name: "LH", price: "₦10,000" },
        { name: "PROL", price: "₦10,000" },
        { name: "TEST.", price: "₦10,000" },
        { name: "PROG", price: "₦10,000" },
        { name: "E2", price: "₦10,000" },
        { name: "PSA", price: "₦10,000" },
        { name: "TFT", price: "₦50,000" },
        { name: "TSH", price: "₦15,000" }
      ]
    },
    histology: {
      title: "Histology & Cytology",
      icon: TestTube,
      color: "from-orange-500 to-red-500",
      description: "Our histopathology services examine tissue samples and cells to diagnose diseases, including cancer detection and tissue abnormalities. These detailed microscopic analyses provide crucial diagnostic information.",
      tests: [
        { name: "Histology studies (Small)", price: "₦30,000" },
        { name: "Histology studies (Medium)", price: "₦35,000" },
        { name: "Histology studies (Large)", price: "₦40,000" },
        { name: "Histology studies (Complex)", price: "₦45,000" },
        { name: "CYTOLOGY", price: "CALL" }
      ]
    },
    ecg: {
      title: "Electrocardiograph (ECG)",
      icon: Activity,
      color: "from-medical-cyan to-blue-600",
      description: "Our ECG services monitor your heart's electrical activity to detect heart rhythm abnormalities, heart attacks, and other cardiac conditions. This non-invasive test is essential for cardiovascular health assessment. All investigations are reviewed by qualified cardiologists.",
      tests: [
        { name: "Pre & Post Exercise", price: "₦12,000" }
      ]
    },
    xray: {
      title: "X-Ray with Radiological Report",
      icon: X,
      color: "from-gray-600 to-slate-700",
      description: "Our advanced digital X-ray imaging services provide detailed radiological reports for accurate diagnosis of bone fractures, lung conditions, and internal abnormalities. All investigations are reviewed by qualified cardiologists.",
      tests: [
        // Head and Neck
        { name: "Skull(AP & Lat)", price: "₦12,000" },
        { name: "Skull(All views)", price: "₦15,000" },
        { name: "Mandibles", price: "₦10,000" },
        { name: "Mastoids", price: "₦10,000" },
        { name: "Sinuses", price: "₦10,000" },
        { name: "Post Nasal Space", price: "₦10,000" },
        { name: "Cervical Spine (AP & lat)", price: "₦10,000" },
        { name: "Cervical Spine(with Obliges)", price: "₦10,000" },
        // Trunk
        { name: "Chest (PA)", price: "₦10,000" },
        { name: "Chest (AP & Lat)", price: "₦12,000" },
        { name: "Thoracic Inlet", price: "₦12,000" },
        { name: "Clavicle", price: "₦10,000" },
        { name: "Abdomen (AP & Lat)", price: "₦15,000" },
        { name: "Pelvis", price: "₦15,000" },
        { name: "Hips", price: "₦15,000" },
        { name: "Lumbosacral (AP & Lat)", price: "₦15,000" },
        { name: "Thoracic Spine (AP & Lat)", price: "₦15,000" },
        { name: "Abdomen for missing ICUD", price: "₦15,000" },
        // Upper and Lower Limbs
        { name: "Shoulder joint (Ap & lat)", price: "₦10,000" },
        { name: "Arm (Humerus) (AP & Lat)", price: "₦10,000" },
        { name: "Elbow Joint (Ap & lat)", price: "₦10,000" },
        { name: "Forearm (Radius & Ulna)", price: "₦10,000" },
        { name: "Wrist Joint", price: "₦10,000" },
        { name: "Hands/Fingers & Palm", price: "₦10,000" },
        { name: "Knee (AP & Lat)", price: "₦10,000" },
        { name: "Leg (Tibia & fibular)(AP & Lat)", price: "₦10,000" },
        { name: "Ankle Joint", price: "₦10,000" },
        { name: "Foot (AP & Oblique)", price: "₦10,000" },
        { name: "Femur or Thigh (AP & Lat)", price: "₦12,000" },
        // Special Investigation
        { name: "Hystero-Salpingogram (HSG)", price: "CALL" },
        { name: "OTHERS", price: "CALL" }
      ]
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/2348058135226', '_blank');
  };

  const handleBookService = (serviceName: string, priceString: string) => {
    if (priceString === "CALL") {
      openWhatsApp();
      return;
    }
    // Convert price string like "₦15,000" to number
    const priceNumber = parseInt(priceString.replace(/[₦,]/g, ''));
    
    navigate('/booking', {
      state: {
        serviceName: serviceName.split('\n')[0], // Take only the first line as service name
        servicePrice: priceNumber,
      },
    });
  };

  // Filter tests based on search term
  const filteredCategories = Object.entries(pricingData).reduce((acc, [key, category]) => {
    const filteredTests = category.tests.filter(test =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.price.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredTests.length > 0 || category.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[key] = { ...category, tests: filteredTests.length > 0 ? filteredTests : category.tests };
    }
    
    return acc;
  }, {} as typeof pricingData);

  return (
    <section id="pricing" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent">Price List</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transparent pricing for all our diagnostic services. Search for specific tests or browse by category.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for tests (e.g., 'blood sugar', 'x-ray chest')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(filteredCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            const isOpen = openCategories[key];
            
            const isPromo = (category as any).isPromo;
            const promoDate = (category as any).promoDate;
            
            return (
              <div key={key} className={`space-y-6 ${isPromo ? 'relative' : ''}`}>
                {/* Promo sparkle decorations */}
                {isPromo && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                )}
                
                {/* Always visible section with title and description */}
                <div className={`bg-gradient-to-r ${category.color} p-8 rounded-xl text-white ${isPromo ? 'ring-4 ring-yellow-400/50 shadow-2xl' : ''}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 ${isPromo ? 'bg-yellow-400/30' : 'bg-white/20'} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                      <div className="flex flex-wrap items-center gap-2">
                        {isPromo ? (
                          <>
                            <Badge variant="secondary" className="bg-yellow-400 text-black border-yellow-500 font-bold animate-pulse">
                              🎁 LIMITED TIME OFFER
                            </Badge>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {promoDate}
                            </Badge>
                          </>
                        ) : (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            2025 Pricing
                          </Badge>
                        )}
                        <span className="text-white/80 text-sm">{category.tests.length} packages available</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description always visible */}
                  {(category as any).description && (
                    <div className={`${isPromo ? 'bg-white/20' : 'bg-white/10'} rounded-lg p-6 backdrop-blur-sm border border-white/20`}>
                      <p className="text-white/95 leading-relaxed text-lg">
                        {(category as any).description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Accordion for Package Details */}
                <Card className={`border-2 hover:border-primary/20 transition-colors ${isPromo ? 'border-green-300 ring-2 ring-yellow-400/30' : ''}`}>
                  <Collapsible open={isOpen} onOpenChange={() => toggleCategory(key)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className={`cursor-pointer transition-colors py-6 ${isPromo ? 'hover:bg-green-50' : 'hover:bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isPromo ? 'bg-gradient-to-r from-red-100 to-green-100' : 'bg-primary/10'}`}>
                              <IconComponent className={`w-5 h-5 ${isPromo ? 'text-green-600' : 'text-primary'}`} />
                            </div>
                            <div>
                              <h3 className={`text-xl font-semibold ${isPromo ? 'text-green-700' : 'text-foreground'}`}>
                                {isPromo ? '🎄 View Christmas Special Packages' : `View Available ${category.title}`}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {isPromo ? 'Click to see all subsidized packages and savings' : 'Click to see all options and pricing details'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground hidden sm:block">
                              {isOpen ? 'Hide' : 'Show'} {isPromo ? 'packages' : 'tests'}
                            </span>
                            <ChevronDown className={`w-6 h-6 ${isPromo ? 'text-green-600' : 'text-primary'} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-6">
                        {/* Package Cards Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {category.tests.map((test, index) => {
                            const testSavings = (test as any).savings;
                            return (
                              <Card key={index} className={`border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group relative ${isPromo ? 'border-green-300 bg-gradient-to-br from-red-50/50 to-green-50/50' : ''}`}>
                                {/* Savings Badge */}
                                {testSavings && (
                                  <div className="absolute -top-3 -right-3 z-10">
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-3 py-1 shadow-lg">
                                      Save {testSavings}
                                    </Badge>
                                  </div>
                                )}
                                
                                <CardContent className="p-6">
                                  {/* Package Name */}
                                  <div className="mb-4">
                                    <h4 className={`text-xl font-bold group-hover:text-primary transition-colors ${isPromo ? 'text-green-700' : 'text-foreground'}`}>
                                      {test.name.split('\n')[0]}
                                    </h4>
                                  </div>
                                  
                                  {/* Tests Included */}
                                  <div className="mb-6">
                                    <h5 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                                      Tests Included:
                                    </h5>
                                    <div className="space-y-2">
                                      {test.name.split('\n').slice(1).map((line, lineIndex) => {
                                        if (line.trim().startsWith('•') || line.trim().startsWith('\t•')) {
                                          return (
                                            <div key={lineIndex} className="flex items-start space-x-2">
                                              <div className={`w-1.5 h-1.5 ${isPromo ? 'bg-green-500' : 'bg-primary'} rounded-full mt-2.5 flex-shrink-0`}></div>
                                              <span className="text-sm text-muted-foreground leading-relaxed">
                                                {line.replace(/^\t*•\t*/, '').trim()}
                                              </span>
                                            </div>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  </div>
                                  
                                  {/* Price and Book Button */}
                                  <div className="border-t pt-4 space-y-4">
                                    <div className="text-center">
                                      <span className={`text-3xl font-bold ${
                                        test.price === 'CALL' 
                                          ? 'text-accent' 
                                          : isPromo ? 'text-green-600' : 'text-primary'
                                      }`}>
                                        {test.price}
                                      </span>
                                      {testSavings && (
                                        <p className="text-sm text-red-500 font-medium mt-1">
                                          🎄 Christmas Special Price!
                                        </p>
                                      )}
                                    </div>
                                    <Button 
                                      onClick={() => handleBookService(test.name, test.price)}
                                      className={`w-full font-semibold py-3 ${isPromo ? 'bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700' : 'bg-primary hover:bg-primary/90'} text-white`}
                                      size="lg"
                                    >
                                      {test.price === 'CALL' ? 'Call for Details' : '🎁 Book Now'}
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>

                        {/* Contact Section */}
                        <Card className="mt-6 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100">
                          <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                              <div className="text-center sm:text-left">
                                <h4 className="font-semibold text-foreground mb-1">Need help choosing the right test?</h4>
                                <p className="text-sm text-muted-foreground">Contact us for personalized recommendations and immediate scheduling</p>
                              </div>
                              <Button 
                                onClick={openWhatsApp}
                                className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-white px-8"
                                size="lg"
                              >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Contact Us
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </div>
            );
          })}
        </div>

        {Object.keys(filteredCategories).length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No tests found</h3>
            <p className="text-muted-foreground">Try searching with different keywords or browse our categories</p>
          </div>
        )}

        {/* Contact for unlisted tests */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Don't see your test?</h3>
            <p className="text-muted-foreground mb-6">
              We offer many more specialized tests. Contact us for pricing on tests not listed above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={openWhatsApp} className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp: 08058135226
              </Button>
              <Button variant="outline" onClick={() => window.open('tel:+2347033600770', '_self')}>
                📞 Call: 07033600770
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingDetails;