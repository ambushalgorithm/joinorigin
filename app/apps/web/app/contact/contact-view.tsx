'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { Trans, useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import {
  AccentLink,
  BulletList,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  ListItem,
  PageContainer,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';
import { faqEntries, faqNamespace } from '../../lib/faq';

/**
 * Contact view (discovery §5.7, redesign spec sprint-8 §8.5): a web-local
 * contact form that composes a `mailto:` message (discovery Assumption 4 —
 * the lower-risk option, no new backend in Sprint 4), plus alternate support
 * paths and FAQ shortcut. One `<h1>` (rendered by `MenuHero`) and semantic
 * sections. The join CTA band is the default waitlist band (DoD §11: only
 * privacy/terms use the contact override).
 *
 * i18n (arch-i18n §7.3): the mailto subject/body templates are localized with
 * `{{name}}` / `{{email}}` / `{{message}}` interpolation; inline links use
 * `<Trans>` numbered tags.
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

/** Primary gradient pill submit (spec sprint-8 §8.5 form restyle). */
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
  const { t, dictionary } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const faq = faqEntries(faqNamespace(dictionary, 'contact'));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      t('contact.mailtoSubject', { name: name || t('contact.newMessage') }),
    );
    const body = encodeURIComponent(t('contact.mailtoBody', { name, email, message }));
    // Lower-risk option (discovery Assumption 4): compose a mailto message
    // instead of adding a new backend endpoint in Sprint 4.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('contact.hero.eyebrow'),
        title: t('contact.hero.title'),
        lead: t('contact.hero.lead'),
        scene: '/assets/menu/scenes/contact-scene.svg',
        accent: 'contact',
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle>{t('contact.sectionForm')}</SectionTitle>
            <form onSubmit={handleSubmit} data-testid="contact-form" noValidate={false}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
                <Field>
                  {t('contact.form.nameLabel')}
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={t('contact.form.namePlaceholder')}
                    autoComplete="name"
                  />
                </Field>
                <Field>
                  {t('contact.form.emailLabel')}
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t('contact.form.emailPlaceholder')}
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field>
                  {t('contact.form.messageLabel')}
                  <TextArea
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </Field>
                <SubmitButton type="submit">{t('contact.form.submit')}</SubmitButton>
                <FormHint>{t('contact.form.hint')}</FormHint>
              </div>
            </form>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('contact.sectionOther')}</SectionTitle>
            <BulletList>
              <ListItem>
                <Trans
                  i18nKey="contact.otherEmail"
                  values={{ email: CONTACT_EMAIL }}
                  components={[<AccentLink key="mail" href={`mailto:${CONTACT_EMAIL}`} />]}
                />
              </ListItem>
              <ListItem>
                <Trans
                  i18nKey="contact.otherDocs"
                  components={[<AccentLink key="docs" href="/docs" />]}
                />
              </ListItem>
              <ListItem>
                <Trans
                  i18nKey="contact.otherAbout"
                  components={[<AccentLink key="about" href="/about" />]}
                />
              </ListItem>
            </BulletList>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('common.faqHeading')}</SectionTitle>
            <FaqSection>
              {faq.map((entry) => (
                <FaqItem key={entry.question}>
                  <FaqQuestion>{entry.question}</FaqQuestion>
                  <FaqAnswer>{entry.answer}</FaqAnswer>
                </FaqItem>
              ))}
            </FaqSection>
          </Section>
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
