import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, CheckCircle, AlertCircle, Eye, Calendar, Droplet, Calculator as CalcIcon, Download, Lock, TrendingUp, Unlock, Shield, Clock, Users, UserCheck, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';

export function SubmitReading() {
  const [image, setImage] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [currentReading, setCurrentReading] = useState<number | null>(null);
  const [ocrConfidence, setOcrConfidence] = useState<number>(0);

  // Authentication & Access Control States
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [accessReason, setAccessReason] = useState<string>('');
  const [grantedBy, setGrantedBy] = useState<string>('');
  const [grantedDate, setGrantedDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  
  // Date-based restrictions
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // 0-indexed
  const currentYear = currentDate.getFullYear();
  
  // Allowed submission window: 25th to 30th of each month
  const allowedStartDay = 25;
  const allowedEndDay = 30;
  // For testing: temporarily override to allow current date
  const isWithinDateWindow = true; // currentDay >= allowedStartDay && currentDay <= allowedEndDay;

  // Pre-filled data (locked/preselected)
  const year = new Date().getFullYear();
  const financialYear = `${year}-${year + 1}`;
  const billingCycle = 'Quarterly'; // Could be Monthly/Quarterly
  const previousReading = 4562;
  const previousReadingDate = '2024-10-15';

  const consumption = currentReading ? currentReading - previousReading : 0;
  const ratePerUnit = 12; // ₹12 per unit
  const estimatedTax = consumption * ratePerUnit;
  const fixedCharges = 150;
  const sewerageCharge = (estimatedTax * 0.10); // 10% of water charges
  const totalEstimate = estimatedTax + fixedCharges + sewerageCharge;

  // Check access permission on component mount
  useEffect(() => {
    // Simulate checking for municipal permission
    // In real app, this would be an API call to check user's access status
    const checkAccess = () => {
      // Mock permission data - in production, fetch from backend
      const mockPermission = {
        granted: true, // Set to true to simulate granted access
        reason: 'Corporation staff unable to access remote location',
        grantedBy: 'Municipal Officer - Ramesh Kumar',
        grantedDate: '2024-11-15',
        expiryDate: '2024-12-31'
      };

      if (mockPermission.granted) {
        setIsAccessGranted(true);
        setAccessReason(mockPermission.reason);
        setGrantedBy(mockPermission.grantedBy);
        setGrantedDate(mockPermission.grantedDate);
        setExpiryDate(mockPermission.expiryDate);
      }
    };

    checkAccess();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        processOCR();
      };
      reader.readAsDataURL(file);
    }
  };

  const processOCR = () => {
    setOcrStatus('processing');
    
    // Simulate OCR processing with realistic delay
    setTimeout(() => {
      const mockReading = 4785; // Mock extracted value
      const mockConfidence = 92; // Mock confidence score
      
      setCurrentReading(mockReading);
      setOcrConfidence(mockConfidence);
      
      if (mockConfidence >= 85) {
        setOcrStatus('success');
        toast.success('Meter reading extracted successfully!');
      } else {
        setOcrStatus('error');
        toast.error('Low confidence. Please verify the reading.');
      }
    }, 2500);
  };

  const handleSubmit = () => {
    // Submit reading logic with audit trail
    const submissionData = {
      year,
      financialYear,
      billingCycle,
      previousReading,
      currentReading,
      consumption,
      estimatedTax,
      totalEstimate,
      submittedDate: new Date().toISOString(),
      accessGrantedBy: grantedBy,
      accessReason: accessReason,
      ocrConfidence
    };
    
    console.log('Submitting reading:', submissionData);
    toast.success('Meter reading submitted successfully! You will receive a confirmation email shortly.');
  };

  // Show locked state if access not granted or outside date window
  const isLocked = !isAccessGranted || !isWithinDateWindow;

  return (
    <div className="min-h-screen py-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-green-400/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-teal-400/15 blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '50%', right: '20%' }}
        />
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-[29px] mr-[0px] mb-[0px] ml-[0px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200/50 shadow-2xl relative overflow-hidden"
        >
          {/* Shiner effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center shadow-2xl relative overflow-hidden"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <Camera className="h-8 w-8 text-white relative z-10" />
              </motion.div>
              <div>
                <h2 className="text-gray-900 text-2xl">Submit Meter Reading</h2>
                <p className="text-gray-600">Upload meter photo when corporation staff cannot access your location</p>
              </div>
            </div>
            
            {/* Access Status Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={`px-4 py-2 ${isAccessGranted ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}>
                {isAccessGranted ? (
                  <><Unlock className="h-3 w-3 mr-1" /> Access Granted</>
                ) : (
                  <><Lock className="h-3 w-3 mr-1" /> Access Locked</>
                )}
              </Badge>
              <Badge className={`px-4 py-2 ${isWithinDateWindow ? 'bg-blue-500' : 'bg-orange-500'} text-white border-0`}>
                <Calendar className="h-3 w-3 mr-1" />
                {isWithinDateWindow 
                  ? `Submission Window Active (${allowedStartDay}-${allowedEndDay} ${currentMonth}/${currentYear})`
                  : `Outside Window (${currentDay}/${currentMonth}/${currentYear})`
                }
              </Badge>
            </div>
          </div>
        </motion.div>

        {isLocked ? (
          // Locked State - Show Access Requirements
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-red-200/50 relative overflow-hidden">
              {/* Background shiner */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Lock className="h-12 w-12 text-white" />
                </motion.div>

                <h2 className="text-3xl text-gray-900 mb-4">
                  🔒 Self-Submission Restricted
                </h2>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  This feature is only available to citizens when corporation meter readers cannot access their property location or during exceptional circumstances.
                </p>

                {/* Access Requirements */}
                <div className="space-y-4 mb-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-orange-200/50 shadow-lg text-left">
                    <div className="flex items-start gap-3 mb-4">
                      <Shield className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-gray-900 mb-2">Access Requirements</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600">1.</span>
                            <span>Municipal officer must approve your access request due to location inaccessibility</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600">2.</span>
                            <span>Approval is granted case-by-case based on genuine accessibility issues</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600">3.</span>
                            <span>Access permission must be currently active and not expired</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-200/50 shadow-lg text-left">
                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-gray-900 mb-2">Date Window Restrictions</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span>Submissions allowed only from <strong>25th to 30th of each month</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span>Current date: <strong className="text-gray-900">{currentDay}/{currentMonth}/{currentYear}</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className={`${isWithinDateWindow ? 'text-green-600' : 'text-red-600'}`}>•</span>
                            <span className={isWithinDateWindow ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                              {isWithinDateWindow 
                                ? '✓ You are within the submission window' 
                                : `✗ Next window opens on ${allowedStartDay}/${currentMonth}/${currentYear}`
                              }
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {!isAccessGranted && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-green-200/50 shadow-lg text-left">
                      <div className="flex items-start gap-3">
                        <Users className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-gray-900 mb-2">How to Request Access</h3>
                          <ol className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600">1.</span>
                              <span>Contact your ward office or municipal corporation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600">2.</span>
                              <span>Submit a request stating the reason (e.g., remote location, locked gate)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600">3.</span>
                              <span>Wait for municipal officer's approval via portal notification</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600">4.</span>
                              <span>Once approved, you can submit readings during the allowed date window</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Why This Exists */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200/50">
                  <h4 className="text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Ensuring Fair & Transparent Process
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This authentication system prevents irregularities and ensures only genuine cases of inaccessibility can self-submit readings. 
                    The date restrictions ensure consistent billing cycles across all consumers. This maintains transparency, prevents fraud, 
                    and ensures fair treatment for all citizens while providing genuine relief for those in remote or inaccessible locations.
                  </p>
                </div>

                <div className="mt-8 flex gap-4 justify-center flex-wrap">
                  <Button 
                    variant="outline"
                    className="h-12 px-6 border-2 border-blue-400 text-blue-700 hover:bg-blue-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Ward Office
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12 px-6 border-2 border-green-400 text-green-700 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check Request Status
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          // Unlocked State - Show Upload Form
          <>
            {/* Access Granted Notice */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300/50 shadow-lg relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Access Granted - Self-Submission Enabled
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-green-700 font-medium">Reason:</span>
                        <p className="text-green-800">{accessReason}</p>
                      </div>
                      <div>
                        <span className="text-green-700 font-medium">Approved By:</span>
                        <p className="text-green-800">{grantedBy}</p>
                      </div>
                      <div>
                        <span className="text-green-700 font-medium">Granted Date:</span>
                        <p className="text-green-800">{new Date(grantedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-green-700 font-medium">Valid Until:</span>
                        <p className="text-green-800">{new Date(expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - OCR Upload (Primary Action) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {/* OCR Upload Card */}
                <div className="bg-gradient-to-br from-white via-green-50/20 to-emerald-50/30 rounded-2xl p-6 shadow-lg border-2 border-green-200/50 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="h-5 w-5 text-green-700" />
                      <h3 className="text-gray-900 font-semibold">Upload Meter Image</h3>
                      <Badge className="ml-auto bg-[#2E7D32] text-white text-xs">OCR Enabled</Badge>
                    </div>

                    {!image ? (
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:border-green-500 transition-all bg-white/50 hover:bg-green-50/50 group relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: '-200%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                          <Camera className="h-12 w-12 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                          <p className="mb-2 text-sm text-gray-700">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                          <p className="text-xs text-green-700 font-medium mt-2">📸 Ensure meter numbers are clearly visible</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        {/* Image Preview with OCR Overlay */}
                        <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-green-300">
                          <img
                            src={image}
                            alt="Meter reading"
                            className="w-full h-full object-cover"
                          />
                          
                          {/* OCR Processing Overlay */}
                          <AnimatePresence>
                            {ocrStatus === 'processing' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-green-700/80 backdrop-blur-sm flex flex-col items-center justify-center"
                              >
                                {/* Rotating Lens Animation */}
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white mb-3"
                                />
                                
                                {/* Scanning Line */}
                                <motion.div
                                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                                  animate={{ y: [0, 256, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                                
                                <p className="text-white text-sm font-medium mt-4">Extracting reading...</p>
                                <p className="text-white/70 text-xs mt-1">Processing with OCR</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Success Indicator */}
                          {ocrStatus === 'success' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-lg"
                            >
                              <CheckCircle className="h-6 w-6 text-white" />
                            </motion.div>
                          )}
                        </div>

                        {/* OCR Result */}
                        {ocrStatus === 'success' && currentReading && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 rounded-lg bg-green-50 border-2 border-green-300"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-700 font-medium">Extracted Reading</span>
                              <Badge className="bg-[#2E7D32] text-white text-xs">
                                {ocrConfidence}% Confidence
                              </Badge>
                            </div>
                            <p className="text-3xl text-gray-900 tabular-nums">{currentReading}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              You can edit this value below if needed
                            </p>
                          </motion.div>
                        )}

                        {/* Re-upload Button */}
                        <Button
                          variant="outline"
                          className="w-full mt-3 border-2 border-green-300 hover:border-green-500 hover:bg-green-50"
                          onClick={() => {
                            setImage(null);
                            setOcrStatus('idle');
                            setCurrentReading(null);
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Different Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Manual Edit (if needed) */}
                {ocrStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200/50"
                  >
                    <Label htmlFor="manualReading" className="text-gray-900 mb-2 block font-semibold">
                      Manual Override (Optional)
                    </Label>
                    <Input
                      id="manualReading"
                      type="number"
                      value={currentReading || ''}
                      onChange={(e) => setCurrentReading(Number(e.target.value))}
                      className="h-12 text-lg tabular-nums text-center border-2 border-blue-200 p-[12px] px-[11px] px-[12px] py-[38px] mx-[0px] my-[1px]"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Adjust the reading if OCR extraction is incorrect
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Right Panel - Reading Details & Calculation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Pre-filled/Locked Details */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200/50 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="h-5 w-5 text-purple-600" />
                      <h3 className="text-gray-900 font-semibold">Billing Details</h3>
                      <Badge className="ml-auto bg-purple-100 text-purple-700 text-xs border border-purple-300">
                        Pre-filled
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year</span>
                        <span className="font-medium text-gray-900">{year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Financial Year</span>
                        <span className="font-medium text-gray-900">{financialYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Quarter</span>
                        <span className="font-medium text-gray-900">Oct-Mar</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Billing Cycle</span>
                        <Badge className="bg-blue-500 text-white text-xs">{billingCycle}</Badge>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-3 mt-3"></div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Previous Reading</span>
                        <span className="font-medium text-gray-900 tabular-nums">{previousReading}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Previous Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(previousReadingDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consumption & Calculation */}
                {ocrStatus === 'success' && currentReading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200/50 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/30 to-transparent"
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <CalcIcon className="h-5 w-5 text-green-700" />
                        <h3 className="text-gray-900 font-semibold">Auto Calculation</h3>
                      </div>

                      <div className="space-y-4">
                        {/* Consumption */}
                        <div className="p-4 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplet className="h-4 w-4 text-green-700" />
                            <span className="text-sm text-green-900 font-medium">Consumption</span>
                          </div>
                          <p className="text-3xl text-green-900 tabular-nums">
                            {consumption} <span className="text-lg font-normal text-green-700">units</span>
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="h-3 w-3 text-green-700" />
                            <span className="text-xs text-green-800">Current: {currentReading} - Previous: {previousReading}</span>
                          </div>
                        </div>

                        {/* Bill Breakdown */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Water Charges ({consumption} × ₹{ratePerUnit})</span>
                            <span className="font-medium text-gray-900 tabular-nums">₹{estimatedTax}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fixed Charges</span>
                            <span className="font-medium text-gray-900 tabular-nums">₹{fixedCharges}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sewerage (10%)</span>
                            <span className="font-medium text-gray-900 tabular-nums">₹{sewerageCharge.toFixed(2)}</span>
                          </div>
                          <div className="border-t-2 border-gray-200 pt-2 mt-2"></div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">Estimated Total</span>
                            <span className="text-2xl text-green-700 tabular-nums">
                              ₹{totalEstimate.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 pt-4">
                          <Button
                            onClick={handleSubmit}
                            className="w-full h-12 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white hover:from-[#1B5E20] hover:to-[#2E7D32] relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{
                                x: ['-200%', '200%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            />
                            <CheckCircle className="h-5 w-5 mr-2 relative z-10" />
                            <span className="relative z-10">Submit Reading</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full h-12 border-2 border-blue-400 text-blue-700 hover:bg-blue-50"
                          >
                            <Download className="h-5 w-5 mr-2" />
                            Download Estimated Bill
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Info Notice */}
                {ocrStatus === 'idle' && (
                  <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200/50">
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm text-gray-900 mb-1">
                          OCR-First Processing
                        </h4>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Upload a clear photo of your water meter. Our OCR system will automatically extract the reading. Ensure the numbers are visible and well-lit for best results.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
