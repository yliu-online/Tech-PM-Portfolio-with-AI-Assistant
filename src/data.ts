/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const portfolioData = {
  name: "Yang Liu",
  title: "Product Leader | Cloud, LLMs, Generative AI",
  profileImage: "https://i.postimg.cc/fkZqVP4j/head.jpg",
  valueProp: "15+ years of experience building enterprise products and scaling platforms at Google, AWS, and Microsoft. Expert in GenAI solutions, AI agent systems, and cloud infrastructure.",
  stats: [
    { label: "ARR Portfolio", value: "$1.2B+" },
    { label: "0→1 Launches", value: "Multiple" },
    { label: "Efficiency Gain", value: "18%" },
  ],
  about: {
    bio: "I am a Product Leader with deep hands-on expertise in Cloud, LLMs, generative AI, and AI agent systems. I have a proven track record of designing, deploying, and operating end-to-end GenAI solutions that empower code generation, research, and autonomous agents.",
    philosophy: "I combine strong customer empathy with technical depth to lead cross-functional teams on product strategy and successful 0-to-1 launches. I focus on delivering measurable business outcomes through executive influence and team mentoring.",
    industries: ["Cloud Computing", "Generative AI", "Enterprise SaaS", "AI agent systems", "Mobile Platforms"],
  },
  experience: [
    {
      company: "Google (Google Cloud)",
      logo: "https://logo.clearbit.com/google.com",
      role: "Group Product Manager",
      period: "2023 - 2025",
      achievements: [
        "Led AI Workbench platform initiative, delivering productivity tools for developers to generate code and create AI agents.",
        "Delivered an AI-driven agentic recommendation system, achieving a 45%+ improvement in recommendation accuracy.",
        "Launched the Dynamic Workload Scheduler (DWS), enabling autonomous TPU/GPU allocation and improving utilization by 18%.",
        "Owned growth strategy across core Google Compute Engine (GCE) and AI infrastructure supporting a $1.2B+ ARR business."
      ],
      metrics: "Supported $1.2B+ ARR business and improved efficiency by 18%."
    },
    {
      company: "AWS",
      logo: "https://logo.clearbit.com/amazon.com",
      role: "Principal Product Manager - Technical",
      period: "2021 - 2023",
      achievements: [
        "Led ECS Developer 2.0, redesigning APIs and developer tools for 350K+ global developers.",
        "Owned observability product strategy, reducing MTTR by 15% and increasing user satisfaction by 28%.",
        "Expanded AWS edge computing global footprint across Asia, Europe, and Africa for ultra-low-latency workloads.",
        "Launched AWS 5G Partner Automation Program, increasing ISV integrations by 30% and driving 18% incremental revenue."
      ],
      metrics: "Reduced MTTR by 15% and increased partner integrations by 30%."
    },
    {
      company: "T-Mobile",
      logo: "https://logo.clearbit.com/t-mobile.com",
      role: "Principal Product Manager",
      period: "2014 - 2021",
      achievements: [
        "Delivered 0-to-1 products across phone, watch, and automotive, driving 25%+ topline growth.",
        "Spearheaded Enterprise Identity 2.0, unifying SSO, SCIM, and RBAC to streamline authentication.",
        "Launched a privacy-centric mobile ads platform, increasing engagement by 35% and adoption by 25%.",
        "Managed and developed a high-performing team of Product Managers."
      ],
      metrics: "Drove 25%+ topline growth and 35% engagement increase."
    },
    {
      company: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com",
      role: "Senior Product Manager / Product Manager",
      period: "2003 - 2014",
      achievements: [
        "Online Advertising: Led product strategy for ad targeting. Launched Microsoft's first programmatic ad service. Spearheaded a $50M investment partnership and integration with AppNexus.",
        "Mobile Division: Managed the v1 launch of Microsoft Mobile Device Manager (now Intune). Developed the product roadmap and pricing strategy. Led engagements with the Enterprise Customer Advisory Board.",
        "Online Services: Developed product strategy for a secure payment and settlement platform. Delivered solutions supporting global services like Premium MSN, Xbox Live, and AdCenter."
      ],
      metrics: "Launched programmatic ad service and $50M AppNexus partnership."
    },
    {
      company: "Aivance Business Solutions",
      logo: "https://logo.clearbit.com/aivance.io",
      role: "Founder & Principal",
      period: "2020 - Present",
      achievements: [
        "Influenced C-level decisions on portfolio strategies and investment priorities in the AI era.",
        "Created AI-native and cloud-native product strategies and AI frameworks for enterprise clients.",
        "Advised startup leaders on AI-first product strategy, accelerating time-to-market by 20%."
      ],
      metrics: "Accelerated time-to-market by 20% for clients."
    }
  ],
  projects: [
    {
      title: "AI Workbench Platform",
      problem: "Developers and researchers lacked robust productivity tools to efficiently generate code and conduct AI research, leading to fragmented workflows and slow experimentation cycles.",
      solution: "Delivered a unified, enterprise-grade platform for generating code, conducting research, and creating AI agents. Integrated workload profiles, policy controls, and LLM reasoning to provide a seamless developer experience.",
      impact: "Millions of developers served; achieved a 45%+ improvement in recommendation accuracy and significantly accelerated the AI development lifecycle.",
      tags: ["AI Platform", "Developer Tools", "LLMs"],
      imageKeyword: "artificial-intelligence-workbench"
    },
    {
      title: "Dynamic Workload Scheduler (DWS)",
      problem: "High-demand AI infrastructure like TPU/GPU clusters suffered from inefficient allocation, leading to capacity bottlenecks for critical training and inference workloads.",
      solution: "Optimized the end-to-end workload lifecycle by implementing an autonomous scheduling engine that dynamically manages TPU/GPU resources based on real-time demand and priority.",
      impact: "Improved effective infrastructure utilization by 18%; enhanced capacity availability for critical AI workloads and increased customer satisfaction.",
      tags: ["Infrastructure", "Optimization", "Cloud"],
      imageKeyword: "cloud-server-datacenter"
    },
    {
      title: "ECS Developer 2.0",
      problem: "Developers faced significant friction when scaling containerized applications due to fragmented APIs and complex tooling across the AWS ecosystem.",
      solution: "Spearheaded the ECS Developer 2.0 initiative, redesigning core APIs and developer tools to provide a unified, high-performance experience for 350K+ global developers.",
      impact: "Reduced developer friction and increased user satisfaction by 28%; successfully scaled platform-level tools for one of the world's largest container services.",
      tags: ["AWS", "Containers", "Platform Engineering"],
      imageKeyword: "cloud-computing-developer-tools"
    },
    {
      title: "Privacy-Centric Mobile Ads Platform",
      problem: "T-Mobile needed to balance high-growth monetization goals with increasing user demands for data privacy and trust in the mobile ecosystem.",
      solution: "Launched a first-of-its-kind mobile advertising platform built on privacy-by-design principles, ensuring user trust while delivering highly relevant ad experiences.",
      impact: "Drove 35%+ engagement growth and 25%+ advertiser adoption; successfully balanced monetization with user privacy.",
      tags: ["Mobile", "Privacy", "AdTech"],
      imageKeyword: "mobile-privacy-security"
    },
    {
      title: "Microsoft Mobile Device Manager",
      problem: "Enterprises lacked a cohesive, secure way to manage the rapidly growing influx of mobile devices, creating significant security and compliance vulnerabilities.",
      solution: "Led the 0-to-1 product lifecycle for v1 MS MDM (now Intune). Managed market research, developed the roadmap, and led the Enterprise Customer Advisory Board to ensure deep customer obsession.",
      impact: "Developed the global pricing and licensing strategy, and successfully led the worldwide commercial launch, delivering live on-stage demos at industry conferences.",
      tags: ["Enterprise", "GTM Strategy", "0-to-1 Launch"],
      imageKeyword: "workspace"
    },
    {
      title: "AI-First Enterprise Strategy",
      problem: "Enterprise clients struggled to navigate the rapidly evolving AI landscape, often lacking a cohesive strategy for integrating GenAI into their existing product portfolios.",
      solution: "Developed comprehensive AI-native product strategies and frameworks. Advised C-level executives on investment priorities and accelerated time-to-market for AI-first initiatives.",
      impact: "Accelerated time-to-market by 20% for key clients and secured strategic alignment on high-impact AI investments.",
      tags: ["Consulting", "Strategy", "GenAI"],
      imageKeyword: "business-ai-strategy"
    }
  ],
  skills: {
    generativeAI: ["RAG & Fine-tuning", "Context Engineering", "Evaluation Frameworks", "AI Agent Systems", "LLM Reasoning"],
    cloudInfra: ["VM & Accelerator Selection", "Workload Optimization", "Fleet Orchestration", "Distributed Systems", "Observability"],
    leadership: ["0-to-1 Product Launch", "Portfolio Strategy", "Executive Communication", "GTM Strategy", "Mentorship"],
    technical: ["Multi-Modal AI", "Cloud Security", "Enterprise Compliance", "API Design", "Data Pipelines"]
  },
  contact: {
    email: "yangliu.wa.us@gmail.com",
    linkedin: "https://linkedin.com/in/yangliuprofile",
    github: "https://github.com/yliu-online"
  }
};
