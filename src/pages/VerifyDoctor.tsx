import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck2,
  FileUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  IdCard,
  Upload,
  Stethoscope,
  ArrowLeft,
  Home as HomeIcon
} from 'lucide-react';

export default function VerifyDoctor() {
  const [step, setStep] = useState<'intro' | 'nmc' | 'upload' | 'pending' | 'success' | 'failure'>('intro');
  const [nmcNumber, setNmcNumber] = useState('');
  const [council, setCouncil] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [docType, setDocType] = useState('');

  const simulateCheck = (result: 'success' | 'failure' | 'pending' = 'pending') => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      if (result === 'success') setStep('success');
      else if (result === 'failure') setStep('failure');
      else setStep('pending');
    }, 1200);
  };

  const simulateUpload = () => {
    setUploading(true);
    setProgress(10);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          setStep('pending');
          return 100;
        }
        return p + 15;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#3a54e8] border-b border-[#2d42c7] sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-white">
              <Stethoscope className="h-5 w-5" />
              <span className="font-semibold">Verification</span>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white/90 hover:bg-white/10 hover:text-white">
                <HomeIcon className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {step === 'intro' && (
          <Card className="overflow-hidden">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Verify Your Medical Credentials</CardTitle>
              <p className="text-gray-600">To ensure this network is exclusive to licensed doctors, we require verification.</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <button onClick={() => setStep('nmc')} className="group text-left p-5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all">
                  <div className="flex items-start space-x-3">
                    <IdCard className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Enter NMC Registration Number</h3>
                      <p className="text-sm text-gray-600">Instant check via registry</p>
                    </div>
                  </div>
                </button>
                <button onClick={() => setStep('upload')} className="group text-left p-5 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/40 transition-all">
                  <div className="flex items-start space-x-3">
                    <FileUp className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Upload Medical Certificate / License</h3>
                      <p className="text-sm text-gray-600">Manual review in 24–48 hours</p>
                    </div>
                  </div>
                </button>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setStep('nmc')}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'nmc' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <span>NMC Registration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Registration Number</label>
                  <Input value={nmcNumber} onChange={(e) => setNmcNumber(e.target.value)} placeholder="e.g., 1234567" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">State Medical Council</label>
                  <Select value={council} onValueChange={(v) => setCouncil(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select council" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi Medical Council</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra Medical Council</SelectItem>
                      <SelectItem value="karnataka">Karnataka Medical Council</SelectItem>
                      <SelectItem value="tamilnadu">Tamil Nadu Medical Council</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" onClick={() => setStep('intro')}>Back</Button>
                  <Button disabled={!nmcNumber || !council || isChecking} onClick={() => simulateCheck('pending')}>
                    {isChecking ? 'Checking…' : 'Verify Now'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'upload' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileCheck2 className="h-5 w-5 text-purple-600" />
                <span>Upload Medical Document</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Document Type</label>
                  <Select value={docType} onValueChange={(v) => setDocType(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="degree">Degree</SelectItem>
                      <SelectItem value="license">License</SelectItem>
                      <SelectItem value="id">Government ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <Upload className="h-8 w-8 mx-auto text-gray-500" />
                  <p className="mt-2 text-sm text-gray-700">Drag & drop your file here</p>
                  <Button variant="outline" size="sm" className="mt-3">Browse files</Button>
                </div>
                {uploading && (
                  <div>
                    <Progress value={progress} />
                    <p className="text-xs text-gray-500 mt-2">Uploading… {progress}%</p>
                  </div>
                )}
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" onClick={() => setStep('intro')}>Back</Button>
                  <Button disabled={!docType || uploading} onClick={simulateUpload}>Submit for Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'pending' && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Your Verification is in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Clock className="h-10 w-10 text-amber-500 mx-auto mb-3" />
              <p className="text-gray-700">Review usually takes 24–48 hours.</p>
              <div className="mt-3">
                <Badge className="bg-amber-100 text-amber-700">Pending Verification</Badge>
              </div>
              <div className="mt-6">
                <Link to="/">
                  <Button>Go to Home</Button>
                </Link>
              </div>
              <p className="mt-3 text-xs text-gray-500">Note: Limited posting until verified.</p>
            </CardContent>
          </Card>
        )}

        {step === 'success' && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Verification Successful 🎉</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/api/placeholder/64/64" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">DR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>
                <p className="mt-3 text-gray-700">Your identity has been verified. Welcome to the professional network.</p>
                <div className="mt-6">
                  <Button>Complete Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'failure' && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Verification Could Not Be Completed ❌</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
              <p className="text-gray-700">We couldn’t verify your credentials with the provided information.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button variant="outline" onClick={() => setStep('upload')}>Retry Upload</Button>
                <Button>Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
