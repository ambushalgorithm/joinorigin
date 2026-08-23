import type { RegionContent } from '../../types';

/**
 * Lombardy region page content — EN source of truth.
 *
 * Lombardy is the economic powerhouse of Italy, home to Milan and the
 * country's densest professional communities. This page covers the
 * regional landscape; the Milan city page covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'lombardy',
  title: 'Communities in Lombardy | JoinOrigin',
  description:
    'Find or start communities in Lombardy — from Milan’s startup and design scenes to associations across the region. Join Origin and get discovered.',
  intro:
    'Lombardy is Italy’s economic powerhouse, a northern region that generates a large share of the country’s output and hosts its densest professional communities. Milan, the regional capital and Italy’s financial center, anchors the scene: design, fashion, finance, and a growing startup ecosystem cluster around coworking spaces, universities, and the city’s famous design district. Beyond Milan, the region’s cities and towns — Bergamo, Brescia, Como, and Monza among them — sustain lively communities of their own, tied to local industries, universities, and the strong tradition of Italian associations and circoli. The region’s lakes and mountains make outdoor and sports communities especially active, from cycling clubs around Lake Como to hiking groups in the Alps. Transport links — the high-speed rail and a dense regional network — tie Lombardy together, so a community anchored in Milan can draw members from across the region. The aperitivo tradition makes casual gathering easy, and the region’s wealth supports a rich array of cultural venues, from opera houses to contemporary art spaces. Whether you are looking for a design meetup, a startup group, a sports club, or a small business network, Lombardy offers a dense, dynamic landscape.',
  dataPoints: [
    'Lombardy is home to roughly 10 million residents in northern Italy.',
    'Regional capital is Milan; Bergamo, Brescia, and Como are major hubs.',
    'Italy’s economic powerhouse and a global design/fashion center.',
    'Strong association (circolo) and outdoor sports culture.',
  ],
  faq: [
    {
      question: 'Is Lombardy different from the Milan city scene?',
      answer:
        'Yes. Lombardy is the wider region — Milan plus its provinces. Most national professional communities meet in Milan, but the provinces host strong local scenes tied to industry, universities, and outdoor sports.',
    },
    {
      question: 'Which parts of Lombardy have active communities?',
      answer:
        'Milan is the densest hub for design, finance, and startup groups; Bergamo, Brescia, and Como have active local communities, and the lakes and mountains support strong outdoor and sports groups.',
    },
    {
      question: 'Does JoinOrigin operate in Lombardy?',
      answer:
        'Yes. JoinOrigin has no local offices. The Lombardy region page is translated into Italian, and the platform helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
