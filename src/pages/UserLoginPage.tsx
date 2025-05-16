import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AlertCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OtpInput from 'react-otp-input';

const UserLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, you would:
      // 1. Call your backend to generate and send OTP
      // 2. Store the OTP hash in verification_codes table
      // 3. Send the OTP via SMS
      
      // For demo, we'll simulate OTP send
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOtp(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, you would:
      // 1. Verify OTP against stored hash
      // 2. Create/update user record
      // 3. Generate session token
      
      // For demo, we'll simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {!showOtp ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={setPhone}
                  containerClass="!w-full"
                  inputClass="!w-full !h-10 !text-base"
                />
                <Button
                  className="w-full mt-4"
                  onClick={handleSendOtp}
                  isLoading={loading}
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  containerStyle="flex gap-2 justify-center"
                  inputStyle={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    fontSize: '1.125rem',
                    textAlign: 'center',
                  }}
                />
                <Button
                  className="w-full mt-4"
                  onClick={handleVerifyOtp}
                  isLoading={loading}
                >
                  Verify OTP
                </Button>
                <button
                  type="button"
                  className="mt-2 w-full text-sm text-blue-600 hover:text-blue-500"
                  onClick={() => setShowOtp(false)}
                >
                  Change Phone Number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;