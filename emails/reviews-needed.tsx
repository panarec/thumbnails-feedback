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
import { Content } from 'next/font/google';
import * as React from 'react';

interface ReviewsNeededProps {
  username: string;
  testCount: number;
  userId: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ReviewsNeededEmailTemplate = ({ username, testCount, userId }: ReviewsNeededProps) => (
  <Html>
    <Head />
    <Preview>We have some thumbnails that need your review!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h1">👋 Hey {username},</Heading>
        <Text style={paragraph}>
          There {testCount === 1 ? 'is' : 'are'}
          <span style={strong}>&nbsp;{testCount}&nbsp;</span>
          {testCount === 1 ? 'thumbnail' : 'thumbnails'}&nbsp;that need your review. It would be great if you could take
          a moment to review {testCount === 1 ? 'it' : 'them'}! Your feedback is important to others.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/review`}>
            I will review that!
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
          . If you do not want to receive these emails in the future, please{' '}
          <Link href={`${baseUrl}/unsubscribe?user=${userId}`} style={link}>
            unsubscribe
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ReviewsNeededEmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const strong = {
  fontWeight: 'bold',
  fontSize: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '24px',
  lineHeight: '32px',
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
