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
  SubTitle,
} from '../../components/menuPagePrimitives';

/**
 * Privacy policy view (discovery §5.8, redesign spec sprint-8 §8.6): short,
 * plain-English legal copy. One `<h1>` (rendered by `MenuHero`) and semantic
 * sections. The hero lead reuses the existing "What we collect" first
 * paragraph verbatim (spec §6 copy table).
 */

export function PrivacyView() {
  return (
    <MenuPageShell
      hero={{
        eyebrow: 'Legal',
        title: 'Privacy Policy',
        lead: 'When you join the waitlist we collect your name and email address through the waitlist form (POST /api/leads). That is the only personal information we ask for during early access.',
        scene: '/assets/menu/scenes/privacy-scene.svg',
        accent: 'privacy',
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
            <SectionTitle>What we collect</SectionTitle>
            <BulletList>
              <ListItem>
                <SubTitle>Waitlist data</SubTitle>
                <BodyCopy>
                  Name and email, used only to tell you when early access opens and to invite you
                  in.
                </BodyCopy>
              </ListItem>
              <ListItem>
                <SubTitle>Analytics</SubTitle>
                <BodyCopy>
                  We run config-driven analytics (self-hosted Plausible by default) to understand
                  aggregate usage of the site. A consent banner is planned for a later sprint.
                </BodyCopy>
              </ListItem>
              <ListItem>
                <SubTitle>Basic technical data</SubTitle>
                <BodyCopy>
                  Standard server logs and browser metadata that help us keep the site reliable.
                </BodyCopy>
              </ListItem>
            </BulletList>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>How we use it</SectionTitle>
            <BodyCopy>
              We use the information we collect to operate the site, deliver early-access invites,
              and improve the product. We do not sell your personal information.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Identity &amp; flexibility</SectionTitle>
            <BodyCopy>
              You choose how you show up on Origin. You can participate with a named account or stay
              anonymous, and communities, chats, and idea pages can be open to everyone or gated by
              their organizers. These options roll out over time — the point is that you decide what
              you share and with whom.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Your rights</SectionTitle>
            <BodyCopy>
              You can request access to, correction of, or deletion of your data at any time.
              Because identity and data ownership are core JoinOrigin principles, we make it easy to
              export or remove what belongs to you.
            </BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Contact</SectionTitle>
            <BodyCopy>
              Questions about this policy? Email{' '}
              <AccentLink href="mailto:hello@joinorigin.com">hello@joinorigin.com</AccentLink> or
              use the <AccentLink href="/contact">contact page</AccentLink>.
            </BodyCopy>
          </Section>
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
