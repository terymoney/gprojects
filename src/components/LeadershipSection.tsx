type LeadershipSectionProps = {
  variant: "homepage" | "about";
  image: string;
  calligraphyImage?: string;
  storyHref?: string;
};

const leadershipAlt =
  "Arch. Ganiru S. Okoro, Managing Director and Lead Architect of GProjects Limited";

const leadershipFocusAreas = [
  "Architectural and project leadership",
  "Sustainable real-sector development",
  "Hospitality, educational and commercial projects",
  "Community-focused development vision",
];

function LeadershipIdentity() {
  return (
    <div className="leadership-identity">
      <h3>Arch. Ganiru S. Okoro</h3>
      <p>Managing Director &amp; Lead Architect, GProjects Limited</p>
      <span>Architecture. Enterprise. Sustainable Development.</span>
    </div>
  );
}

function LeadershipPortrait({ image }: { image: string }) {
  return (
    <figure className="leadership-portrait reveal-left">
      <div className="leadership-portrait-frame">
        <img src={image} alt={leadershipAlt} loading="lazy" />
      </div>
    </figure>
  );
}

export default function LeadershipSection({
  variant,
  image,
  calligraphyImage,
  storyHref = "#lead-architect",
}: LeadershipSectionProps) {
  const isHomepage = variant === "homepage";
  const titleId = isHomepage ? "leadership-title" : "lead-architect-title";

  const leadershipTop = (
    <>
        <LeadershipPortrait image={image} />

        <div className="leadership-content reveal-right">
          <span className="eyebrow">{isHomepage ? "Leadership" : "Meet the Lead Architect"}</span>
          <h2 id={titleId}>
            {isHomepage
              ? "Visionary architecture shaped by heritage, innovation and purposeful delivery."
              : "Meet the vision behind GProjects."}
          </h2>

          <LeadershipIdentity />

          {isHomepage ? (
            <>
              <div className="leadership-copy">
                <p>
                  Arch. Ganiru S. Okoro leads the architectural and project-delivery vision of GProjects Limited. Inspired by an architectural heritage and shaped by his exposure to Dubai's ambitious built environment, his work brings together creative design, sustainability, cultural identity and practical execution.
                </p>
                <p>
                  Through GProjects, he is committed to developing projects that create long-term value while advancing a wider vision for innovative and sustainable development across Ala-Igbo and beyond.
                </p>
                {calligraphyImage ? (
                  <span className="leadership-signoff" aria-hidden="true">
                    <img src={calligraphyImage} alt="" />
                  </span>
                ) : null}
              </div>

              <ul className="leadership-focus-list">
                {leadershipFocusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a href={storyHref} className="button button--forest">
                Read His Story <span aria-hidden="true">&rarr;</span>
              </a>
            </>
          ) : (
            <div className="leadership-copy leadership-copy--full leadership-copy--intro">
              <p>
                Arch. Ganiru S. Okoro is an architect and project-development leader whose work is rooted in heritage, innovation, sustainability and a long-term vision for the built environment.
              </p>
              <p>
                His connection to architecture began early. Raised within a family influenced by architectural thinking, he developed an appreciation for how buildings, cities and public spaces shape communities. His experience of Dubai, where ambitious concepts are transformed into globally recognised developments, further strengthened his belief that bold ideas can become reality when supported by planning, collaboration and disciplined execution.
              </p>
              <p>
                He pursued architectural studies at the American University in Dubai, gaining exposure to an environment defined by modern design, rapid infrastructure development and innovative urban planning.
              </p>
            </div>
          )}
        </div>
    </>
  );

  return (
    <section
      id={isHomepage ? "leadership" : "lead-architect"}
      className={`section leadership-section leadership-section--${variant}`}
      aria-labelledby={titleId}
    >
      {isHomepage ? (
        <div className="container leadership-grid">{leadershipTop}</div>
      ) : (
        <div className="container leadership-layout">
          <div className="leadership-grid">{leadershipTop}</div>
          <div className="leadership-profile-wide leadership-copy leadership-copy--full">
            <h3>A vision for Ala-Igbo</h3>
            <p>
              Ganiru's work is driven by a vision to help position Ala-Igbo as a region capable of producing distinctive, sustainable and globally relevant architecture. He sees significant development potential across the South-East and believes architecture can contribute to economic growth, cultural preservation, tourism, education and stronger communities.
            </p>
            <p>
              His approach combines contemporary design with local identity, encouraging projects that are environmentally responsible, intellectually ambitious and relevant to the people they serve.
            </p>

            <h3>Project experience</h3>
            <p>
              His project experience spans hospitality, education, commercial development, residential architecture and cultural infrastructure. His body of work includes projects connected to Crunchies Fast Food developments, Broadoak School, Oxygen Holiday Resorts and other residential, hospitality and commercial developments.
            </p>
            <p>
              Through GProjects, he provides leadership across architectural design, construction coordination, project management, enterprise development and technology-enabled project delivery.
            </p>

            <h3>Leadership beyond architecture</h3>
            <p>
              His leadership extends beyond physical development. Through the wider G Initiative ecosystem, he supports programmes connected to social impact, sustainability, education, empowerment and community development.
            </p>
            <p>
              This combination of architecture, enterprise and social responsibility reflects the wider purpose behind GProjects: to create projects that are not only visually meaningful, but capable of delivering lasting economic and human value.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
