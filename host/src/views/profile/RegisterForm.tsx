import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/formHooks';
import { useUser } from '@/hooks/apiHooks';
import { useState } from 'react';

const RegisterForm = () => {
  const { postUser, getUsernameAvailable, getEmailAvailable } = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  
  const initValues = { username: '', password: '', email: '', confirm: '' };

  const doRegister = async () => {
    if (usernameAvailable && emailAvailable) {
      try {
        await postUser(inputs);
      } catch (error) {
        console.error((error as Error).message);
      }
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(doRegister, initValues);

  const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    const result = await getUsernameAvailable(event.currentTarget.value);
    setUsernameAvailable(result.available);
  };

  const handleEmailBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    const result = await getEmailAvailable(event.currentTarget.value);
    setEmailAvailable(result.available);
  };

  return (
    <>
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Register</h2>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-8">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            onBlur={handleUsernameBlur}
            onChange={handleInputChange}
          />
          {!usernameAvailable && <p className="text-red-600">Username not available</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            onBlur={handleEmailBlur}
            onChange={handleInputChange}
          />
          {!emailAvailable && <p className="text-red-600">Email not available</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirm"
            type="password"
            required
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="w-full flex justify-center">
          <Button onClick={handleSubmit}>Register</Button>
        </div>
      </CardFooter>
    </>
  );
};

export default RegisterForm;