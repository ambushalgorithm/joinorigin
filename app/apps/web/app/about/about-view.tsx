'use client';

import MenuPageShell from '../../components/MenuPageShell';
import {
  AccentLink,
  BodyCopy,
  BulletList,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  ListItem,
  PageContainer,
  PageHeader,
  PageLead,
  PageTitle,
  Quote,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';

/**
 * About view (discovery §5.6): mission + principles + founder guidance.
 * One `<h1>`, semantic sections, and the "social collaboration network"
 * definition in the intro for LLM-crawler entity clarity.
 */

const PRINCIPLES = [
  {
    title: 'People First',
    body: 'The network is made of people, not just content or software. Product decisions start from the relationships members want to form.',
  },
  {
    title: 'Communities Drive Growth',
    body: 'Communities are the center of engagement — groups of people who share interests, industries, goals, and opportunities bring the network to life.',
  },
  {
    title: 'Collaboration Creates Value',
    body: 'Conversations turn into projects, projects turn into companies. JoinOrigin is built so collaboration has a place to go.',
  },
  {
    title: 'Open Architecture',
    body: 'Communication runs on the open Matrix protocol, and identity, profiles, communities, and the social graph are portable and user-owned. Origin is hosted, so there is nothing to self-host.',
  },
];

export function AboutView() {
  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>The most valuable asset is your network</PageTitle>
          <PageLead>
            Origin is a social collaboration network built on one belief: the most valuable asset on
            the internet is not content or software — it is the network of people and the
            relationships they form.
          </PageLead>
        </PageHeader>

        <Section>
          <SectionTitle>Our mission</SectionTitle>
          <BodyCopy>
            Origin is building the operating system for human collaboration. Instead of five
            separate tools for chat, communities, and projects, your relationships live in one calm
            workspace. The social graph is the product: profiles, ideas, communities, conversations,
            posts, projects, companies, and opportunities all hang off the same network of people.
          </BodyCopy>
          <BodyCopy>
            We are in early access today, with 2,400+ builders on the waitlist. As the platform
            grows through the roadmap — Community Foundation, Collaboration, Organization, AI
            Collaboration, and the Global Network — the mission stays the same: help people find
            each other and build together.
          </BodyCopy>
        </Section>

        <Section>
          <SectionTitle>Guiding principles</SectionTitle>
          <CardGrid>
            {PRINCIPLES.map((principle) => (
              <Card key={principle.title}>
                <CardTitle>{principle.title}</CardTitle>
                <CardBody>{principle.body}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>Founder guidance</SectionTitle>
          <Quote>
            &ldquo;Does this help people find each other? If no, do not build it.&rdquo;
          </Quote>
          <BodyCopy>
            Every feature on JoinOrigin is measured against that question. If it does not help
            people discover each other, form communities, or start projects together, it does not
            belong in the workspace.
          </BodyCopy>
        </Section>

        <Section>
          <SectionTitle>Deeper reading</SectionTitle>
          <BulletList>
            <ListItem>
              Read the <AccentLink href="/docs">docs</AccentLink> for the core objects, roadmap, and
              architecture.
            </ListItem>
            <ListItem>
              See the <AccentLink href="/community">community</AccentLink> page for the values and
              example communities inside the network.
            </ListItem>
            <ListItem>
              Have a question? <AccentLink href="/contact">Contact the team</AccentLink> — we reply
              within 2 business days.
            </ListItem>
          </BulletList>
        </Section>

        <Section>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <FaqSection>
            <FaqItem>
              <FaqQuestion>What is JoinOrigin?</FaqQuestion>
              <FaqAnswer>
                Origin is a social collaboration network — a community OS that brings your ideas,
                projects, and communities into one organized space. JoinOrigin is the brand and
                network behind it.
              </FaqAnswer>
            </FaqItem>
            <FaqItem>
              <FaqQuestion>What does &ldquo;the network is the product&rdquo; mean?</FaqQuestion>
              <FaqAnswer>
                Instead of selling software features in isolation, JoinOrigin treats the
                relationships between people — the social graph — as the core value it creates and
                protects.
              </FaqAnswer>
            </FaqItem>
            <FaqItem>
              <FaqQuestion>Is JoinOrigin open source?</FaqQuestion>
              <FaqAnswer>
                The code is open under AGPL-3.0, and communication runs on the open Matrix protocol.
                Origin is a hosted product run by JoinOrigin — there is nothing to self-host — and
                your network graph stays portable. See the docs for details.
              </FaqAnswer>
            </FaqItem>
          </FaqSection>
        </Section>
      </PageContainer>
    </MenuPageShell>
  );
}
