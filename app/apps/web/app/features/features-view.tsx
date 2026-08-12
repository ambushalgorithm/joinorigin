'use client';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import {
  BodyCopy,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  CompareTable,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  PageContainer,
  Section,
  SectionTitle,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/menuPagePrimitives';
import { FEATURES_FAQ } from './features-data';

/**
 * Features view (discovery §5.2, redesign spec sprint-8 §8.1): Core Objects
 * cards, comparison table, roadmap cards, and FAQ. One `<h1>` (rendered by
 * `MenuHero`), real `<table>` semantics for the comparison, and the "social
 * collaboration network" definition in the intro.
 */

const CORE_OBJECTS = [
  {
    title: 'Profiles',
    body: 'A profile works like a living resume: it carries your experience, skills, and ideas — plus your reputation and relationships — across every community and project you join.',
  },
  {
    title: 'Ideas',
    body: 'Every idea gets a home. Post an idea page for anything — a small business, an AI startup, helping the homeless, a 10k run, a book club, a pee-wee league — and find the people who want to build it with you.',
  },
  {
    title: 'Communities',
    body: 'Groups around interests, industries, and goals — Startup Founders, Small Businesses, Book Clubs, Community Organizations, Anyone with an Idea — where members find each other.',
  },
  {
    title: 'Communication',
    body: 'Real-time chat, direct messages, and group discussions over the open Matrix protocol, end-to-end encrypted by default.',
  },
  {
    title: 'Feed',
    body: 'Posts, updates, and opportunities from the people and communities you follow — a calm stream of what matters in your network.',
  },
  {
    title: 'Projects',
    body: 'Collaborative efforts where community members work together and turn conversations into outcomes.',
  },
  {
    title: 'Companies',
    body: 'Ventures formed by members inside the network, with team management and opportunity sharing built in.',
  },
  {
    title: 'Opportunities',
    body: 'Jobs, partnerships, and investments discovered through the social graph — the network surfaces the right opportunities at the right time.',
  },
];

const COMPARISON_ROWS = [
  {
    tool: 'LinkedIn',
    strength: 'finds professionals',
    gap: 'but does not power the communities, chat, and projects that turn connections into collaboration.',
  },
  {
    tool: 'Discord',
    strength: 'communicates',
    gap: 'but is not organized around profiles, communities, projects, and opportunities on a shared social graph.',
  },
  {
    tool: 'Reddit',
    strength: 'discusses',
    gap: 'but is anonymous and does not carry reputation, relationships, or projects forward.',
  },
  {
    tool: 'GitHub',
    strength: 'codes',
    gap: 'but is built for repositories, not for the full range of human collaboration.',
  },
];

const ROADMAP_PHASES = [
  {
    title: 'Phase 1 — Community Foundation',
    body: 'Profiles, communities, chat, and the social graph — the base layer where people find each other.',
  },
  {
    title: 'Phase 2 — Collaboration',
    body: 'Projects, shared workspaces, and tools that turn community conversations into joint work.',
  },
  {
    title: 'Phase 3 — Organization',
    body: 'Companies and ventures formed by members, with team management and governance.',
  },
  {
    title: 'Phase 4 — AI Collaboration',
    body: 'AI workers that help communities coordinate, summarize, and match opportunities.',
  },
  {
    title: 'Phase 5 — Global Network',
    body: 'Open standards and portability so the network connects across platforms, not just inside one silo.',
  },
];

export function FeaturesView() {
  return (
    <MenuPageShell
      hero={{
        eyebrow: 'Core objects',
        title: 'Everything a community needs, in one calm workspace',
        lead: 'Origin is a social collaboration network built around eight core objects: profiles, ideas, communities, conversations, posts, projects, companies, and opportunities. Instead of five separate tools, your relationships live in one place.',
        scene: '/assets/menu/scenes/features-scene.svg',
        accent: 'features',
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle>Core objects</SectionTitle>
            <CardGrid>
              {CORE_OBJECTS.map((object, index) => (
                <Reveal key={object.title} delay={`${index * 0.08}s`}>
                  <Card>
                    <CardTitle>{object.title}</CardTitle>
                    <CardBody>{object.body}</CardBody>
                  </Card>
                </Reveal>
              ))}
            </CardGrid>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Why Origin instead of five tools</SectionTitle>
            <BodyCopy>
              Most platforms solve only one part of collaboration. Origin combines them around the
              social graph — the relationships between members — so nothing gets lost between tools.
            </BodyCopy>
            <CompareTable data-testid="features-comparison-table">
              <TableHead>
                <TableRow>
                  <TableHeader scope="col">Tool</TableHeader>
                  <TableHeader scope="col">Great at</TableHeader>
                  <TableHeader scope="col">What JoinOrigin adds</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {COMPARISON_ROWS.map((row) => (
                  <TableRow key={row.tool}>
                    <TableCell>{row.tool}</TableCell>
                    <TableCell>{row.strength}</TableCell>
                    <TableCell>{row.gap}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CompareTable>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Roadmap</SectionTitle>
            <CardGrid>
              {ROADMAP_PHASES.map((phase, index) => (
                <Reveal key={phase.title} delay={`${index * 0.08}s`}>
                  <Card>
                    <CardTitle>{phase.title}</CardTitle>
                    <CardBody>{phase.body}</CardBody>
                  </Card>
                </Reveal>
              ))}
            </CardGrid>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Frequently asked questions</SectionTitle>
            <FaqSection>
              {FEATURES_FAQ.map((faq) => (
                <FaqItem key={faq.question}>
                  <FaqQuestion>{faq.question}</FaqQuestion>
                  <FaqAnswer>{faq.answer}</FaqAnswer>
                </FaqItem>
              ))}
            </FaqSection>
          </Section>
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
