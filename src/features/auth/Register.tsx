import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { User, Mail, Lock } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState('12-A');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login('student');
      addToast('Registration successful! Welcome to IQora.', 'success');
      navigate('/student/home');
    }, 500);
  };

  return (
    <Card className="p-6 sm:p-8 bg-white border border-brand-border shadow-elevated">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-brand-text-primary text-center">
          Join IQora for Class 12
        </h2>
        <p className="text-xs text-brand-text-secondary text-center -mt-2">
          Start your personalized path across Math, Physics, Chem & English
        </p>

        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Arjun Patel"
          required
          leftIcon={<User className="w-4 h-4" />}
        />

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.name@iqora.edu"
          required
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          leftIcon={<Lock className="w-4 h-4" />}
        />

        <Select
          label="Class & Section"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          options={[
            { value: '12-A', label: 'Class 12-A (Science)' },
            { value: '12-B', label: 'Class 12-B (Science)' },
            { value: '12-C', label: 'Class 12-C (Commerce)' },
            { value: '12-D', label: 'Class 12-D (Humanities)' },
          ]}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2 shadow-brand"
          isLoading={isLoading}
        >
          Create Student Account
        </Button>
      </form>

      <div className="mt-5 text-center">
        <p className="text-xs text-brand-text-secondary">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-brand-text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
};
