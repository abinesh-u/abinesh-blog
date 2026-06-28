export const siteMetadata = {
  name: "Abinesh U",
  title: "About Abinesh U | AI Engineer",
  description:
    "Abinesh U is an AI Engineer specializing in Agentic AI, Multi-Agent Systems, AI Architecture, AI Infrastructure, and Production AI systems.",
  url: "https://abinesh.blog",
  imageUrl: "https://abinesh.blog/assets/about/abinesh-public-profile.png",
  socials: {
    linkedin: "https://www.linkedin.com/in/abineshu/",
    github: "https://github.com/abinesh-u",
    medium: "https://medium.com/@abinesh_ai",
    x: "https://x.com/abinesh_ai",
    youtube: "https://www.youtube.com/@abinesh_ai",
    devto: "https://dev.to/abinesh_ai",
    instagram: "https://www.instagram.com/abinesh_ai",
    googleDev: "https://g.dev/abineshu",
  },
  knowsAbout: [
    "AI Engineering",
    "Agentic AI",
    "Multi-Agent Systems",
    "AI Architecture",
    "AI Infrastructure",
    "Production AI",
    "Context Engineering",
  ],
} as const;

export const socialLinksList = [
  { href: siteMetadata.socials.linkedin, label: "LinkedIn" },
  { href: siteMetadata.socials.github, label: "GitHub" },
  { href: siteMetadata.socials.medium, label: "Medium" },
  { href: siteMetadata.socials.x, label: "X / Twitter" },
  { href: siteMetadata.socials.youtube, label: "YouTube" },
  { href: siteMetadata.socials.devto, label: "Dev.to" },
  { href: siteMetadata.socials.instagram, label: "Instagram" },
  { href: siteMetadata.socials.googleDev, label: "Google Dev" },
] as const;

export const sameAsUrls = [
  siteMetadata.socials.linkedin,
  siteMetadata.socials.github,
  siteMetadata.socials.medium,
  siteMetadata.socials.x,
  siteMetadata.socials.youtube,
  siteMetadata.socials.devto,
  siteMetadata.socials.instagram,
  siteMetadata.socials.googleDev,
] as const;
