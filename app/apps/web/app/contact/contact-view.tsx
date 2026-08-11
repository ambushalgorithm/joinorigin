'use client';

import { useState } from 'react';
import styled from 'styled-components';

import MenuPageShell from '../../components/MenuPageShell';
import {
  AccentLink,
  BulletList,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  ListItem,
  PageContainer,
  PageHeader,
  PageLead,
  PageTitle,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';

/**
 * Contact view (discovery §5.7): a web-local contact form that composes a
 * `mailto:` message (discovery Assumption 4 — the lower-risk option, no new
 * backend in Sprint 4), plus alternate support paths and FAQ shortcut. One
 * `<h1>` and semantic sections.
 */

const CONTACT_EMAIL = 'hello@joinorigin.com';

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  max-width: 480px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 480px;
  min-height: 140px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #8ab4ff 100%);
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(79, 125, 249, 0.35);
  }
`;

const FormHint = styled.p`
  margin: ${({ theme }) => theme.spacing.sm}px 0 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`JoinOrigin contact — ${name || 'new message'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // Lower-risk option (discovery Assumption 4): compose a mailto message
    // instead of adding a new backend endpoint in Sprint 4.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>Talk to us</PageTitle>
          <PageLead>
            Have a question about the social collaboration network, early access, or starting a
            community on JoinOrigin? We&rsquo;d love to hear from you.
          </PageLead>
        </PageHeader>

        <Section>
          <SectionTitle>Send a message</SectionTitle>
          <form onSubmit={handleSubmit} data-testid="contact-form" noValidate={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              <Field>
                Name
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </Field>
              <Field>
                Email
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </Field>
              <Field>
                Message
                <TextArea
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="How can we help?"
                />
              </Field>
              <SubmitButton type="submit">Send via email</SubmitButton>
              <FormHint>
                This form opens your email app with the message pre-filled. We reply within 2
                business days.
              </FormHint>
            </div>
          </form>
        </Section>

        <Section>
          <SectionTitle>Other ways to reach us</SectionTitle>
          <BulletList>
            <ListItem>
              Email: <AccentLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</AccentLink>
            </ListItem>
            <ListItem>
              Check the <AccentLink href="/docs">docs</AccentLink> for concepts, roadmap, and
              architecture.
            </ListItem>
            <ListItem>
              Read the <AccentLink href="/about">about</AccentLink> page for our mission and
              principles.
            </ListItem>
          </BulletList>
        </Section>

        <Section>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <FaqSection>
            <FaqItem>
              <FaqQuestion>How quickly do you reply?</FaqQuestion>
              <FaqAnswer>
                We reply within 2 business days. For the fastest answer, check the docs FAQ first.
              </FaqAnswer>
            </FaqItem>
            <FaqItem>
              <FaqQuestion>Can I get early access?</FaqQuestion>
              <FaqAnswer>
                Yes — join the waitlist from the home page. Early members are the first in when the
                community OS launches.
              </FaqAnswer>
            </FaqItem>
          </FaqSection>
        </Section>
      </PageContainer>
    </MenuPageShell>
  );
}
