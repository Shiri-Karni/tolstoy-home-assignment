/**
 * Step definitions for the /upload-directly questionnaire (5 steps).
 * Steps with allowSkip are optional; others require input before Continue.
 */

/** @typedef {'building' | 'chart' | 'sparkle' | 'users' | 'goals'} UploadStepIcon */

/**
 * @typedef {Object} UploadDirectlyStep
 * @property {number} step
 * @property {UploadStepIcon} icon
 * @property {string} title
 * @property {string} [subtitle]
 * @property {'input' | 'textarea'} inputType
 * @property {string} placeholder
 * @property {'brandName' | 'field' | 'story' | 'audience' | 'contentGoals'} field
 * @property {boolean} mandatory
 * @property {boolean} [allowSkip]
 * @property {string} [primaryLabel]
 */

export const UPLOAD_DIRECTLY_TOTAL_STEPS = 5

/** @type {UploadDirectlyStep[]} */
export const UPLOAD_DIRECTLY_STEPS = [
  {
    step: 1,
    icon: 'building',
    title: "First things first - what's your brand called? ✨",
    inputType: 'input',
    placeholder: "e.g., Sunrise Coffee Co., TechFlow, Bella's Boutique...",
    field: 'brandName',
    mandatory: true,
    primaryLabel: 'Continue',
  },
  {
    step: 2,
    icon: 'chart',
    title: 'What field are you in?',
    inputType: 'input',
    placeholder: 'e.g. fashion, edtech, food...',
    field: 'field',
    mandatory: false,
    allowSkip: true,
    primaryLabel: 'Continue',
  },
  {
    step: 3,
    icon: 'sparkle',
    title: 'Tell us your story! What do you do?',
    subtitle:
      "Describe what you sell, who you help, and what makes you special. Pretend you're telling a friend!",
    inputType: 'textarea',
    placeholder:
      'e.g., we make handcrafted pottery for people who love unique home decor. Each piece is one-of-a-kind and made with love...',
    field: 'story',
    mandatory: true,
    primaryLabel: 'Continue',
  },
  {
    step: 4,
    icon: 'users',
    title: 'Who are you trying to reach?',
    subtitle:
      'Paint us a picture of your dream customer. Age? Vibe? What are they into?',
    inputType: 'textarea',
    placeholder:
      'e.g., creative millennials who care about sustainability and authenticity',
    field: 'audience',
    mandatory: false,
    allowSkip: true,
    primaryLabel: 'Continue',
  },
  {
    step: 5,
    icon: 'goals',
    title: 'What are you hoping your content will do for you?',
    subtitle:
      "Tell us more about your goals for your content. Whether it's to build trust, drive sales, or educate your customers.",
    inputType: 'textarea',
    placeholder:
      'e.g. we want to show how easy it is to use our products and show actual customers that have used it. We want to build trust and show how the product looks in real life.',
    field: 'contentGoals',
    mandatory: true,
    primaryLabel: "See what's best for me",
  },
]
