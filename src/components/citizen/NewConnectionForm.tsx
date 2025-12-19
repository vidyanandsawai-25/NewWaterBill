import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplet, ChevronRight, FileText, User, MapPin, 
  CheckCircle, Upload, Phone, Mail, Home, Building2, 
  Camera, Building, Grid, Layers, Eye,
  Box, Map, Hash, Navigation, ChevronLeft, X, Check, Calendar, AlertCircle, Package,
  CreditCard, Wallet, Zap, Shield, Download, Users, Briefcase, Factory, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Card } from '../ui/card';
import { toast } from 'sonner';
import { ApplicationSuccess } from './ApplicationSuccess';
import waterTaxBg from 'figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png';

// Property database with full details
export const PROPERTY_DATABASE: Record<string, {
  hasConnection: boolean;
  ownerName: string;
  streetAddress: string;
  locality: string;
  area: string;
  plotNo: string;
  buildingName: string;
  zoneNo: string;
  wardNo: string;
  mobile: string;
  email: string;
  alternateContact: string;
}> = {
  'A1-1': { hasConnection: true, ownerName: 'Rajesh Kumar', streetAddress: 'MG Road', locality: 'Sector 5', area: 'Central Area', plotNo: '101', buildingName: 'Sunrise Apartments', zoneNo: 'A', wardNo: 'A1', mobile: '9876543210', email: 'rajesh.kumar@example.com', alternateContact: '9876543211' },
  'A1-2': { hasConnection: false, ownerName: 'Priya Sharma', streetAddress: 'Gandhi Nagar', locality: 'Sector 3', area: 'North Area', plotNo: '202', buildingName: 'Green Valley', zoneNo: 'A', wardNo: 'A1', mobile: '9876543212', email: 'priya.sharma@example.com', alternateContact: '9876543213' },
  'A1-3': { hasConnection: false, ownerName: 'Amit Patel', streetAddress: 'Station Road', locality: 'Sector 2', area: 'Central Area', plotNo: '103', buildingName: 'Lakshmi Complex', zoneNo: 'A', wardNo: 'A1', mobile: '9876543214', email: 'amit.patel@example.com', alternateContact: '9876543215' },
  'A1-4': { hasConnection: true, ownerName: 'Sunita Verma', streetAddress: 'Temple Street', locality: 'Sector 4', area: 'Central Area', plotNo: '104', buildingName: 'Shanti Bhavan', zoneNo: 'A', wardNo: 'A1', mobile: '9876543216', email: 'sunita.verma@example.com', alternateContact: '9876543217' },
  'A1-5': { hasConnection: false, ownerName: 'Vijay Singh', streetAddress: 'School Lane', locality: 'Sector 6', area: 'Central Area', plotNo: '105', buildingName: 'Vidya Vihar', zoneNo: 'A', wardNo: 'A1', mobile: '9876543218', email: 'vijay.singh@example.com', alternateContact: '9876543219' },
  
  'A2-1': { hasConnection: false, ownerName: 'Neha Desai', streetAddress: 'Lake View Road', locality: 'Sector 8', area: 'East Area', plotNo: '303', buildingName: 'Blue Horizon', zoneNo: 'A', wardNo: 'A2', mobile: '9876543220', email: 'neha.desai@example.com', alternateContact: '9876543221' },
  'A2-2': { hasConnection: false, ownerName: 'Rahul Mehta', streetAddress: 'Hill Top Avenue', locality: 'Sector 9', area: 'East Area', plotNo: '304', buildingName: 'Mountain View', zoneNo: 'A', wardNo: 'A2', mobile: '9876543222', email: 'rahul.mehta@example.com', alternateContact: '9876543223' },
  'A2-3': { hasConnection: true, ownerName: 'Kavita Joshi', streetAddress: 'Garden Road', locality: 'Sector 10', area: 'East Area', plotNo: '305', buildingName: 'Rose Garden', zoneNo: 'A', wardNo: 'A2', mobile: '9876543224', email: 'kavita.joshi@example.com', alternateContact: '9876543225' },
  
  'B1-1': { hasConnection: true, ownerName: 'Sandeep Reddy', streetAddress: 'Market Street', locality: 'Sector 1', area: 'South Area', plotNo: '404', buildingName: 'Golden Plaza', zoneNo: 'B', wardNo: 'B1', mobile: '9876543226', email: 'sandeep.reddy@example.com', alternateContact: '9876543227' },
  'B1-2': { hasConnection: false, ownerName: 'Anjali Gupta', streetAddress: 'Park Avenue', locality: 'Sector 6', area: 'West Area', plotNo: '505', buildingName: 'Skyline Tower', zoneNo: 'B', wardNo: 'B1', mobile: '9876543228', email: 'anjali.gupta@example.com', alternateContact: '9876543229' },
  'B1-3': { hasConnection: false, ownerName: 'Manoj Nair', streetAddress: 'Beach Road', locality: 'Sector 7', area: 'South Area', plotNo: '406', buildingName: 'Ocean Pearl', zoneNo: 'B', wardNo: 'B1', mobile: '9876543230', email: 'manoj.nair@example.com', alternateContact: '9876543231' },
  
  'B2-5': { hasConnection: true, ownerName: 'Deepak Shah', streetAddress: 'Park Street', locality: 'Sector 8', area: 'West Area', plotNo: '508', buildingName: 'Trade Center', zoneNo: 'B', wardNo: 'B2', mobile: '9876543232', email: 'deepak.shah@example.com', alternateContact: '9876543233' },
  'B2-2': { hasConnection: false, ownerName: 'Pooja Iyer', streetAddress: 'Industrial Area', locality: 'Sector 13', area: 'West Area', plotNo: '509', buildingName: 'Tech Park', zoneNo: 'B', wardNo: 'B2', mobile: '9876543234', email: 'pooja.iyer@example.com', alternateContact: '9876543235' },
  
  'C1-1': { hasConnection: false, ownerName: 'Suresh Rao', streetAddress: 'New Colony Road', locality: 'Sector 14', area: 'North Zone', plotNo: '601', buildingName: 'Asha Nagar', zoneNo: 'C', wardNo: 'C1', mobile: '9876543236', email: 'suresh.rao@example.com', alternateContact: '9876543237' },
  'C1-2': { hasConnection: true, ownerName: 'Meera Kulkarni', streetAddress: 'Main Bazaar', locality: 'Sector 15', area: 'North Zone', plotNo: '602', buildingName: 'City Centre', zoneNo: 'C', wardNo: 'C1', mobile: '9876543238', email: 'meera.kulkarni@example.com', alternateContact: '9876543239' },
  'C3-12': { hasConnection: true, ownerName: 'Vikram Chatterjee', streetAddress: 'Lake View', locality: 'Sector 20', area: 'North Zone', plotNo: '650', buildingName: 'Lake View Apartments', zoneNo: 'C', wardNo: 'C3', mobile: '9876543240', email: 'vikram.chatterjee@example.com', alternateContact: '9876543241' },
  
  'D1-1': { hasConnection: false, ownerName: 'Arun Pillai', streetAddress: 'Airport Road', locality: 'Sector 16', area: 'Outer Area', plotNo: '701', buildingName: 'Skyway Apartments', zoneNo: 'D', wardNo: 'D1', mobile: '9876543242', email: 'arun.pillai@example.com', alternateContact: '9876543243' },
  'D1-2': { hasConnection: false, ownerName: 'Rekha Chopra', streetAddress: 'Highway Circle', locality: 'Sector 17', area: 'Outer Area', plotNo: '702', buildingName: 'Gateway Residency', zoneNo: 'D', wardNo: 'D1', mobile: '9876543244', email: 'rekha.chopra@example.com', alternateContact: '9876543245' },
  'D1-8': { hasConnection: true, ownerName: 'Sanjay Malhotra', streetAddress: 'Green Valley', locality: 'Sector 12', area: 'Outer Area', plotNo: '750', buildingName: 'Industrial Complex', zoneNo: 'D', wardNo: 'D1', mobile: '9876543246', email: 'sanjay.malhotra@example.com', alternateContact: '9876543247' },
};

interface NewConnectionFormProps {
  selectedPropertyNumber?: string;
  onBackToDashboard?: () => void;
}

export function NewConnectionForm({ selectedPropertyNumber, onBackToDashboard }: NewConnectionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedApplicationId, setGeneratedApplicationId] = useState('');
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [showApplicantDetails, setShowApplicantDetails] = useState(false);
  const [showHeaderSection, setShowHeaderSection] = useState(false);

  // Get property data from database based on selected property
  const propertyInfo = selectedPropertyNumber ? PROPERTY_DATABASE[selectedPropertyNumber] : null;
  
  // Property data - dynamically loaded from selected property
  const [propertyData] = useState({
    propertyNumber: selectedPropertyNumber || '',
    zoneNo: propertyInfo?.zoneNo || '',
    wardNo: propertyInfo?.wardNo || '',
    ownerName: propertyInfo?.ownerName || '',
    buildingName: propertyInfo?.buildingName || '',
    streetAddress: propertyInfo?.streetAddress || '',
    locality: propertyInfo?.locality || '',
    area: propertyInfo?.area || '',
    plotNo: propertyInfo?.plotNo || '',
  });

  // Applicant & Connection Details (Step 1) - Auto-filled from property data
  const [applicationData, setApplicationData] = useState({
    applicantName: propertyInfo?.ownerName || '',
    mobile: propertyInfo?.mobile || '',
    email: propertyInfo?.email || '',
    alternateContact: propertyInfo?.alternateContact || '',
    connectionType: '', // New/Additional/Temporary
    connectionSize: '', // Pipe diameter
    connectionCategory: '', // Domestic/Commercial/Industrial/Institutional
    purposeOfConnection: '',
    numberOfOccupants: '',
    estimatedUsage: '',
    billingFrequency: '', // niyamit (quarterly) or vaarshik (annual)
    meterType: '', // meter or non-meter
  });

  // Documents (Step 2) - As per the image requirements
  const [documents, setDocuments] = useState<Record<string, File | null>>({
    ownershipProof: null, // मिळकतीची स्वामित्वाचे पुरावा
    identityProof: null, // रेशन कार्ड / पॅन कार्ड / आधार कार्ड / etc.
    electoralRoll: null, // निवडणूक आयोगाची मतदारांची यादी (optional)
    oldWaterBill: null, // जुनी नळ जोडणी पाणी बिल (optional - for additional connection)
    taxReceipt: null, // अडवाणत ग्राहकाचा कर भरलेल्या पावती
    societyCertificate: null, // क्षेत्र प्रमुखाची सामाजिकी संहिती (optional)
  });

  const [finalDeclaration, setFinalDeclaration] = useState(false);

  const steps = [
    { id: 1, label: 'Connection Details', icon: Droplet, color: '#EC4899' },
    { id: 2, label: 'Documents Upload', icon: Upload, color: '#8B5CF6' },
    { id: 3, label: 'Review & Submit', icon: CheckCircle, color: '#10B981' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!applicationData.applicantName.trim()) newErrors.applicantName = 'Applicant name is required';
      if (!applicationData.mobile.match(/^[6-9]\d{9}$/)) newErrors.mobile = 'Valid 10-digit mobile required';
      if (!applicationData.connectionType) newErrors.connectionType = 'Please select connection type';
      if (!applicationData.connectionSize) newErrors.connectionSize = 'Please select pipe size';
      if (!applicationData.connectionCategory) newErrors.connectionCategory = 'Please select category';
      if (!applicationData.numberOfOccupants) newErrors.numberOfOccupants = 'Please enter number of occupants';
      if (!applicationData.billingFrequency) newErrors.billingFrequency = 'Please select billing frequency';
      if (!applicationData.meterType) newErrors.meterType = 'Please select meter type';
    }

    if (step === 2) {
      if (!documents.ownershipProof) newErrors.ownershipProof = 'Property ownership proof is required';
      if (!documents.identityProof) newErrors.identityProof = 'Identity proof is required';
      if (!documents.taxReceipt) newErrors.taxReceipt = 'Tax receipt is required';
      if (!finalDeclaration) newErrors.finalDeclaration = 'Please accept the declaration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Generate application ID and submit
        const year = new Date().getFullYear();
        const randomId = Math.floor(100000 + Math.random() * 900000);
        const applicationId = `WNC-${year}-${randomId}`;
        setGeneratedApplicationId(applicationId);
        setShowSuccess(true);
        toast.success('Application Submitted Successfully!', {
          description: `Application ID: ${applicationId}`,
        });
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(s => Math.max(1, s - 1));
  };

  const progressPercentage = ((completedSteps.length) / steps.length) * 100;

  // Show warning if no property selected
  if (!selectedPropertyNumber || !propertyInfo) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-md w-full mx-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-3">No Property Selected</h2>
            <p className="text-gray-600 mb-6">
              Please select a property from your account to apply for a new water connection.
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl px-8"
              onClick={() => window.location.reload()}
            >
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Full Width Water Tax Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
          style={{
            backgroundImage: `url(${waterTaxBg})`
          }}
        />
      </div>

      {/* Toggle Button for Header */}
      <div className="flex-shrink-0 px-4 md:px-8 py-3 relative z-10 bg-white/70 backdrop-blur-lg border-b border-gray-200/50 mt-[50px]">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-2 text-gray-700 hover:bg-white/50"
            onClick={() => setShowHeaderSection(!showHeaderSection)}
          >
            {showHeaderSection ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Form Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Form Details
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Header */}
      <AnimatePresence>
        {showHeaderSection && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex-shrink-0 px-4 md:px-8 py-6 relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center shadow-xl shadow-blue-300/50">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900">New Water Connection</h1>
                <p className="text-sm text-gray-600 mt-1">Complete the form to apply for a new connection</p>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="35" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progressPercentage * 2.2} 220`}
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
            </div>
                </div>

                {/* Pre-selected Property Details Card */}
                <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl shadow-lg overflow-hidden">
                  <div className="flex items-center gap-3 p-6 cursor-pointer" onClick={() => setShowPropertyDetails(!showPropertyDetails)}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg text-gray-900">Selected Property</h3>
                    <Badge className="bg-gradient-to-r from-green-500 to-teal-400 text-white border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-gray-700 hover:bg-white/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPropertyDetails(!showPropertyDetails);
                      }}
                    >
                {showPropertyDetails ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Show Details
                  </>
                )}
                  </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showPropertyDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Property Number</p>
                              <p className="text-sm text-gray-900">{propertyData.propertyNumber}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Owner Name</p>
                              <p className="text-sm text-gray-900">{propertyData.ownerName}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Building Name</p>
                              <p className="text-sm text-gray-900">{propertyData.buildingName}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Plot Number</p>
                              <p className="text-sm text-gray-900">{propertyData.plotNo}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3 col-span-2">
                              <p className="text-xs text-gray-600 mb-1">Address</p>
                              <p className="text-sm text-gray-900">{propertyData.streetAddress}, {propertyData.locality}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3 col-span-2">
                              <p className="text-xs text-gray-600 mb-1">Area</p>
                              <p className="text-sm text-gray-900">{propertyData.area} (Zone {propertyData.zoneNo}, Ward {propertyData.wardNo})</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Auto-filled Applicant Details Card */}
                <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl shadow-lg overflow-hidden">
                  <div className="flex items-center gap-3 p-6 cursor-pointer" onClick={() => setShowApplicantDetails(!showApplicantDetails)}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#8B5CF6] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg text-gray-900">Applicant Information</h3>
                    <Badge className="bg-gradient-to-r from-green-500 to-teal-400 text-white border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Auto-filled
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-gray-700 hover:bg-white/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowApplicantDetails(!showApplicantDetails);
                      }}
                    >
                      {showApplicantDetails ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Show Details
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showApplicantDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Applicant Name</p>
                              <p className="text-sm text-gray-900">{applicationData.applicantName}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Mobile Number</p>
                              <p className="text-sm text-gray-900">{applicationData.mobile}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Email Address</p>
                              <p className="text-sm text-gray-900">{applicationData.email}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-xs text-gray-600 mb-1">Alternate Contact</p>
                              <p className="text-sm text-gray-900">{applicationData.alternateContact}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = completedSteps.includes(step.id);

                    return (
                      <div key={step.id} className="flex items-center flex-1">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? 'bg-gradient-to-br from-green-500 to-teal-400 shadow-lg shadow-green-300/50'
                                : isActive
                                ? 'bg-gradient-to-br from-pink-500 to-rose-400 shadow-lg shadow-pink-300/50'
                                : 'bg-gray-200'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <Icon className={`w-5 h-5 ${isActive || isCompleted ? 'text-white' : 'text-gray-500'}`} />
                            )}
                          </div>
                          <span className={`text-sm transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500'} hidden lg:inline`}>
                            {step.label}
                          </span>
                        </div>

                        {index < steps.length - 1 && (
                          <div className="h-1.5 flex-1 mx-3 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isCompleted ? 'bg-gradient-to-r from-green-500 to-teal-400 w-full' : 'w-0'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
          >
            {/* Step Header */}
            <div className={`px-8 py-6 ${
              currentStep === 1 ? 'bg-gradient-to-r from-[#EC4899] to-[#F472B6]' :
              currentStep === 2 ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]' :
              'bg-gradient-to-r from-[#10B981] to-[#34D399]'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {(() => {
                    const Icon = steps[currentStep - 1].icon;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl text-white">{steps[currentStep - 1].label}</h2>
                  <p className="text-sm text-white/90 mt-0.5">
                    {currentStep === 1 && 'Provide your details and connection requirements'}
                    {currentStep === 2 && 'Upload all required documents'}
                    {currentStep === 3 && 'Review and submit your application'}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="md:p-12 pt-[35px] pr-[48px] pb-[48px] pl-[48px] px-[48px] py-[20px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* STEP 1 - Connection Details */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      {/* Applicant Information Card */}
                      

                      {/* Connection Requirements */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center">
                            <Droplet className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg text-gray-900">Connection Requirements</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Connection Type */}
                          <div className="space-y-3">
                            <Label className="text-base text-gray-700">
                              Connection Type <span className="text-red-500">*</span>
                            </Label>
                            <Select 
                              value={applicationData.connectionType} 
                              onValueChange={(v) => setApplicationData({ ...applicationData, connectionType: v })}
                            >
                              <SelectTrigger className="h-14 text-base border-2 border-blue-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 rounded-xl">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New Connection</SelectItem>
                                <SelectItem value="additional">Additional Connection</SelectItem>
                                <SelectItem value="temporary">Temporary Connection</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.connectionType && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.connectionType}</p>}
                          </div>

                          {/* Connection Size */}
                          <div className="space-y-3">
                            <Label className="text-base text-gray-700">
                              Pipe Size (mm) <span className="text-red-500">*</span>
                            </Label>
                            <Select 
                              value={applicationData.connectionSize} 
                              onValueChange={(v) => setApplicationData({ ...applicationData, connectionSize: v })}
                            >
                              <SelectTrigger className="h-14 text-base border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 rounded-xl">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15mm">15 mm</SelectItem>
                                <SelectItem value="20mm">20 mm</SelectItem>
                                <SelectItem value="25mm">25 mm</SelectItem>
                                <SelectItem value="32mm">32 mm</SelectItem>
                                <SelectItem value="40mm">40 mm</SelectItem>
                                <SelectItem value="50mm">50 mm</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.connectionSize && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.connectionSize}</p>}
                          </div>

                          {/* Connection Category */}
                          <div className="space-y-3">
                            <Label className="text-base text-gray-700">
                              Connection Category <span className="text-red-500">*</span>
                            </Label>
                            <Select 
                              value={applicationData.connectionCategory} 
                              onValueChange={(v) => setApplicationData({ ...applicationData, connectionCategory: v })}
                            >
                              <SelectTrigger className="h-14 text-base border-2 border-blue-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 rounded-xl">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="domestic">🏠 Domestic</SelectItem>
                                <SelectItem value="commercial">💼 Commercial</SelectItem>
                                <SelectItem value="industrial">🏭 Industrial</SelectItem>
                                <SelectItem value="institutional">🏢 Institutional</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.connectionCategory && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.connectionCategory}</p>}
                          </div>

                          {/* Number of Occupants */}
                          <div className="space-y-3">
                            <Label className="text-base text-gray-700 flex items-center gap-2">
                              <Users className="w-4 h-4 text-indigo-500" />
                              Number of Occupants <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="number"
                              value={applicationData.numberOfOccupants}
                              onChange={(e) => setApplicationData({ ...applicationData, numberOfOccupants: e.target.value })}
                              placeholder="Enter number"
                              className="h-14 text-base border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl"
                            />
                            {errors.numberOfOccupants && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.numberOfOccupants}</p>}
                          </div>

                          {/* Estimated Daily Usage */}
                          <div className="space-y-3">
                            <Label className="text-base text-gray-700">
                              Estimated Daily Usage (Liters) <span className="text-gray-400 text-xs">(Optional)</span>
                            </Label>
                            <Input
                              type="number"
                              value={applicationData.estimatedUsage}
                              onChange={(e) => setApplicationData({ ...applicationData, estimatedUsage: e.target.value })}
                              placeholder="e.g., 500"
                              className="h-14 text-base border-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl"
                            />
                          </div>

                          {/* Billing Frequency */}
                          <div className="space-y-3 md:col-span-2">
                            <Label className="text-base text-gray-700 mb-3">
                              Billing Frequency / बिल वारंवारता <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                { value: 'niyamit', labelEn: 'Niyamit (Quarterly)', labelMr: 'नियमित (त्रैमासिक)', desc: 'Bill every 3 months', color: 'from-blue-500 to-cyan-500' },
                                { value: 'vaarshik', labelEn: 'Vaarshik (Annual)', labelMr: 'वार्षिक (वार्षिक)', desc: 'Bill once a year', color: 'from-purple-500 to-pink-500' },
                              ].map((freq) => {
                                const isSelected = applicationData.billingFrequency === freq.value;
                                return (
                                  <motion.div
                                    key={freq.value}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setApplicationData({ ...applicationData, billingFrequency: freq.value })}
                                    className={`relative cursor-pointer rounded-xl p-5 border-2 transition-all ${
                                      isSelected
                                        ? `border-transparent bg-gradient-to-br ${freq.color} text-white shadow-xl`
                                        : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 hover:shadow-md'
                                    }`}
                                  >
                                    <div className="flex flex-col gap-2">
                                      <div className={`text-base ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                        {freq.labelEn}
                                      </div>
                                      <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                                        {freq.labelMr}
                                      </div>
                                      <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                                        {freq.desc}
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <div className="absolute top-3 right-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                      </div>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>
                            {errors.billingFrequency && <p className="text-xs text-red-500 flex items-center gap-1 mt-2"><AlertCircle className="h-3 w-3" />{errors.billingFrequency}</p>}
                          </div>

                          {/* Meter Type */}
                          <div className="space-y-3 md:col-span-2">
                            <Label className="text-base text-gray-700 mb-3">
                              Connection Meter Type / मीटर प्रकार <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                { value: 'meter', labelEn: 'Meter Connection', labelMr: 'मीटर कनेक्शन', desc: 'Bill based on actual meter reading', color: 'from-green-500 to-teal-500', icon: '📊' },
                                { value: 'non-meter', labelEn: 'Non-Meter Connection', labelMr: 'बिन-मीटर कनेक्शन', desc: 'Fixed rate billing', color: 'from-orange-500 to-red-500', icon: '💰' },
                              ].map((meter) => {
                                const isSelected = applicationData.meterType === meter.value;
                                return (
                                  <motion.div
                                    key={meter.value}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setApplicationData({ ...applicationData, meterType: meter.value })}
                                    className={`relative cursor-pointer rounded-xl p-5 border-2 transition-all ${
                                      isSelected
                                        ? `border-transparent bg-gradient-to-br ${meter.color} text-white shadow-xl`
                                        : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 hover:shadow-md'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="text-3xl">{meter.icon}</div>
                                      <div className="flex-1">
                                        <div className={`text-base ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                          {meter.labelEn}
                                        </div>
                                        <div className={`text-sm mt-1 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                                          {meter.labelMr}
                                        </div>
                                        <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                                          {meter.desc}
                                        </div>
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <div className="absolute top-3 right-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                      </div>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>
                            {errors.meterType && <p className="text-xs text-red-500 flex items-center gap-1 mt-2"><AlertCircle className="h-3 w-3" />{errors.meterType}</p>}
                          </div>

                          {/* Purpose */}
                          <div className="space-y-3 md:col-span-2">
                            <Label className="text-base text-gray-700">
                              Purpose of Connection <span className="text-gray-400 text-xs">(Optional)</span>
                            </Label>
                            <textarea
                              value={applicationData.purposeOfConnection}
                              onChange={(e) => setApplicationData({ ...applicationData, purposeOfConnection: e.target.value })}
                              placeholder="Brief description of how you plan to use the water connection"
                              rows={3}
                              className="w-full px-4 py-3 text-base border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-green-50/80"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 - Documents Upload */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Info Card */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 mt-[0px] mr-[0px] mb-[20px] ml-[0px]">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Upload className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg text-gray-900 mb-2">Required Documents</h3>
                            <p className="text-sm text-gray-700">
                              Please upload clear scanned copies or photos of the required documents. Accepted formats: PDF, JPG, PNG (Max 5MB each)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Documents Upload Table */}
                      <div className="border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg">
                        <table className="w-full">
                          <thead className="bg-gradient-to-r from-purple-500 to-pink-500">
                            <tr>
                              <th className="text-left p-5 text-white">Document Type / दस्तऐवज प्रकार</th>
                              <th className="text-center p-5 text-white w-32">Status</th>
                              <th className="text-center p-5 text-white w-40">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white/40 backdrop-blur-sm">
                            {[
                              { 
                                key: 'ownershipProof', 
                                labelEn: 'Property Ownership Proof', 
                                labelMr: 'मिळकतीची स्वामित्वाच��� पुरावा',
                                required: true 
                              },
                              { 
                                key: 'identityProof', 
                                labelEn: 'Identity Proof', 
                                labelMr: 'रेशन कार्ड / पॅन कार्ड / आधार कार्ड / ड्रायव्हिंग लायसन्स / पासपोर्ट / मतदान ओळखपत्र',
                                required: true 
                              },
                              { 
                                key: 'taxReceipt', 
                                labelEn: 'Property Tax Payment Receipt', 
                                labelMr: 'अडवाणत ग्राहकाचा कर भरलेल्या पावती',
                                required: true 
                              },
                              { 
                                key: 'electoralRoll', 
                                labelEn: 'Electoral Roll Reference', 
                                labelMr: 'निवडणूक आयोगाची मतदारांची यादी संदर्भ',
                                required: false 
                              },
                              { 
                                key: 'oldWaterBill', 
                                labelEn: 'Old Water Connection Bill (For Additional Connection)', 
                                labelMr: 'जुनी नळ जोडणी पाणी बिल पावती',
                                required: false 
                              },
                              { 
                                key: 'societyCertificate', 
                                labelEn: 'Society / Area Certificate', 
                                labelMr: 'क्षेत्र प्रमुखाची सामाजिकी संहिती सहकरणावरी संस्था',
                                required: false 
                              },
                            ].map((doc, idx) => {
                              const isUploaded = documents[doc.key as keyof typeof documents] !== null;
                              return (
                                <tr key={doc.key} className={`border-t-2 border-purple-100 ${idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}`}>
                                  <td className="p-5">
                                    <div className="flex items-start gap-3">
                                      <FileText className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <p className="text-sm text-gray-900 mb-0.5">{doc.labelEn}</p>
                                        <p className="text-xs text-gray-600">{doc.labelMr}</p>
                                        {doc.required && <span className="text-xs text-red-500 mt-1 inline-block">* Required</span>}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-5 text-center">
                                    {isUploaded ? (
                                      <Badge className="bg-gradient-to-r from-green-500 to-teal-400 text-white border-0 shadow-md">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Uploaded
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
                                        Pending
                                      </Badge>
                                    )}
                                  </td>
                                  <td className="p-5 text-center">
                                    <label>
                                      <Button 
                                        size="sm" 
                                        variant={isUploaded ? "outline" : "default"}
                                        className={isUploaded 
                                          ? "border-2 border-purple-300 text-purple-700 hover:bg-purple-50" 
                                          : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                                        }
                                        asChild
                                      >
                                        <span className="cursor-pointer">
                                          <Upload className="h-4 w-4 mr-2" />
                                          {isUploaded ? 'Re-upload' : 'Upload'}
                                        </span>
                                      </Button>
                                      <input 
                                        type="file" 
                                        accept=".pdf,.jpg,.jpeg,.png" 
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            if (file.size > 5 * 1024 * 1024) {
                                              toast.error('File too large', { description: 'Maximum file size is 5MB' });
                                              return;
                                            }
                                            setDocuments({ ...documents, [doc.key]: file });
                                            toast.success('Document uploaded successfully!');
                                          }
                                        }}
                                      />
                                    </label>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Declaration */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            id="declaration"
                            checked={finalDeclaration}
                            onCheckedChange={(checked) => setFinalDeclaration(checked as boolean)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor="declaration" className="text-base text-gray-900 cursor-pointer">
                              <span className="block mb-2">Declaration <span className="text-red-500">*</span></span>
                              <span className="text-gray-700 block leading-relaxed">
                                I hereby declare that all the information provided above is true and correct to the best of my knowledge. 
                                I understand that any false information may result in rejection of my application and/or legal action. 
                                I agree to abide by all the rules and regulations of the Municipal Corporation regarding water supply.
                              </span>
                            </Label>
                          </div>
                        </div>
                        {errors.finalDeclaration && <p className="text-xs text-red-500 flex items-center gap-1 mt-3 ml-8"><AlertCircle className="h-3 w-3" />{errors.finalDeclaration}</p>}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 - Review & Submit */}
                  {currentStep === 3 && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                      {/* Success Header */}
                      <div className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 border-2 border-green-300 rounded-2xl p-8 text-center shadow-xl">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl text-gray-900 mb-2">Review Your Application</h3>
                        <p className="text-gray-700">Please review all details before final submission</p>
                      </div>

                      {/* Property Details Summary */}
                      <div className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md">
                        <div className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] px-6 py-4">
                          <h4 className="text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <Building2 className="w-5 h-5" />
                            </div>
                            Property Details
                          </h4>
                        </div>
                        <div className="p-6 bg-white/60 backdrop-blur-sm">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-600">Property No:</span> <span className="text-gray-900">{propertyData.propertyNumber}</span></div>
                            <div><span className="text-gray-600">Owner:</span> <span className="text-gray-900">{propertyData.ownerName}</span></div>
                            <div><span className="text-gray-600">Plot No:</span> <span className="text-gray-900">{propertyData.plotNo}</span></div>
                            <div><span className="text-gray-600">Zone/Ward:</span> <span className="text-gray-900">{propertyData.zoneNo} / {propertyData.wardNo}</span></div>
                            <div className="col-span-2"><span className="text-gray-600">Building:</span> <span className="text-gray-900">{propertyData.buildingName}</span></div>
                            <div className="col-span-2"><span className="text-gray-600">Address:</span> <span className="text-gray-900">{propertyData.streetAddress}, {propertyData.locality}, {propertyData.area}</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Applicant & Connection Details */}
                      <div className="border-2 border-pink-200 rounded-2xl overflow-hidden shadow-md">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-4">
                          <h4 className="text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <Droplet className="w-5 h-5" />
                            </div>
                            Connection Details
                          </h4>
                        </div>
                        <div className="p-6 bg-white/60 backdrop-blur-sm">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-600">Applicant:</span> <span className="text-gray-900">{applicationData.applicantName}</span></div>
                            <div><span className="text-gray-600">Mobile:</span> <span className="text-gray-900">{applicationData.mobile}</span></div>
                            {applicationData.email && <div><span className="text-gray-600">Email:</span> <span className="text-gray-900">{applicationData.email}</span></div>}
                            {applicationData.alternateContact && <div><span className="text-gray-600">Alt Contact:</span> <span className="text-gray-900">{applicationData.alternateContact}</span></div>}
                            <div><span className="text-gray-600">Type:</span> <span className="text-gray-900 capitalize">{applicationData.connectionType}</span></div>
                            <div><span className="text-gray-600">Pipe Size:</span> <span className="text-gray-900">{applicationData.connectionSize}</span></div>
                            <div><span className="text-gray-600">Category:</span> <span className="text-gray-900 capitalize">{applicationData.connectionCategory}</span></div>
                            <div><span className="text-gray-600">Occupants:</span> <span className="text-gray-900">{applicationData.numberOfOccupants}</span></div>
                            <div><span className="text-gray-600">Billing:</span> <span className="text-gray-900 capitalize">{applicationData.billingFrequency === 'niyamit' ? 'Niyamit (Quarterly)' : 'Vaarshik (Annual)'}</span></div>
                            <div><span className="text-gray-600">Meter Type:</span> <span className="text-gray-900 capitalize">{applicationData.meterType === 'meter' ? 'Metered' : 'Non-Metered (Fixed)'}</span></div>
                            {applicationData.estimatedUsage && <div className="col-span-2"><span className="text-gray-600">Est. Usage:</span> <span className="text-gray-900">{applicationData.estimatedUsage} liters/day</span></div>}
                            {applicationData.purposeOfConnection && <div className="col-span-2"><span className="text-gray-600">Purpose:</span> <span className="text-gray-900">{applicationData.purposeOfConnection}</span></div>}
                          </div>
                        </div>
                      </div>

                      {/* Documents Summary */}
                      <div className="border-2 border-purple-200 rounded-2xl overflow-hidden shadow-md">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                          <h4 className="text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <Upload className="w-5 h-5" />
                            </div>
                            Uploaded Documents
                          </h4>
                        </div>
                        <div className="p-6 bg-white/60 backdrop-blur-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(documents).map(([key, file]) => (
                              file && (
                                <div key={key} className="flex items-center gap-2 text-sm bg-green-50 border border-green-200 rounded-lg p-3">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span className="text-gray-900 truncate">{file.name}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t-2 border-gray-200 flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentStep === 1}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:hover:bg-transparent rounded-xl px-6"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </div>

              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!applicationData.applicantName || !applicationData.mobile.match(/^[6-9]\d{9}$/) || !applicationData.connectionType || !applicationData.connectionSize || !applicationData.connectionCategory || !applicationData.numberOfOccupants || !applicationData.billingFrequency || !applicationData.meterType)) ||
                  (currentStep === 2 && (!documents.ownershipProof || !documents.identityProof || !documents.taxReceipt || !finalDeclaration))
                }
                className={`rounded-xl px-8 shadow-xl ${
                  currentStep === 1 ? 'bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500' :
                  currentStep === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' :
                  'bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500'
                } text-white disabled:opacity-50 disabled:shadow-none`}
              >
                {currentStep === 3 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                ) : (
                  <>
                    Next Step
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Application Success Modal */}
      {showSuccess && (
        <ApplicationSuccess
          applicationId={generatedApplicationId}
          onClose={() => setShowSuccess(false)}
          onBackToDashboard={onBackToDashboard}
        />
      )}
    </div>
  );
}
