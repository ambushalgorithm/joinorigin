'use client';

import MenuPageShell from '../../components/MenuPageShell';
import {
  BodyCopy,
  BulletList,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  CompareTable,
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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/menuPagePrimitives';
import { FEATURES_FAQ } from './features-data';

/**
 * Features view (discovery §5.2): Core Objects cards, comparison table,
 * roadmap phases, and FAQ. One `<h1>`, real `<table>` semantics for the
 * comparison, and the "social collaboration network" definition in the intro.
 */

const CORE_OBJECTS = [
  {
    title: 'Profiles',
    body: 'Every member has a portable identity that carries their reputation and relationships across communities, projects, and companies.',
  },
  {
    title: 'Communities',
    body: 'Groups around interests, industries, and goals — AI Builders, Startup Founders, Quant Trading, Real Estate, Local — where members find each other.',
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
    body: 'Federation and open standards so the network connects across platforms, not just inside one silo.',
  },
];

export function FeaturesView() {
  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>Everything a community needs, in one calm workspace</PageTitle>
          <PageLead>
            JoinOrigin is a social collaboration network built around seven core objects: profiles,
            communities, conversations, posts, projects, companies, and opportunities. Instead of
            five separate tools, your relationships live in one place.
          </PageLead>
        </PageHeader>

        <Section>
          <SectionTitle>Core objects</SectionTitle>
          <CardGrid>
            {CORE_OBJECTS.map((object) => (
              <Card key={object.title}>
                <CardTitle>{object.title}</CardTitle>
                <CardBody>{object.body}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>Why JoinOrigin instead of five tools</SectionTitle>
          <BodyCopy>
            Most platforms solve only one part of collaboration. JoinOrigin combines them around the
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

        <Section>
          <SectionTitle>Roadmap</SectionTitle>
          <BulletList>
            {ROADMAP_PHASES.map((phase) => (
              <ListItem key={phase.title}>
                <SubTitle>{phase.title}</SubTitle>
                <BodyCopy>{phase.body}</BodyCopy>
              </ListItem>
            ))}
          </BulletList>
        </Section>

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
      </PageContainer>
    </MenuPageShell>
  );
}
