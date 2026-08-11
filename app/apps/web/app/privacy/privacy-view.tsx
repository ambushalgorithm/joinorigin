'use client';

import MenuPageShell from '../../components/MenuPageShell';
import {
  AccentLink,
  BodyCopy,
  BulletList,
  ListItem,
  PageContainer,
  PageHeader,
  PageTitle,
  Section,
  SectionTitle,
  SubTitle,
} from '../../components/menuPagePrimitives';

/**
 * Privacy policy view (discovery §5.8): short, plain-English legal copy.
 * One `<h1>` and semantic sections.
 */

export function PrivacyView() {
  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>Privacy Policy</PageTitle>
        </PageHeader>

        <Section>
          <SectionTitle>What we collect</SectionTitle>
          <BodyCopy>
            When you join the waitlist we collect your name and email address through the waitlist
            form (<code>POST /api/leads</code>). That is the only personal information we ask for
            during early access.
          </BodyCopy>
          <BulletList>
            <ListItem>
              <SubTitle>Waitlist data</SubTitle>
              <BodyCopy>
                Name and email, used only to tell you when early access opens and to invite you in.
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

        <Section>
          <SectionTitle>How we use it</SectionTitle>
          <BodyCopy>
            We use the information we collect to operate the site, deliver early-access invites, and
            improve the product. We do not sell your personal information.
          </BodyCopy>
        </Section>

        <Section>
          <SectionTitle>Your rights</SectionTitle>
          <BodyCopy>
            You can request access to, correction of, or deletion of your data at any time. Because
            identity and data ownership are core JoinOrigin principles, we make it easy to export or
            remove what belongs to you.
          </BodyCopy>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <BodyCopy>
            Questions about this policy? Email{' '}
            <AccentLink href="mailto:hello@joinorigin.com">hello@joinorigin.com</AccentLink> or use
            the <AccentLink href="/contact">contact page</AccentLink>.
          </BodyCopy>
        </Section>
      </PageContainer>
    </MenuPageShell>
  );
}
