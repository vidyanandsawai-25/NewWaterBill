import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, MessageSquare, Clock, CheckCircle, XCircle, Upload, Search, FileText, Calendar, User, AlertCircle, Trash2, Download, Copy, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { TrackStatus } from './TrackStatus';
import { NewGrievanceFormWrapper } from './NewGrievanceFormWrapper';

interface GrievancesProps {
  user: any;
  onBackToDashboard?: () => void;
}

export function Grievances({ user, onBackToDashboard }: GrievancesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewGrievance, setShowNewGrievance] = useState(false);
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState('');

  const grievances = [
    {
      id: 'GRV-2025-023',
      connectionId: 'CON-2025-001',
      category: 'Billing Issue',
      subject: 'Incorrect meter reading in bill',
      description: 'The meter reading shown in last month bill is incorrect. Actual reading is 1200 but bill shows 1350.',
      status: 'In Progress',
      priority: 'High',
      submittedDate: 'Dec 15, 2025',
      lastUpdate: 'Dec 18, 2025',
      assignedTo: 'Officer - Priya Sharma',
      updates: [
        { date: 'Dec 18, 2025', by: 'Priya Sharma', message: 'We have verified your complaint and found the discrepancy. A field officer will visit your property for meter verification within 2 days.' },
        { date: 'Dec 16, 2025', by: 'System', message: 'Grievance assigned to Water Tax Officer - Ward 5' },
        { date: 'Dec 15, 2025', by: 'Rajesh Kumar', message: 'Grievance submitted' }
      ],
      expectedResolution: 'Dec 25, 2025'
    },
    {
      id: 'GRV-2025-018',
      connectionId: 'CON-2025-002',
      category: 'Water Supply',
      subject: 'Low water pressure',
      description: 'Water pressure is very low during morning hours (6 AM to 9 AM). Unable to fill overhead tank.',
      status: 'Resolved',
      priority: 'Medium',
      submittedDate: 'Dec 10, 2025',
      lastUpdate: 'Dec 14, 2025',
      assignedTo: 'Officer - Amit Patel',
      resolvedDate: 'Dec 14, 2025',
      resolution: 'Main pipeline pressure issue was identified and fixed. Water pressure has been restored to normal levels.',
      updates: [
        { date: 'Dec 14, 2025', by: 'Amit Patel', message: 'Issue resolved. Main pipeline pressure adjusted. Please check and confirm.' },
        { date: 'Dec 12, 2025', by: 'Amit Patel', message: 'Field inspection completed. Issue identified in main pipeline pressure. Maintenance scheduled for Dec 14.' },
        { date: 'Dec 10, 2025', by: 'System', message: 'Grievance assigned to Water Supply Officer - Ward 8' },
        { date: 'Dec 10, 2025', by: 'Rajesh Kumar', message: 'Grievance submitted' }
      ]
    },
    {
      id: 'GRV-2025-015',
      connectionId: 'CON-2025-001',
      category: 'Connection',
      subject: 'Water leakage at meter point',
      description: 'There is continuous water leakage at the meter connection point. Water is being wasted.',
      status: 'Rejected',
      priority: 'High',
      submittedDate: 'Dec 05, 2025',
      lastUpdate: 'Dec 08, 2025',
      assignedTo: 'Officer - Priya Sharma',
      resolvedDate: 'Dec 07, 2025',
      resolution: 'Meter connection replaced. Leakage stopped. No charges for wasted water.',
      updates: [
        { date: 'Dec 08, 2025', by: 'System', message: 'Grievance closed after confirmation' },
        { date: 'Dec 07, 2025', by: 'Priya Sharma', message: 'Meter connection replaced. Issue resolved. Please verify.' },
        { date: 'Dec 06, 2025', by: 'Priya Sharma', message: 'Field team dispatched for immediate repair' },
        { date: 'Dec 05, 2025', by: 'System', message: 'Grievance marked as urgent and assigned' },
        { date: 'Dec 05, 2025', by: 'Rajesh Kumar', message: 'Grievance submitted' }
      ]
    }
  ];

  const filteredGrievances = grievances.filter(grv =>
    grv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grv.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openGrievances = filteredGrievances.filter(g => g.status === 'Open' || g.status === 'In Progress');
  const resolvedGrievances = filteredGrievances.filter(g => g.status === 'Resolved');
  const rejectedGrievances = filteredGrievances.filter(g => g.status === 'Rejected');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500';
      case 'In Progress': return 'bg-yellow-500';
      case 'Resolved': return 'bg-green-500';
      case 'Rejected': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 mt-[58px] mr-[0px] mb-[0px] ml-[0px]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
        <div>
          <h2 className="text-2xl text-gray-900">My Grievances</h2>
          <p className="text-gray-600">Submit and track your complaints and grievances</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 relative z-10">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-3">
          <Clock className="w-6 h-6 mb-2" />
          <p className="text-xs opacity-90 mb-1">Total Grievances</p>
          <p className="text-xl">{grievances.length}</p>
        </Card>

        <Card className="p-3 shadow-lg border-0 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <AlertCircle className="w-6 h-6 mb-2" />
          <p className="text-xs opacity-90 mb-1">In Progress</p>
          <p className="text-xl">{grievances.filter(g => g.status === 'In Progress').length}</p>
        </Card>

        <Card className="p-3 shadow-lg border-0 bg-gradient-to-br from-green-500 to-teal-500 text-white">
          <CheckCircle className="w-6 h-6 mb-2" />
          <p className="text-xs opacity-90 mb-1">Resolved</p>
          <p className="text-xl">{resolvedGrievances.length}</p>
        </Card>

        <Card className="p-3 shadow-lg border-0 bg-gradient-to-br from-gray-500 to-gray-600 text-white">
          <XCircle className="w-6 h-6 mb-2" />
          <p className="text-xs opacity-90 mb-1">Rejected</p>
          <p className="text-xl">{rejectedGrievances.length}</p>
        </Card>
      </div>

      {/* New Grievance Button */}
      <div className="flex justify-end relative z-10">
        <Dialog open={showNewGrievance} onOpenChange={setShowNewGrievance}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              New Grievance
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[100vw] sm:w-[96vw] !max-w-[100vw] sm:!max-w-[96vw] h-auto max-h-[95vh] sm:max-h-[92vh] overflow-hidden bg-white flex flex-col p-0">
            <DialogHeader className="border-b pb-4 px-6 pt-6">
              <DialogTitle className="text-xl flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Submit New Grievance
              </DialogTitle>
              <DialogDescription>
                You are about to submit a complaint or grievance for your water connection
              </DialogDescription>
            </DialogHeader>
            <NewGrievanceFormWrapper 
              user={user} 
              onClose={() => setShowNewGrievance(false)}
              onBackToDashboard={onBackToDashboard}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="p-2 shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-2 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search grievances by ID, subject, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-[36px] bg-white pt-[0px] pr-[12px] pb-[4px]"
          />
        </div>
      </Card>

      {/* Grievances Tabs */}
      <Tabs defaultValue="all" className="w-full relative z-10">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({grievances.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({openGrievances.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedGrievances.length})</TabsTrigger>
          <TabsTrigger value="closed">Rejected ({rejectedGrievances.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {filteredGrievances.map((grievance, index) => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              index={index}
              onTrack={(id) => {
                setSelectedTrackingId(id);
                setShowTrackDialog(true);
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="open" className="space-y-3">
          {openGrievances.map((grievance, index) => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              index={index}
              onTrack={(id) => {
                setSelectedTrackingId(id);
                setShowTrackDialog(true);
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-3">
          {resolvedGrievances.map((grievance, index) => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              index={index}
              onTrack={(id) => {
                setSelectedTrackingId(id);
                setShowTrackDialog(true);
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="closed" className="space-y-3">
          {rejectedGrievances.map((grievance, index) => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              index={index}
              onTrack={(id) => {
                setSelectedTrackingId(id);
                setShowTrackDialog(true);
              }}
            />
          ))}
        </TabsContent>
      </Tabs>

      {filteredGrievances.length === 0 && (
        <Card className="p-12 text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">No grievances found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or submit a new grievance</p>
          <Button onClick={() => setShowNewGrievance(true)} className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Submit New Grievance
          </Button>
        </Card>
      )}

      {/* Track Status Dialog */}
      <TrackStatus 
        open={showTrackDialog} 
        onOpenChange={setShowTrackDialog}
        initialId={selectedTrackingId}
      />
    </div>
  );
}

// Grievance Card Component
function GrievanceCard({ grievance, index, onTrack }: { grievance: any; index: number; onTrack: (id: string) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500';
      case 'In Progress': return 'bg-yellow-500';
      case 'Resolved': return 'bg-green-500';
      case 'Rejected': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-4 shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 backdrop-blur-sm hover:shadow-2xl hover:scale-[1.02] transition-all px-[16px] py-[12px]">
        <div className="flex items-center gap-3">
          {/* Status Icon */}
          <div className={`w-10 h-10 rounded-lg ${getStatusColor(grievance.status)} flex items-center justify-center flex-shrink-0 shadow-md`}>
            {grievance.status === 'Resolved' ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : grievance.status === 'Rejected' ? (
              <XCircle className="w-5 h-5 text-white" />
            ) : grievance.status === 'In Progress' ? (
              <Clock className="w-5 h-5 text-white" />
            ) : (
              <MessageSquare className="w-5 h-5 text-white" />
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base text-gray-900">{grievance.id}</h3>
              <Badge className={`${getStatusColor(grievance.status)} text-white border-0 px-2 py-0.5 text-xs`}>
                {grievance.status}
              </Badge>
              <Badge className={`${getPriorityColor(grievance.priority)} text-white border-0 px-2 py-0.5 text-xs`}>
                {grievance.priority}
              </Badge>
            </div>
            <p className="text-sm text-gray-900 truncate">{grievance.subject}</p>
            <p className="text-xs text-gray-600">{grievance.connectionId}</p>
          </div>

          {/* Category & Date Info */}
          <div className="hidden lg:flex items-center gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-600">Category</p>
              <p className="text-sm text-gray-900">{grievance.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Submitted</p>
              <p className="text-sm text-gray-900">{grievance.submittedDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Last Update</p>
              <p className="text-sm text-gray-900">{grievance.lastUpdate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Assigned To</p>
              <p className="text-sm text-gray-900 truncate max-w-[120px]">{grievance.assignedTo}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 px-3 border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={() => onTrack(grievance.id)}
            >
              <FileText className="w-4 h-4 mr-1" />
              Track
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 px-3 border-blue-200 hover:bg-blue-50">
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl h-[95vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-cyan-50">
                <DialogHeader>
                  <DialogTitle>Grievance Details - {grievance.id}</DialogTitle>
                  <DialogDescription>
                    Complete information and update history of your grievance
                  </DialogDescription>
                </DialogHeader>
                <GrievanceDetailsContent grievance={grievance} />
              </DialogContent>
            </Dialog>

            {grievance.status === 'Resolved' && (
              <Button size="sm" className="h-9 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                Close
              </Button>
            )}
          </div>
        </div>

        {/* Resolution Info - Compact */}
        {grievance.status === 'Resolved' && grievance.resolution && (
          <div className="mt-3 p-2 bg-green-50 rounded border border-green-200 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-0.5">Resolution</p>
              <p className="text-sm text-gray-900">{grievance.resolution}</p>
              <p className="text-xs text-gray-600 mt-1">Resolved on: {grievance.resolvedDate}</p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

// Grievance Details Content
function GrievanceDetailsContent({ grievance }: { grievance: any }) {
  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <Card className="p-4 bg-blue-50">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Grievance Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Grievance ID</p>
            <p className="text-gray-900 font-medium">{grievance.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Connection ID</p>
            <p className="text-gray-900 font-medium">{grievance.connectionId}</p>
          </div>
          <div>
            <p className="text-gray-600">Category</p>
            <p className="text-gray-900 font-medium">{grievance.category}</p>
          </div>
          <div>
            <p className="text-gray-600">Priority</p>
            <Badge className={grievance.priority === 'High' ? 'bg-red-500' : grievance.priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'}>
              {grievance.priority}
            </Badge>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <Badge className={
              grievance.status === 'Open' ? 'bg-blue-500' :
              grievance.status === 'In Progress' ? 'bg-yellow-500' :
              grievance.status === 'Resolved' ? 'bg-green-500' :
              'bg-gray-500'
            }>
              {grievance.status}
            </Badge>
          </div>
          <div>
            <p className="text-gray-600">Assigned To</p>
            <p className="text-gray-900 font-medium text-xs">{grievance.assignedTo}</p>
          </div>
        </div>
      </Card>

      {/* Subject & Description */}
      <Card className="p-4 bg-purple-50">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Details</h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Subject</p>
            <p className="text-gray-900">{grievance.subject}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Description</p>
            <p className="text-gray-700">{grievance.description}</p>
          </div>
        </div>
      </Card>

      {/* Resolution (if resolved) */}
      {grievance.status === 'Resolved' && grievance.resolution && (
        <Card className="p-4 bg-green-50 border-2 border-green-300">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Resolution</h4>
              <p className="text-sm text-gray-700 mb-2">{grievance.resolution}</p>
              <p className="text-xs text-gray-600">Resolved on: {grievance.resolvedDate}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Timeline/Updates */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Update History</h4>
        <div className="space-y-3">
          {grievance.updates.map((update: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                {index < grievance.updates.length - 1 && (
                  <div className="w-0.5 h-full bg-blue-200 mt-1"></div>
                )}
              </div>
              <Card className="flex-1 p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-900 font-medium">{update.by}</p>
                  <p className="text-xs text-gray-600">{update.date}</p>
                </div>
                <p className="text-sm text-gray-700">{update.message}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}