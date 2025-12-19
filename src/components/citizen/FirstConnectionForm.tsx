import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Droplets,
  User,
  MapPin,
  Phone,
  Mail,
  Home,
  FileText,
  CheckCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Building2,
  Hash,
  Shield,
  AlertCircle,
  Info,
  Sparkles,
  X,
  Camera,
  ChevronLeft,
  Grid,
  Navigation,
  Calendar,
  Eye,
  Building,
  Layers,
  Package,
  Users,
  CreditCard,
  Wallet,
  Zap,
  Download
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { ApplicationSuccess } from './ApplicationSuccess';
import { toast } from 'sonner@2.0.3';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface FirstConnectionFormProps {
  onBack?: () => void;
}

export function FirstConnectionForm({ onBack }: FirstConnectionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedApplicationId, setGeneratedApplicationId] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<{ file: File | null; url: string; name: string } | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstNameEnglish: '',
    middleNameEnglish: '',
    lastNameEnglish: '',
    firstNameMarathi: '',
    middleNameMarathi: '',
    lastNameMarathi: '',
    fatherHusbandName: '',
    dateOfBirth: '',
    gender: '',
    emailId: '',
    mobileNo: '',
    alternateMobile: '',
    aadharNo: '',
    panNo: '',
    
    // Step 2: Property Details
    propertyNumber: '',
    zoneNo: '',
    wardNo: '',
    sectionNo: '',
    buildingName: '',
    wingFlat: '',
    plotNo: '',
    surveyNo: '',
    streetAddress: '',
    locality: '',
    area: '',
    landmark: '',
    pincode: '',
    propertyType: '',  // owned/rented
    ownerName: '',     // if rented
    ownerContact: '',  // if rented
    noOfFloors: '',
    latitude: '',
    longitude: '',
    
    // Step 3: Connection Details
    applicationType: '',  // new/reconnection
    connectionUse: '',    // domestic/commercial/industrial
    buildingType: '',     // residential/commercial/industrial
    buildingCategory: '', // domestic/commercial/institutional
    connectionSize: '',
    pipeSize: '',
    noOfFamilyMembers: '',
    noOfRooms: '',
    purposeOfConnection: '',
    waterSource: '',      // municipal/bore-well/both
    
    // Step 4: Documents
    aadharCard: null as File | null,
    addressProof: null as File | null,
    propertyProof: null as File | null,
    nocDocument: null as File | null,
    photograph: null as File | null,
    propertyTaxReceipt: null as File | null,
    propertyPhoto: null as File | null,
  });

  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardName: '',
    bankName: '',
    walletProvider: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, label: 'Personal', icon: User, color: 'from-pink-500 to-rose-400' },
    { id: 2, label: 'Property', icon: Home, color: 'from-purple-500 to-violet-400' },
    { id: 3, label: 'Connection', icon: Droplets, color: 'from-indigo-500 to-blue-400' },
    { id: 4, label: 'Documents', icon: Upload, color: 'from-amber-500 to-orange-400' },
    { id: 5, label: 'Review', icon: CheckCircle, color: 'from-green-500 to-teal-400' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      toast.success(`${field} uploaded successfully`);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const applicationId = `WNC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`;
    setGeneratedApplicationId(applicationId);
    setShowSuccess(true);
    
    toast.success('Application submitted successfully!', {
      description: `Your application ID is ${applicationId}. Login credentials will be sent to your mobile and email after approval.`,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);
      toast.success('Payment successful!', {
        description: 'Your connection fee has been paid.',
      });
    }, 2000);
  };

  const calculateFee = () => {
    const baseFees: {[key: string]: number} = {
      '15mm': 1500,
      '20mm': 2000,
      '25mm': 3000,
      '40mm': 5000,
      '50mm': 7500
    };
    
    let fee = baseFees[formData.pipeSize] || 1500;
    
    // Add processing fee
    fee += 500;
    
    return fee;
  };

  const openDocPreview = (file: File | null, name: string) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewDoc({ file, url, name });
    }
  };

  const closeDocPreview = () => {
    if (previewDoc?.url) {
      URL.revokeObjectURL(previewDoc.url);
    }
    setPreviewDoc(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-3 relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-25">
        <motion.div
          className="absolute top-10 left-5 w-80 h-80 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-96 h-96 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.35, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3"
        >
          <div className="flex items-center justify-between mb-2">
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-white/80 h-8 px-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </Button>
            )}
            <div className="flex-1"></div>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.div 
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl shadow-lg shadow-pink-300/50"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Droplets className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-2xl text-gray-900">
                Apply for First Water Connection
              </h1>
              <p className="text-xs text-gray-600">
                No login required • Get credentials after approval
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-3 py-1 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              New User
            </Badge>
          </div>
        </motion.div>

        {/* Compact Progress Bar */}
        <Card className="p-3 mb-3 bg-white shadow-lg border border-gray-100">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-xs bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Compact Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-md ${
                      currentStep >= step.id
                        ? `bg-gradient-to-br ${step.color} text-white`
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className={`text-[10px] mt-1 ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${
                    currentStep > step.id 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                      : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Form Content - Scrollable */}
        <Card className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-white shadow-xl border border-gray-100">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-pink-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-lg shadow-pink-300/50">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-900">Personal Details</h2>
                    <p className="text-xs text-gray-600">Enter your personal information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name in English */}
                  <div className="md:col-span-3">
                    <Label className="text-sm text-gray-700 mb-2 block">Name in English <span className="text-red-500">*</span></Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <Input
                          placeholder="First Name"
                          value={formData.firstNameEnglish}
                          onChange={(e) => handleInputChange('firstNameEnglish', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Input
                          placeholder="Middle Name (Optional)"
                          value={formData.middleNameEnglish}
                          onChange={(e) => handleInputChange('middleNameEnglish', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Input
                          placeholder="Last Name"
                          value={formData.lastNameEnglish}
                          onChange={(e) => handleInputChange('lastNameEnglish', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name in Marathi */}
                  <div className="md:col-span-3">
                    <Label className="text-sm text-gray-700 mb-2 block">Name in Marathi <span className="text-red-500">*</span></Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <Input
                          placeholder="पहिले नाव"
                          value={formData.firstNameMarathi}
                          onChange={(e) => handleInputChange('firstNameMarathi', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Input
                          placeholder="मधले नाव (पर्यायी)"
                          value={formData.middleNameMarathi}
                          onChange={(e) => handleInputChange('middleNameMarathi', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Input
                          placeholder="आडनाव"
                          value={formData.lastNameMarathi}
                          onChange={(e) => handleInputChange('lastNameMarathi', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Father's/Husband's Name */}
                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      Father's/Husband's Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter father's or husband's full name"
                      value={formData.fatherHusbandName}
                      onChange={(e) => handleInputChange('fatherHusbandName', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Gender */}
                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-pink-600" />
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)} value={formData.gender}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Email ID */}
                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-pink-600" />
                      Email ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange('emailId', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">Login credentials will be sent to this email</p>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-green-600" />
                      Mobile No <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={formData.mobileNo}
                      onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                      maxLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">OTP will be sent to this number</p>
                  </div>

                  {/* Alternate Mobile */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                      Alternate Mobile
                    </Label>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={formData.alternateMobile}
                      onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                      maxLength={10}
                    />
                  </div>

                  {/* Aadhar Number */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-orange-600" />
                      Aadhar No <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="XXXX-XXXX-XXXX"
                      value={formData.aadharNo}
                      onChange={(e) => handleInputChange('aadharNo', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                      maxLength={12}
                    />
                  </div>

                  {/* PAN Number */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                      PAN No (Optional)
                    </Label>
                    <Input
                      placeholder="PAN Card Number"
                      value={formData.panNo}
                      onChange={(e) => handleInputChange('panNo', e.target.value.toUpperCase())}
                      className="h-10 border-2 border-gray-200"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
                  <div className="flex gap-2">
                    <Info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-purple-800">
                      <p className="font-semibold mb-1">Important Information:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li>Login credentials (Consumer ID & Password) will be sent after application approval</li>
                        <li>Keep your mobile number and email active for important updates</li>
                        <li>All marked fields (*) are mandatory</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-purple-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-300/50">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-900">Property Details</h2>
                    <p className="text-xs text-gray-600">Enter complete property information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Property Number */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-blue-600" />
                      Property Number
                    </Label>
                    <Input
                      placeholder="If you know your property number"
                      value={formData.propertyNumber}
                      onChange={(e) => handleInputChange('propertyNumber', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                    <p className="text-xs text-gray-500">Check your property tax receipt</p>
                  </div>

                  {/* Zone */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-purple-600" />
                      Zone <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('zoneNo', value)} value={formData.zoneNo}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Zone A - Central</SelectItem>
                        <SelectItem value="B">Zone B - East</SelectItem>
                        <SelectItem value="C">Zone C - West</SelectItem>
                        <SelectItem value="D">Zone D - North</SelectItem>
                        <SelectItem value="E">Zone E - South</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ward */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Grid className="w-3.5 h-3.5 text-teal-600" />
                      Ward <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('wardNo', value)} value={formData.wardNo}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A1">Ward A1</SelectItem>
                        <SelectItem value="A2">Ward A2</SelectItem>
                        <SelectItem value="B1">Ward B1</SelectItem>
                        <SelectItem value="B2">Ward B2</SelectItem>
                        <SelectItem value="C1">Ward C1</SelectItem>
                        <SelectItem value="C2">Ward C2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Section */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Grid className="w-3.5 h-3.5 text-orange-600" />
                      Section
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('sectionNo', value)} value={formData.sectionNo}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Section 1</SelectItem>
                        <SelectItem value="2">Section 2</SelectItem>
                        <SelectItem value="3">Section 3</SelectItem>
                        <SelectItem value="4">Section 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Building Name */}
                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      Building/Society Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter building or society name"
                      value={formData.buildingName}
                      onChange={(e) => handleInputChange('buildingName', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Wing/Flat */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-pink-600" />
                      Wing/Flat No
                    </Label>
                    <Input
                      placeholder="e.g., A-101"
                      value={formData.wingFlat}
                      onChange={(e) => handleInputChange('wingFlat', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Plot No */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-green-600" />
                      Plot No
                    </Label>
                    <Input
                      placeholder="Plot number"
                      value={formData.plotNo}
                      onChange={(e) => handleInputChange('plotNo', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Survey No */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-purple-600" />
                      Survey No
                    </Label>
                    <Input
                      placeholder="Survey number"
                      value={formData.surveyNo}
                      onChange={(e) => handleInputChange('surveyNo', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="House no, street name, road"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Locality */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                      Locality <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Locality/Sector"
                      value={formData.locality}
                      onChange={(e) => handleInputChange('locality', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Area */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      Area <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Area/District"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-indigo-600" />
                      Pincode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                      maxLength={6}
                    />
                  </div>

                  {/* Landmark */}
                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      Nearby Landmark
                    </Label>
                    <Input
                      placeholder="Nearby landmark for easy identification"
                      value={formData.landmark}
                      onChange={(e) => handleInputChange('landmark', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                    />
                  </div>

                  {/* Property Type */}
                  <div className="md:col-span-3 space-y-2">
                    <Label className="text-xs text-gray-700">
                      Property Type <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="owned" id="owned" />
                          <Label htmlFor="owned" className="text-sm cursor-pointer">Owned</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rented" id="rented" />
                          <Label htmlFor="rented" className="text-sm cursor-pointer">Rented</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Show owner details if rented */}
                  {formData.propertyType === 'rented' && (
                    <>
                      <div className="md:col-span-2 space-y-1.5">
                        <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          Owner Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Property owner's name"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange('ownerName', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-green-600" />
                          Owner Contact <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="tel"
                          placeholder="Owner's mobile"
                          value={formData.ownerContact}
                          onChange={(e) => handleInputChange('ownerContact', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                          maxLength={10}
                        />
                      </div>
                    </>
                  )}

                  {/* No of Floors */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      Number of Floors
                    </Label>
                    <Input
                      type="number"
                      placeholder="Total floors"
                      value={formData.noOfFloors}
                      onChange={(e) => handleInputChange('noOfFloors', e.target.value)}
                      className="h-10 border-2 border-gray-200"
                      min="1"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Connection Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-indigo-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-300/50">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-900">Connection Details</h2>
                    <p className="text-xs text-gray-600">Specify connection requirements</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Application Type */}
                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      Application Type <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('applicationType', value)} value={formData.applicationType}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Application Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Connection</SelectItem>
                        <SelectItem value="reconnection">Reconnection</SelectItem>
                        <SelectItem value="slum">New Connection for Slum Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Building Type */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-purple-600" />
                      Building Type <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('buildingType', value)} value={formData.buildingType}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="mixed">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Building Category */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-teal-600" />
                      Building Category <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('buildingCategory', value)} value={formData.buildingCategory}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="institutional">Institutional</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Connection Use */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                      Connection Use <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('connectionUse', value)} value={formData.connectionUse}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Use" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H">H - Household</SelectItem>
                        <SelectItem value="C">C - Commercial</SelectItem>
                        <SelectItem value="Gov">Gov - Government</SelectItem>
                        <SelectItem value="Inst">Inst - Institute</SelectItem>
                        <SelectItem value="SsI">SsI - Small Scale Industry</SelectItem>
                        <SelectItem value="I">I - Industrial</SelectItem>
                        <SelectItem value="MU">MU - Multi Unit</SelectItem>
                        <SelectItem value="Apart">Apart - Apartment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Connection Size */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-orange-600" />
                      Connection Size <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('connectionSize', value)} value={formData.connectionSize}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pipe Size */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-pink-600" />
                      Pipe Size <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('pipeSize', value)} value={formData.pipeSize}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15mm">15mm - ₹1,500</SelectItem>
                        <SelectItem value="20mm">20mm - ₹2,000</SelectItem>
                        <SelectItem value="25mm">25mm - ₹3,000</SelectItem>
                        <SelectItem value="40mm">40mm - ₹5,000</SelectItem>
                        <SelectItem value="50mm">50mm - ₹7,500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Water Source */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      Water Source
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('waterSource', value)} value={formData.waterSource}>
                      <SelectTrigger className="h-10 border-2 border-gray-200">
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="municipal">Municipal Only</SelectItem>
                        <SelectItem value="bore-well">Bore Well Only</SelectItem>
                        <SelectItem value="both">Both Municipal & Bore Well</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Show additional fields for domestic use */}
                  {formData.connectionUse === 'H' && (
                    <>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-green-600" />
                          Family Members
                        </Label>
                        <Input
                          type="number"
                          placeholder="Number of members"
                          value={formData.noOfFamilyMembers}
                          onChange={(e) => handleInputChange('noOfFamilyMembers', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                          min="1"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-indigo-600" />
                          Number of Rooms
                        </Label>
                        <Input
                          type="number"
                          placeholder="Total rooms"
                          value={formData.noOfRooms}
                          onChange={(e) => handleInputChange('noOfRooms', e.target.value)}
                          className="h-10 border-2 border-gray-200"
                          min="1"
                        />
                      </div>
                    </>
                  )}

                  {/* Purpose of Connection */}
                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-purple-600" />
                      Purpose of Connection
                    </Label>
                    <Textarea
                      placeholder="Briefly describe the purpose (e.g., Household use, Business operation, etc.)"
                      value={formData.purposeOfConnection}
                      onChange={(e) => handleInputChange('purposeOfConnection', e.target.value)}
                      className="border-2 border-gray-200 min-h-[80px]"
                    />
                  </div>
                </div>

                {formData.pipeSize && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">Estimated Connection Fee</p>
                        <p className="text-xs text-gray-600 mt-0.5">Based on selected pipe size + processing fee</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-green-700">₹{calculateFee().toLocaleString()}</p>
                        <Badge className="bg-green-600 text-white mt-1">To be paid after approval</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-300/50">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-900">Upload Documents</h2>
                    <p className="text-xs text-gray-600">Upload all required documents</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Aadhar Card */}
                  <DocumentUploadCard
                    title="Aadhar Card"
                    description="Upload your Aadhar card (front & back)"
                    icon={Shield}
                    required
                    file={formData.aadharCard}
                    onUpload={(file) => handleFileUpload('aadharCard', file)}
                    onPreview={() => openDocPreview(formData.aadharCard, 'Aadhar Card')}
                  />

                  {/* Address Proof */}
                  <DocumentUploadCard
                    title="Address Proof"
                    description="Electricity bill, Ration card, or Passport"
                    icon={Home}
                    required
                    file={formData.addressProof}
                    onUpload={(file) => handleFileUpload('addressProof', file)}
                    onPreview={() => openDocPreview(formData.addressProof, 'Address Proof')}
                  />

                  {/* Property Proof */}
                  <DocumentUploadCard
                    title="Property Ownership Document"
                    description="Property papers, 7/12 extract, or Sale deed"
                    icon={FileText}
                    required={formData.propertyType === 'owned'}
                    file={formData.propertyProof}
                    onUpload={(file) => handleFileUpload('propertyProof', file)}
                    onPreview={() => openDocPreview(formData.propertyProof, 'Property Document')}
                  />

                  {/* NOC if Rented */}
                  {formData.propertyType === 'rented' && (
                    <DocumentUploadCard
                      title="NOC from Owner"
                      description="No Objection Certificate from property owner"
                      icon={FileText}
                      required
                      file={formData.nocDocument}
                      onUpload={(file) => handleFileUpload('nocDocument', file)}
                      onPreview={() => openDocPreview(formData.nocDocument, 'NOC Document')}
                    />
                  )}

                  {/* Applicant Photograph */}
                  <DocumentUploadCard
                    title="Applicant Photograph"
                    description="Recent passport size photo"
                    icon={Camera}
                    required
                    file={formData.photograph}
                    onUpload={(file) => handleFileUpload('photograph', file)}
                    onPreview={() => openDocPreview(formData.photograph, 'Photograph')}
                  />

                  {/* Property Tax Receipt */}
                  <DocumentUploadCard
                    title="Property Tax Receipt"
                    description="Latest property tax receipt (if available)"
                    icon={CreditCard}
                    file={formData.propertyTaxReceipt}
                    onUpload={(file) => handleFileUpload('propertyTaxReceipt', file)}
                    onPreview={() => openDocPreview(formData.propertyTaxReceipt, 'Tax Receipt')}
                  />

                  {/* Property Photo */}
                  <DocumentUploadCard
                    title="Property Photo"
                    description="Current photo of the property exterior"
                    icon={Camera}
                    file={formData.propertyPhoto}
                    onUpload={(file) => handleFileUpload('propertyPhoto', file)}
                    onPreview={() => openDocPreview(formData.propertyPhoto, 'Property Photo')}
                  />
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-orange-800">
                      <p className="font-semibold mb-1">Document Guidelines:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li>All documents should be clear and readable</li>
                        <li>Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB each)</li>
                        <li>Ensure all corners of documents are visible</li>
                        <li>Documents should not be older than 3 months (except property papers)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-green-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-300/50">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-900">Review Application</h2>
                    <p className="text-xs text-gray-600">Verify all information before submission</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Personal Details Review */}
                  <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <User className="w-4 h-4 text-pink-600" />
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <ReviewField label="Name (English)" value={`${formData.firstNameEnglish} ${formData.middleNameEnglish} ${formData.lastNameEnglish}`} />
                      <ReviewField label="Name (Marathi)" value={`${formData.firstNameMarathi} ${formData.middleNameMarathi} ${formData.lastNameMarathi}`} />
                      <ReviewField label="Father's/Husband's Name" value={formData.fatherHusbandName} />
                      <ReviewField label="Date of Birth" value={formData.dateOfBirth} />
                      <ReviewField label="Gender" value={formData.gender} />
                      <ReviewField label="Email" value={formData.emailId} />
                      <ReviewField label="Mobile" value={formData.mobileNo} />
                      <ReviewField label="Aadhar" value={formData.aadharNo} />
                    </div>
                  </Card>

                  {/* Property Details Review */}
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <Home className="w-4 h-4 text-purple-600" />
                      Property Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <ReviewField label="Zone/Ward" value={`Zone ${formData.zoneNo} / Ward ${formData.wardNo}`} />
                      <ReviewField label="Building Name" value={formData.buildingName} />
                      <ReviewField label="Address" value={`${formData.streetAddress}, ${formData.locality}, ${formData.area} - ${formData.pincode}`} />
                      <ReviewField label="Property Type" value={formData.propertyType} />
                      {formData.propertyType === 'rented' && (
                        <>
                          <ReviewField label="Owner Name" value={formData.ownerName} />
                          <ReviewField label="Owner Contact" value={formData.ownerContact} />
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Connection Details Review */}
                  <Card className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <Droplets className="w-4 h-4 text-indigo-600" />
                      Connection Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <ReviewField label="Application Type" value={formData.applicationType} />
                      <ReviewField label="Building Type" value={formData.buildingType} />
                      <ReviewField label="Connection Use" value={formData.connectionUse} />
                      <ReviewField label="Pipe Size" value={formData.pipeSize} />
                      <ReviewField label="Water Source" value={formData.waterSource} />
                      {formData.connectionUse === 'H' && (
                        <>
                          <ReviewField label="Family Members" value={formData.noOfFamilyMembers} />
                          <ReviewField label="Number of Rooms" value={formData.noOfRooms} />
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Documents Review */}
                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <Upload className="w-4 h-4 text-orange-600" />
                      Uploaded Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <DocumentStatus label="Aadhar Card" uploaded={!!formData.aadharCard} />
                      <DocumentStatus label="Address Proof" uploaded={!!formData.addressProof} />
                      <DocumentStatus label="Property Document" uploaded={!!formData.propertyProof} />
                      {formData.propertyType === 'rented' && (
                        <DocumentStatus label="NOC from Owner" uploaded={!!formData.nocDocument} />
                      )}
                      <DocumentStatus label="Photograph" uploaded={!!formData.photograph} />
                      <DocumentStatus label="Property Tax Receipt" uploaded={!!formData.propertyTaxReceipt} />
                      <DocumentStatus label="Property Photo" uploaded={!!formData.propertyPhoto} />
                    </div>
                  </Card>

                  {/* Fee Summary */}
                  <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-1">Estimated Connection Fee</h3>
                        <p className="text-xs text-gray-600">Payment required after approval</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-green-700">₹{calculateFee().toLocaleString()}</p>
                        <Badge className="bg-green-600 text-white mt-1">Pending</Badge>
                      </div>
                    </div>
                  </Card>

                  {/* Important Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        <p className="font-semibold mb-2">After Submission:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Your application will be reviewed within 3-5 working days</li>
                          <li>Login credentials (Consumer ID & Password) will be sent to your mobile & email after approval</li>
                          <li>You can track your application status using the Application ID</li>
                          <li>Payment link will be sent after approval</li>
                          <li>Connection will be installed within 7-10 days after payment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Navigation Buttons */}
        <Card className="p-3 mt-3 bg-white shadow-lg border border-blue-100">
          <div className="flex gap-2 justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-300/50"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-teal-400 text-white hover:from-green-600 hover:to-teal-500 shadow-lg shadow-green-300/50"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Application
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <ApplicationSuccess
          applicationId={generatedApplicationId}
          onClose={() => {
            setShowSuccess(false);
            if (onBack) onBack();
          }}
          onProceedToPayment={() => setShowPayment(true)}
        />
      )}

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Pay Connection Fee
            </DialogTitle>
            <DialogDescription>
              Complete your payment to proceed with the connection
            </DialogDescription>
          </DialogHeader>

          {!paymentComplete ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Total Amount</span>
                  <span className="text-2xl text-green-700">₹{calculateFee().toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Select Payment Method</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={selectedPaymentMethod === 'upi' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('upi')}
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    UPI
                  </Button>
                  <Button
                    variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('card')}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Card
                  </Button>
                  <Button
                    variant={selectedPaymentMethod === 'netbanking' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('netbanking')}
                    className="flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    Net Banking
                  </Button>
                  <Button
                    variant={selectedPaymentMethod === 'wallet' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('wallet')}
                    className="flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    Wallet
                  </Button>
                </div>
              </div>

              {selectedPaymentMethod === 'upi' && (
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    value={paymentDetails.upiId}
                    onChange={(e) => handlePaymentInputChange('upiId', e.target.value)}
                  />
                </div>
              )}

              {selectedPaymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry">Expiry</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={paymentDetails.cardExpiry}
                        onChange={(e) => handlePaymentInputChange('cardExpiry', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCVV">CVV</Label>
                      <Input
                        id="cardCVV"
                        type="password"
                        placeholder="123"
                        value={paymentDetails.cardCVV}
                        onChange={(e) => handlePaymentInputChange('cardCVV', e.target.value)}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <Label htmlFor="bankName">Select Bank</Label>
                  <Select onValueChange={(value) => handlePaymentInputChange('bankName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedPaymentMethod === 'wallet' && (
                <div className="space-y-2">
                  <Label htmlFor="walletProvider">Select Wallet</Label>
                  <Select onValueChange={(value) => handlePaymentInputChange('walletProvider', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                      <SelectItem value="googlepay">Google Pay</SelectItem>
                      <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || paymentProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white hover:from-green-600 hover:to-teal-500 shadow-lg shadow-green-300/50"
              >
                {paymentProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Pay ₹{calculateFee().toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-lg text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your connection will be installed within 7-10 days
              </p>
              <Button
                onClick={() => {
                  setShowPayment(false);
                  setShowSuccess(false);
                  if (onBack) onBack();
                }}
                className="bg-gradient-to-r from-green-500 to-teal-400 text-white hover:from-green-600 hover:to-teal-500 shadow-lg shadow-green-300/50"
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && closeDocPreview()}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{previewDoc?.name}</DialogTitle>
            <DialogDescription>Preview of uploaded document</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 overflow-auto">
            {previewDoc?.file?.type.startsWith('image/') ? (
              <img 
                src={previewDoc.url} 
                alt={previewDoc.name}
                className="max-w-full max-h-[70vh] object-contain"
              />
            ) : (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">PDF Preview</p>
                <p className="text-xs text-gray-500 mt-2">{previewDoc?.file?.name}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Document Upload Card Component
function DocumentUploadCard({ 
  title, 
  description, 
  icon: Icon, 
  required = false, 
  file, 
  onUpload, 
  onPreview 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  required?: boolean; 
  file: File | null; 
  onUpload: (file: File | null) => void; 
  onPreview: () => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Card className={`p-4 border-2 transition-all ${file ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          file ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          <Icon className={`w-5 h-5 ${file ? 'text-green-600' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm text-gray-900">
                {title}
                {required && <span className="text-red-500 ml-1">*</span>}
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">{description}</p>
            </div>
            {file && (
              <Badge className="bg-green-600 text-white flex-shrink-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Uploaded
              </Badge>
            )}
          </div>
          
          {file ? (
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={onPreview}
                className="flex-1 text-xs h-8"
              >
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpload(null)}
                className="text-xs h-8 text-red-600 hover:text-red-700"
              >
                <X className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="mt-3">
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-purple-400 hover:bg-purple-50 transition-all">
                  <Upload className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Click to upload</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
          
          {file && (
            <p className="text-xs text-gray-500 mt-2 truncate">{file.name}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// Review Field Component
function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-sm text-gray-900 capitalize">{value || '-'}</p>
    </div>
  );
}

// Document Status Component
function DocumentStatus({ label, uploaded }: { label: string; uploaded: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {uploaded ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={`text-xs ${uploaded ? 'text-green-700' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
  );
}
