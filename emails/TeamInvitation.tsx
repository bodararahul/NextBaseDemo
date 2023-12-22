import * as React from 'react';
import { Button, Html, Section, Text } from '@react-email/components';

type TeamInvitationEmailProps = {
  viewInvitationUrl: string;
  organizationName: string;
  inviterName: string;
  isNewUser: boolean;
};

/**
 * This email is sent to a user when they are invited to join a team.
 */
export default function TeamInvitationEmail(props: TeamInvitationEmailProps) {
  return (
    <Html>
      {props.isNewUser ? (
        <>
          <Text>
            Hello, you have been invited to join the team{' '}
            {props.organizationName}. Your account has been created and you can
            confirm your email address and join the team by clicking the button
            below.
          </Text>
          <Text>
            You will be able to set your password after confirming your email
            address in the security settings page.
          </Text>
        </>
      ) : (
        <Text>
          Hello,
          {props.inviterName} has invited you to join the team{' '}
          {props.organizationName}.
        </Text>
      )}
      <Section>
        <Button
          href={props.viewInvitationUrl}
          style={{ background: '#00f', color: '#fff', borderRadius: '6px' }}
        >
          View Invitation
        </Button>
      </Section>
    </Html>
  );
}
