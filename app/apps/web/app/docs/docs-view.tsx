'use client';

import MenuPageShell from '../../components/MenuPageShell';
import {
  BodyCopy,
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
  SubTitle,
} from '../../components/menuPagePrimitives';
import { DOCS_FAQ } from './docs-data';

/**
 * Docs view (discovery §5.5): concepts (one definitional paragraph per core
 * object), roadmap, architecture & standards, and FAQ. One `<h1>`; each core
 * object gets an `<h3>` with a definitional paragraph for LLM extraction.
 */

const CONCEPTS = [
  {
    title: 'Profiles',
    body: 'Profiles are the portable identity of every member. They carry reputation and relationships across communities, projects, and companies, so who you are travels with you.',
  },
  {
    title: 'Communities',
    body: 'Communities are groups of people who share interests, industries, goals, and opportunities. They are the center of engagement on JoinOrigin and the way members find each other.',
  },
  {
    title: 'Communication',
    body: 'Communication covers real-time chat, direct messages, and group discussions. It runs on the open Matrix protocol, so conversations are portable and can be end-to-end encrypted.',
  },
  {
    title: 'Feed',
    body: 'The feed shows posts, updates, and opportunities from the people and communities you follow. It is a calm stream of what matters in your network, not an engagement machine.',
  },
  {
    title: 'Projects',
    body: 'Projects are collaborative efforts where members work together toward a shared outcome. They connect the social graph to real work inside and across communities.',
  },
  {
    title: 'Companies',
    body: 'Companies are ventures formed by members of the network. They bring team management and opportunity sharing into the same workspace where the relationships live.',
  },
  {
    title: 'Opportunities',
    body: 'Opportunities are jobs, partnerships, and investments surfaced through the social graph. The network matches the right opportunity to the right person at the right time.',
  },
];

const ROADMAP = [
  {
    title: 'Phase 1 — Community Foundation',
    body: 'Profiles, communities, chat, and the social graph. Success metric: members forming durable communities.',
  },
  {
    title: 'Phase 2 — Collaboration',
    body: 'Projects, shared workspaces, and tools that turn conversations into joint work. Success metric: communities shipping outcomes together.',
  },
  {
    title: 'Phase 3 — Organization',
    body: 'Companies and ventures formed by members, with team management and governance. Success metric: companies founded inside the network.',
  },
  {
    title: 'Phase 4 — AI Collaboration',
    body: 'AI workers that help communities coordinate, summarize, and match opportunities. Success metric: members collaborating with AI as equals.',
  },
  {
    title: 'Phase 5 — Global Network',
    body: 'Federation and open standards so the network connects across platforms. Success metric: a portable, interoperable social graph.',
  },
];

export function DocsView() {
  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>JoinOrigin docs</PageTitle>
          <PageLead>
            JoinOrigin is a social collaboration network — an operating system for human
            collaboration. These docs explain the core objects, the roadmap, and the architecture
            behind the platform.
          </PageLead>
        </PageHeader>

        <Section>
          <SectionTitle>Concepts</SectionTitle>
          <BulletList>
            {CONCEPTS.map((concept) => (
              <ListItem key={concept.title}>
                <SubTitle>{concept.title}</SubTitle>
                <BodyCopy>{concept.body}</BodyCopy>
              </ListItem>
            ))}
          </BulletList>
        </Section>

        <Section>
          <SectionTitle>Roadmap</SectionTitle>
          <BulletList>
            {ROADMAP.map((phase) => (
              <ListItem key={phase.title}>
                <SubTitle>{phase.title}</SubTitle>
                <BodyCopy>{phase.body}</BodyCopy>
              </ListItem>
            ))}
          </BulletList>
        </Section>

        <Section>
          <SectionTitle>Architecture &amp; standards</SectionTitle>
          <BodyCopy>
            The social graph is the product: every object hangs off the network of people and their
            relationships. Communication uses the open Matrix protocol (decentralized, E2EE), and
            identity is portable so members own their data.
          </BodyCopy>
          <BodyCopy>
            The platform is built with React, TypeScript, and Next.js on the web, NestJS,
            PostgreSQL, Redis, and Docker in the backend — with open architecture as a first-class
            principle.
          </BodyCopy>
        </Section>

        <Section>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <FaqSection>
            {DOCS_FAQ.map((faq) => (
              <FaqItem key={faq.question}>
                <FaqQuestion>{faq.question}</FaqQuestion>
                <FaqAnswer>{faq.answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqSection>
        </Section>
      </PageContainer>
    </MenuPageShell>
  );
}
