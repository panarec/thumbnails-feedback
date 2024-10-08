import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  username: string;
  userId: string;
  token: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const VerificationEmailTemplate = ({ username, token }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to the Thumbnails Feedback! This is your verification email.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h1">👋 Hey {username},</Heading>
        <Text style={paragraph}>
          Welcome to Thumbnails Feedback! Please click the button below to verify your email address.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/activate/?token=${token}`}>
            Verify Email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Thumbnails Feedback Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          You received this email because you have an account on Thumbnails Feedback. If you did not create an account,
          please ignore this email. If you have any questions, please contact us at{' '}
          <Link href="mailto:support@thumbnailsfeedback.com" style={link}>
            support@thumbnailsfeedback.com
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#FF2E5F',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};

const link = {
  color: '#8898aa',
  textDecoration: 'underline',
};
