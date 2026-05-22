/**
 * Mock strategy audits for the MVP demo.
 *
 * Keys: five named demo stores (gymshark, glossier, kith, ourPlace, away),
 * plus `general`, `generalFromPhotos` for unknown URLs / screenshot uploads.
 * Each audit has three recommendations tied to Tolstoy products only.
 */

export const TOLSTOY_PRODUCTS = {
  AI_PLAYER: 'AI Player',
  AI_STUDIO: 'AI Studio',
  AI_SHOPPER: 'AI Shopper',
  INTERACTIVE_VIDEO: 'Interactive Video',
}

/** @typedef {'video' | 'growth' | 'users'} RecommendationIcon */

/**
 * @typedef {Object} Recommendation
 * @property {string} id
 * @property {RecommendationIcon} icon
 * @property {string} tolstoyProduct
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} StoreAudit
 * @property {string} id
 * @property {string} storeName
 * @property {string} industry
 * @property {string[]} urlPatterns - hostname substrings
 * @property {string} summary
 * @property {Recommendation[]} recommendations
 */

export const STORE_AUDITS = {
  gymshark: {
    id: 'gymshark',
    storeName: 'Gymshark',
    industry: 'Activewear & fitness',
    urlPatterns: ['gymshark.com'],
    summary:
      "You're a high-energy activewear brand with world-class social content, but your product pages still lean on static imagery. Shoppers can't see fit, fabric, or movement the way they do on Instagram — and that's where you lose the conversion moment.",
    recommendations: [
      {
        id: 'gymshark-pdp-stories',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add shoppable PDP stories',
        description:
          'Your hero SKUs have strong TikTok and creator content that never makes it onto the PDP. Auto-import UGC, tag variants, and let shoppers add to cart without leaving the video — similar to how leading sportswear brands lift PDP conversion by 20%+.',
      },
      {
        id: 'gymshark-ai-shopper',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_SHOPPER,
        title: 'Launch AI Shopper for fit & sizing',
        description:
          'Leggings and training wear drive returns when fit is unclear. Surface top sizing questions on PDPs, recommend sizes from measurements, and suggest complete-the-look bundles to raise AOV without extra dev work.',
      },
      {
        id: 'gymshark-homepage-feed',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add a homepage shoppable video feed',
        description:
          'Your homepage is built for campaigns, not discovery. A swipeable video feed — synced from social — meets Gen Z where they already shop and keeps them browsing products in a TikTok-native format.',
      },
    ],
  },

  glossier: {
    id: 'glossier',
    storeName: 'Glossier',
    industry: 'Beauty & skincare',
    urlPatterns: ['glossier.com'],
    summary:
      "You're a beauty brand that wins on authenticity and routine-led storytelling, but your site still feels image-first compared to your social channels. Customers want to see real application and texture — not just pack shots — before they trust a new formula.",
    recommendations: [
      {
        id: 'glossier-ugc-stories',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add shoppable UGC on hero PDPs',
        description:
          'Bestsellers like Cloud Paint and Boy Brow have endless creator content off-site. Bring raw, routine-style videos onto PDPs with product tags so shoppers see real skin, real application, and can buy in one tap.',
      },
      {
        id: 'glossier-top-questions',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_SHOPPER,
        title: 'Answer top questions on every PDP',
        description:
          'Skincare shoppers ask the same things: shade match, layering order, skin type. Auto-surface the top 3 questions per SKU with AI Shopper so hesitation happens in-chat — not in an abandoned tab.',
      },
      {
        id: 'glossier-ai-studio',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_STUDIO,
        title: 'Scale shade & lifestyle visuals with AI Studio',
        description:
          'Your catalog has many shades and sets but limited on-model variety per SKU. Generate consistent on-brand lifestyle shots and short PDP videos from existing assets — no new studio days required.',
      },
    ],
  },

  kith: {
    id: 'kith',
    storeName: 'Kith',
    industry: 'Streetwear & lifestyle',
    urlPatterns: ['kith.com'],
    summary:
      "You're a drop-driven streetwear brand with a culture-first identity, but the onsite experience is still grid-and-image heavy. Hype lives on social; the site doesn't yet capture that energy or make collabs and collections instantly shoppable.",
    recommendations: [
      {
        id: 'kith-homepage-feed',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Turn your homepage into a shoppable feed',
        description:
          'Fans already consume Kith through video on social. Import TikTok and campaign clips into a homepage video feed with product tags so every visit feels like your channels — not a static lookbook.',
      },
      {
        id: 'kith-interactive-drops',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.INTERACTIVE_VIDEO,
        title: 'Use interactive video for drops & promos',
        description:
          'Complex promos and early-access rules confuse shoppers. Branching interactive videos on landing pages can explain how to unlock drops, apply codes, and capture emails — reducing cart abandonment from missed steps.',
      },
      {
        id: 'kith-collection-stories',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add collection-page video stories',
        description:
          'Collection pages are dense product grids with little context. Short styled-video stories per collection help visitors understand the vibe, see pieces in motion, and jump to tagged SKUs faster.',
      },
    ],
  },

  ourPlace: {
    id: 'our-place',
    storeName: 'Our Place',
    industry: 'Home & cookware',
    urlPatterns: ['fromourplace.com', 'ourplace.com'],
    summary:
      "You're a design-led cookware brand with a strong founder story and beautiful product photography, but new visitors still need to see the product in action. Microwave-to-table value and non-toxic materials are hard to communicate through images alone.",
    recommendations: [
      {
        id: 'our-place-interactive-founder',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.INTERACTIVE_VIDEO,
        title: 'Tell your founder story with interactive video',
        description:
          'Cookware brands that need education convert better when shoppers choose what to learn first — materials, care, or recipes. An interactive homepage or landing Tolstoy lets visitors self-select the path that builds trust fastest.',
      },
      {
        id: 'our-place-pdp-howto',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add how-to shoppable videos on PDPs',
        description:
          'Always Pan and Perfect Pot shoppers want to see real cooking, not static angles. PDP stories showing sauté, bake, and serve moments — with tagged variants — close the gap between inspiration and add-to-cart.',
      },
      {
        id: 'our-place-ai-studio',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_STUDIO,
        title: 'Generate lifestyle video from product shots',
        description:
          'Colorways and bundles multiply faster than shoots. Use AI Studio to turn existing pack shots into on-brand lifestyle clips and PDP-ready video, then publish through Tolstoy without a production calendar.',
      },
    ],
  },

  away: {
    id: 'away',
    storeName: 'Away',
    industry: 'Travel & accessories',
    urlPatterns: ['awaytravel.com', 'away.com'],
    summary:
      "You're a premium travel brand where purchases are considered and comparison-heavy, but PDPs still rely on specs and still photography. Shoppers want proof of durability, interior layout, and carry-on fit before committing to a $300+ suitcase.",
    recommendations: [
      {
        id: 'away-pdp-feature-video',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add feature-led PDP video stories',
        description:
          'Wheels, compression systems, and TSA locks are selling points that video explains in seconds. Shoppable PDP stories showing real packing, roll tests, and interior tours reduce bounce on high-AOV SKUs.',
      },
      {
        id: 'away-ai-shopper-compare',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_SHOPPER,
        title: 'Deploy AI Shopper for size & compare',
        description:
          'Carry-on vs checked vs flex confuses first-time buyers. A catalog-trained assistant can answer airline fit, capacity, and warranty questions on the PDP and add the right bag to cart from chat.',
      },
      {
        id: 'away-interactive-faq',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.INTERACTIVE_VIDEO,
        title: 'Replace static FAQs with interactive video',
        description:
          'Warranty, returns, and sizing live in text blocks few people read. Interactive FAQ Tolstoys let shoppers pick their concern, watch a short answer, and continue shopping without leaving the product journey.',
      },
    ],
  },

  general: {
    id: 'general',
    storeName: 'Your store',
    industry: 'E-commerce',
    urlPatterns: [],
    summary:
      "You're a direct-to-consumer brand with solid product imagery, but the site still behaves like a traditional catalog. Social and email create desire — onsite, shoppers rarely see motion, UGC, or personalized guidance that closes the sale.",
    recommendations: [
      {
        id: 'general-pdp-stories',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add shoppable video on top PDPs',
        description:
          'Your best sellers likely have photos but little video social proof on the product page. Import existing UGC or clips, auto-tag products, and let visitors shop from the feed without hunting through galleries.',
      },
      {
        id: 'general-ai-shopper',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_SHOPPER,
        title: 'Add AI Shopper for product Q&A',
        description:
          'Most PDPs answer the same questions in reviews or support tickets. Surface top questions per product with an on-brand chat that recommends variants, captures emails, and adds to cart in-conversation.',
      },
      {
        id: 'general-homepage-feed',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Launch a homepage video discovery feed',
        description:
          'Homepage visitors scroll past static heroes quickly. A shoppable video carousel — personalized over time — increases time on site and routes traffic to high-intent SKUs the way social feeds already do.',
      },
    ],
  },

  /** When the user uploads screenshots instead of a URL */
  generalFromPhotos: {
    id: 'general-from-photos',
    storeName: 'Your store',
    industry: 'E-commerce (from screenshots)',
    urlPatterns: [],
    summary:
      "From your screenshots, we see a clean storefront layout with strong product presentation, but limited motion and no shoppable video on the pages you shared. The layout reads well — what's missing is interactive content that shows products in use and answers questions before checkout.",
    recommendations: [
      {
        id: 'photos-pdp-stories',
        icon: 'video',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_PLAYER,
        title: 'Add shoppable stories to product pages',
        description:
          'Your PDPs appear image-led without customer video or try-on moments. Tolstoy can place a story module below the hero so shoppers see real-use clips and tap tagged products without leaving the page.',
      },
      {
        id: 'photos-ai-studio',
        icon: 'growth',
        tolstoyProduct: TOLSTOY_PRODUCTS.AI_STUDIO,
        title: 'Fill catalog gaps with AI Studio',
        description:
          'Screenshots suggest consistent pack shots but few lifestyle angles per SKU. Generate on-brand model, detail, and short video assets from what you already have, then publish straight to PDPs through Tolstoy.',
      },
      {
        id: 'photos-interactive',
        icon: 'users',
        tolstoyProduct: TOLSTOY_PRODUCTS.INTERACTIVE_VIDEO,
        title: 'Add interactive video on homepage',
        description:
          'The homepage looks polished but static. A short interactive Tolstoy — brand story, quiz, or “how we’re different” branches — captures emails and segments visitors before they bounce from the hero.',
      },
    ],
  },
}
