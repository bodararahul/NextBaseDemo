import * as React from 'react';
import { Button, Html, Section, Column, Text } from '@react-email/components';

type SignInEmailProps = {
  signInUrl: string;
};

/**
 * This email is sent to a user asking them to sign in.
 */
export default function SignInEmail(props: SignInEmailProps) {
  return (
    <Html>
      <Text>Hello,</Text>
      <Text>
        We kindly invite you to access your account by signing in with the link
        provided below.
      </Text>
      <Section>
        <Column>
          <Button
            href={props.signInUrl}
            style={{ background: '#00f', color: '#fff', borderRadius: '6px' }}
          >
            Sign In to Your Account
          </Button>
        </Column>
      </Section>
      <Text>
        Thank you for choosing our platform, and we look forward to serving you!
      </Text>
      <Text>Warm regards,</Text>
      <Text>Nextbase Customer Success Team</Text>
    </Html>
  );
}
