# Sources

Not needed at runtime: read this when Bryan asks where a rule comes from. Each source was
found and checked on 5 October 2026, for the catering tracker redesign. The section after
each source names the rule in SKILL.md that it backs.

## Peer-reviewed studies

- Parhi, Karlson & Bederson (2006). "Target size study for one-handed thumb use on small
  touchscreen devices." MobileHCI '06. 9.2 mm targets for discrete taps and 9.6 mm for
  serial taps were enough without hurting performance. Won the MobileHCI 2016 best
  historical paper award. <https://www.semanticscholar.org/paper/Target-size-study-for-one-handed-thumb-use-on-small-Parhi-Karlson/7fc3a48e6ce88c56a5e5b921e1ee2e0c0e3af976>
  → Targets.
- Li, Dey & Forlizzi (2010). "A stage-based model of personal informatics systems." CHI
  '10. The stages are preparation, collection, integration, reflection and action, and
  each has its own barriers. <https://dl.acm.org/doi/10.1145/1753326.1753409> → Apps:
  one-tap capture, looking back.
- Epstein, Ping, Fogarty & Munson (2015). "A lived informatics model of personal
  informatics." UbiComp '15. Surveyed 105, 99 and 83 trackers and interviewed 22. People
  lapse by forgetting, by upkeep being too hard, by skipping on purpose, or by suspending
  tracking. <https://dl.acm.org/doi/10.1145/2750858.2804250> → Apps: plan for lapses.
- Kivetz, Urminsky & Zheng (2006). "The goal-gradient hypothesis resurrected." Journal of
  Marketing Research 43(1), 39–58. Café stamp-card members bought faster as their cards
  filled. A 12-stamp card with 2 pre-filled "bonus" stamps was completed faster than a
  plain 10-stamp card. <https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf>
  → Apps: progress toward a goal; Honesty.
- Lindgaard, Fernandes, Dudek & Brown (2006). "Attention web designers: You have 50
  milliseconds to make a good first impression!" Behaviour & Information Technology
  25(2), 115–126. → First screen.
- Tuch, Presslaber, Stöcklin, Opwis & Bargas-Avila (2012). "The role of visual complexity
  and prototypicality regarding first impression of websites." International Journal of
  Human-Computer Studies 70(11), 794–811. Both factors shaped aesthetic judgements within
  17 ms, complexity more strongly. <https://dl.acm.org/doi/10.1016/j.ijhcs.2012.06.003>
  → First screen.
- Reinecke et al. (2013). "Predicting users' first impressions of website aesthetics with
  a quantification of perceived visual complexity and colorfulness." CHI '13. Ratings of
  450 sites by 548 people. <https://dx.doi.org/10.1145/2470654.2481281> → First screen.
- Roth, Schmutz, Pauwels, Bargas-Avila & Opwis (2010). "Mental models for web objects:
  where do users expect to find the most frequent objects in online shops, news portals,
  and company web pages?" Interacting with Computers 22(2), 140–152. → First screen
  (expected locations).
- Liu, White & Dumais (2010). "Understanding web browsing behaviors through Weibull
  analysis of dwell time." SIGIR '10. Found "negative aging": a page has to pass a quick
  screening before people read it. NN/g's summary: the first 10 s are critical, and the
  curve flattens after about 30 s. <https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/>
  → Landing pages.
- Kurosu & Kashimura (1995). "Apparent usability vs. inherent usability." CHI '95
  companion. 26 ATM layouts rated by 252 people: perceived beauty predicted perceived ease
  of use more than actual ease of use did. → Landing pages: polish.
- Cleveland & McGill (1984). "Graphical perception." Journal of the American Statistical
  Association 79, 531–554. The accuracy ranking is position on a common scale, then
  length, angle, area, and colour last. → Charts.
- Myers (1985). "The importance of percent-done progress indicators for computer-human
  interfaces." CHI '85. 86% of 48 participants preferred having the progress bar.
  <https://www.cs.cmu.edu/~bam/papers/percentdoneCHI85.pdf> → Feedback.
- Seckler, Heinz, Bargas-Avila, Opwis & Tuch (2014). "Designing usable web forms:
  empirical evaluation of web form improvement guidelines." CHI '14. An eye-tracking
  experiment with N = 65 tested the 20 guidelines of Bargas-Avila et al. Improved forms
  were completed faster, with fewer submission attempts and fewer eye movements, and
  satisfaction was higher. <https://dl.acm.org/doi/10.1145/2556288.2557265> → Forms.
- Dyson & Haselgrove (2001). "The influence of reading speed and line length on the
  effectiveness of reading from screen." International Journal of Human-Computer Studies
  54, 585–612. 55 characters per line gave better comprehension than 100. → Reading.
- Mathur et al. (2019). "Dark patterns at scale: findings from a crawl of 11K shopping
  websites." CSCW '19. Found 1,818 instances of 15 types in 7 categories, plus 22
  third-party vendors that sell them. <https://arxiv.org/abs/1907.07032> → Honesty.

## Field research and practitioner studies

- Hoober (2013). "How do users really hold mobile devices?" UXmatters. 1,333 street
  observations: 49% of people held the phone one-handed, 36% cradled it, 15% used both
  hands.
- Hoober (2013, 2014). "Design for fingers and thumbs instead of touch" and "Insights on
  switching, centering, and gestures for touchscreens," UXmatters. Touch is most accurate
  at the centre of the screen. Targets can be 7 mm apart in the centre but need 10–12 mm
  at the top and bottom edges. Secondary actions belong along the top and bottom.
  <https://www.uxmatters.com/mt/archives/2014/09/insights-on-switching-centering-and-gestures-for-touchscreens.php>
  → Targets.
- Wroblewski (2009). "Inline validation in web forms." A List Apart, with Etre, 22
  participants. The best inline variant raised success 22%, cut errors 22% and time 42%,
  and raised satisfaction 31%. Validating "after" (when the field is left) beat validating
  while typing. Inline validation helps most on fields where people aren't sure their
  answer is right. <https://alistapart.com/article/inline-validation-in-web-forms/> → Forms.
- Raskin (2007). "Never use a warning when you mean undo." A List Apart. Habit makes
  people click through warnings. <https://alistapart.com/article/neveruseawarning/>
  → Feedback.
- Nielsen Norman Group:
  - Nielsen, 10 usability heuristics (1994, updated 2024). <https://www.nngroup.com/articles/ten-usability-heuristics/>
  - Nielsen, response-time limits of 0.1 s, 1 s and 10 s (from *Usability Engineering*,
    1993). <https://www.nngroup.com/articles/response-times-3-important-limits/>
  - Scrolling and attention (2018): 57% of viewing time in the first screen, 74% in the
    first two.
  - F-shaped scanning: 232 users in 2006, confirmed again in 2017. <https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/>
  - Banner blindness revisited (2018). <https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/>
  - Touch target size: at least 1 cm × 1 cm. <https://www.nngroup.com/articles/touch-target-size/>
  - Glanceable fonts (MIT study): for single glanced words, uppercase took 26% less time
    and regular width 11.2% less than condensed. This doesn't carry over to longer text.
    <https://www.nngroup.com/articles/glanceable-fonts/>
  - Animation duration: 100–500 ms, with 100 ms for small feedback and 200–300 ms for
    larger changes; ease-out on entry. <https://www.nngroup.com/articles/animation-duration/>
  - Auto-forwarding carousels annoy users and reduce visibility. <https://www.nngroup.com/articles/auto-forwarding/>

## Standards and platform guidelines

- W3C, WCAG 2.2 (2023): 1.4.1 use of colour, 1.4.3 contrast 4.5:1, 1.4.11 non-text
  contrast 3:1, 2.2.1 adjustable timing, 2.5.8 target size at least 24×24 CSS px (AA),
  2.5.5 target size 44×44 (AAA), 4.1.3 status messages. <https://www.w3.org/TR/WCAG22/>
- Apple Human Interface Guidelines: 44×44 pt minimum hit target. Google Material Design:
  48×48 dp touch targets.
