export const CORE_TONES = [
  {
    id: 'hard-hitting',
    name: 'Hard-hitting, no-nonsense',
    icon: '💪',
    description: 'Direct, bold, and results-focused communication'
  },
  {
    id: 'polite-personal',
    name: 'Polite and personal',
    icon: '🤝',
    description: 'Warm, approachable, and relationship-focused'
  },
  {
    id: 'polished-professional',
    name: 'Polished and professional',
    icon: '👔',
    description: 'Refined, authoritative, and business-focused'
  },
  {
    id: 'authentic-storytelling',
    name: 'Authentic and storytelling',
    icon: '📖',
    description: 'Narrative-driven, vulnerable, and human'
  },
  {
    id: 'raw-real',
    name: 'Raw and real',
    icon: '🔥',
    description: 'Unfiltered, honest, and emotionally charged'
  },
  {
    id: 'hot-take',
    name: 'Hot take (provocative)',
    icon: '⚡',
    description: 'Contrarian, debate-sparking, and attention-grabbing'
  }
];

export const REFINED_TONES = {
  'hard-hitting': [
    {
      id: 'tactical-minimalist',
      name: 'Tactical Minimalist',
      description: 'Zero fluff, maximum impact. Every word earns its place.',
      example: 'Stop overthinking. Start doing. Results follow action, not analysis.',
      rules: ['rule_of_threes', 'short_sentences', 'action_verbs']
    },
    {
      id: 'results-commander',
      name: 'Results Commander',
      description: 'Military precision meets business strategy. Orders, not suggestions.',
      example: 'Execute the plan. Measure the outcome. Optimize and repeat.',
      rules: ['imperative_voice', 'concrete_metrics', 'urgency_triggers']
    },
    {
      id: 'truth-bomber',
      name: 'Truth Bomber',
      description: 'Uncomfortable truths delivered with surgical precision.',
      example: 'Your comfort zone is killing your potential. Time to get uncomfortable.',
      rules: ['contrarian_hooks', 'reality_checks', 'wake_up_calls']
    },
    {
      id: 'efficiency-expert',
      name: 'Efficiency Expert',
      description: 'Streamlined communication for maximum productivity focus.',
      example: 'Three steps. Five minutes. Done. Complexity is the enemy of execution.',
      rules: ['numbered_lists', 'time_constraints', 'simplification']
    }
  ],
  'polite-personal': [
    {
      id: 'friendly-guide',
      name: 'Friendly Guide',
      description: 'Like talking to your most supportive friend who always has your back.',
      example: 'I know this feels overwhelming right now, but you\'ve got this. Let\'s break it down together.',
      rules: ['empathy_first', 'inclusive_language', 'supportive_tone']
    },
    {
      id: 'warm-mentor',
      name: 'Warm Mentor',
      description: 'Gentle wisdom with personal touches and encouraging guidance.',
      example: 'Here\'s what I wish someone had told me when I was starting out...',
      rules: ['personal_anecdotes', 'gentle_corrections', 'encouragement']
    },
    {
      id: 'thoughtful-companion',
      name: 'Thoughtful Companion',
      description: 'Considerate, patient, and always thinking of your best interests.',
      example: 'Take your time with this. There\'s no rush, and I\'ll be here when you\'re ready.',
      rules: ['patience_signals', 'consideration_markers', 'availability_assurance']
    },
    {
      id: 'caring-coach',
      name: 'Caring Coach',
      description: 'Combines gentle support with accountability and growth focus.',
      example: 'I believe in you, and I also believe you can push yourself a little further.',
      rules: ['belief_statements', 'gentle_challenges', 'growth_mindset']
    }
  ],
  'polished-professional': [
    {
      id: 'executive-advisor',
      name: 'Executive Advisor',
      description: 'C-suite level insights delivered with authority and precision.',
      example: 'Strategic implementation requires three critical components: vision alignment, resource allocation, and execution discipline.',
      rules: ['strategic_language', 'executive_terminology', 'structured_thinking']
    },
    {
      id: 'industry-expert',
      name: 'Industry Expert',
      description: 'Deep expertise communicated with professional credibility.',
      example: 'Based on fifteen years of market analysis, the data suggests a clear directional shift.',
      rules: ['credibility_markers', 'data_references', 'professional_terminology']
    },
    {
      id: 'thought-leader',
      name: 'Thought Leader',
      description: 'Forward-thinking perspectives that shape industry conversations.',
      example: 'The future of our industry hinges on this fundamental shift in approach.',
      rules: ['future_focus', 'industry_shaping', 'visionary_language']
    },
    {
      id: 'consultant-sage',
      name: 'Consultant Sage',
      description: 'Wise counsel delivered with professional polish and proven frameworks.',
      example: 'Our proprietary framework has consistently delivered measurable results across diverse market conditions.',
      rules: ['framework_references', 'proven_methodologies', 'results_focus']
    }
  ],
  'authentic-storytelling': [
    {
      id: 'vulnerable-narrator',
      name: 'Vulnerable Narrator',
      description: 'Raw honesty wrapped in compelling narrative structure.',
      example: 'I remember sitting in my car after that meeting, hands shaking, wondering if I\'d just made the biggest mistake of my life.',
      rules: ['emotional_honesty', 'sensory_details', 'moment_capture']
    },
    {
      id: 'journey-mapper',
      name: 'Journey Mapper',
      description: 'Transforms experiences into relatable roadmaps for others.',
      example: 'The path from where I was to where I am wasn\'t linear, but every detour taught me something essential.',
      rules: ['journey_metaphors', 'lesson_extraction', 'path_visualization']
    },
    {
      id: 'human-connector',
      name: 'Human Connector',
      description: 'Finds universal truths in personal experiences.',
      example: 'We all have that moment when we realize we\'re not as prepared as we thought we were.',
      rules: ['universal_experiences', 'shared_humanity', 'connection_bridges']
    },
    {
      id: 'wisdom-weaver',
      name: 'Wisdom Weaver',
      description: 'Intertwines life lessons with practical insights through story.',
      example: 'My grandmother used to say that the best lessons come disguised as problems. She was right.',
      rules: ['wisdom_integration', 'generational_insights', 'practical_application']
    }
  ],
  'raw-real': [
    {
      id: 'unfiltered-truth',
      name: 'Unfiltered Truth',
      description: 'No sugar-coating, no pretense, just straight-up reality.',
      example: 'Let\'s cut through the BS. You\'re not failing because you don\'t know what to do. You\'re failing because you\'re not doing it.',
      rules: ['no_sugarcoating', 'direct_confrontation', 'reality_delivery']
    },
    {
      id: 'emotional-hurricane',
      name: 'Emotional Hurricane',
      description: 'Intense feelings channeled into powerful, moving content.',
      example: 'I\'m angry. Angry at the systems that keep us small, angry at the voices that tell us to settle.',
      rules: ['emotion_leading', 'intensity_maintenance', 'passion_expression']
    },
    {
      id: 'rebel-voice',
      name: 'Rebel Voice',
      description: 'Challenges conventions with fierce independence and authenticity.',
      example: 'They told me to follow the rules. I decided to write my own.',
      rules: ['convention_challenging', 'independence_assertion', 'rule_breaking']
    },
    {
      id: 'warrior-spirit',
      name: 'Warrior Spirit',
      description: 'Battles fought in public, scars worn with pride.',
      example: 'Every scar tells a story. Every failure built strength. Every setback prepared me for this moment.',
      rules: ['battle_metaphors', 'strength_through_struggle', 'proud_resilience']
    }
  ],
  'hot-take': [
    {
      id: 'contrarian-catalyst',
      name: 'Contrarian Catalyst',
      description: 'Sparks debate by challenging popular assumptions.',
      example: 'Everyone\'s talking about work-life balance. I think it\'s the biggest lie we tell ourselves.',
      rules: ['assumption_challenging', 'debate_sparking', 'popular_opinion_flipping']
    },
    {
      id: 'provocative-prophet',
      name: 'Provocative Prophet',
      description: 'Delivers uncomfortable predictions with confident conviction.',
      example: 'Mark my words: in five years, half the advice you\'re following today will be obsolete.',
      rules: ['prediction_making', 'future_challenging', 'conviction_statements']
    },
    {
      id: 'sacred-cow-slayer',
      name: 'Sacred Cow Slayer',
      description: 'Takes aim at untouchable industry beliefs and practices.',
      example: 'That strategy everyone swears by? It\'s keeping you exactly where you are.',
      rules: ['sacred_challenging', 'industry_myth_busting', 'status_quo_attacking']
    },
    {
      id: 'attention-magnet',
      name: 'Attention Magnet',
      description: 'Crafts irresistible hooks that demand engagement.',
      example: 'I\'m about to tell you why everything you learned about success is wrong.',
      rules: ['hook_mastery', 'curiosity_gaps', 'engagement_magnets']
    }
  ]
};

export const AVATAR_VALUE_PAIRS = [
  {
    id: 'time_vs_money',
    leftValue: { key: 'time_over_money', label: 'Time > Money', description: 'Values efficiency and time freedom' },
    rightValue: { key: 'money_over_time', label: 'Money > Time', description: 'Prioritizes financial growth and investment' }
  },
  {
    id: 'authenticity_vs_professionalism',
    leftValue: { key: 'authenticity_first', label: 'Authenticity', description: 'Values genuine, real communication' },
    rightValue: { key: 'professionalism_first', label: 'Professionalism', description: 'Prefers polished, business-focused approach' }
  },
  {
    id: 'legacy_vs_monetization',
    leftValue: { key: 'legacy_building', label: 'Legacy-building', description: 'Focused on long-term impact and meaning' },
    rightValue: { key: 'monetization_now', label: 'Monetization now', description: 'Prioritizes immediate revenue generation' }
  },
  {
    id: 'expression_vs_optimization',
    leftValue: { key: 'self_expression', label: 'Self-expression', description: 'Values creative freedom and personal voice' },
    rightValue: { key: 'market_optimization', label: 'Market optimization', description: 'Focuses on market-driven content strategy' }
  }
];