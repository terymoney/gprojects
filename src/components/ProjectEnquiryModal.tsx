import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent, MouseEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrenqvdv";

const serviceOptions = [
  "Architecture and Design",
  "Construction",
  "Project Management",
  "Renovation or Rehabilitation",
  "Interior Design and Fit-Out",
  "Real Estate Development",
  "Procurement and Material Sourcing",
  "Workforce or Technical Support",
  "BuildIT-Powered Project Support",
  "Partnership or Collaboration",
  "Other",
];

const projectStages = [
  "I only have an idea",
  "I am currently searching for land",
  "I already own the land",
  "Design or planning stage",
  "Approvals or documentation stage",
  "Ready to begin construction",
  "Construction is already in progress",
  "Renovation or rehabilitation is needed",
  "I need help completing an abandoned project",
  "Not sure yet",
];

const contactMethods = ["Email", "Phone call", "WhatsApp", "No preference"];

const timelines = [
  "As soon as possible",
  "Within 1-3 months",
  "Within 3-6 months",
  "Within 6-12 months",
  "More than one year from now",
  "I am still exploring",
];

type ProjectEnquiryFormData = {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  project_location: string;
  project_stage: string;
  preferred_contact_method: string;
  project_timeline: string;
  message: string;
  _gotcha: string;
};

type ProjectEnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string;
  triggerLabel?: string;
};

type SelectFieldName = "project_type" | "project_stage" | "preferred_contact_method" | "project_timeline";

const initialFormData: ProjectEnquiryFormData = {
  name: "",
  email: "",
  phone: "",
  project_type: "",
  project_location: "",
  project_stage: "",
  preferred_contact_method: "",
  project_timeline: "",
  message: "",
  _gotcha: "",
};

function ProjectCustomSelect({
  id,
  name,
  label,
  value,
  placeholder,
  options,
  required = false,
  error = "",
  onChange,
}: {
  id: string;
  name: SelectFieldName;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  error?: string;
  onChange: (field: SelectFieldName, value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-list`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [isOpen]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
    }

    if ((event.key === "Enter" || event.key === " ") && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={`project-form-field project-custom-select ${isOpen ? "is-open" : ""}`} ref={selectRef}>
      <label id={`${id}-label`} htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <input type="hidden" id={id} name={name} value={value} />
      <button
        type="button"
        className={`project-select-trigger ${value ? "has-value" : ""} ${error ? "has-error" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
        aria-controls={listId}
        data-custom-select={name}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span>{value || placeholder}</span>
        <span aria-hidden="true" />
      </button>
      {error ? <small className="project-select-error">{error}</small> : null}
      {isOpen ? (
        <div className="project-select-menu" id={listId} role="listbox" aria-labelledby={`${id}-label`}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              className={value === option ? "is-selected" : ""}
              key={option}
              onClick={() => {
                onChange(name, option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectEnquiryModal({
  isOpen,
  onClose,
  presetService = "",
  triggerLabel = "",
}: ProjectEnquiryModalProps) {
  const [formData, setFormData] = useState<ProjectEnquiryFormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [selectErrors, setSelectErrors] = useState<Partial<Record<SelectFieldName, string>>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const presetTimer = presetService
      ? window.setTimeout(() => {
          setFormData((current) => ({ ...current, project_type: presetService }));
        }, 0)
      : 0;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => nameInputRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modalRef.current?.querySelector(".project-custom-select.is-open")) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusableElements.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(presetTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, presetService]);

  if (!isOpen) {
    return null;
  }

  const updateField = (field: keyof ProjectEnquiryFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const updateSelectField = (field: SelectFieldName, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setSelectErrors((current) => ({ ...current, [field]: "" }));
  };

  const resetAndClose = () => {
    setFormData(initialFormData);
    setSelectErrors({});
    setStatus("idle");
    onClose();
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextSelectErrors: Partial<Record<SelectFieldName, string>> = {};
    if (!formData.project_type) {
      nextSelectErrors.project_type = "Please select a service.";
    }
    if (!formData.project_stage) {
      nextSelectErrors.project_stage = "Please select the current project stage.";
    }

    if (Object.keys(nextSelectErrors).length) {
      setSelectErrors(nextSelectErrors);
      const firstMissingField = nextSelectErrors.project_type ? "project_type" : "project_stage";
      modalRef.current?.querySelector<HTMLElement>(`[data-custom-select="${firstMissingField}"]`)?.focus();
      return;
    }

    const payload = new FormData(event.currentTarget);

    if (payload.get("_gotcha")) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const setInvalidMessage = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const messages: Record<string, string> = {
      name: "Please enter your full name.",
      email: "Please enter a valid email address.",
      phone: "Please enter your phone number.",
      project_type: "Please select a service.",
      project_location: "Please provide the general project location.",
      project_stage: "Please select the current project stage.",
      message: "Please provide a short description of your project.",
    };

    target.setCustomValidity(messages[target.name] ?? "Please complete this field.");
  };

  const clearInvalidMessage = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.setCustomValidity("");
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="project-modal" role="presentation" onClick={closeFromBackdrop}>
      <div
        ref={modalRef}
        className="project-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close project enquiry form">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="project-modal-state">
            <span className="eyebrow">Start a Project</span>
            <h2 id="project-modal-title">Thank you for contacting GProjects.</h2>
            <p>Your project enquiry has been received. A member of our team will contact you shortly.</p>
            <button type="button" className="button button--forest" onClick={resetAndClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="project-modal-heading">
              <span className="eyebrow">Start a Project</span>
              <h2 id="project-modal-title">Tell us what you're planning.</h2>
              <p>
                Share a few details about your project and the GProjects team will contact you to discuss the next steps.
              </p>
            </div>

            {status === "error" ? (
              <div className="project-modal-error" role="alert">
                <div>
                  <strong>Your enquiry could not be sent.</strong>
                  <p>
                    Please check your internet connection and try again. You may also contact GProjects directly at info@gprojects.ng.
                  </p>
                </div>
                <div>
                  <button type="button" onClick={() => setStatus("idle")}>
                    Try Again
                  </button>
                  <a href="mailto:info@gprojects.ng">Email GProjects</a>
                </div>
              </div>
            ) : null}

            <form className="project-enquiry-form" onSubmit={submitForm}>
              <input type="hidden" name="_subject" value="New GProjects Project Enquiry" />
              <input type="hidden" name="source_page" value={window.location.href} />
              <input type="hidden" name="trigger_label" value={triggerLabel || "Start a Project"} />
              <label className="project-honeypot">
                Do not fill this field
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(event) => updateField("_gotcha", event.target.value)}
                />
              </label>

              <div className="project-form-field">
                <label htmlFor="project-name">Full Name *</label>
                <input
                  ref={nameInputRef}
                  id="project-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  onInvalid={setInvalidMessage}
                  onInput={clearInvalidMessage}
                />
              </div>

              <div className="project-form-field">
                <label htmlFor="project-email">Email Address *</label>
                <input
                  id="project-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  onInvalid={setInvalidMessage}
                  onInput={clearInvalidMessage}
                />
                <small>We will use this email to respond to your enquiry.</small>
              </div>

              <div className="project-form-field">
                <label htmlFor="project-phone">Phone Number *</label>
                <input
                  id="project-phone"
                  type="tel"
                  name="phone"
                  placeholder="e.g. +234 801 234 5678"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  onInvalid={setInvalidMessage}
                  onInput={clearInvalidMessage}
                />
                <small>Include your country code where applicable.</small>
              </div>

              <div className="project-form-field">
                <label htmlFor="project-location">Project Location *</label>
                <input
                  id="project-location"
                  type="text"
                  name="project_location"
                  placeholder="City, state and country"
                  required
                  value={formData.project_location}
                  onChange={(event) => updateField("project_location", event.target.value)}
                  onInvalid={setInvalidMessage}
                  onInput={clearInvalidMessage}
                />
                <small>An exact street address is not required at this stage.</small>
              </div>

              <ProjectCustomSelect
                id="project-type"
                name="project_type"
                label="What service are you interested in?"
                required
                value={formData.project_type}
                placeholder="Select a service"
                options={serviceOptions}
                error={selectErrors.project_type}
                onChange={updateSelectField}
              />

              <ProjectCustomSelect
                id="project-stage"
                name="project_stage"
                label="What stage is the project currently at?"
                required
                value={formData.project_stage}
                placeholder="Select the current stage"
                options={projectStages}
                error={selectErrors.project_stage}
                onChange={updateSelectField}
              />

              <ProjectCustomSelect
                id="preferred-contact"
                name="preferred_contact_method"
                label="Preferred Contact Method"
                value={formData.preferred_contact_method}
                placeholder="Choose how you would like us to contact you"
                options={contactMethods}
                onChange={updateSelectField}
              />

              <ProjectCustomSelect
                id="project-timeline"
                name="project_timeline"
                label="When would you like to begin?"
                value={formData.project_timeline}
                placeholder="Select an approximate timeline"
                options={timelines}
                onChange={updateSelectField}
              />

              <div className="project-form-field project-form-field--wide">
                <label htmlFor="project-message">Tell Us About Your Project *</label>
                <textarea
                  id="project-message"
                  name="message"
                  placeholder="Briefly describe what you would like to build, renovate, manage or develop. Include any important details, concerns or support you require."
                  required
                  minLength={20}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  onInvalid={setInvalidMessage}
                  onInput={clearInvalidMessage}
                />
              </div>

              <p className="project-form-privacy">
                Your information will only be used to review and respond to your project enquiry.
              </p>

              <button type="submit" className="button button--forest project-form-submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <span className="project-form-spinner" aria-hidden="true" />
                    Sending Enquiry...
                  </>
                ) : (
                  "Submit Project Enquiry"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
