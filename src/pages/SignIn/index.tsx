import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Input from '../../component/Input';

import { login, isAuthenticated } from '../../services/auth';

import SignInBackground from '../../assets/sign-in-bg.jpeg';

import {
  Container,
  Modal,
  Image,
  Form,
  FormContainer,
  Header,
  SignUpButton,
  SignInContainer,
} from './styles';

interface Response {
  token: string;
  user: User;
}

interface User {
  id: string;
}

const SignIn: React.FC = () => {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated()) return history.push('/dashboard');
  }, [history]);

  const handleNavigateToSignUp = () => {
    history.push('/signup');
  };

  // Redirects to /dashboard and saves token and user_id on localStorage
  const handleSignIn = async () => {
    const { data } = await api.post<Response>('sessions', { email, password });

    login(data.token, data.user.id);
    return history.push('/dashboard');
  };

  return (
    <Container>
      <Modal>
        <Image src={SignInBackground} alt="Sign In Background" />

        <FormContainer>
          <Header>
            <strong>App Budget!</strong>
            <span>Sign In and calculate how much your app costs!</span>
          </Header>

          <Form>
            <Input
              label="e-mail"
              placeholder="Enter your best e-mail"
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
              type="email"
              required
            />
            <Input
              label="password"
              placeholder="*********"
              onChange={e => setPassword(e.currentTarget.value)}
              type="password"
              required
            />
          </Form>
          <SignInContainer>
            <SignUpButton onClick={handleSignIn}>Sign In</SignUpButton>
            <small>
              Already have an account?{' '}
              <a href="/signup" onClick={handleNavigateToSignUp}>
                Sign Up
              </a>
            </small>
          </SignInContainer>
        </FormContainer>
      </Modal>
    </Container>
  );
};

export default SignIn;
