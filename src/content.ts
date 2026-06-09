// Single source of truth for all site content.
// Components render from this module; nothing here is theme-specific.

export type Link = {
  label: string;
  /** External URL. Omitted for the email entry, which is assembled at runtime. */
  href?: string;
  /** 'email' is special-cased so the address stays out of the static HTML. */
  kind?: 'email';
};

export type JobEntry = {
  company: string;
  title: string;
  location: string;
  dates: string;
  blurbs: string[];
};

export type SchoolEntry = {
  school: string;
  degree: string;
  location: string;
  /** Optional; omitted rather than guessed. */
  year?: string;
};

export type Profile = {
  name: string;
  location: string;
  tagline: string;
  summary: string;
};

export const profile: Profile = {
  name: 'Rahul Krishnan',
  location: 'San Francisco, CA',
  tagline: 'Software Engineer · AI-driven products & platforms',
  summary:
    "I'm a Software Engineer in the SF Bay Area who works on AI-driven products and platforms. I focus on turning unclear problems into systems that are reliable, scalable, and easy for people to use. I've worked on both new products and large existing systems, often in fast-moving or ambiguous environments.",
};

// Email is assembled at runtime to keep it out of the raw HTML for scrapers.
export const emailParts = { user: 'rk2211', domain: 'gmail.com' };

// Order here is the display order. Email is special-cased (obfuscated) by the
// Links component; GitHub sits last.
export const links: Link[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rahul-krishnan' },
  { label: 'Email', kind: 'email' },
  { label: 'GitHub', href: 'https://github.com/Rahul-Krishnan' },
];

export const jobs: JobEntry[] = [
  {
    company: 'Meta',
    title: 'Senior Software Engineer',
    location: 'Menlo Park, CA',
    dates: 'Nov 2024 – Present',
    blurbs: [
      'Early engineer on a greenfield platform for LLM post-training (RLHF), partnering with ML researchers on data annotation and evals for Llama model training across reasoning, coding, vision, and safety.',
      'Built agentic annotation-UI tooling that lets non-engineers spin up new projects on demand, removing engineering as a bottleneck.',
      'Shipped company-wide agent skills for developer productivity: cross-session analysis, context-contradiction detection, and agent/harness tuning.',
      'Built a permissions framework decoupled from legacy systems via a dual-write strategy.',
      'Redesigned the batch and upload workflow, cutting annotation batch setup from hours to minutes.',
    ],
  },
  {
    company: 'Alation',
    title: 'Senior Software Engineer',
    location: 'Redwood City, CA',
    dates: 'Apr 2020 – Nov 2024',
    blurbs: [
      'Built GenAI/LLM features (GPT, Claude) for data-catalog automation with streaming responses, plus XGBoost + Airflow pipelines for object suggestions.',
      'Cut critical ML runtime by 75% and memory by 90% on large datasets through batching and code-efficiency work.',
      'Resolved Elasticsearch bottlenecks and split large requests into component-driven ones, reducing search latency by 25%.',
      'Shipped a permissioned public Search API so customers could integrate Alation search into internal tools and Slack.',
    ],
  },
  {
    company: 'Intrepid Pursuits',
    title: 'Software Engineer',
    location: 'Cambridge, MA',
    dates: 'Sep 2017 – Apr 2020',
    blurbs: [
      'Built full-stack web apps, APIs, and infrastructure supporting iOS and Android products.',
      'Rebuilt authentication with microservices (OAuth via Cognito/Lambda), resolving a recurring outage pattern that had required hourly server restarts.',
      'Rebuilt bulk data imports onto an SQS queue, which stopped jobs from being dropped and roughly halved import time.',
    ],
  },
  {
    company: 'Société Générale',
    title: 'Trader, Vice President',
    location: 'New York, NY',
    dates: 'Jun 2014 – Jun 2015',
    blurbs: [
      'Helped build a new mortgage (Agency CMO) trading desk from inception.',
      'Traded and hedged derivative portfolios with institutional clients.',
    ],
  },
  {
    company: 'Cello Capital Management',
    title: 'Portfolio Manager, Vice President',
    location: 'New York, NY',
    dates: 'Jul 2012 – Jun 2014',
    blurbs: [
      'Co-managed a fixed-income fund through a period of significant AUM and team growth.',
    ],
  },
  {
    company: 'Credit Suisse',
    title: 'Trader, Associate',
    location: 'New York, NY',
    dates: 'Jul 2008 – Jun 2012',
    blurbs: [
      'Traded and hedged mortgage (MBS) derivatives as a market maker.',
      'Part of the syndicate that launched the Synthetic IO (IOS).',
    ],
  },
];

export const schools: SchoolEntry[] = [
  {
    school: 'Columbia University',
    degree: 'B.A., Mathematics & Economics',
    location: 'New York, NY',
    year: 'May 2008',
  },
];

export const skills: string[] = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'LLMs', 'RLHF',
  'Claude Code', 'Codex', 'GraphQL', 'Hack', 'PHP', 'PostgreSQL',
  'Elasticsearch', 'AWS', 'Airflow', 'Django', 'Redux', 'Ruby on Rails',
  'Jest', 'React Testing Library', 'RSpec', 'Git',
];

// The trailing "how I got here" narrative.
export const lifeStory: string[] = [
  'I grew up moving frequently as an expat, so I got comfortable with change and adaptation early. That mix of nervousness and excitement that comes with building a new life somewhere is something I have always enjoyed, and moving between cultures left me quick to embrace things that feel uncomfortable at first.',
  'Before tech, I spent about seven years trading derivatives on Wall Street. It taught me how complex systems behave under real pressure, and how to make decisions with incomplete information.',
  'Then I taught myself to code and changed careers. Since then I have been an early engineer on three greenfield product teams, building and pivoting from scratch.',
  'Outside work, I play in a weekly pickleball league, travel whenever I can (57 countries so far, with the goal of all of them), explore the Bay Area with my wife and our dog, and make time for video games and trivia.',
];
