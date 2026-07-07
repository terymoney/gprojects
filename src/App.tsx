import { useEffect, useState } from "react";
import logoAsset from "./assets/g-projects-logo.png";
import heroImg from "./assets/hero-architecture.jpg";
import blogBuilditBrainImg from "./assets/blog-buildit-brain.png";
import blogClientPlanningImg from "./assets/blog-client-planning.png";
import blogCompanyUpdateImg from "./assets/blog-company-update.png";
import blogDigitalToolsImg from "./assets/blog-digital-tools.png";
import blogDocumentationImg from "./assets/blog-documentation.png";
import blogProjectManagementImg from "./assets/blog-project-management.png";
import blogWorkforceImg from "./assets/blog-workforce.png";

const PHONE = "+234 816 493 6724";
const PHONE_TEL = "+2348164936724";
const PHONE_HREF = `tel:${PHONE_TEL}`;
const EMAIL = "info@gprojects.ng";
const INSTAGRAM_HANDLE = "@gprojectsng";
const INSTAGRAM_URL = "https://www.instagram.com/gprojectsng?igsh=ajRvNWZlMnBzYjl0";
const LOCATION_URL = "https://maps.apple/p/faNBWs3N7~_xrF";
const BUILD_IT_URL = "https://tanstack-start-app.teryclair-te.workers.dev/initiatives/build-it";
const BUILD_IT_JOB_POOL_URL = "https://build-it-320735813824.us-west1.run.app/";
const APP_BASE = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
const siteHref = (href: string) => {
  if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith("#")) {
    return href;
  }

  if (!href.startsWith("/") || !APP_BASE) {
    return href;
  }

  const [path, fragment] = href.split("#");
  if (path === "/" && !fragment) {
    return `${APP_BASE}/`;
  }

  const routePath = path === "/" ? "/home" : path;
  return `${APP_BASE}/#${routePath}${fragment ? `/${fragment}` : ""}`;
};
const BLOG_ROUTE_ALIASES: Record<string, string> = {
  "/blog/how-digital-tools-are-changing-construction-project-management":
    "/blog/how-digital-tools-are-changing-the-way-construction-projects-are-managed",
};
const projectImageModules = import.meta.glob<string>("./assets/projects/**/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const getProjectImage = (path: string) => projectImageModules[`./assets/projects/${path}`] ?? "";
const getProjectGallery = (folder: string) =>
  Object.entries(projectImageModules)
    .filter(([path]) => path.startsWith(`./assets/projects/${folder}/`))
    .sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))
    .map(([, source]) => source);

const pageImages = {
  about: getProjectImage("stratton-resort-concept/stratton_resort_concept_render_01.jpg"),
  aboutAlt: getProjectImage("g-hotel-concept/g_hotel_concept_render_01.jpg"),
  aboutThird: getProjectImage("banana-island-luxury-condominium/banana_island_luxury_condominium_render_01.jpg"),
  construction: getProjectImage(
    "oxygen-hotel-resort-owerri/oxygen_hotel_resort_construction_scaffolding_06.jpg",
  ),
  hospitalityInterior: getProjectImage("faji-steak-house-owerri/faji_steak_house_dining_bar_view_02.jpg"),
  completedInstitution: getProjectImage("broadoak-schools/broadoak_schools_completed_exterior_01.jpg"),
};

const gprojectsPortfolioProjects = [
  {
    slug: "oxygen-hotel-resort-owerri",
    title: "Oxygen Hotel & Resort",
    location: "Owerri, Imo State",
    year: "2019",
    category: "Hospitality Development",
    categoryGroup: "Hospitality",
    status: "Completed",
    coverImage: getProjectImage(
      "oxygen-hotel-resort-owerri/oxygen_hotel_resort_exterior_dusk_courtyard_02.jpg",
    ),
    services: ["Architecture", "Construction Delivery", "Project Management", "Hospitality Development", "Exterior Finishing"],
    summary:
      "A landmark hospitality development in Owerri featuring resort-style architecture, landscaped courtyards and elegant guest-facing spaces.",
    description:
      "Oxygen Hotel & Resort is a completed hospitality development in Owerri designed and delivered with a resort-style layout, elegant facades, landscaped courtyards, decorative exterior lighting, premium finishes and spacious circulation areas. The project images document the development from active construction and scaffolding works to near-completion and final evening views.",
    highlights: [
      "Completed luxury hotel and resort development",
      "Large accommodation blocks with arched architectural features",
      "Landscaped courtyard and paved outdoor areas",
      "Decorative external lighting and premium facade treatment",
      "Construction-to-completion documentation",
      "Upper-level internal view overlooking the resort courtyard",
    ],
    galleryFolder: "oxygen-hotel-resort-owerri",
    extraGalleryImages: [getProjectImage("luxury-apartments-kebbi/kebbi_luxury_apartments_sculpture_exterior_01.jpg")],
  },
  {
    slug: "faji-steak-house-owerri",
    title: "Faji Steak House",
    location: "Owerri, Imo State",
    year: "2020",
    category: "Hospitality Interior Fit-Out",
    categoryGroup: "Hospitality",
    status: "Completed",
    coverImage: getProjectImage("faji-steak-house-owerri/faji_steak_house_bar_art_wall_05.jpg"),
    services: ["Interior Architecture", "Hospitality Fit-Out", "Bar Design", "Furniture & Finish Selection", "Lighting Coordination"],
    summary:
      "A premium restaurant interior featuring warm lighting, bespoke bar detailing, luxury seating and African-inspired art elements.",
    description:
      "Faji Steak House is a completed hospitality interior project designed with a warm, premium restaurant atmosphere. The space features a custom bar area, timber ceiling details, marble counter surfaces, soft ambient lighting, booth seating, curated furniture and bold African artwork.",
    highlights: [
      "Custom bar and service area",
      "Marble counter surfaces",
      "Warm pendant and ambient lighting",
      "Timber ceiling feature",
      "African-inspired art wall",
      "Booth seating and premium dining layout",
    ],
    galleryFolder: "faji-steak-house-owerri",
  },
  {
    slug: "ahiajoku-convention-centre",
    title: "Ahiajoku Convention Centre Rehabilitation",
    location: "Owerri, Imo State",
    year: "2019",
    category: "Public Infrastructure",
    categoryGroup: "Public Infrastructure",
    status: "Completed",
    coverImage: getProjectImage("ahiajoku-convention-centre/ahiajoku_convention_centre_entrance_sign_01.jpg"),
    services: ["Rehabilitation Works", "Project Management", "External Works", "Public Infrastructure Delivery", "Finishing Works"],
    summary: "Emergency rehabilitation and upgrade of a major public convention centre in Imo State.",
    description:
      "The Ahiajoku Convention Centre Rehabilitation project involved the restoration and upgrade of a major public event facility. The images show completed entrance signage, exterior works, landscaping, project team documentation and an official inspection moment.",
    highlights: [
      "Public infrastructure rehabilitation",
      "Completed entrance and external works",
      "Project team documentation",
      "Official visit or inspection captured",
      "Improved civic event facility",
    ],
    galleryFolder: "ahiajoku-convention-centre",
  },
  {
    slug: "g-hotel-concept",
    title: "G Hotel",
    location: "Nigeria",
    year: "2019",
    category: "Hospitality Concept Design",
    categoryGroup: "Concepts",
    status: "Concept",
    coverImage: getProjectImage("g-hotel-concept/g_hotel_concept_render_01.jpg"),
    services: ["Concept Design", "Hospitality Planning", "Architectural Visualization", "Design Development"],
    summary: "A luxury hotel concept with a curved architectural form, glazed facade and grand arrival experience.",
    description:
      "G Hotel is a hospitality concept design visualized as a contemporary luxury hotel. The render shows a bold curved form, extensive glazing, a central arrival court and a water feature that creates a strong sense of arrival.",
    highlights: ["Curved contemporary building form", "Expansive glazed facade", "Grand arrival court", "Central water feature", "Luxury hospitality concept"],
    galleryFolder: "g-hotel-concept",
  },
  {
    slug: "nnewi-hotel-concept",
    title: "Modern Residential Development",
    location: "Nnewi, Anambra State",
    year: "2019",
    category: "Residential Concept Design",
    categoryGroup: "Concepts",
    status: "Concept",
    coverImage: getProjectImage("nnewi-hotel-concept/nnewi_hotel_concept_render_01.jpg"),
    services: ["Concept Design", "Residential Architecture", "Architectural Visualization", "Exterior Design"],
    summary: "A modern residential concept with a refined arrival court, landscaped frontage and sculptural landmark feature.",
    description:
      "This modern residential concept for Nnewi presents a refined private living development with a strong arrival experience, landscaped frontage, premium drop-off area and a sculptural centerpiece. The design combines contemporary exterior detailing, elegant proportions and a spacious residential layout to create a distinctive luxury home environment.",
    highlights: ["Modern residential exterior concept", "Signature entrance sculpture", "Contemporary facade design", "Arrival court and landscaped frontage", "Premium private living presentation"],
    galleryFolder: "nnewi-hotel-concept",
  },
  {
    slug: "banana-island-luxury-condominium",
    title: "Luxury Condominium Development",
    location: "Banana Island, Lagos",
    year: "2019",
    category: "Residential Concept Design",
    categoryGroup: "Concepts",
    status: "Concept",
    coverImage: getProjectImage(
      "banana-island-luxury-condominium/banana_island_luxury_condominium_render_01.jpg",
    ),
    services: ["Residential Concept Design", "Architectural Visualization", "Luxury Apartment Planning", "Amenity Planning"],
    summary: "A premium condominium concept designed around modern apartment living, poolside leisure and urban comfort.",
    description:
      "The Banana Island Luxury Condominium concept presents a premium residential development with mid-rise apartment blocks, modern balconies, glazed ground-floor spaces and a resort-style swimming pool.",
    highlights: ["Luxury condominium concept", "Mid-rise apartment blocks", "Poolside amenity space", "Modern balconies and clean facade lines", "Premium urban residential environment"],
    galleryFolder: "banana-island-luxury-condominium",
  },
  {
    slug: "broadoak-schools",
    title: "Broadoak Schools",
    location: "Nigeria",
    year: "2019",
    category: "Educational Infrastructure",
    categoryGroup: "Education",
    status: "Completed",
    coverImage: getProjectImage("broadoak-schools/broadoak_schools_completed_exterior_01.jpg"),
    services: ["Educational Architecture", "Construction Delivery", "Institutional Building Development", "Exterior Works"],
    summary: "A modern school facility with a distinctive curved glass facade and multi-storey academic building layout.",
    description:
      "Broadoak Schools is a completed educational facility with a modern institutional facade, multiple floors, a prominent curved glass curtain wall, landscaped frontage and a formal entrance area.",
    highlights: ["Completed school building", "Curved glass facade", "Multi-storey academic facility", "Landscaped frontage", "Modern institutional appearance"],
    galleryFolder: "broadoak-schools",
  },
  {
    slug: "stratton-resort-concept",
    title: "Stratton Resort",
    location: "Central Business District, Abuja",
    year: "2025",
    category: "Hospitality Concept Design",
    categoryGroup: "Concepts",
    status: "Concept",
    coverImage: getProjectImage("stratton-resort-concept/stratton_resort_concept_render_01.jpg"),
    services: ["Concept Design", "Hospitality Architecture", "Resort Planning", "Architectural Visualization"],
    summary: "A contemporary luxury resort concept for Abuja with sweeping forms, landscaped terraces and a water-feature arrival court.",
    description:
      "Stratton Resort is a contemporary hospitality concept designed as a premium resort destination within Abuja's Central Business District. The visualization shows a bold multi-storey building with flowing architectural lines, extensive glazing, landscaped terraces and a prominent fountain feature.",
    highlights: ["Luxury resort concept", "Curved contemporary architecture", "Grand fountain arrival court", "Landscaped terraces", "Extensive glass facade", "Premium hospitality positioning"],
    galleryFolder: "stratton-resort-concept",
  },
  {
    slug: "crunchies-ohafia",
    title: "Crunchies Restaurant",
    location: "Amaekpu Ohafia, Abia State",
    year: "2025",
    category: "Commercial / Restaurant Development",
    categoryGroup: "Commercial",
    status: "Completed",
    coverImage: getProjectImage("crunchies-ohafia/crunchies_ohafia_exterior_01.jpg"),
    services: ["Commercial Architecture", "Restaurant Design", "Exterior Design", "Brand Integration", "Construction Coordination"],
    summary: "A branded Crunchies outlet with a strong red facade, brick exterior finish and customer-facing commercial frontage.",
    description:
      "This Crunchies Restaurant project in Amaekpu Ohafia presents a bold commercial outlet designed around brand visibility and functional restaurant use. The building features a red branded roofline, brick-pattern exterior treatment, promotional window graphics and customer parking.",
    highlights: ["Branded restaurant exterior", "Bold red Crunchies signage", "Brick-pattern facade treatment", "Customer parking frontage", "Integrated promotional window graphics"],
    galleryFolder: "crunchies-ohafia",
  },
  {
    slug: "luxury-residence-akabo-ikeduru",
    title: "Luxury Residential Development",
    location: "Akabo, Ikeduru, Imo State",
    year: "2020",
    category: "Residential Development",
    categoryGroup: "Residential",
    status: "Construction Stage",
    coverImage: getProjectImage(
      "luxury-residence-akabo-ikeduru/akabo_ikeduru_luxury_residence_construction_front_02.jpg",
    ),
    services: ["Architecture", "Construction Supervision", "Residential Development", "Project Coordination"],
    summary: "A large private residential development captured during structural and exterior construction phases.",
    description:
      "This luxury residential development in Akabo, Ikeduru showcases a large-scale private residence progressing through construction. The project images show roofing works, structural framing, blockwork, columns, scaffolding, wide lawn areas and exterior finishing activity.",
    highlights: [
      "Large private residential structure",
      "Visible roofing and structural framing",
      "Scaffolding and active construction works",
      "Spacious lawn and outdoor areas",
      "Multiple views documenting construction progress",
    ],
    galleryFolder: "luxury-residence-akabo-ikeduru",
  },
  {
    slug: "bistro23-crunchies-umuahia",
    title: "Bistro23 x Crunchies",
    location: "Umuahia, Abia State",
    year: "2025",
    category: "Hospitality Interior Fit-Out",
    categoryGroup: "Hospitality",
    status: "Completed",
    coverImage: getProjectImage("bistro23-crunchies-umuahia/bistro23_crunchies_frontage_01.jpg"),
    services: ["Interior Architecture", "Restaurant Fit-Out", "Commercial Space Planning", "Furniture & Finish Selection", "Lighting Design Coordination", "Brand Integration"],
    summary: "A combined Bistro23 and Crunchies hospitality space with a modern frontage and refined cafe-style interior.",
    description:
      "The Bistro23 x Crunchies project in Umuahia combines a branded commercial frontage with a modern hospitality interior. The interior features marble service counters, black and grey seating, warm cove lighting, pendant lights, display counters, privacy screens and a refined cafe-style atmosphere.",
    highlights: ["Combined Crunchies and Bistro23 frontage", "Modern cafe and restaurant interior", "Marble service counters", "Warm ceiling and pendant lighting", "Brand-integrated hospitality design"],
    galleryFolder: "bistro23-crunchies-umuahia",
  },
].map((project) => ({
  ...project,
  href: `/projects#${project.slug}`,
  gallery: [
    ...getProjectGallery(project.galleryFolder),
    ...("extraGalleryImages" in project ? (project.extraGalleryImages ?? []) : []),
  ],
}));

const services = [
  {
    icon: "architecture",
    title: "Architectural Services",
    body: "Vision-led architectural support for projects that require clarity from the earliest concept stage, with planning, design thinking and technical coordination.......",
    href: "/services#architectural-services",
  },
  {
    icon: "construction",
    title: "Civil Construction",
    body: "Disciplined construction delivery for residential, commercial, infrastructure and real-sector projects, with attention to quality, safety and timelines.......",
    href: "/services#civil-construction",
  },
  {
    icon: "management",
    title: "Operations & Project Management",
    body: "End-to-end coordination that keeps work organised from planning to completion, supporting timelines, reporting, supervision and structured delivery.......",
    href: "/services#operations-project-management",
  },
  {
    icon: "finance",
    title: "Finance & Administration",
    body: "Structured financial and administrative support for smoother execution, including budget control, accounting oversight and project documentation.......",
    href: "/services#finance-administration",
  },
  {
    icon: "technology",
    title: "Innovation & Technology",
    body: "Digital systems and BuildIT-powered tools for smarter sourcing, tracking, reporting, documentation, workforce coordination and decision-making.......",
    href: "/services#innovation-technology",
  },
  {
    icon: "contracts",
    title: "Custom / Bespoke & Contracts",
    body: "Flexible project support for unique delivery needs, with tailored engagements, contract support, procurement workflows and bespoke coordination.......",
    href: "/services#custom-bespoke-contracts",
  },
];

const serviceDetails = [
  {
    id: "architectural-services",
    title: "Architectural Services",
    image: blogClientPlanningImg,
    summary:
      "GProjects supports architectural planning for projects that need clarity from the earliest concept stage. This includes vision development, spatial planning, functional design thinking, technical coordination, and design guidance that connects project purpose with practical delivery.",
    detail:
      "The aim is to help clients move from idea to buildable direction with a clearer understanding of space, structure, use, cost, and long-term value.",
    connection: "AI Architect, project documentation, design support.",
  },
  {
    id: "civil-construction",
    title: "Civil Construction",
    image: pageImages.construction,
    summary:
      "GProjects provides disciplined construction delivery across residential, commercial, infrastructure, and real-sector development projects. The focus is on site execution, quality control, safety, materials coordination, workforce alignment, and practical supervision.",
    detail:
      "This service helps clients move from approved plans into structured physical delivery with better control over timelines, site activities, and project standards.",
    connection: "Builders Market, material sourcing, Global Supply Chain.",
  },
  {
    id: "operations-project-management",
    title: "Operations & Project Management",
    image: blogProjectManagementImg,
    summary:
      "GProjects manages project operations from planning to completion, helping clients coordinate people, budgets, timelines, suppliers, documentation, and site progress.",
    detail:
      "This includes project scheduling, supervision, reporting, workforce coordination, quality checks, and delivery oversight so every stage remains visible and organised.",
    connection: "Project Portfolio, timelines, documentation, budget visibility.",
  },
  {
    id: "finance-administration",
    title: "Finance & Administration",
    image: blogDocumentationImg,
    summary:
      "GProjects supports the financial and administrative side of project delivery through budget control, accounting oversight, documentation, procurement records, payment visibility, and structured reporting.",
    detail:
      "This helps projects stay accountable, properly documented, and easier to manage across clients, vendors, teams, and stakeholders.",
    connection: "Project Portfolio, budget tracking, procurement records.",
  },
  {
    id: "innovation-technology",
    title: "Innovation & Technology",
    image: blogBuilditBrainImg,
    summary:
      "GProjects uses digital systems and BuildIT-powered tools to improve how projects are planned, sourced, monitored, documented, and delivered.",
    detail:
      "This is where GProjects becomes more than a traditional construction company - it connects physical project delivery with digital infrastructure.",
    connection: "BuildIT as a whole, AI Architect, Project Portfolio, BIM & Docs.",
  },
  {
    id: "custom-bespoke-contracts",
    title: "Custom / Bespoke & Contracts",
    image: pageImages.completedInstitution,
    summary:
      "GProjects provides flexible project support for clients with unique delivery needs, including custom project structures, procurement workflows, contract support, specialised coordination, professional matching, and tailored delivery models.",
    detail:
      "This service is useful for clients who need a more specific approach than standard architecture or construction support.",
    connection: "Professional Job Pool, sourcing workflows, supplier networks, contract support.",
  },
];

const buildItPillars = [
  {
    title: "Builders Market",
    body: "A connected marketplace for ready-to-build plans, quality materials, and construction essentials, helping simplify sourcing and protected transactions.",
    href: `${BUILD_IT_URL}#builders-market`,
  },
  {
    title: "Project Portfolio",
    body: "A digital workspace for project records, timelines, budgets, documents, and delivery visibility from planning through completion.",
    href: `${BUILD_IT_URL}#project-portfolio`,
  },
  {
    title: "AI Architect",
    body: "An intelligent planning assistant for early design exploration, layout support, BOQ guidance, zoning checks, and smarter build decisions.",
    href: `${BUILD_IT_URL}#ai-architect`,
  },
  {
    title: "Professional Job Pool",
    body: "A workforce system for connecting clients with verified artisans, contractors, builders, project managers, and skilled professionals.",
    href: `${BUILD_IT_JOB_POOL_URL}`,
  },
  {
    title: "Global Supply Chain",
    body: "A sourcing and logistics layer connecting material supply with project needs, delivery visibility, landed costs, and procurement coordination.",
    href: `${BUILD_IT_URL}#global-supply-chain`,
  },
  {
    title: "Real Estate & REITs",
    body: "A property and investment pathway for real estate opportunities, fractional participation, funding models, and long-term asset value.",
    href: `${BUILD_IT_URL}#real-estate-reits`,
  },
];

const whyGProjects = [
  {
    icon: "delivery",
    title: "Structured Delivery",
    body: "From early planning to execution, GProjects organises each stage of a project with clear coordination, timelines, supervision, and delivery oversight.",
  },
  {
    icon: "digital",
    title: "Physical + Digital Capacity",
    body: "GProjects combines on-site project execution with BuildIT-powered systems for smarter sourcing, tracking, documentation, and project visibility.",
  },
  {
    icon: "workforce",
    title: "Workforce & Procurement Access",
    body: "Through its project network and BuildIT's Professional Job Pool, GProjects connects clients to skilled workers, suppliers, and project teams.",
  },
  {
    icon: "guidance",
    title: "End-to-End Project Guidance",
    body: "From concept to handover, GProjects supports planning, budgeting, procurement visibility, workforce alignment, quality control, and practical delivery guidance.",
  },
];

const workforceCategories = [
  "Job Seekers",
  "NYSC Corps Members",
  "Artisans",
  "Handymen",
  "Skilled Workers",
  "Unskilled Workers",
  "Project Managers",
  "Construction Professionals",
];

const workforceGroups = [
  {
    title: "Job Seekers",
    body: "For individuals looking for project-based work, entry-level opportunities, or career exposure in construction, real estate, project management, and related services.",
  },
  {
    title: "NYSC Corps Members",
    body: "For Corps Members interested in practical experience, project exposure, administrative support, field coordination, or BuildIT-related opportunities.",
  },
  {
    title: "Artisans",
    body: "For skilled trade workers such as carpenters, plumbers, electricians, painters, tilers, welders, masons, and other hands-on professionals.",
  },
  {
    title: "Handymen",
    body: "For people who support maintenance, repairs, small works, site assistance, installations, and general technical support.",
  },
  {
    title: "Skilled Workers",
    body: "For trained workers with specific technical abilities needed across construction, operations, maintenance, procurement, and site delivery.",
  },
  {
    title: "Unskilled Workers",
    body: "For individuals available for general labour, site support, logistics assistance, cleaning, basic field tasks, and supervised construction work.",
  },
  {
    title: "Project Managers",
    body: "For professionals who coordinate timelines, teams, budgets, procurement, documentation, reporting, and delivery supervision.",
  },
  {
    title: "Construction Professionals",
    body: "For architects, engineers, quantity surveyors, contractors, site supervisors, planners, procurement specialists, and built-environment professionals.",
  },
];

const workforceBenefits = [
  {
    title: "Better Visibility",
    body: "Become easier to discover for project-related opportunities within the GProjects and BuildIT ecosystem.",
  },
  {
    title: "Project Readiness",
    body: "Submit your skills, experience, location, and availability so project teams can understand where you fit.",
  },
  {
    title: "Structured Matching",
    body: "Support future matching between workers, professionals, suppliers, and project needs.",
  },
  {
    title: "BuildIT Connection",
    body: "Gain a pathway into BuildIT's Professional Job Pool, where workforce visibility can be better organised.",
  },
  {
    title: "Real-Sector Exposure",
    body: "Connect your skillset to construction, infrastructure, real estate, maintenance, and project delivery opportunities.",
  },
];

const workforceSteps = [
  {
    title: "Submit Your Details",
    body: "Share your name, contact information, location, skill category, experience level, and availability.",
  },
  {
    title: "Get Organised in the Network",
    body: "Your information is reviewed and grouped based on your skill area, role, location, and project relevance.",
  },
  {
    title: "Connect Through GProjects and BuildIT",
    body: "Relevant profiles can be considered for GProjects opportunities and BuildIT's Professional Job Pool.",
  },
  {
    title: "Match With Future Project Needs",
    body: "As projects, maintenance requests, construction opportunities, and workforce needs become available, suitable profiles can be contacted.",
  },
];

const workforceFaqs = [
  {
    question: "Does joining guarantee a job?",
    answer: "No. Joining the network does not guarantee immediate employment. It helps GProjects understand your skills and keep your profile visible for relevant opportunities.",
  },
  {
    question: "Who can register?",
    answer: "Job seekers, NYSC Corps Members, artisans, handymen, skilled workers, unskilled workers, project managers, construction professionals, and people interested in project-based work can register.",
  },
  {
    question: "Is this only for construction workers?",
    answer: "No. Construction is a major focus, but GProjects also needs people in project management, administration, procurement, documentation, maintenance, technology, and support roles.",
  },
  {
    question: "How does BuildIT connect to this?",
    answer: "BuildIT's Professional Job Pool is the digital layer that helps organise and connect workforce profiles to project opportunities.",
  },
  {
    question: "Can NYSC Corps Members apply?",
    answer: "Yes. NYSC Corps Members interested in field exposure, administration, project support, digital systems, or construction-related opportunities can register interest.",
  },
];

const blogItems = [
  {
    title: "What Clients Should Know Before Starting a Construction Project",
    category: "Client Guide",
    type: "Blog Article",
    date: "January 23, 2026",
    image: blogClientPlanningImg,
    href: "/blog/what-clients-should-know-before-starting-a-construction-project",
    excerpt:
      "A successful construction project does not begin on site. It begins with planning, documentation, budgeting, approvals, material decisions, and the right project team.",
    preview:
      "Before starting a construction project, clients need more than land and funds. They need a clear plan, proper architectural direction, realistic budgeting, material planning, the right professionals, and a delivery structure that can guide the project from idea to completion.\n\nMany project challenges begin when clients rush into construction without understanding the full process. From approvals and drawings to procurement, site supervision, documentation, and workforce coordination, each stage affects the quality, cost, and timeline of the project.\n\nGProjects supports clients by helping structure these early decisions, ensuring that projects begin with clarity and move forward with better control.",
  },
  {
    title: "Why Project Management Matters Before Construction Begins",
    category: "Project Management",
    type: "Blog Article",
    date: "February 5, 2026",
    image: blogProjectManagementImg,
    href: "/blog/why-project-management-matters-before-construction-begins",
    excerpt:
      "Many construction delays begin before the first block is laid. Without proper project management, even a good design can suffer from poor coordination, unclear timelines, weak budgeting, and site confusion.",
    preview:
      "Project management is not something that should begin after construction starts. It should begin from the planning stage, where timelines, budgets, teams, materials, documentation, and responsibilities are properly organised.\n\nWithout project management, clients may face delayed materials, unclear communication, uncoordinated workers, budget surprises, and poor site reporting. A project manager helps connect the client, architect, contractor, suppliers, artisans, and site team into one structured process.\n\nFor GProjects, project management is a core part of delivery. It ensures that every stage of a project is guided, monitored, and aligned with the client's goals.",
  },
  {
    title: "The Importance of Documentation in Real Estate and Construction Projects",
    category: "Construction Knowledge",
    type: "Blog Article",
    date: "March 18, 2026",
    image: blogDocumentationImg,
    href: "/blog/importance-of-documentation-in-real-estate-and-construction-projects",
    excerpt:
      "A construction project without documentation is difficult to track, defend, value, or manage. Proper records help clients understand what was planned, what was spent, what was delivered, and what still needs attention.",
    preview:
      "Documentation is one of the most important parts of any serious construction or real estate project. Drawings, approvals, budgets, receipts, contracts, site reports, progress updates, and payment records all help protect the client and support better decision-making.\n\nWhen documentation is weak, it becomes difficult to track costs, confirm work done, resolve disputes, maintain the property, or understand the real value of the project.\n\nThrough structured project management and BuildIT-powered systems, GProjects supports better visibility, record keeping, and project organisation from planning to delivery.",
  },
  {
    title: "What if Every Project Had a Brain? Inside the BuildIT Ecosystem",
    category: "BuildIT Insights",
    type: "Featured Link",
    date: "April 9, 2026",
    image: blogBuilditBrainImg,
    href: BUILD_IT_URL,
    external: true,
    excerpt:
      "BuildIT is designed as a connected construction and real estate ecosystem, bringing together project planning, material sourcing, workforce access, documentation, and digital project visibility in one smarter delivery system.",
    preview:
      "BuildIT represents GProjects' digital approach to construction, real estate, workforce coordination, and project delivery. It is built around the idea that projects should not be managed blindly. They should have structure, visibility, records, sourcing support, and access to the right people.",
  },
  {
    title: "How Digital Tools Are Changing the Way Construction Projects Are Managed",
    category: "BuildIT Insights",
    type: "Blog Article",
    date: "May 21, 2026",
    image: blogDigitalToolsImg,
    href: "/blog/how-digital-tools-are-changing-the-way-construction-projects-are-managed",
    excerpt:
      "Construction is becoming more connected. Digital tools now make it easier for clients, project managers, suppliers, and workers to track progress, manage records, source materials, and make better decisions.",
    preview:
      "Construction has traditionally depended heavily on manual coordination, scattered communication, and physical site supervision. While these remain important, digital tools are changing how projects are planned, tracked, documented, and delivered.\n\nWith better digital systems, clients can gain more visibility into progress, budgets, materials, workforce needs, and project records. Project managers can coordinate teams more effectively, while suppliers and workers can become easier to organise.\n\nBuildIT supports this shift by connecting construction planning, material sourcing, project visibility, workforce coordination, and real estate opportunities into one ecosystem.",
  },
  {
    title: "GProjects Limited Introduces a Structured Approach to Real-Sector Project Delivery",
    category: "Company Update",
    type: "Featured Link",
    date: "June 14, 2026",
    image: blogCompanyUpdateImg,
    href: "/services",
    excerpt:
      "GProjects Limited is positioning itself as a structured project delivery company focused on architecture, construction, project management, workforce coordination, and digital support for real-sector development.",
    preview:
      "GProjects Limited was created to move real-sector ideas from vision into organised execution. The company operates across architecture, construction, project management, technology, workforce coordination, procurement support, and enterprise delivery.",
  },
  {
    title: "GProjects Opens Workforce Interest for Artisans, NYSC Corps Members and Project Professionals",
    category: "Workforce Opportunities",
    type: "Featured Link",
    date: "July 6, 2026",
    image: blogWorkforceImg,
    href: "/workforce",
    excerpt:
      "GProjects is building a workforce network for people interested in construction, project delivery, site support, maintenance, technical services, and professional project roles.",
    preview:
      "GProjects welcomes job seekers, NYSC Corps Members, artisans, handymen, skilled and unskilled workers, project managers, and construction professionals into a growing workforce network.",
  },
];

const blogArticleDetails: Record<
  string,
  {
    intro: string[];
    sections: Array<{
      title: string;
      body: string[];
      list?: string[];
      note?: string;
    }>;
    tip?: {
      title: string;
      body: string;
    };
    cta?: {
      title: string;
      body: string;
      primaryLabel?: string;
      primaryHref?: string;
      primaryExternal?: boolean;
      secondaryLabel?: string;
      secondaryHref?: string;
    };
    sources?: Array<{
      label: string;
      href: string;
    }>;
  }
> = {
  "/blog/what-clients-should-know-before-starting-a-construction-project": {
    intro: [
      "Starting a construction project is exciting. For many clients, it represents years of planning, investment, savings, business growth, family expansion, or long-term real estate ambition. But one of the biggest mistakes clients make is assuming that a project begins when workers arrive on site.",
      "In reality, a successful construction project begins long before the first block is laid. It begins with clarity about the land, the design, the budget, approvals, materials, and the people who will manage and execute the work.",
      "Without this early structure, even a promising project can quickly become stressful, expensive, delayed, or poorly coordinated. That is why clients need to understand the key things that should be in place before construction begins.",
    ],
    tip: {
      title: "GProjects Tip",
      body: "Do not begin construction with only a rough idea and a budget guess. Start with clear drawings, documented requirements, approval checks, procurement planning, and a project delivery structure.",
    },
    sections: [
      {
        title: "1. Start with a clear project vision",
        body: [
          "Before drawings, materials, and contractors come in, the client must be clear about what the project is meant to achieve.",
          "A residential project, commercial building, estate development, renovation, hospitality project, or mixed-use development will not all require the same approach. Each project type comes with different space needs, budget expectations, timeline pressures, approval requirements, and long-term value considerations.",
          "These questions help shape the project direction before money is spent carelessly. At GProjects, this early stage is treated as part of the delivery process because a weak beginning often affects everything that follows.",
        ],
        list: [
          "What exactly do I want to build?",
          "Who will use the building?",
          "What problem should the project solve?",
          "What is the expected budget range?",
          "What level of quality do I want?",
          "Is this project for personal use, rental, sale, business, or investment?",
        ],
      },
      {
        title: "2. Confirm land, title, zoning, and approval requirements",
        body: [
          "One of the first things a client should check is whether the land is suitable and properly documented for the intended project.",
          "In Nigeria, development permission processes often involve confirming land use, zoning, development control requirements, land status, survey information, and title documents. Some approval processes may require title documents, survey plans, architectural and engineering drawings, site photographs, tax documents, and other supporting reports depending on the state and project type.",
          "This is important because a project can face delays, redesigns, penalties, or even demolition risk if approvals and land-use requirements are ignored.",
        ],
        list: [
          "Is the land properly documented?",
          "Is the land suitable for the type of project?",
          "Are there planning or zoning restrictions?",
          "What approvals are required?",
          "Are the drawings prepared according to required standards?",
          "Has a qualified professional reviewed the project direction?",
        ],
        note: "Requirements vary by location, so clients should always confirm with the relevant authority before building.",
      },
      {
        title: "3. Do not begin without proper design direction",
        body: [
          "A project should not be built from assumptions, verbal descriptions, or rough sketches alone.",
          "Architectural planning gives the project structure. It helps define the spaces, circulation, room sizes, function, appearance, ventilation, lighting, and overall experience of the building. Technical drawings also help other professionals understand how the project should be executed.",
          "Good design is not only about beauty. It affects cost, comfort, durability, safety, maintenance, and future value.",
        ],
        list: [
          "The layout and spatial arrangement",
          "The look and feel of the building",
          "The relationship between design and budget",
          "The project's buildability",
          "Material choices",
          "Future maintenance needs",
          "Possible construction challenges",
        ],
      },
      {
        title: "4. Build a realistic budget, not just a wish list",
        body: [
          "Many clients start construction with a rough amount in mind, but construction budgeting needs more than guessing.",
          "A proper project budget should consider design, approvals, materials, labour, equipment, supervision, logistics, professional fees, documentation, contingencies, and possible price changes.",
          "A realistic budget helps the client make better decisions early. It also reduces abandoned projects, rushed compromises, and poor-quality substitutions.",
        ],
        list: [
          "Design and professional fees",
          "Approval and documentation costs",
          "Materials",
          "Labour",
          "Equipment and tools",
          "Site preparation",
          "Logistics and transportation",
          "Supervision and project management",
          "Contingency for unexpected costs",
          "Finishing and handover needs",
        ],
      },
      {
        title: "5. Plan procurement before site pressure begins",
        body: [
          "Procurement simply means how materials, supplies, equipment, and services will be sourced for the project.",
          "Poor procurement is one of the quiet causes of construction delays. If materials are unavailable, overpriced, wrongly specified, delayed, or purchased without quality checks, the entire project can suffer.",
          "Clients should not wait until workers are idle on site before looking for materials. Procurement should be planned early so that material needs, supplier options, quality expectations, delivery timelines, and cost implications are understood.",
        ],
        list: [
          "What materials are needed?",
          "Which materials are urgent?",
          "Who is supplying them?",
          "Are the materials genuine and suitable?",
          "What is the delivery timeline?",
          "Can prices change before purchase?",
          "How will purchases be recorded?",
          "Who approves substitutions?",
        ],
      },
      {
        title: "6. Choose the right team before work begins",
        body: [
          "A construction project is only as strong as the team behind it.",
          "The client may need an architect, engineer, quantity surveyor, project manager, contractor, site supervisor, artisans, suppliers, handymen, administrative support, and other professionals depending on the project scale.",
          "A good team does not only work. A good team communicates, documents, coordinates, solves problems, and protects the project's long-term value.",
        ],
        list: [
          "Experience",
          "Reliability",
          "Professional discipline",
          "Communication style",
          "Past work",
          "Ability to follow drawings",
          "Ability to document work",
          "Availability",
          "Accountability",
          "Understanding of the project goals",
        ],
      },
      {
        title: "7. Put project management in place from the beginning",
        body: [
          "Project management should not start after problems appear. It should begin before construction starts.",
          "A project manager helps connect the different moving parts of the project: client expectations, design direction, budget, timelines, procurement, site work, labour, reporting, documentation, and quality control.",
          "For GProjects, project management is not just supervision. It is a system for making delivery more organised, visible, and accountable.",
        ],
        list: [
          "What should happen first?",
          "Who is responsible for each task?",
          "What is the timeline?",
          "What materials are needed next?",
          "What has been completed?",
          "What has been paid for?",
          "What has changed?",
          "What needs approval?",
          "What risks are emerging?",
        ],
      },
      {
        title: "8. Treat documentation as protection",
        body: [
          "Documentation is one of the most overlooked parts of construction, especially on smaller projects. But proper records protect the client.",
          "A client should keep clear records of drawings, approvals, contracts, payment receipts, material purchases, site reports, photographs, change requests, supplier details, warranties, and handover information.",
          "This is one of the reasons BuildIT is important within the GProjects ecosystem. BuildIT's Project Portfolio concept supports the idea that project information should be easier to organise, store, track, and review.",
        ],
        list: [
          "Disputes",
          "Future maintenance",
          "Property valuation",
          "Resale",
          "Renovation",
          "Insurance",
          "Project review",
          "Investment reporting",
        ],
      },
      {
        title: "9. Think beyond construction and consider long-term value",
        body: [
          "A building project should not only be judged by how quickly it is completed. Clients should also think about long-term value.",
          "A good project should consider durability, maintenance, energy use, functionality, safety, resale value, rental appeal, user comfort, and future expansion.",
          "Sometimes, the cheapest decision during construction becomes the most expensive decision after handover.",
        ],
        list: [
          "Will this building be easy to maintain?",
          "Are the materials suitable for the environment?",
          "Will the layout remain useful in future?",
          "Can the project support long-term value?",
          "Are we building for today only, or for future use too?",
        ],
      },
      {
        title: "10. Work with a structured delivery partner",
        body: [
          "Construction involves many moving parts. A client may have the vision and the funding, but still need the right structure to bring the project to life.",
          "GProjects supports clients across architecture, construction, project management, procurement coordination, workforce alignment, documentation, and BuildIT-powered digital systems.",
          "Rather than treating construction as scattered activities, GProjects approaches project delivery as a connected process. From the first conversation to planning, sourcing, site coordination, reporting, and handover, the focus is simple: turn vision into structured delivery.",
        ],
      },
      {
        title: "Conclusion",
        body: [
          "Before starting a construction project, clients should slow down enough to plan properly.",
          "The strongest projects are not built by rushing to site. They are built by preparing well, asking the right questions, choosing the right team, documenting decisions, managing costs, and creating a clear delivery structure.",
          "A successful project begins before construction begins. With the right planning, the right people, and the right systems, clients can move from vision to execution with far more confidence.",
        ],
      },
    ],
    cta: {
      title: "Planning a construction or real estate project?",
      body: "Speak with GProjects about architecture, project management, procurement support, workforce coordination, and structured delivery.",
    },
    sources: [
      {
        label: "DLA Piper REALWORLD - Permission for new construction or designated use in Nigeria",
        href: "https://www.dlapiperrealworld.com/law/index.html?c=NG&s=obtaining-permission-for-development&t=zoning",
      },
      {
        label: "RICS - QS and construction practice guidance",
        href: "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/construction-standards/black-book",
      },
    ],
  },
  "/blog/why-project-management-matters-before-construction-begins": {
    intro: [
      "Many construction delays begin before the first block is laid. Without proper project management, even a good design can suffer from poor coordination, unclear timelines, weak budgeting, and site confusion.",
      "For many clients, project management sounds like something that happens after construction begins. They imagine it as someone visiting site, checking workers, giving instructions, and confirming progress. While those things are part of it, proper project management starts much earlier.",
      "It begins before the workers arrive, before materials are ordered, before money starts leaving the client's account, and before site confusion becomes expensive.",
      "A construction project is not just a physical activity. It is a coordinated process involving design, cost, time, labour, procurement, approvals, quality control, communication, documentation, and decision-making. Project management is the structure that connects the client's vision to actual delivery.",
    ],
    tip: {
      title: "GProjects Tip",
      body: "Do not wait until construction begins before thinking about project management. The best time to organise the scope, budget, timeline, procurement plan, workforce, communication structure, and documentation process is before the first block is laid.",
    },
    sections: [
      {
        title: "1. Project management gives the project clear direction",
        body: [
          "Every project needs a defined direction before construction begins.",
          "A client may know what they want to build, but that does not automatically mean the project is ready for execution. The vision must be translated into scope, drawings, budget expectations, timelines, responsibilities, procurement plans, and delivery steps.",
          "The Project Management Institute describes project management as the application of knowledge, skills, tools, and techniques to meet project requirements, including defining scope, identifying deliverables, managing risks, and communicating effectively across teams.",
          "Without these answers, the project may begin with assumptions instead of structure.",
        ],
        list: [
          "What exactly are we building?",
          "What is included in the project scope?",
          "What is not included?",
          "What drawings and approvals are needed?",
          "What is the expected timeline?",
          "What budget range are we working with?",
          "Who is responsible for each stage?",
          "How will progress be reported?",
          "How will changes be approved?",
        ],
      },
      {
        title: "2. It helps define the project scope before confusion begins",
        body: [
          "One of the biggest causes of construction stress is unclear scope.",
          "A client may say they want a duplex, an office building, a renovation, or an estate project. But those descriptions are not enough. The scope must explain what the project actually includes.",
          "When scope is weak, people interpret the project differently. The client may expect one thing, the contractor may price another thing, artisans may execute based on assumptions, and the project manager may struggle to control what was never clearly defined.",
          "Good project management reduces this confusion by making the project clearer before work begins.",
        ],
        list: [
          "Building type",
          "Number of floors",
          "Key spaces and functions",
          "Expected quality level",
          "Design deliverables",
          "Structural and service requirements",
          "Finishing expectations",
          "Site preparation needs",
          "Procurement responsibilities",
          "Professional roles",
          "Timeline assumptions",
          "Handover expectations",
        ],
        note: "Scope management helps divide a project into manageable work packages and gives a common framework for scope, cost, schedule, communication, responsibility, monitoring, and management.",
      },
      {
        title: "3. It connects design decisions to budget realities",
        body: [
          "A beautiful design is not enough if it is disconnected from the client's budget.",
          "Before construction starts, project management helps connect the design vision with financial planning. This does not mean reducing quality unnecessarily. It means making sure the client understands how design choices affect cost, procurement, labour, timeline, and long-term maintenance.",
          "Without early budget coordination, a client may approve a design that becomes difficult to fund or complete properly.",
          "This is where GProjects' approach becomes important. The company does not treat design, construction, budgeting, procurement, and management as separate conversations. They are connected parts of one delivery process.",
        ],
        list: [
          "Large glass areas may affect cost and heat control.",
          "Complex roof forms may increase labour and material needs.",
          "Imported finishes may affect procurement timelines.",
          "Basement or elevated structures may increase structural cost.",
          "Luxury finishes may require different artisans and supervision.",
          "Poor space planning may create waste during execution.",
          "Can this design be delivered within the expected budget?",
          "What parts of the design may increase cost?",
          "What materials need early pricing?",
          "Where should the client prioritise quality?",
        ],
      },
      {
        title: "4. It creates a realistic timeline before site pressure starts",
        body: [
          "Many clients underestimate how long construction takes.",
          "They may only think about the physical building stage, forgetting that a project timeline can include design development, approvals, costing, procurement, mobilisation, structural work, services, finishing, inspections, corrections, and handover.",
          "Construction projects often suffer when timelines are guessed instead of planned. McKinsey has noted that large construction projects across asset classes can take 20% longer than scheduled and run up to 80% over budget, showing how serious schedule and cost control can become when projects are not properly managed.",
          "Not every GProjects client project will be a mega project, but the lesson is still useful: poor planning affects time and cost at every scale. Project management helps create a timeline that is not only ambitious, but also realistic.",
        ],
        list: [
          "Pre-construction planning",
          "Design and technical drawings",
          "Approval checks",
          "Budget review",
          "Procurement planning",
          "Site preparation",
          "Foundation work",
          "Structural stages",
          "Mechanical, electrical, and plumbing coordination",
          "Finishing stages",
          "Quality checks",
          "Handover",
        ],
      },
      {
        title: "5. It helps plan procurement before materials delay the work",
        body: [
          "Procurement is one of the areas where weak planning causes major problems.",
          "If materials are not planned early, the project can suffer from delays, rushed purchases, poor-quality substitutions, wrong specifications, and unexpected cost increases.",
          "If procurement is ignored until the last minute, workers may be ready but materials may not be available. Or materials may arrive without proper verification. Or the client may be forced to buy quickly at a higher price.",
          "Good project management treats procurement as part of the project plan, not an emergency activity. This connects naturally to BuildIT's Builders Market and Global Supply Chain direction, where sourcing, materials, suppliers, and project needs can become more organised within the wider GProjects ecosystem.",
        ],
        list: [
          "What materials are needed",
          "When they are needed",
          "Which materials are long-lead items",
          "Who is responsible for sourcing",
          "How prices will be compared",
          "How quality will be checked",
          "How deliveries will be recorded",
          "Who approves material substitutions",
          "How procurement affects the project timeline",
        ],
      },
      {
        title: "6. It coordinates the right people before they are needed",
        body: [
          "Construction requires many people, and each person affects the success of the project.",
          "Without coordination, these people may work in isolation. The architect may not know what the contractor is changing. The supplier may not understand the urgency of delivery. The site supervisor may not have updated drawings. The client may be receiving information from too many directions.",
          "Project management creates a communication structure.",
          "This is especially important for GProjects because workforce coordination is part of the company's larger delivery model. Through BuildIT's Professional Job Pool, the long-term goal is to make artisans, workers, project managers, and construction professionals easier to organise and connect to project needs.",
        ],
        list: [
          "Architects",
          "Engineers",
          "Quantity surveyors",
          "Project managers",
          "Contractors",
          "Site supervisors",
          "Artisans",
          "Handymen",
          "Skilled workers",
          "Unskilled workers",
          "Suppliers",
          "Procurement support",
          "Administrative support",
          "Maintenance professionals",
          "Who reports to whom",
          "Who approves decisions",
          "Who manages site updates",
          "Who keeps records",
          "Who checks quality",
        ],
      },
      {
        title: "7. It reduces communication gaps between the client and the site",
        body: [
          "A project can fail even when everyone involved is hardworking. The problem is often communication.",
          "The client may give an instruction verbally. The contractor may interpret it differently. The artisan may execute based on old information. The supplier may deliver a different specification. The project manager may not be copied early enough. The budget may change without proper approval.",
          "These small communication gaps can become expensive.",
          "Project management helps create a communication system where decisions are recorded, responsibilities are clear, and updates are shared properly. The purpose is not to make the project complicated. The purpose is to prevent confusion.",
        ],
        list: [
          "Meeting notes",
          "Progress reports",
          "Site instructions",
          "Procurement updates",
          "Budget summaries",
          "Photo records",
          "Approval logs",
          "Change records",
          "Issue trackers",
          "Handover notes",
        ],
      },
      {
        title: "8. It controls changes before they damage the budget",
        body: [
          "Almost every construction project experiences changes.",
          "A client may adjust a room size. A material may become unavailable. A design detail may need correction. A site condition may require a new approach. A cost may change. A finishing preference may evolve.",
          "Changes are not always bad. But unmanaged changes are dangerous.",
          "This is why change records, variation approvals, updated drawings, and documented instructions matter. They protect both the client and the project team.",
        ],
        list: [
          "What is changing?",
          "Why is it changing?",
          "Who requested it?",
          "What will it cost?",
          "Will it affect the timeline?",
          "Will it affect quality?",
          "Does it need new drawings?",
          "Who has approved it?",
          "Has it been documented?",
        ],
      },
      {
        title: "9. It helps identify risks before they become emergencies",
        body: [
          "Every construction project has risks. Some are financial. Some are technical. Some are related to approvals. Some involve materials. Some involve weather, labour, site access, design errors, poor communication, or delayed decisions.",
          "Project management helps identify these risks early.",
          "A risk does not always mean something bad will happen. It simply means there is something that could affect the project if it is not monitored.",
          "For GProjects, this supports one of the company's core beliefs: better structure before construction leads to better delivery during construction.",
        ],
        list: [
          "Unclear scope",
          "Weak budget planning",
          "Incomplete drawings",
          "Approval delays",
          "Poor supplier coordination",
          "Labour shortages",
          "Material price changes",
          "Quality issues",
          "Unsafe site conditions",
          "Poor documentation",
          "Client decision delays",
        ],
        note: "Front-end planning links project need with strategy, scope, cost, and schedule before execution begins. Better planning can improve cost performance, reduce schedules, reduce project changes, and lower the chance of major project problems.",
      },
      {
        title: "10. It makes site work more organised from day one",
        body: [
          "The first day on site should not feel like confusion.",
          "By the time work begins, the project should already have a clear direction. The team should understand what is being built, what stage comes first, what drawings apply, what materials are needed, who is supervising, and how updates will be reported.",
          "When these things are not ready, construction starts with disorder. When they are ready, the project begins with confidence.",
        ],
        list: [
          "Approved or working drawings",
          "Site access",
          "Work sequence",
          "Labour requirements",
          "Material needs",
          "Safety expectations",
          "Procurement responsibilities",
          "Communication channels",
          "Reporting format",
          "Budget control method",
          "Documentation process",
        ],
      },
      {
        title: "The GProjects approach to project management",
        body: [
          "At GProjects, project management is not treated as a side activity. It is part of structured delivery.",
          "This matters because real-sector projects need more than workers and materials. They need a delivery structure that keeps the client, team, budget, documents, suppliers, and site activities aligned.",
          "GProjects helps clients move from idea to execution by creating clearer systems around how projects are planned, coordinated, monitored, and delivered.",
          "The goal is simple: reduce confusion, improve accountability, support better decisions, and keep the project moving with structure.",
        ],
        list: [
          "Architecture",
          "Construction",
          "Operations",
          "Procurement",
          "Budget visibility",
          "Documentation",
          "Workforce coordination",
          "Quality control",
          "BuildIT-powered project systems",
        ],
      },
      {
        title: "Conclusion",
        body: [
          "Project management matters before construction begins because many construction problems start early.",
          "They start with unclear scope, unrealistic budgets, weak timelines, poor procurement planning, uncoordinated teams, missing documentation, uncontrolled changes, and poor communication.",
          "By the time these issues appear on site, they are already more expensive to fix.",
          "A well-managed project begins with structure. It gives the client clarity, gives the team direction, and gives the project a better chance of moving from vision to delivery without unnecessary confusion.",
          "For clients planning to build, renovate, develop, or manage real estate projects, project management is not an extra luxury. It is one of the foundations of successful delivery.",
        ],
      },
    ],
    cta: {
      title: "Planning a construction or real estate project?",
      body: "Speak with GProjects about project management, site coordination, procurement support, documentation, workforce alignment, and structured project delivery.",
    },
    sources: [
      {
        label: "Project Management Institute - What Is Project Management",
        href: "https://www.pmi.org/about/what-is-project-management",
      },
      {
        label: "Project Management Institute - Scope Management",
        href: "https://www.pmi.org/learning/library/scope-management-9099",
      },
      {
        label: "McKinsey & Company - Imagining construction's digital future",
        href: "https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future",
      },
      {
        label: "Construction Industry Institute - Front End Planning",
        href: "https://www.construction-institute.org/front-end-planning",
      },
    ],
  },
  "/blog/how-digital-tools-are-changing-the-way-construction-projects-are-managed": {
    intro: [
      "Construction is becoming more connected. Digital tools now make it easier for clients, project managers, suppliers, and workers to track progress, manage records, source materials, and make better decisions.",
      "For a long time, many construction projects were managed through scattered calls, paper files, verbal instructions, WhatsApp messages, handwritten records, loose receipts, and physical site visits. These methods may still be useful in daily communication, but they are not enough for projects that need structure, transparency, documentation, and better control.",
      "A construction project is not only about cement, blocks, steel, labour, and finishing. It is also about information. The client needs to know what has been done. The project manager needs to know what is next. The supplier needs to know what materials are needed and when. The worker needs clear instructions. The site team needs updated drawings. The project owner needs records that can be reviewed, valued, defended, and handed over.",
      "This is where digital tools are changing construction management. They help turn scattered project activity into a more organised system.",
      "For GProjects, this shift is strongly connected to BuildIT, the company's digital construction and real-estate ecosystem designed to support project planning, sourcing, documentation, workforce visibility, project tracking, and smarter delivery.",
      "BuildIT does not replace the physical work of construction. Instead, it supports the people, processes, materials, documents, and decisions that make construction successful.",
    ],
    tip: {
      title: "GProjects Tip",
      body: "Digital tools should not replace proper construction experience. They should support it. The best results come when strong project management, skilled people, quality materials, proper documentation, and BuildIT-powered systems work together.",
    },
    sections: [
      {
        title: "1. Construction now needs more visibility",
        body: [
          "One of the biggest challenges in construction is lack of visibility.",
          "A client may not always know what is happening on site. A project manager may not receive updates on time. A supplier may not know when materials are urgently needed. A worker may not know that a drawing has changed. A project owner may not have a clear view of what has been spent, what has been delivered, and what still needs attention.",
          "When visibility is weak, the project becomes difficult to control.",
          "Digital tools help solve this by making project information easier to see, track, and update. Instead of waiting for scattered reports, clients and project teams can work with clearer records of progress, tasks, documents, budgets, materials, and responsibilities.",
          "This is one of the reasons BuildIT is important to the GProjects ecosystem. BuildIT supports the idea that a project should have a structured digital layer where progress, records, sourcing, workforce needs, and project details can be better organised.",
          "A project should not depend only on memory or verbal updates. It should have visibility.",
        ],
      },
      {
        title: "2. BuildIT helps reduce scattered project information",
        body: [
          "Many construction problems begin because information is scattered.",
          "One receipt may be in someone's pocket. One drawing may be saved on a phone. One instruction may be buried in a WhatsApp chat. One supplier quote may be in an email. One payment record may be written in a notebook. One project update may only exist as a verbal conversation.",
          "When this happens, the project becomes hard to trace.",
          "BuildIT responds to this problem by creating a more connected project environment where project details can become easier to organise. Through its project management and documentation direction, BuildIT supports a system where records are not scattered across people and devices, but connected to the project itself.",
          "This matters because construction needs evidence. A serious project should be able to show what was planned, what was sourced, what was paid for, what was changed, what was completed, and what still needs attention.",
        ],
      },
      {
        title: "3. Project Portfolio supports better records and tracking",
        body: [
          "Every project needs records.",
          "Drawings, budgets, receipts, approvals, progress photos, contracts, supplier details, change records, and handover documents all help define the project's history. Without these records, the client may struggle to track the project properly or defend decisions later.",
          "BuildIT's Project Portfolio direction is important here because it supports the idea of giving each project a structured space for visibility and documentation.",
          "Instead of treating project information as loose files, Project Portfolio can help organise the core records that define a project from planning to handover.",
          "This kind of structure helps both the client and the project team. The client can understand what is happening. The project manager can track responsibilities. The team can work with clearer information. The company can maintain stronger records.",
        ],
        list: [
          "Project details",
          "Design documents",
          "Budget records",
          "Payment summaries",
          "Receipts and invoices",
          "Progress updates",
          "Site photos",
          "Change records",
          "Procurement notes",
          "Timeline milestones",
          "Handover documents",
        ],
      },
      {
        title: "4. Digital tools make budgeting and cost visibility clearer",
        body: [
          "Construction costs can change quickly.",
          "Material prices may rise. Labour needs may increase. Design changes may affect cost. Procurement delays may create extra expenses. Poor record keeping may make spending difficult to trace.",
          "Without proper cost visibility, a client may keep spending without clearly understanding where the money is going.",
          "Digital tools help improve budget tracking by making it easier to record estimates, purchases, payments, receipts, supplier quotes, variation costs, and remaining balances.",
          "BuildIT supports this direction by connecting project records with cost visibility. When budgets, procurement records, receipts, and project updates are kept in a more organised system, it becomes easier for project teams and clients to understand the financial movement of a project.",
        ],
        list: [
          "What was budgeted?",
          "What has been spent?",
          "What materials were purchased?",
          "What receipts are available?",
          "What costs changed?",
          "What is still pending?",
          "What decision caused the change?",
        ],
      },
      {
        title: "5. Builders Market supports smarter material sourcing",
        body: [
          "Material sourcing is one of the most important parts of construction management.",
          "A project can have a good design and a good team, but still suffer if materials are unavailable, overpriced, delayed, poorly selected, or wrongly supplied.",
          "Traditional material sourcing can be stressful because clients and project teams often rely on scattered supplier contacts, changing prices, verbal confirmations, and uncertain delivery timelines.",
          "This is where BuildIT's Builders Market becomes very relevant. Builders Market supports the idea of connecting construction needs with materials, suppliers, plans, and sourcing options in a more structured way.",
          "Material sourcing should not begin only when workers are waiting on site. With a system like BuildIT, sourcing can become part of the project plan from the beginning.",
        ],
        list: [
          "Finding relevant materials",
          "Comparing supplier options",
          "Planning material needs earlier",
          "Reducing last-minute sourcing pressure",
          "Tracking procurement decisions",
          "Connecting project needs to sourcing workflows",
          "Improving visibility around what is needed and when",
        ],
      },
      {
        title: "6. Global Supply Chain improves procurement visibility",
        body: [
          "Some projects require materials that are not easy to source locally. Others may need imported items, factory orders, specialised finishes, equipment, or bulk procurement. When sourcing becomes larger or more complex, project teams need better visibility.",
          "BuildIT's Global Supply Chain direction supports this part of the construction process.",
          "It helps position BuildIT as more than a simple local marketplace. It gives the ecosystem room to support local and international sourcing, delivery planning, landed cost awareness, supplier coordination, and procurement visibility.",
          "This matters because procurement is not only about buying. It is about timing, quality, cost, logistics, documentation, and coordination.",
          "For GProjects, this strengthens project delivery because materials are not treated as random purchases. They become part of a wider project system.",
        ],
        list: [
          "Materials arrive late",
          "Materials are not properly specified",
          "Suppliers are not coordinated",
          "Prices change unexpectedly",
          "Delivery timelines are unclear",
          "Imported items are not planned early",
          "Procurement records are missing",
        ],
      },
      {
        title: "7. Digital tools improve communication between clients and project teams",
        body: [
          "Good communication is one of the foundations of successful construction.",
          "But communication becomes difficult when updates are scattered across phone calls, site visits, chats, emails, and verbal instructions. The more people involved, the easier it becomes for information to be misunderstood or lost.",
          "Digital tools help project teams communicate with more structure.",
          "BuildIT is important because it supports a more connected project environment. Instead of allowing communication to remain scattered, BuildIT gives GProjects a digital direction for connecting clients, project managers, suppliers, workers, professionals, and project records.",
          "Digital communication does not remove the need for physical supervision, but it supports better coordination.",
        ],
        list: [
          "Progress updates",
          "Task assignments",
          "Decision records",
          "Site reports",
          "Document sharing",
          "Photo updates",
          "Issue tracking",
          "Approval notes",
          "Change requests",
          "Team responsibilities",
        ],
      },
      {
        title: "8. Professional Job Pool supports workforce visibility",
        body: [
          "Construction depends on people.",
          "Even with good materials and good drawings, a project can suffer if the right workers and professionals are not available or properly coordinated.",
          "Many construction systems still rely heavily on informal labour connections. Someone knows an artisan. Someone recommends a worker. Someone brings a team. Sometimes this works well, but it can also create problems when skills, availability, location, experience, and accountability are not clearly organised.",
          "BuildIT's Professional Job Pool supports a better approach by helping create visibility for the people who make project delivery possible.",
          "For GProjects, this connects directly to the Workforce Opportunities section of the company. It allows GProjects to treat workforce access as part of structured project delivery, not as an afterthought.",
        ],
        list: [
          "Artisans",
          "Handymen",
          "Skilled workers",
          "Unskilled workers",
          "NYSC Corps Members",
          "Project managers",
          "Construction professionals",
          "Contractors",
          "Site support workers",
        ],
      },
      {
        title: "9. Digital tools help manage timelines and milestones",
        body: [
          "A construction timeline is not just a date on paper. It is a sequence of connected activities.",
          "Site preparation may depend on approvals. Foundation work may depend on drawings and materials. Block work may depend on labour and supply. Roofing may depend on procurement timing. Finishing may depend on earlier technical work. Handover may depend on quality checks and documentation.",
          "Digital tools help project teams track timelines, milestones, dependencies, and pending tasks more clearly. Instead of relying only on memory, teams can see what should happen next and what may block progress.",
          "BuildIT supports this through its project tracking and portfolio direction. When timelines, milestones, documents, procurement needs, and workforce activities are connected, the project becomes easier to manage.",
          "This is especially useful for clients who want to understand project progress without being physically present every day.",
        ],
        list: [
          "What stage is the project in?",
          "What has been completed?",
          "What is delayed?",
          "What is needed next?",
          "Who is responsible?",
          "What decision is pending?",
          "What material is required?",
          "What does the next milestone depend on?",
        ],
      },
      {
        title: "10. AI Architect supports early planning and smarter decisions",
        body: [
          "Some construction problems begin before site work starts.",
          "Clients may not be sure what they want. They may struggle to understand space planning, cost implications, layout options, material choices, or early design direction. Project teams may also need faster ways to explore ideas before moving into full technical work.",
          "BuildIT's AI Architect supports this early-stage planning direction.",
          "It can help clients and project teams think through design ideas, layout possibilities, BOQ guidance, zoning checks, and smarter project decisions before the project becomes expensive to change.",
          "This does not replace professional architects or engineers. Instead, it supports early clarity.",
          "For GProjects, this is valuable because better planning leads to better delivery. A clearer beginning can reduce confusion later in the project.",
        ],
      },
      {
        title: "11. Real Estate & REITs connect projects to long-term value",
        body: [
          "Construction is not only about completing a building. It is also about value.",
          "A project may become a home, rental property, commercial asset, estate development, investment opportunity, or long-term real estate portfolio.",
          "BuildIT's Real Estate & REITs direction connects construction management to the bigger property and investment picture. This matters because project delivery should not be separated from long-term asset value.",
          "When project records, documents, costs, materials, progress, and ownership information are better organised, the property becomes easier to understand and present.",
          "For GProjects, this helps connect physical project delivery with the wider real-sector ecosystem. The goal is not only to build structures, but to support projects that can hold value, attract confidence, and remain organised beyond handover.",
        ],
        list: [
          "Property visibility",
          "Investment readiness",
          "Project-linked value",
          "Real estate opportunities",
          "Asset documentation",
          "Future resale or leasing confidence",
          "Long-term portfolio thinking",
        ],
      },
      {
        title: "12. Digital tools support better decision-making",
        body: [
          "A project team can only make strong decisions when the right information is available.",
          "If receipts are missing, budgeting becomes unclear. If drawings are scattered, site work becomes risky. If supplier records are weak, procurement becomes confusing. If worker information is informal, coordination becomes difficult. If progress is not tracked, delays become harder to manage.",
          "Digital tools help create better decision-making because they bring more information into view.",
          "BuildIT strengthens this by connecting several parts of the project ecosystem. This is why BuildIT matters so much to GProjects. It does not solve only one small problem. It supports the wider system of project delivery.",
          "Better information leads to better project control.",
        ],
        list: [
          "Planning",
          "Sourcing",
          "Documentation",
          "Budget visibility",
          "Project tracking",
          "Workforce access",
          "Professional collaboration",
          "Real estate opportunities",
          "Supply chain coordination",
        ],
      },
      {
        title: "13. Technology must still connect to real project delivery",
        body: [
          "Digital tools are powerful, but they are not enough on their own.",
          "A project still needs experienced people, strong planning, quality materials, good supervision, proper documentation, and responsible execution. Technology only works when it supports real project needs.",
          "GProjects connects physical project delivery with BuildIT-powered digital support. The company's work is not only about using technology for appearance. It is about using digital systems to support real construction problems.",
          "This is what makes BuildIT more than a digital idea. It is a practical support system for better project delivery.",
        ],
        list: [
          "Clients need visibility.",
          "Project managers need structure.",
          "Suppliers need better sourcing flow.",
          "Workers need opportunity access.",
          "Documents need organisation.",
          "Budgets need tracking.",
          "Timelines need management.",
          "Projects need records.",
        ],
      },
      {
        title: "The GProjects approach to digital construction management",
        body: [
          "For GProjects, digital tools are not separate from construction. They are part of a larger delivery system.",
          "The company's approach connects architecture, construction, project management, procurement, documentation, workforce coordination, BuildIT-powered systems, and real estate opportunities.",
          "BuildIT gives this system a digital backbone. It helps GProjects move beyond traditional construction management by creating a more connected way to plan, source, track, document, manage, and deliver projects.",
          "The goal is not to make construction complicated. The goal is to make it clearer.",
          "GProjects is building toward a future where construction is not managed blindly, but with structure, visibility, intelligence, and accountability.",
        ],
        list: [
          "Clearer for clients.",
          "Clearer for project managers.",
          "Clearer for suppliers.",
          "Clearer for workers.",
          "Clearer for long-term project value.",
        ],
      },
      {
        title: "Conclusion",
        body: [
          "Digital tools are changing the way construction projects are managed because they help solve one of the industry's biggest problems: scattered information.",
          "They make it easier to track progress, manage records, source materials, coordinate workers, review costs, organise documents, and make better decisions.",
          "For GProjects, BuildIT is central to this shift.",
          "BuildIT supports the exact areas where construction projects often struggle: documentation, receipts, timelines, sourcing, workforce visibility, budgeting, communication, project records, and long-term real estate value.",
          "Construction will always need people, materials, skill, and site execution. But the projects that succeed in the future will also need better systems.",
          "That is the direction GProjects is building toward through BuildIT: a future where construction is not only built physically, but managed intelligently.",
        ],
      },
    ],
    cta: {
      title: "Planning a construction or real estate project?",
      body: "Speak with GProjects about BuildIT-powered project visibility, documentation, sourcing support, workforce coordination, and structured delivery.",
      primaryLabel: "Explore BuildIT",
      primaryHref: BUILD_IT_URL,
      primaryExternal: true,
      secondaryLabel: "Start a Project",
      secondaryHref: "/#contact",
    },
    sources: [
      {
        label: "McKinsey & Company - Improving construction productivity is the new imperative",
        href: "https://www.mckinsey.com/capabilities/operations/our-insights/delivering-on-construction-productivity-is-no-longer-optional",
      },
      {
        label: "Autodesk - What's a Common Data Environment (CDE)?",
        href: "https://www.autodesk.com/blogs/construction/common-data-environment/",
      },
      {
        label: "BSI - ISO 19650 Building Information Modelling (BIM)",
        href: "https://www.bsigroup.com/en-HK/products-and-services/standards/iso-19650-building-information-modelling-bim/",
      },
      {
        label: "McKinsey & Company - Imagining construction's digital future",
        href: "https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future",
      },
      {
        label: "McKinsey & Company - Decoding digital transformation in construction",
        href: "https://www.mckinsey.com/capabilities/operations/our-insights/decoding-digital-transformation-in-construction",
      },
    ],
  },
  "/blog/importance-of-documentation-in-real-estate-and-construction-projects": {
    intro: [
      "A construction project without documentation is difficult to track, defend, value, or manage. Proper records help clients understand what was planned, what was spent, what was delivered, and what still needs attention.",
      "In real estate and construction, many people focus on what they can see: the land, the building, the materials, the workers, and the progress on site. But behind every serious project, there should be something just as important: proper documentation.",
      "Documentation is the evidence of the project. It shows what was agreed, designed, approved, purchased, paid for, changed, and delivered.",
      "Without it, a client may struggle to understand the true history, cost, quality, and condition of a project. Documentation should not be treated as an afterthought. It should begin before construction starts and continue until handover.",
    ],
    tip: {
      title: "GProjects Tip",
      body: "Do not wait until the end of a project to start gathering records. Start documenting from the first conversation. Keep drawings, approvals, budgets, receipts, reports, photos, changes, and handover documents organised from day one.",
    },
    sections: [
      {
        title: "1. Documentation protects the client",
        body: [
          "One of the biggest reasons documentation matters is protection.",
          "A client may remember what was discussed, but memory is not enough in construction. Projects involve many people, including designers, engineers, project managers, contractors, artisans, suppliers, site supervisors, and sometimes investors or family members. If decisions are not written down, confusion can happen easily.",
          "For example, if a client approves a material change verbally and the result later becomes expensive or disappointing, it may be difficult to prove what was agreed. But if the change was documented, everyone can trace the decision.",
          "Documentation does not remove every problem, but it makes problems easier to understand and resolve.",
        ],
        list: [
          "Unclear agreements",
          "Disputes over payments",
          "Wrong material purchases",
          "Unapproved changes",
          "Poor workmanship claims",
          "Missing receipts",
          "Forgotten instructions",
          "Budget confusion",
          "Incomplete handover",
        ],
      },
      {
        title: "2. Drawings and approvals should be properly stored",
        body: [
          "Every project needs proper design and approval records.",
          "Architectural drawings, structural drawings, mechanical and electrical drawings, survey plans, approval documents, permits, and related reports should be stored safely. These documents are not only useful at the beginning of the project. They remain important throughout construction and even after the building is completed.",
          "One common problem in construction is that people work with outdated drawings. If the architect revises a drawing but the site team continues using the old version, mistakes can happen. This can lead to rework, wasted materials, delays, and extra cost.",
          "Good documentation means the project team knows which document is current and which version has been replaced.",
        ],
        list: [
          "What was originally designed?",
          "What was approved?",
          "What was changed during construction?",
          "Which drawing version is the correct one?",
          "What should the contractor or artisan follow?",
          "What records will be needed for future renovation or resale?",
        ],
      },
      {
        title: "3. Budget records help clients understand what was spent",
        body: [
          "Money moves quickly during construction.",
          "A client may pay for drawings, approvals, materials, labour, transportation, equipment, supervision, professional fees, and finishing items at different times. Without records, it becomes difficult to know where the money went.",
          "RICS cost reporting guidance explains that cost reporting helps communicate historic and forecast costs to the client during construction, including the purpose of cost reporting, report formats, budgets, variable costs, and loss or expense reporting.",
          "For GProjects, budget documentation is part of project visibility. It helps the client understand what has been planned, what has been committed, what has been spent, and what still needs attention.",
        ],
        list: [
          "Project budget",
          "Cost estimates",
          "Bills of quantities, where available",
          "Invoices",
          "Receipts",
          "Supplier quotations",
          "Payment schedules",
          "Labour records",
          "Procurement records",
          "Variation costs",
          "Balance summaries",
        ],
      },
      {
        title: "4. Contracts and agreements reduce misunderstanding",
        body: [
          "Every serious project should have clear agreements.",
          "This does not always mean complicated legal documents for every small task, but there should be written clarity around who is doing what, what they are being paid for, how long the work should take, what standard is expected, and how changes will be handled.",
          "Without these documents, people may rely on assumptions. The client may believe one thing is included, while the contractor may believe it is not. The supplier may quote for one specification, while the project team expects another.",
          "Good documentation reduces this kind of confusion. It creates a reference point.",
        ],
        list: [
          "Client engagement letters",
          "Contractor agreements",
          "Supplier agreements",
          "Scope of work documents",
          "Professional service agreements",
          "Payment terms",
          "Delivery terms",
          "Warranty or maintenance terms",
          "Change approval records",
        ],
      },
      {
        title: "5. Site reports show what is actually happening",
        body: [
          "A client may not always be on site. Even when the client visits regularly, it is still difficult to remember every detail.",
          "Site reports help record progress. These reports help everyone stay informed. They also help the client compare planned progress with actual progress.",
          "If a project is delayed, site records can help explain why. Was it because materials arrived late? Was labour unavailable? Did the client delay a decision? Did the weather affect the work? Was there a design change?",
          "Without records, delay discussions can quickly become arguments. With records, the project has a clearer history.",
        ],
        list: [
          "Date of visit",
          "Work completed",
          "Workers present",
          "Materials delivered",
          "Materials used",
          "Issues noticed",
          "Weather or site conditions",
          "Instructions given",
          "Photos of progress",
          "Pending decisions",
          "Next steps",
        ],
      },
      {
        title: "6. Progress photos are not just for updates",
        body: [
          "Progress photos are very useful in construction.",
          "They help document what was done before certain parts of the work become hidden. For example, once walls are plastered, pipes, conduits, reinforcement, and internal work may no longer be visible. Photos taken during construction can help show what was installed and where.",
          "Photos should not just be random. They should be organised by date, project stage, location, and description where possible.",
          "A good project record does not only show the finished building. It shows the journey of the building.",
        ],
        list: [
          "Client updates",
          "Quality checks",
          "Hidden work records",
          "Maintenance planning",
          "Dispute resolution",
          "Insurance support",
          "Future renovation",
          "Handover documentation",
        ],
      },
      {
        title: "7. Change orders and variations must be documented",
        body: [
          "Changes happen in almost every construction project.",
          "A client may change a room size. A material may become unavailable. A design detail may need correction. A site condition may require adjustment. A cost may increase. A finishing preference may change.",
          "The problem is not that changes happen. The problem is when changes are not documented.",
          "AIA Contracts explains that modifications to contract terms should be memorialized by change order, and that changes may result from owner changes, unforeseen conditions, weather delays, contractual issues, and other matters.",
          "For GProjects, the lesson is clear: every important change should be recorded.",
        ],
        list: [
          "What changed",
          "Why it changed",
          "Who requested it",
          "Who approved it",
          "What it will cost",
          "Whether it affects the timeline",
          "Whether it affects materials",
          "Whether drawings need to be updated",
          "Whether the client accepted the change",
        ],
      },
      {
        title: "8. Procurement records help control materials and suppliers",
        body: [
          "Procurement documentation is important because materials are one of the biggest parts of construction cost.",
          "A client needs to know what was bought, from whom, at what price, when it was delivered, and whether it matched the required specification.",
          "Poor procurement documentation can cause serious confusion. If the wrong tiles are delivered, who approved them? If cement prices changed, when did the quote expire? If a supplier delays delivery, was there a confirmed delivery date?",
          "Procurement records help answer these questions. This also connects to BuildIT's Builders Market and Global Supply Chain direction, where sourcing and material information can become better organised within the wider project ecosystem.",
        ],
        list: [
          "Supplier quotations",
          "Purchase orders",
          "Receipts",
          "Delivery notes",
          "Material specifications",
          "Quality checks",
          "Supplier contacts",
          "Warranty documents",
          "Stock or inventory notes",
          "Rejected material records",
          "Approved substitutions",
        ],
      },
      {
        title: "9. Documentation improves accountability across the team",
        body: [
          "Construction involves many responsibilities.",
          "One person may prepare drawings. Another may estimate cost. Another may source materials. Another may supervise workers. Another may manage payments. Another may approve changes.",
          "If responsibilities are not documented, accountability becomes weak.",
          "A project documentation system is not about blaming people. It is about making the project easier to manage. When responsibilities are documented, everyone works with more discipline.",
        ],
        list: [
          "Who approved what",
          "Who requested what",
          "Who delivered what",
          "Who received what",
          "Who paid for what",
          "Who inspected what",
          "Who reported what",
          "Who changed what",
        ],
      },
      {
        title: "10. Digital documentation makes project records easier to manage",
        body: [
          "In the past, many construction records were stored only in paper folders, notebooks, WhatsApp chats, and scattered email threads. These can still be useful, but they are not always easy to search, organise, or share.",
          "Modern construction is moving toward better digital information management.",
          "ISO describes BIM standards as helping with the organisation, digitisation, and exchange of critical project data across the lifecycle of buildings and infrastructure.",
          "A Common Data Environment, often used in BIM and digital construction workflows, is described as a central digital hub where project information comes together.",
          "This is where BuildIT's Project Portfolio concept fits naturally. It supports the idea that a project should have a digital space where records, timelines, budgets, documents, and updates can be kept more visible.",
        ],
      },
      {
        title: "11. Documentation supports valuation, resale, and investment",
        body: [
          "Real estate is not only about construction. It is also about value.",
          "A properly documented property is easier to understand, value, maintain, renovate, sell, lease, insure, or present to investors.",
          "If a client later wants to sell or rent the property, strong records can support confidence. If an investor wants to understand the project, documentation helps provide clarity. If maintenance is needed, records help technicians know what was installed and where.",
          "A building without records may still exist physically, but its history becomes difficult to prove.",
        ],
        list: [
          "What was built",
          "When it was built",
          "What materials were used",
          "What approvals were obtained",
          "What professionals were involved",
          "What the project cost",
          "What changes were made",
          "What maintenance may be required",
          "What warranties or guarantees exist",
        ],
      },
      {
        title: "12. Handover documents complete the project properly",
        body: [
          "A project is not truly complete just because construction work has ended.",
          "At handover, the client should receive important records that explain the completed project. Handover documentation helps the client take control of the building after construction.",
          "Without it, the client may own a finished building but still lack important information about how it was built, what was installed, and how it should be maintained.",
        ],
        list: [
          "Final drawings",
          "Approved changes",
          "Completion reports",
          "Material and equipment records",
          "Warranty documents",
          "Maintenance instructions",
          "Supplier contacts",
          "Payment summaries",
          "Inspection notes",
          "Keys and access details",
          "Defect list, if any",
          "Future maintenance recommendations",
        ],
      },
      {
        title: "The GProjects approach to documentation",
        body: [
          "For GProjects, documentation is part of structured delivery.",
          "It connects the client, project team, budget, site work, procurement, workforce, quality control, and handover process.",
          "GProjects does not treat documentation as ordinary paperwork. It is a project management tool. It helps create clarity, accountability, visibility, and trust.",
          "Through BuildIT-powered systems, especially the Project Portfolio concept, GProjects can support a more organised way to manage project records and make construction information easier to track from planning to completion.",
        ],
        list: [
          "Make every project easier to understand.",
          "Make every decision easier to trace.",
          "Make every cost easier to review.",
          "Make every delivery stage easier to manage.",
        ],
      },
      {
        title: "Conclusion",
        body: [
          "Documentation is one of the strongest foundations of a successful construction or real estate project.",
          "It protects the client, guides the team, records decisions, supports budget control, reduces disputes, improves accountability, helps future maintenance, and supports long-term property value.",
          "A project without documentation may still be built, but it becomes harder to track, defend, value, or manage.",
          "For clients who want clarity and confidence, documentation should not be optional. It should be part of the project from the beginning.",
        ],
      },
    ],
    cta: {
      title: "Planning a construction or real estate project?",
      body: "Speak with GProjects about documentation, project management, procurement records, site reporting, workforce coordination, and structured delivery.",
    },
    sources: [
      {
        label: "RICS - Cost Reporting, 1st edition",
        href: "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/construction-standards/black-book/cost-reporting",
      },
      {
        label: "AIA Contracts - Construction Change Orders",
        href: "https://learn.aiacontracts.com/articles/6378493-the-fundamentals-of-change-orders-in-construction/",
      },
      {
        label: "ISO - Building information modelling",
        href: "https://www.iso.org/sectors/building-construction/building-information-modelling",
      },
      {
        label: "Autodesk University - ISO 19650, the Common Data Environment, and Autodesk Construction Cloud",
        href: "https://www.autodesk.com/autodesk-university/article/ISO-19650-Common-Data-Environment-and-Autodesk-Construction-Cloud",
      },
    ],
  },
};

function ServiceIcon({ name }: { name: string }) {
  const commonProps = {
    width: 34,
    height: 34,
    viewBox: "0 0 34 34",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "architecture":
      return (
        <svg {...commonProps}>
          <path d="M7 27h20" />
          <path d="M9 24V11l8-5 8 5v13" />
          <path d="M13 24v-8h8v8" />
          <path d="M12 13h10" />
        </svg>
      );
    case "construction":
      return (
        <svg {...commonProps}>
          <path d="M7 25h20" />
          <path d="M10 22V11h14v11" />
          <path d="M10 11l7-5 7 5" />
          <path d="M14 22v-5h6v5" />
          <path d="M8 15h18" />
        </svg>
      );
    case "management":
      return (
        <svg {...commonProps}>
          <path d="M10 7h14v20H10z" />
          <path d="M14 12h7" />
          <path d="M14 17h8" />
          <path d="M14 22h5" />
          <path d="M13 7v3h8V7" />
        </svg>
      );
    case "finance":
      return (
        <svg {...commonProps}>
          <path d="M9 8h16v20H9z" />
          <path d="M13 12h8" />
          <path d="M13 17h2" />
          <path d="M19 17h2" />
          <path d="M13 22h2" />
          <path d="M19 22h2" />
        </svg>
      );
    case "technology":
      return (
        <svg {...commonProps}>
          <path d="M17 10v14" />
          <path d="M10 17h14" />
          <circle cx="17" cy="10" r="3" />
          <circle cx="24" cy="17" r="3" />
          <circle cx="17" cy="24" r="3" />
          <circle cx="10" cy="17" r="3" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M10 7h11l4 4v16H10z" />
          <path d="M21 7v5h5" />
          <path d="M14 18l3 3 5-6" />
        </svg>
      );
  }
}

function WhyIcon({ name }: { name: string }) {
  const commonProps = {
    width: 56,
    height: 56,
    viewBox: "0 0 56 56",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "delivery":
      return (
        <svg {...commonProps}>
          <path d="M9 36h22" />
          <path d="M13 17h24v19H13z" />
          <path d="M37 24h5l6 6v6H37z" />
          <path d="M18 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M42 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M6 23h9" />
          <path d="M6 29h9" />
        </svg>
      );
    case "digital":
      return (
        <svg {...commonProps}>
          <circle cx="28" cy="28" r="19" />
          <path d="M28 9v38" />
          <path d="M14 19h28" />
          <path d="M14 37h28" />
          <path d="M12 28h32" />
          <path d="M28 9c-8 6-12 13-12 19s4 13 12 19" />
          <path d="M28 9c8 6 12 13 12 19s-4 13-12 19" />
        </svg>
      );
    case "workforce":
      return (
        <svg {...commonProps}>
          <path d="M20 25a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
          <path d="M36 26a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path d="M8 45c2-9 7-14 14-14s12 5 14 14" />
          <path d="M30 33c7 1 12 5 14 12" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M11 40V17l17-9 17 9v23" />
          <path d="M17 40V23h22v17" />
          <path d="M22 40V29h12v11" />
          <path d="M14 46h28" />
          <path d="M22 19h12" />
        </svg>
      );
  }
}

function AboutServicesPage() {
  return (
    <>
      <section id="top" className="subpage-hero about-services-hero">
        <div className="container subpage-hero-grid">
          <div className="subpage-hero-copy">
            <span className="eyebrow">About GProjects</span>
            <h1>Where real-sector vision becomes structured delivery.</h1>
            <p>
              GProjects Limited exists as the enterprise and project delivery arm within the wider G Initiative ecosystem - translating ideas, land, people, materials, and capital into structured real-sector projects.
            </p>
            <p>
              Through architecture, construction, project management, workforce coordination, procurement support, and BuildIT-powered digital systems, GProjects connects physical development with the tools needed to plan, source, manage, and scale projects with greater clarity.
            </p>
          </div>

          <div className="subpage-hero-media" aria-hidden="true">
            <div><img src={pageImages.about} alt="" /></div>
            <div><img src={pageImages.about} alt="" /></div>
            <div><img src={pageImages.about} alt="" /></div>
          </div>
        </div>
      </section>

      <section id="about-gprojects" className="section story-section">
        <div className="container story-grid">
          <div>
            <span className="eyebrow">The GProjects Story</span>
            <h2>Building beyond structures. Delivering systems for growth.</h2>
          </div>
          <div className="story-copy">
            <p>
              GProjects Limited was created to move real-sector ideas beyond intention and into organised execution. In architecture, construction, project management, technology, workforce development, and enterprise delivery, strong vision is only the beginning. Every successful project also needs structure, coordination, documentation, sourcing, people, and clear delivery systems.
            </p>
            <p>
              As part of the wider G Initiative ecosystem, GProjects brings this structure into practical development work. From planning and procurement to site coordination, workforce alignment, quality control, and long-term project value, GProjects helps turn land, materials, people, and capital into projects that can be properly planned, managed, and delivered.
            </p>
            <p>
              Through BuildIT, its flagship digital ecosystem, GProjects extends this work beyond the physical site - connecting construction, material sourcing, professional hiring, project visibility, documentation, and real estate opportunities into one smarter way to build.
            </p>
          </div>
        </div>
      </section>

      <section className="section ecosystem-role-section">
        <div className="container">
          <div className="subpage-section-heading">
            <span className="eyebrow">G Initiative Ecosystem</span>
            <h2>Why GProjects exists inside the wider ecosystem.</h2>
          </div>
          <div className="ecosystem-role-grid">
            {[
              {
                title: "Physical Delivery",
                body: "Architecture, construction, project execution, site coordination, supervision, and quality control.",
              },
              {
                title: "Digital Infrastructure",
                body: "BuildIT-powered tools for sourcing, project visibility, workforce access, documentation, and construction intelligence.",
              },
              {
                title: "Enterprise & Workforce Systems",
                body: "Connecting clients, artisans, professionals, suppliers, and project teams into organised delivery pipelines.",
              },
            ].map((item) => (
              <article className="ecosystem-role-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="full-services" className="section service-detail-section">
        <div className="container">
          <div className="subpage-section-heading subpage-section-heading--center">
            <span className="eyebrow">What We Offer</span>
          </div>

          <div className="service-detail-list">
            {serviceDetails.map((service, index) => (
              <article
                id={service.id}
                className={`service-detail-item ${index % 2 ? "service-detail-item--reverse" : ""}`}
                key={service.id}
              >
                <div className="service-detail-image">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <div className="service-detail-card">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <p>{service.detail}</p>
                  <div className="service-connection">
                    <strong>Useful BuildIT connection:</strong>
                    <small>{service.connection}</small>
                  </div>
                  <a href="#contact" className="service-detail-link">
                    Start a Project <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

function WorkforcePage() {
  return (
    <>
      <section id="top" className="subpage-hero workforce-page-hero">
        <div className="container workforce-hero-grid">
          <div className="workforce-hero-copy">
            <span className="eyebrow">GProjects Workforce Network</span>
            <h1>Connecting skilled people to structured project opportunities.</h1>
            <p>
              GProjects is building a workforce network for people interested in construction, project delivery, site support, maintenance, technical services, and professional project roles.
            </p>
            <p>
              The network helps workers, artisans, NYSC Corps Members, project managers, and construction professionals become more visible, organised, and accessible for current and future project opportunities.
            </p>
            <div className="subpage-hero-actions">
              <a href="#workforce-register" className="button button--forest">
                Register Your Interest <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href={`${BUILD_IT_JOB_POOL_URL}`}
                className="button-link button-link--dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore BuildIT Job Pool
              </a>
            </div>
          </div>

          <div className="workforce-hero-visual">
            <img src={blogWorkforceImg} alt="GProjects workforce network" />
          </div>
        </div>
      </section>

      <section className="section workforce-who-section">
        <div className="container">
          <div className="subpage-section-heading">
            <span className="eyebrow">Who Can Join</span>
            <h2>Who can join the GProjects workforce network?</h2>
            <p>
              The network is open to people with practical skills, project experience, technical training, site knowledge, or interest in construction and real-sector project delivery.
            </p>
          </div>

          <div className="workforce-group-grid">
            {workforceGroups.map((group) => (
              <article className="workforce-group-card" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section workforce-benefits-section">
        <div className="container">
          <div className="workforce-benefits-layout">
            <div>
              <span className="eyebrow eyebrow--mint">Why Join</span>
              <h2>Why join the network?</h2>
              <p>
                Joining helps GProjects understand your skillset, organise your profile, and keep you visible for relevant project opportunities. It is a pathway into the ecosystem, not a guarantee of immediate employment.
              </p>
            </div>
            <div className="workforce-benefit-grid">
              {workforceBenefits.map((benefit) => (
                <article className="workforce-benefit-card" key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section workforce-steps-section">
        <div className="container">
          <div className="subpage-section-heading subpage-section-heading--center">
            <span className="eyebrow">How It Works</span>
          </div>
          <div className="workforce-step-grid">
            {workforceSteps.map((step, index) => (
              <article className="workforce-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section workforce-buildit-section">
        <div className="container workforce-buildit-card">
          <div>
            <span className="eyebrow">BuildIT Connection</span>
            <h2>Powered by BuildIT's Professional Job Pool</h2>
            <p>
              BuildIT's Professional Job Pool is designed to make construction and project-based talent more visible, organised, and easier to connect with project needs.
            </p>
            <p>
              Through this system, GProjects can support a smarter workforce pipeline for artisans, handymen, skilled workers, unskilled workers, NYSC Corps Members, project managers, and construction professionals.
            </p>
          </div>
          <div>
            <ul>
              {[
                "Professional visibility",
                "Skill-based matching",
                "Project opportunity access",
                "Worker and artisan organisation",
                "Construction workforce coordination",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href={`${BUILD_IT_JOB_POOL_URL}`}
              className="button button--forest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore BuildIT Job Pool <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section id="workforce-register" className="section workforce-register-section">
        <div className="container workforce-register-grid">
          <div>
            <span className="eyebrow">Register Your Interest</span>
            <h2>Submit your details and area of skill.</h2>
            <p>
              Interested in joining the GProjects workforce network? Submit your details and area of skill so the team can understand your profile and keep you in view for relevant opportunities.
            </p>
          </div>

          <div className="workforce-tally-embed">
            <iframe
              src="https://tally.so/embed/7R5W62?alignLeft=1&hideTitle=1&transparentBackground=1"
              title="GProjects Workforce Network registration form"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section workforce-faq-section">
        <div className="container">
          <div className="subpage-section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions about the workforce network.</h2>
          </div>
          <div className="workforce-faq-list">
            {workforceFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section workforce-final-section">
        <div className="container workforce-final-card">
          <h2>Ready to be part of the GProjects workforce network?</h2>
          <p>
            Submit your details today and take the first step toward becoming visible for future project, construction, maintenance, and professional opportunities within the GProjects and BuildIT ecosystem.
          </p>
          <div>
            <a href="#workforce-register" className="button button--light">
              Register Your Interest <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href={`${BUILD_IT_JOB_POOL_URL}`}
              className="button-link button-link--light"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore BuildIT Job Pool
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = Array.from(new Set(blogItems.map((item) => item.category)));
  const normalizeSearchText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const getSearchWords = (value: string) => normalizeSearchText(value).split(" ").filter(Boolean);
  const connectorWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "can",
    "do",
    "does",
    "for",
    "from",
    "had",
    "has",
    "have",
    "how",
    "in",
    "into",
    "is",
    "it",
    "of",
    "on",
    "or",
    "our",
    "should",
    "that",
    "the",
    "this",
    "to",
    "was",
    "what",
    "when",
    "where",
    "why",
    "with",
    "you",
    "your",
  ]);
  const getTitleAutocompleteScore = (queryWords: string[], titleWords: string[]) => {
    if (!queryWords.length || !titleWords.length) {
      return 0;
    }

    const firstQueryWord = queryWords[0];
    const queryRefiners = queryWords.slice(1).filter((word) => !connectorWords.has(word));
    let bestScore = 0;

    titleWords.forEach((titleWord, titleIndex) => {
      if (!titleWord.startsWith(firstQueryWord)) {
        return;
      }

      const titleRefiners = titleWords.slice(titleIndex + 1).filter((word) => !connectorWords.has(word));
      const refinersMatch = queryRefiners.every((queryRefiner, index) =>
        titleRefiners[index]?.startsWith(queryRefiner),
      );

      if (!refinersMatch) {
        return;
      }

      const positionScore = Math.max(0, 40 - titleIndex * 4);
      const exactWordScore = titleWord === firstQueryWord ? 18 : 0;
      const refinerScore = queryRefiners.length * 28;
      const score = 80 + positionScore + firstQueryWord.length * 6 + exactWordScore + refinerScore;

      bestScore = Math.max(bestScore, score);
    });

    return bestScore;
  };
  const normalizedQuery = normalizeSearchText(searchQuery);
  const getSearchScore = (item: (typeof blogItems)[number]) => {
    if (!normalizedQuery) {
      return 1;
    }

    const queryTokens = normalizedQuery.split(" ").filter(Boolean);
    const title = normalizeSearchText(item.title);
    const titleWords = getSearchWords(item.title);
    const score = getTitleAutocompleteScore(queryTokens, titleWords);

    return title === normalizedQuery ? score + 40 : score;
  };
  const rankedBlogItems = blogItems
    .map((item) => ({ item, score: getSearchScore(item) }))
    .filter(({ score }) => !normalizedQuery || score > 0)
    .sort((first, second) => second.score - first.score);
  const filteredBlogItems = rankedBlogItems.map(({ item }) => item);
  const liveSearchMatches = normalizedQuery ? rankedBlogItems.slice(0, 5) : [];
  const recentPosts = filteredBlogItems.slice(0, 4);

  return (
    <section id="top" className="blog-index-section">
      <div className="container blog-layout">
        <div className="blog-feed">
          {filteredBlogItems.map((item) => (
            <article className="blog-post-row" key={item.title}>
              <a
                href={siteHref(item.href)}
                className="blog-post-image"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.title}
              >
                <img src={item.image} alt="" loading="lazy" />
              </a>
              <div className="blog-post-copy">
                <div className="blog-post-tags">
                  <span>{item.category}</span>
                  <span>{item.type}</span>
                </div>
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
                <a
                  href={siteHref(item.href)}
                  className="blog-read-link"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.type === "Blog Article" ? "Read More" : "View More"} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}

          {filteredBlogItems.length === 0 ? (
            <div className="blog-empty-state">
              <h2>No matching posts yet.</h2>
              <p>Try searching for planning, BuildIT, workforce, documentation, or project management.</p>
            </div>
          ) : null}
        </div>

        <aside className="blog-sidebar" aria-label="Blog sidebar">
          <div className="blog-search">
            <h2>Live Search</h2>
            <label>
              <span className="sr-only">Search blog</span>
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <span className="blog-search-icon" aria-hidden="true" />
            </label>
            <p className="blog-search-count">
              {normalizedQuery
                ? `${filteredBlogItems.length} result${filteredBlogItems.length === 1 ? "" : "s"} found`
                : "Search by title, topic, category, or any remembered letters."}
            </p>
            {normalizedQuery ? (
              <div className="blog-live-results" aria-live="polite">
                <strong>Related matches</strong>
                {liveSearchMatches.length ? (
                  liveSearchMatches.map(({ item }) => (
                    <a
                      href={siteHref(item.href)}
                      key={item.title}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <img src={item.image} alt="" loading="lazy" />
                      <span>
                        <small>{item.category}</small>
                        {item.title}
                      </span>
                      <em aria-hidden="true">&rarr;</em>
                    </a>
                  ))
                ) : (
                  <p>No related topics found.</p>
                )}
              </div>
            ) : null}
          </div>

          <div className="blog-side-block">
            <h2>Posts</h2>
            <div className="blog-recent-list">
              {recentPosts.map((item) => (
                <a
                  href={siteHref(item.href)}
                  className="blog-recent-item"
                  key={item.title}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <img src={item.image} alt="" loading="lazy" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.date}</small>
                  </span>
                </a>
              ))}
              {recentPosts.length === 0 ? <p className="blog-sidebar-empty">No posts found.</p> : null}
            </div>
          </div>

          <div className="blog-side-block">
            <h2>Categories</h2>
            <div className="blog-side-categories">
              {categories.map((category) => (
                <a href={siteHref("/blog")} key={category}>{category}</a>
              ))}
            </div>
          </div>

          <blockquote className="blog-quote-card">
            <p>
              Structured delivery is not just about building; it is about creating clarity, accountability, and systems that help real-sector projects move.
            </p>
            <cite>GProjects Insights</cite>
          </blockquote>
        </aside>
      </div>
    </section>
  );
}

function BlogArticlePage({ post }: { post: (typeof blogItems)[number] }) {
  const articleDetails = blogArticleDetails[post.href];
  const postIndex = blogItems.findIndex((item) => item.href === post.href);
  const previousPost = postIndex > 0 ? blogItems[postIndex - 1] : undefined;
  const nextPost = postIndex < blogItems.length - 1 ? blogItems[postIndex + 1] : undefined;
  const relatedPosts = blogItems
    .filter((item) => item.href !== post.href)
    .slice(0, 2);
  const shareUrl = encodeURIComponent(`${window.location.origin}${post.href}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <>
      <section id="top" className="blog-article-hero">
        <div className="container blog-article-container">
          <h1>{post.title}</h1>
          <div className="blog-article-meta">
            <img src={logoAsset} alt="" />
            <span>GProjects</span>
            <span>{post.date}</span>
            <span>{post.category}</span>
          </div>
          <div className="blog-article-featured-image">
            <img src={post.image} alt="" />
          </div>
          <p>{post.excerpt}</p>
        </div>
      </section>

      <article className="blog-article-body">
        <div className="container blog-article-container">
          {articleDetails ? (
            <>
              {articleDetails.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {articleDetails.sections.map((section, index) => (
                <div className="blog-article-section" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="blog-article-list">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.note ? <p className="blog-article-note">{section.note}</p> : null}
                  {index === 1 && articleDetails.tip ? (
                    <aside className="blog-tip-box">
                      <strong>{articleDetails.tip.title}</strong>
                      <p>{articleDetails.tip.body}</p>
                    </aside>
                  ) : null}
                </div>
              ))}

              {articleDetails.cta ? (
                <div className="blog-article-cta">
                  <h2>{articleDetails.cta.title}</h2>
                  <p>{articleDetails.cta.body}</p>
                  <div>
                    <a
                      href={siteHref(articleDetails.cta.primaryHref ?? "/#contact")}
                      className="button button--forest"
                      target={articleDetails.cta.primaryExternal ? "_blank" : undefined}
                      rel={articleDetails.cta.primaryExternal ? "noopener noreferrer" : undefined}
                    >
                      {articleDetails.cta.primaryLabel ?? "Start a Project"} <span aria-hidden="true">&rarr;</span>
                    </a>
                    <a href={siteHref(articleDetails.cta.secondaryHref ?? "/services#full-services")} className="button-link button-link--dark">
                      {articleDetails.cta.secondaryLabel ?? "Explore Our Services"}
                    </a>
                  </div>
                </div>
              ) : null}

              {articleDetails.sources ? (
                <div className="blog-source-list">
                  <h2>Sources</h2>
                  {articleDetails.sources.map((source) => (
                    <a href={source.href} key={source.href} target="_blank" rel="noopener noreferrer">
                      {source.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <>
              {post.preview.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <h2>Why this matters</h2>
              <p>
                For GProjects, stronger project delivery begins with clarity. When clients, professionals, suppliers, and site teams work from better information, projects become easier to plan, easier to monitor, and easier to move toward completion.
              </p>
            </>
          )}

          <div className="blog-share-row" aria-label="Share article">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">f</a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">x</a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">in</a>
            <a href={`mailto:?subject=${shareTitle}&body=${shareUrl}`} aria-label="Share by email">@</a>
          </div>

          <nav className="blog-post-navigation" aria-label="Blog post navigation">
            {previousPost ? (
              <a
                href={siteHref(previousPost.href)}
                target={previousPost.external ? "_blank" : undefined}
                rel={previousPost.external ? "noopener noreferrer" : undefined}
              >
                <img src={previousPost.image} alt="" />
                <span>
                  <small>Previous Post</small>
                  <strong>{previousPost.title}</strong>
                </span>
              </a>
            ) : <span />}
            {nextPost ? (
              <a
                href={siteHref(nextPost.href)}
                target={nextPost.external ? "_blank" : undefined}
                rel={nextPost.external ? "noopener noreferrer" : undefined}
              >
                <span>
                  <small>Next Post</small>
                  <strong>{nextPost.title}</strong>
                </span>
                <img src={nextPost.image} alt="" />
              </a>
            ) : <span />}
          </nav>
        </div>
      </article>

      <section className="blog-related-section">
        <div className="container">
          <h2>Related Posts</h2>
          <div className="blog-related-grid">
            {relatedPosts.map((item) => (
              <a
                href={siteHref(item.href)}
                key={item.title}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <img src={item.image} alt="" loading="lazy" />
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectShowcase({ project }: { project: (typeof gprojectsPortfolioProjects)[number] }) {
  const images = Array.from(new Set([project.coverImage, ...project.gallery])).filter(Boolean);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const hasMultipleImages = images.length > 1;

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!hasMultipleImages || isGalleryPaused) {
      return;
    }

    const slideTimer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 4600);

    return () => window.clearInterval(slideTimer);
  }, [hasMultipleImages, images.length, isGalleryPaused]);

  return (
    <article id={project.slug} className="project-showcase">
      <div
        className="project-showcase-image"
        onMouseEnter={() => setIsGalleryPaused(true)}
        onMouseLeave={() => setIsGalleryPaused(false)}
        onFocus={() => setIsGalleryPaused(true)}
        onBlur={() => setIsGalleryPaused(false)}
      >
        <img src={images[activeImageIndex]} alt={project.title} loading="lazy" />
        {hasMultipleImages ? (
          <div className="project-showcase-nav" aria-label={`${project.title} gallery controls`}>
            <button type="button" onClick={showPreviousImage} aria-label={`Show previous ${project.title} image`}>
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button type="button" onClick={showNextImage} aria-label={`Show next ${project.title} image`}>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        ) : null}
      </div>

      <div className="project-showcase-copy">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h3>{project.title}</h3>
          <p className="project-showcase-meta">
            {project.location} &bull; {project.year} &bull; {project.status}
          </p>
        </div>
        <div>
          <p>{project.description}</p>
          <ul className="project-showcase-services">
            {project.services.slice(0, 5).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Hospitality", "Commercial", "Residential", "Public Infrastructure", "Education", "Concepts"];
  const heroProject =
    gprojectsPortfolioProjects.find((project) => project.slug === "oxygen-hotel-resort-owerri") ??
    gprojectsPortfolioProjects[0];
  const filteredProjects =
    activeFilter === "All"
      ? gprojectsPortfolioProjects
      : gprojectsPortfolioProjects.filter((project) => project.categoryGroup === activeFilter);

  return (
    <>
      <section id="top" className="projects-hero">
        <img src={heroProject.coverImage} alt="" className="projects-hero-bg" aria-hidden="true" />
        <div className="projects-hero-overlay" aria-hidden="true" />
        <div className="container projects-hero-inner">
          <span className="eyebrow eyebrow--mint">GProjects Portfolio</span>
          <h1>Projects That Speak Through Delivery</h1>
          <p>
            From hospitality developments and public infrastructure to commercial interiors, residential projects and concept design, GProjects delivers built environments with precision, structure and purpose.
          </p>
        </div>
      </section>

      <section id="project-portfolio" className="projects-grid-section">
        <div className="container">
          <div className="projects-filter-line" aria-label="Project categories">
            {filters.map((filter) => (
              <button
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                onClick={() => setActiveFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-showcase-list">
            {filteredProjects.map((project) => (
              <ProjectShowcase project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [locationState, setLocationState] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncLocation = () => {
      setLocationState({
        pathname: window.location.pathname,
        hash: window.location.hash,
      });
    };

    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);

    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, []);

  const hashRoute = APP_BASE && locationState.hash.startsWith("#/")
    ? locationState.hash.slice(2)
    : "";
  const hashParts = hashRoute.split("/").filter(Boolean);
  const hashRoutePath = hashParts[0]
    ? hashParts[0] === "home"
      ? "/"
      : hashParts[0] === "blog" && hashParts.length > 1
        ? `/blog/${hashParts.slice(1).join("/")}`
        : `/${hashParts[0]}`
    : "";
  const hashTarget = hashParts[0] === "home"
    ? hashParts[1] ?? ""
    : hashParts[0] === "services" || hashParts[0] === "projects" || hashParts[0] === "workforce"
      ? hashParts[1] ?? ""
      : "";
  const pathname = APP_BASE && locationState.pathname.startsWith(APP_BASE)
    ? locationState.pathname.slice(APP_BASE.length) || "/"
    : locationState.pathname;
  const routedPath = hashRoutePath || pathname;
  const currentPath = BLOG_ROUTE_ALIASES[routedPath] ?? routedPath;
  const isServicesPage = currentPath === "/services" || currentPath === "/about";
  const isWorkforcePage = currentPath === "/workforce";
  const isBlogPage = currentPath === "/blog";
  const isProjectsPage = currentPath === "/projects";
  const activeBlogPost = blogItems.find(
    (item) => item.type === "Blog Article" && item.href === currentPath,
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath, locationState.hash]);

  useEffect(() => {
    const cardSelector = ".service-card, .why-partner-card, .buildit-link-list a, .workforce-opportunities-list li, .ecosystem-role-card, .service-detail-card, .subpage-why-card, .workforce-benefit-card, .workforce-step, .workforce-faq-list details, .blog-post-row, .blog-recent-item, .blog-quote-card, .portfolio-card, .project-showcase, .project-facts-panel";
    const textSelector = [
      "main section:not(.hero-section) .eyebrow",
      "main section:not(.hero-section) h2",
      "main section:not(.hero-section) h3",
      "main section:not(.hero-section) p",
      "main section:not(.hero-section) .button",
      "main section:not(.hero-section) .button-link",
      ".footer-logo-row",
      ".footer li",
    ].join(", ");

    document.querySelectorAll<HTMLElement>(textSelector).forEach((element) => {
      if (!element.closest(cardSelector)) {
        element.classList.add("scroll-reveal");
      }
    });

    document.querySelectorAll<HTMLElement>(cardSelector).forEach((element, index) => {
      element.classList.add("reveal-pop");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    document
      .querySelectorAll<HTMLElement>(
        ".about-copy, .why-partner-copy, .buildit-ecosystem-intro > div:first-child, .workforce-opportunities-visual, .footer-brand-block, .footer-info-block, .subpage-hero-copy, .story-grid > div:first-child, .service-detail-image, .project-overview-grid > div:first-child",
      )
      .forEach((element) => element.classList.add("reveal-left"));

    document
      .querySelectorAll<HTMLElement>(
        ".about-image, .why-partner-grid, .buildit-ecosystem-copy, .workforce-opportunities-content, .footer-newsletter, .subpage-hero-media, .story-copy, .workforce-hero-visual, .workforce-tally-embed, .project-facts-panel",
      )
      .forEach((element) => element.classList.add("reveal-right"));

    const revealElements = document.querySelectorAll<HTMLElement>(
      ".scroll-reveal, .reveal-pop, .reveal-left, .reveal-right",
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const targetId = hashTarget || (!locationState.hash.startsWith("#/") ? locationState.hash.slice(1) : "");
    const headerOffset = 86;

    const scrollToHashTarget = () => {
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: "auto" });
    };

    const immediateScroll = window.setTimeout(scrollToHashTarget, 0);
    const settledScroll = window.setTimeout(scrollToHashTarget, 180);

    return () => {
      window.clearTimeout(immediateScroll);
      window.clearTimeout(settledScroll);
    };
  }, [currentPath, hashTarget, locationState.hash]);

  return (
    <div className="site-shell">
      <header className={`site-header site-header--solid ${isMobileMenuOpen ? "is-menu-open" : ""}`}>
        <div className="container header-inner">
          <a href={siteHref("/")} className="brand" aria-label="GProjects Limited home">
            <img src={logoAsset} alt="GProjects Limited" className="brand-logo" />
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href={siteHref("/")} onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href={siteHref("/services")} onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href={siteHref("/services#full-services")} onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href={siteHref("/projects")} onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            <a href={siteHref("/blog")} onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
            <a href={BUILD_IT_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>BuildIT</a>
            <a href={siteHref("/workforce")} onClick={() => setIsMobileMenuOpen(false)}>Workforce</a>
          </nav>

          <a href="#contact" className="header-cta">
            Start a Project
          </a>

          <button
            type="button"
            className="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        {activeBlogPost ? (
          <BlogArticlePage post={activeBlogPost} />
        ) : isBlogPage ? (
          <BlogPage />
        ) : isProjectsPage ? (
          <ProjectsPage />
        ) : isServicesPage ? (
          <AboutServicesPage />
        ) : isWorkforcePage ? (
          <WorkforcePage />
        ) : (
          <>
        <section id="top" className="hero-section">
          <div className="hero-bg" aria-hidden="true">
            <img src={heroImg} alt="" />
            <div className="hero-overlay" />
          </div>

          <div className="container hero-content">
            <div className="rise">
              <span className="eyebrow eyebrow--mint">
                Conceived in Dubai - Inspired by creativity, innovation &amp; sustainability
              </span>
            </div>

            <h1 className="hero-title rise-2">
              Architecture, construction and project intelligence -{" "}
              <em>delivered with precision</em>.
            </h1>

            <p className="hero-copy rise-3">
              GProjects Limited delivers architectural, construction, project management, technology and workforce solutions for real estate, infrastructure and development projects.
            </p>

            <div className="hero-actions rise-4">
              <a href="#contact" className="button button--light">
                Start a Project <span aria-hidden="true">&rarr;</span>
              </a>
              <a href="#contact" className="button-link button-link--light">
                Request Company Profile
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-copy">
              <span className="eyebrow">About us</span>
              <h2>
                Where real-sector vision becomes <em>structured delivery</em>.
              </h2>
              <p>
                GProjects Limited was created to move ideas from vision into execution. It sits at the intersection of architecture, construction, project management, technology, workforce development, and enterprise delivery.
              </p>
              <p>
                As part of the wider G Initiative ecosystem, GProjects creates systems for delivery, bringing structure to planning, procurement, site coordination, workforce alignment and long-term project value.
              </p>
              <a href={siteHref("/services")} className="button button--forest">
                Learn More <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="about-image">
              <img src={pageImages.aboutAlt} alt="GProjects architecture and construction delivery" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="services-heading">
              <span className="eyebrow">Our Services</span>
              <h2>Structured Solutions for Every Stage of Delivery</h2>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <a href={siteHref(service.href)} className="service-link">
                    View More
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-gprojects" className="section why-partner-section">
          <div className="container">
            <div className="why-partner-layout">
              <div className="why-partner-copy">
                <span className="eyebrow">Why GProjects</span>
                <h2>Built for projects that need more than promises.</h2>
              <p>
                GProjects is structured for real-sector delivery — bringing together planning, construction, project coordination, workforce access, procurement support, financial visibility, and digital systems to help projects move from idea to execution with greater clarity and accountability.
              </p>
              <div className="why-partner-action">
                <a href="#contact" className="button">
                    Partner With Us
                </a>
              </div>
            </div>

              <div className="why-partner-grid">
              {whyGProjects.map((item, index) => (
                <article
                  className={`why-partner-card ${index === 0 ? "why-partner-card--featured" : ""}`}
                  key={item.title}
                >
                  <div className="why-partner-icon">
                    <WhyIcon name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section id="buildit" className="section buildit-ecosystem-section">
          <div className="container">
            <div className="buildit-ecosystem-intro">
              <div>
                <span className="eyebrow">GProjects × BuildIT</span>
                <h2>What if every project had a brain?</h2>
              </div>
              <div className="buildit-ecosystem-copy">
                <p>
                  BuildIT is the flagship digital ecosystem developed by GProjects to connect construction, real estate, project management, material sourcing, professional hiring, and global trade — giving projects a smarter path from planning to delivery.
                </p>
                <p>
                  It brings the physical side of building and the digital side of project coordination into one connected ecosystem, helping clients, suppliers, artisans, professionals, and project teams work with more clarity, visibility, and control.
                </p>
              </div>
            </div>

            <div className="buildit-link-list" aria-label="BuildIT ecosystem areas">
              {buildItPillars.map((pillar) => (
                <a href={pillar.href} key={pillar.title} target="_blank" rel="noopener noreferrer">
                  {pillar.title}
                </a>
              ))}
            </div>

            <div className="buildit-ecosystem-action">
              <a href={BUILD_IT_URL} className="button button--forest" target="_blank" rel="noopener noreferrer">
                View More <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section id="workforce" className="section workforce-opportunities-section">
          <div className="container">
            <div className="workforce-opportunities-grid">
              <div className="workforce-opportunities-visual">
                <img src={blogWorkforceImg} alt="GProjects workforce and project delivery" loading="lazy" />
              </div>

              <div className="workforce-opportunities-content">
                <span className="eyebrow eyebrow--mint">Workforce Opportunities</span>
                <h2>Bring your skillset to the table.</h2>
                <p>
                  GProjects Limited welcomes job seekers, NYSC Corps Members, artisans, handymen, skilled and unskilled workers, project managers, and construction professionals into a growing project delivery network.
                </p>
                <p>
                  Through BuildIT's Professional Job Pool, GProjects connects verified workers and project professionals to real opportunities across active and future projects.
                </p>

                <ul className="workforce-opportunities-list">
                  {workforceCategories.map((category) => (
                    <li key={category}>
                      <span aria-hidden="true" />
                      {category}
                    </li>
                  ))}
                </ul>

                <div className="workforce-opportunities-actions">
                  <a href={siteHref("/workforce")} className="button button--light">
                    Join the Workforce <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a
                    href={`${BUILD_IT_JOB_POOL_URL}`}
                    className="button-link button-link--light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore BuildIT Job Pool
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="compact-cta-section" aria-label="Start a project">
          <div className="compact-cta-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="compact-cta-house" aria-hidden="true" />
          <div className="container compact-cta-inner">
            <h2>Ready to start your next project?</h2>
            <p>
              Speak with GProjects about planning, construction, project management, workforce support, or BuildIT-powered delivery.
            </p>
            <div className="compact-cta-actions">
              <a href="#contact" className="button button--forest">
                Start a Project
              </a>
            </div>
          </div>
        </section>
          </>
        )}
      </main>

      <footer id="contact" className="footer">
        <img src={heroImg} alt="" className="footer-bg" aria-hidden="true" />
        <div className="footer-overlay" aria-hidden="true" />
        <div className="container footer-inner">
          <div className="footer-grid">
            <div className="footer-brand-block">
              <div className="footer-logo-row">
                <span>
                  <img src={logoAsset} alt="GProjects Limited" />
                </span>
                <strong>
                  GProjects
                  <small>Limited</small>
                </strong>
              </div>
              <p>
                Conceived in Dubai, inspired by cutting-edge, innovative applications of creativity and sustainability in the real sector.
              </p>
            </div>

            <div className="footer-info-block">
              <ul className="footer-contact-icons">
                <li>
                  <a href={PHONE_HREF}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.4.2 2.8.6 4 .1.4 0 .8-.3 1.2l-2.2 2.2Z" />
                    </svg>
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="4" y="4" width="16" height="16" rx="5" />
                      <circle cx="12" cy="12" r="3.5" />
                      <path d="M17 7.3h.1" />
                    </svg>
                    {INSTAGRAM_HANDLE}
                  </a>
                </li>
                <li>
                  <a href={LOCATION_URL} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12Z" />
                      <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    </svg>
                    Port Harcourt, Nigeria
                  </a>
                </li>
              </ul>
              <div className="footer-work-hours">
                <div className="eyebrow eyebrow--mint">Work Hours</div>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: By appointment</p>
              </div>
            </div>

            <div className="footer-newsletter">
              <h3>Subscribe for project updates and BuildIT insights</h3>
              <form className="footer-subscribe" aria-label="Subscribe to GProjects updates">
                <input type="email" placeholder="Enter your Email" aria-label="Email address" />
                <button type="submit">Subscribe Now</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 GProjects Limited. All rights reserved.</p>
            <p>
              Designed and built by{" "}
              <a href="https://teravora.com" target="_blank" rel="noopener noreferrer">
                Teravora
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;






