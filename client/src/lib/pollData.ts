/**
 * Poll data configuration for the Luxury Community Poll
 * Design: Editorial Minimalism — Playfair Display + Inter, cream/charcoal/gold palette
 * All images served from CDN
 *
 * Sections:
 *   1. Lifestyle Intelligence Index (q0–q6) — original 7 questions
 *   2. Household & Life Stage (q7–q9)
 *   3. Age & Work Stage (q10–q11)
 *   4. Availability (q12–q13)
 *   5. Wellness (q14–q15)
 *   6. Lifestyle Interests (q16–q17)
 *   7. Pets & Hobbies (q18–q19)
 *   8. Communication (q20)
 */

export interface PollOption {
  label: string;
  image?: string;
}

export interface ConditionalField {
  /** Which option label triggers the field */
  triggerValue: string;
  /** Placeholder text for the input */
  placeholder: string;
  /** Key to store the value under (e.g. "q9Ages") */
  fieldKey: string;
}

export interface PollQuestion {
  headline: string;
  options: PollOption[];
  /** If true, user can select multiple options */
  multiSelect?: boolean;
  /** Max number of selections for multi-select */
  maxSelect?: number;
  /** Conditional text field that appears when a specific option is selected */
  conditionalField?: ConditionalField;
  /** Section category for analytics grouping */
  section: string;
}

export interface SectionDivider {
  headline: string;
  subtext: string;
  image?: string;
}

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030067302";

/**
 * Section dividers — shown between question groups
 * Key = index of the first question in the section
 */
export const sectionDividers: Record<number, SectionDivider> = {
  7: {
    headline: "Tell Us About Your Lifestyle",
    subtext: "This helps us tailor experiences to your season of life.",
    image: `${CDN}/pneNzHcYtDudAtWo.png`,
  },
  10: {
    headline: "Age & Career",
    subtext: "A quick snapshot to help us plan around your schedule.",
    image: `${CDN}/LPQBbtrHHSvgomXa.jpg`,
  },
  12: {
    headline: "Your Availability",
    subtext: "So we can plan events when you're most likely to attend.",
  },
  14: {
    headline: "Wellness & Fitness",
    subtext: "Help us curate the right wellness experiences for you.",
    image: `${CDN}/MpcIjPLcJVoWfght.jpg`,
  },
  16: {
    headline: "Lifestyle & Events",
    subtext: "What kind of experiences excite you most?",
    image: `${CDN}/HXEPkvyuTKNKixnq.jpeg`,
  },
  18: {
    headline: "Pets & Hobbies",
    subtext: "The little details that make our community unique.",
    image: `${CDN}/xMQAzLrWeNjuwqgn.png`,
  },
  20: {
    headline: "Stay Connected",
    subtext: "How would you like to hear about upcoming events?",
    image: `${CDN}/tUEVBCZIUyvGyJfz.jpg`,
  },
};

export const questions: PollQuestion[] = [
  // ── Section 1: Lifestyle Intelligence Index (q0–q6) ──
  {
    headline: "How would friends describe you?",
    section: "Lifestyle",
    options: [
      { label: "Social Connector", image: `${CDN}/SnfGcyEfDodHDCpd.jpg` },
      { label: "Wellness Focused", image: `${CDN}/DlcPiGwfftCsfdHc.jpg` },
      { label: "Luxury Lover", image: `${CDN}/esIxOmCrqkMKObxu.jpg` },
      { label: "Lifelong Learner", image: `${CDN}/zOcysqKlaisbvKSc.jpg` },
      { label: "Adventurous Spirit", image: `${CDN}/uKJzVnSTfstWROxf.jpg` },
      { label: "Selectively Private", image: `${CDN}/xNrebPdUvVWANptC.jpg` },
    ],
  },
  {
    headline: "When you attend events, you\u2026",
    section: "Lifestyle",
    options: [
      { label: "Bring Guests", image: `${CDN}/LZyENmKsspSrPjDp.jpg` },
      { label: "Come Solo", image: `${CDN}/kHviZmLiKjOTUcEK.jpg` },
      { label: "Prefer Exclusive", image: `${CDN}/hWHczaTsiunpXsSX.jpg` },
      { label: "Like Small Groups", image: `${CDN}/CBKOMsGZwLwRZybp.jpg` },
      { label: "Attend Most", image: `${CDN}/vCkjfjcuqdVzokrd.jpg` },
    ],
  },
  {
    headline: "What makes you proud to live here?",
    section: "Lifestyle",
    options: [
      { label: "The People", image: `${CDN}/nmJhrOxtxbhUYcZu.jpg` },
      { label: "The Amenities", image: `${CDN}/aSTkppnnzZgdLOpZ.jpg` },
      { label: "The Location", image: `${CDN}/wVkNmUfpRvfTSEBI.jpg` },
      { label: "The Reputation", image: `${CDN}/VlNOfHRVDzDWNrGY.jpg` },
      { label: "The Future Vision", image: `${CDN}/MDVQHeLdXsxIrnhR.jpg` },
    ],
  },
  {
    headline: "What would WOW you?",
    section: "Lifestyle",
    options: [
      { label: "Private Chef Night", image: `${CDN}/IpiwHGvozLAUmUlx.jpg` },
      { label: "Longevity Lab", image: `${CDN}/KcSzhzkgksKXFaks.jpg` },
      { label: "Black Tie Gala", image: `${CDN}/WLJPmAWIxrLLoAgM.jpg` },
      { label: "Sunset Party", image: `${CDN}/bhfPyuOiuGlBHlQU.jpg` },
      { label: "Executive Salon", image: `${CDN}/JVyKOUygjTUgEvoZ.jpg` },
      { label: "Something Unexpected", image: `${CDN}/ojrEyEwmyeRBSMjr.jpg` },
    ],
  },
  {
    headline: "What would make you invite a friend?",
    section: "Lifestyle",
    options: [
      { label: "Elegant & Upscale", image: `${CDN}/TciAztsFmHqEsUrK.jpg` },
      { label: "High Energy Fun", image: `${CDN}/HcElROualeZogVjA.jpg` },
      { label: "Health Focused", image: `${CDN}/WBYwjTiLZlrBqYoE.jpg` },
      { label: "Thought Provoking", image: `${CDN}/DDeDbQXPhpzkNEpW.jpg` },
      { label: "Family Friendly", image: `${CDN}/vPqxLdMigVEMight.jpg` },
      { label: "Invite Only VIP", image: `${CDN}/IpoQvawTskFmeWoi.jpg` },
    ],
  },
  {
    headline: "What format do you prefer?",
    section: "Lifestyle",
    options: [
      { label: "Large Events", image: `${CDN}/QaTQekRQNEZEFmIg.jpg` },
      { label: "Small & Curated", image: `${CDN}/hfcXqFLjnfNCpBRV.jpg` },
      { label: "Rotating Variety", image: `${CDN}/AMOjjEVcsUqlvWjF.jpg` },
      { label: "Structured Series", image: `${CDN}/VYrPBWNmhguBJQqe.jpg` },
      { label: "Surprise Pop-Ups", image: `${CDN}/GSXFajejuikYMJMZ.jpg` },
    ],
  },
  {
    headline: "Interested in VIP early access?",
    section: "Lifestyle",
    options: [
      { label: "Yes, Absolutely", image: `${CDN}/mOsGWUiqtsQNebJV.jpg` },
      { label: "Occasionally", image: `${CDN}/UNlCTEmtciyCdyQT.jpg` },
      { label: "Open to All Events", image: `${CDN}/CTvaEDqsrKWqDdxF.jpg` },
      { label: "Not Necessary", image: `${CDN}/wLZDDRwiCtAcTJIj.jpg` },
    ],
  },

  // ── Section 2: Household & Life Stage (q7–q9) ──
  {
    headline: "Which best describes your household?",
    section: "Household",
    options: [
      { label: "Single" },
      { label: "Couple" },
      { label: "Young Family" },
      { label: "Family w/ Teens" },
      { label: "Empty Nesters" },
      { label: "Retired" },
    ],
  },
  {
    headline: "Household size?",
    section: "Household",
    options: [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5+" },
    ],
  },
  {
    headline: "Children at home?",
    section: "Household",
    options: [
      { label: "No" },
      { label: "Yes" },
    ],
    conditionalField: {
      triggerValue: "Yes",
      placeholder: "Ages (optional)",
      fieldKey: "q9Ages",
    },
  },

  // ── Section 3: Age & Work Stage (q10–q11) ──
  {
    headline: "Your age range?",
    section: "Age",
    options: [
      { label: "18–29" },
      { label: "30–39" },
      { label: "40–49" },
      { label: "50–59" },
      { label: "60–69" },
      { label: "70+" },
    ],
  },
  {
    headline: "Work status?",
    section: "Age",
    options: [
      { label: "Full-Time" },
      { label: "Part-Time" },
      { label: "Retired" },
      { label: "Semi-Retired" },
    ],
  },

  // ── Section 4: Availability (q12–q13) ──
  {
    headline: "When are you most available?",
    section: "Availability",
    options: [
      { label: "Weekday Mornings" },
      { label: "Weekday Afternoons" },
      { label: "Weekday Evenings" },
      { label: "Weekend Mornings" },
      { label: "Weekend Afternoons" },
      { label: "Weekend Evenings" },
    ],
  },
  {
    headline: "How often would you attend?",
    section: "Availability",
    options: [
      { label: "Weekly" },
      { label: "2–3x / Month" },
      { label: "Monthly" },
      { label: "Occasionally" },
      { label: "Rarely" },
    ],
  },

  // ── Section 5: Wellness (q14–q15) ──
  {
    headline: "Wellness interests?",
    section: "Wellness",
    multiSelect: true,
    options: [
      { label: "Group Fitness", image: `${CDN}/LWugyBDAVaTyPbUd.jpg` },
      { label: "Yoga / Pilates", image: `${CDN}/MpcIjPLcJVoWfght.jpg` },
      { label: "Walking Club", image: `${CDN}/ABUTvtVqPAHPkZWh.jpg` },
      { label: "Strength Training", image: `${CDN}/LWugyBDAVaTyPbUd.jpg` },
      { label: "Personal Training", image: `${CDN}/dOmooegqwRmFrHaV.jpg` },
      { label: "Mobility", image: `${CDN}/wFGXkopGrjRAKNTp.jpg` },
      { label: "Meditation", image: `${CDN}/JYpJlQxGZBgRSjQS.jpg` },
      { label: "Nutrition Talks", image: `${CDN}/loyJldDIriZLoEZp.jpg` },
      { label: "None", image: `${CDN}/LqnfOUTACjjZdnwp.jpg` },
    ],
  },
  {
    headline: "Fitness level?",
    section: "Wellness",
    options: [
      { label: "Beginner" },
      { label: "Intermediate" },
      { label: "Advanced" },
      { label: "Low-Impact Preferred" },
    ],
  },

  // ── Section 6: Lifestyle Interests (q16–q17) ──
  {
    headline: "Top lifestyle interests?",
    section: "Lifestyle Interests",
    multiSelect: true,
    maxSelect: 5,
    options: [
      { label: "Social Mixers", image: `${CDN}/HXEPkvyuTKNKixnq.jpeg` },
      { label: "Live Music", image: `${CDN}/ntutfJGQiwMTTXpC.jpeg` },
      { label: "Themed Parties", image: `${CDN}/ANCOTJLuadSyuWwB.jpg` },
      { label: "Cooking / Cocktails", image: `${CDN}/arDZMShztdSgADKD.jpeg` },
      { label: "Game Nights", image: `${CDN}/hZNjbSmFPhFVwpHw.jpg` },
      { label: "Educational Talks", image: `${CDN}/OpCIEfITyBVXdlIi.jpg` },
      { label: "Outdoor Events", image: `${CDN}/tYpnkRpSDsMUHxMC.jpeg` },
      { label: "Volunteer Events", image: `${CDN}/oNPsjvktdpjehUeg.jpg` },
      { label: "Holiday Events", image: `${CDN}/oarQIxyWNJdPFfHs.jpg` },
      { label: "Family Events", image: `${CDN}/fnKoAobvkLxZJVaK.jpg` },
    ],
  },
  {
    headline: "Event energy?",
    section: "Lifestyle Interests",
    options: [
      { label: "Active" },
      { label: "Social" },
      { label: "Educational" },
      { label: "Relaxed" },
      { label: "A Mix" },
    ],
  },

  // ── Section 7: Pets & Hobbies (q18–q19) ──
  {
    headline: "Pets?",
    section: "Pets & Hobbies",
    options: [
      { label: "No", image: `${CDN}/LqnfOUTACjjZdnwp.jpg` },
      { label: "Dog(s)", image: `${CDN}/xMQAzLrWeNjuwqgn.png` },
      { label: "Cat(s)", image: `${CDN}/odiGAuWZSJIkdskT.jpg` },
      { label: "Other", image: `${CDN}/rnjykiersSCCmwdF.jpeg` },
    ],
    conditionalField: {
      triggerValue: "Other",
      placeholder: "What kind? (optional)",
      fieldKey: "q18Other",
    },
  },
  {
    headline: "Hobbies?",
    section: "Pets & Hobbies",
    multiSelect: true,
    options: [
      { label: "Travel", image: `${CDN}/DxhJIWkDDTDaQMCM.jpeg` },
      { label: "Food & Wine", image: `${CDN}/KfQiSdYobxfrUZTM.jpg` },
      { label: "Arts", image: `${CDN}/oNVxitGNFpezvGDJ.jpg` },
      { label: "Sports", image: `${CDN}/dfjrDgLNOTILzXNU.jpg` },
      { label: "Gardening", image: `${CDN}/FqTNgbqmBuFUzksJ.jpg` },
      { label: "Tech", image: `${CDN}/zkYsTtuOQVZxxcgn.jpg` },
      { label: "Reading", image: `${CDN}/dfOHsJoqrlSSCqny.jpg` },
      { label: "Cards / Games", image: `${CDN}/hZNjbSmFPhFVwpHw.jpg` },
    ],
  },

  // ── Section 8: Communication (q20) ──
  {
    headline: "How should we notify you?",
    section: "Communication",
    options: [
      { label: "Email" },
      { label: "Community App" },
      { label: "Text" },
      { label: "Printed Calendar" },
      { label: "Social Media" },
    ],
  },
];

export const questionLabels = questions.map((q) => q.headline);

/**
 * Maps question index to the backend field key.
 * For most questions it's `q{index}`, but conditional fields have special keys.
 */
export function getFieldKey(index: number): string {
  return `q${index}`;
}
