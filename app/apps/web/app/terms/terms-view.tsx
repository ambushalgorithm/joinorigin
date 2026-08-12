'use client';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import {
  AccentLink,
  BodyCopy,
  BulletList,
  ListItem,
  PageContainer,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';

/**
 * Terms of service view (discovery §5.9, redesign spec sprint-8 §8.7):
 * plain-English legal copy. One `<h1>` (rendered by `MenuHero`) and semantic
 * sections. The hero lead reuses the existing Acceptance paragraph verbatim
 * (spec §6 copy table).
 */

export function TermsView() {
  return (
    <MenuPageShell
      hero={{
        eyebrow: 'Legal',
        title: 'Terms of Service',
        lead: 'By using JoinOrigin (the \u201cService\u201d), you agree to these Terms of Service. If you do not agree, please do not use the Service.',
        scene: '/assets/menu/scenes/terms-scene.svg',
        accent: 'terms',
      }}
      ctaOverride={{
        headline: 'Questions about Origin?',
        subline: 'Our team replies within 2 business days.',
        ctaLabel: 'Contact us',
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle>Acceptance</SectionTitle>
            <BodyCopy>
              By using JoinOrigin (the &ldquo;Service&rdquo;), you agree to these Terms of Service.
              If you do not agree, please do not use the Service.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Accounts</SectionTitle>
            <BodyCopy>
              You are responsible for safeguarding your account credentials and for activity that
              happens under your account. You must provide accurate information when you create an
              account or join the waitlist.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>User content</SectionTitle>
            <BodyCopy>
              You retain ownership of the content you post. You grant JoinOrigin a limited license
              to store, display, and process that content so the Service can function. You keep the
              rights to export and delete your content.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Acceptable use</SectionTitle>
            <BulletList>
              <ListItem>Do not use the Service for unlawful activity.</ListItem>
              <ListItem>Do not harass, abuse, or harm other members.</ListItem>
              <ListItem>
                Do not attempt to disrupt or gain unauthorized access to the Service.
              </ListItem>
              <ListItem>Do not scrape or harvest member data without permission.</ListItem>
            </BulletList>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Intellectual property</SectionTitle>
            <BodyCopy>
              JoinOrigin&rsquo;s trademarks, logos, and site materials belong to JoinOrigin. You may
              not use them without our permission. Open-source components remain under their
              respective licenses.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Disclaimers</SectionTitle>
            <BodyCopy>
              The Service is provided &ldquo;as is&rdquo; during early access. We work to keep it
              reliable but do not guarantee that it will be uninterrupted or error-free.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Changes</SectionTitle>
            <BodyCopy>
              We may update these Terms as the Service evolves. Material changes will be announced
              on this page, and continued use after changes means you accept the updated Terms.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Contact</SectionTitle>
            <BodyCopy>
              Questions about these Terms? Email{' '}
              <AccentLink href="mailto:hello@joinorigin.com">hello@joinorigin.com</AccentLink> or
              use the <AccentLink href="/contact">contact page</AccentLink>.
            </BodyCopy>
          </Section>
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
