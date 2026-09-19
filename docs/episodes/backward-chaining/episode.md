---
type: Episode
title: Backward chaining
description: Forward planning has no operation that connects a goal twelve months out to the work of this week. Backward chaining has one — take the outcome you cannot decide to have, find the nearest measurable thing upstream that you can, and repeat until the chain lands on something entirely within your control. Shown working across sales, startup coaching, software engineering, fundraising, founder finance, testing and AI evals, and bounded by the case where forward exploration is still the correct method.
tags: [backward-chaining, planning, decomposition, sales-pipeline, agentic-practice, eval-driven-development]
format: Foundations
subject_domains:
  [
    sales,
    startup-coaching,
    software-engineering,
    fundraising,
    founder-finance,
    software-testing,
    ai-agents,
    project-management,
  ]
thesis: You can plan toward an outcome you do not control, by chaining backwards until you hit something you do
analogy: wanting someone to say yes, where the only controllable step is saying hi
story_threads:
  a: chaining backwards terminates in something inside your control
  b: a startup team two weeks from the finals, told to stop building
theory_hands_on_boundary: after "Shown working"
sources:
  - id: backward-chaining-wiki
    resource: 'https://en.wikipedia.org/wiki/Backward_chaining'
    title: Backward chaining
  - id: reverse-planning-park
    resource: 'https://doi.org/10.1177/0956797617715510'
    title: Relative Effects of Forward and Backward Planning on Goal Pursuit
  - id: reverse-planning-corrigendum
    resource: 'https://doi.org/10.1177/0956797617752922'
    title: 'Corrigendum: Relative Effects of Forward and Backward Planning on Goal Pursuit'
  - id: planning-fallacy-hbr
    resource: 'https://hbr.org/2003/07/delusions-of-success-how-optimism-undermines-executives-decisions'
    title: "Delusions of Success: How Optimism Undermines Executives' Decisions"
  - id: backward-planning-wiese
    resource: 'https://sjdm.org/~baron/journal/16/16101/jdm16101.html'
    title: 'Backward planning: Effects of planning direction on predictions of task completion time'
  - id: reverse-funnel-insight
    resource: 'https://www.insightpartners.com/ideas/reverse-funnel-math-the-science-of-hitting-your-number/'
    title: 'Reverse Funnel Math: The Science of Hitting Your Number'
  - id: backward-pass-wrike
    resource: 'https://www.wrike.com/project-management-guide/faq/what-is-backward-pass-in-project-management/'
    title: What is a backward pass in project management?
  - id: cpm-projectmanager
    resource: 'https://www.projectmanager.com/guides/critical-path-method'
    title: Critical path method guide
  - id: atdd-agile-alliance
    resource: 'https://agilealliance.org/glossary/atdd/'
    title: 'ATDD — Agile Alliance glossary'
  - id: atdd-wiki
    resource: 'https://en.wikipedia.org/wiki/Acceptance_test-driven_development'
    title: Acceptance test-driven development
  - id: tdd-wiki
    resource: 'https://en.wikipedia.org/wiki/Test-driven_development'
    title: Test-driven development
  - id: evals-anthropic
    resource: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
    title: Demystifying evals for AI agents
  - id: veracode-genai-2025
    resource: 'docs/llm-wiki/veracode-genai-code-security-2025.md'
    title: Veracode 2025 GenAI Code Security Report
  - id: mast-failures
    resource: 'https://arxiv.org/abs/2503.13657'
    title: Why Do Multi-Agent LLM Systems Fail?
  - id: edd-deepeval
    resource: 'https://deepeval.com/blog/eval-driven-development'
    title: Eval-driven development
  - id: edd-evaldriven
    resource: 'https://evaldriven.org/'
    title: Eval-driven development manifesto
  - id: axel-deck
    resource: 'AXEL Pitch Workshop deck, 02/2026, slides 8-25 and 13-17 — first-hand, no public resource'
    title: AXEL Pitch Workshop deck
  - id: nono-breakeven
    resource: 'Nono break-even model, AXEL Pitch Workshop deck, 02/2026, slide 48, built while coaching — first-hand, no public resource'
    title: Nono break-even model
  - id: virun-plan
    resource: 'Virun Grow 2025/26 finals prep backward plan diagram, authored while coaching — first-hand, no public resource'
    title: Virun finals prep backward plan
  - id: wayfinder-pass
    resource: 'markdown-harness Wayfinder forward-then-backward pass — first-hand, no public resource'
    title: markdown-harness Wayfinder pass
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T00:00:00Z
stale_after: 2027-09-30T00:00:00Z
status: draft
---

# Backward chaining

## Definitions

These definitions establish the vocabulary this Episode uses, and the source each term takes
its official meaning from.

> **Definition** — Forward chaining is the data-driven inference method, starting from what is
> known and applying rules until something falls out.[^backward-chaining-wiki]

> **Definition** — Backward chaining is the goal-driven inference method, starting from a
> hypothesis and working from consequent to antecedent to see whether any data supports
> it.[^backward-chaining-wiki]

### Project management

> **Definition** — The backward pass starts at the end date and moves right to left through the
> network, subtracting each task's duration from its late finish to obtain its late start, and
> taking the smaller value wherever paths converge.[^backward-pass-wrike]

## The practice they already run

Someone else saying yes is outside your control. A customer signing, a manager approving a
raise, a partner agreeing to the evening out — none can be forced, and some sit outside your
influence entirely. What is inside your control is what you do between now and the decision.

Selecting actions by what you can think of now is called forward chaining, or forward
reasoning, and it is bounded by your own blind spots. Deriving actions by working back from
the desired outcome is called backward chaining, or backward reasoning. Project management,
sales, marketing, and graph engineering in AI have formalised the operation. It is what this
Episode is about.

### Sales

A revenue target twelve months out is not something a salesperson can decide to reach. What
they can decide is how many companies get called this week. The pipeline is the instrument
connecting the two, and every stage in it carries a conversion rate, which is what makes the
target divisible.

### AI agents

Vibe coding produces a working result from a single prompt, and that result fails in
production. Getting a first output has become cheap; security, performance, scalability and
availability do not fall out of one-shotting,[^veracode-genai-2025] because nothing in the
prompt names them as conditions the output has to meet.

## The model they are running

A goal is usually present. What is missing is its decomposition. A goal as stated is typically
too coarse to act on, and it contains layers nobody has named yet.

What happens next is not the absence of a plan but a substitution. The goal is filtered through
the receiver's own repertoire, and the first step comes out of whichever territory they know
best. Selection is by familiarity rather than by what the outcome requires. That is forward
reasoning in practice, and it is why experience widens the repertoire without changing the
method.

Both directions have precise names, and neither is the wrong one.

So the misconception is not that forward planning is wrong. Forward exploration is the correct
strategy when no target exists yet — when the question is what is even out there, moving and
observing is the only thing that generates information. The misconception is narrower and more
expensive: staying in forward mode past the point where a target exists. The target arrives,
the goal becomes nameable, and the planning mode does not change. Work continues to be
sequenced by what comes next rather than by what the outcome requires.

Backward chaining does not remove the bias. What changes is the reference point: each step is
selected against the stated outcome rather than against the planner's standing position.

There is a name for what the forward default costs. The planning fallacy was named by Kahneman
and Tversky in 1979 and later widened by Lovallo and Kahneman to the tendency to underestimate
the time, costs and risks of future actions while overestimating their benefits, producing not
only time overruns but cost overruns and benefit shortfalls.[^planning-fallacy-hbr] Planning
direction is one of the interventions studied against it: across four studies, people who
planned a task backward from its deadline predicted longer, less optimistic completion times
than people who planned the same task forward.[^backward-planning-wiese]

The direction has also been measured on goal pursuit rather than on time prediction. Across
five studies covering school work, class tests, comprehensive exams and job interviews,
students who planned backward from the goal reported greater motivation, higher expectancy of
reaching the goal, and less time pressure than students who planned the same tasks
chronologically.[^reverse-planning-park]

The corrected figures put the effect at d = 0.23 with a confidence interval crossing zero — one
study, a small effect, and early supporting evidence rather than
proof.[^reverse-planning-corrigendum]

### Software engineering

A customer asks for their CRM integrated with a calculation tool. A frontend engineer starts at
the interface, a backend engineer at the database or the existing APIs. Neither is wrong, and
both have chosen a starting point their own position supplied.

### Startup coaching

Two technical founders continue building product when the binding constraint is sales. The work
is real and the choice is their strength rather than the company's need.

## The question that breaks it

One question separates the two modes, and a forward plan cannot answer it: how many of what,
by when?

### Sales

Consider a consultant who needs roughly €100,000 of cash flow this year to cover one salary —
ten contracts at about ten thousand each. It is January. The question is: how many companies
get called this month?

Forward mode has no operation that answers it. A forward plan can produce a first quarter full
of sensible activity — build the offering, refresh the website, attend two conferences, write
some posts — and none of those steps is connected by arithmetic to the hundred thousand. The
plan is a list of things that are plausibly helpful. It contains no quantity that this month
can be measured against.

Backward mode answers the question in three divisions. January is what makes it bite: it is the
month where the forward plan still feels comfortable and the backward one has already produced
a number.

### AI agents

The same question breaks the same way when the work is handed to an agent. If a subtask carries
no test that says whether it succeeded, the plan cannot tell that it failed, and replanning has
nothing to react to. The failure taxonomy for multi-agent systems gives this a category of its
own — task verification and termination — alongside specification failures such as disobeying
the task specification.[^mast-failures] The working version of the fix is the one the evals
literature recommends: a good task is one where two domain experts would independently reach
the same pass/fail verdict.[^evals-anthropic]

## The explanation

The operation is backward chaining, and it has four steps applied repeatedly.

1. Define the outcome.
2. Ask whether it is entirely within your control.
3. If it is not, identify the nearest measurable outcome you do influence, and define the tasks
   that improve the odds of it.
4. Repeat the question against that new outcome.

The recursion terminates when it reaches something entirely within your control, whose result
contributes to the outcome above it. Not when it reaches something that can be done today:
those are different tests, and only the first is load-bearing. A task can be doable today and
still depend on somebody else's decision, in which case the chain has not terminated — it has
run out of patience.

The misconception closes here. Forward mode has no operation that connects a goal twelve months
out to the work of this week; backward mode has one, and it is the same operation at every
link — take the thing you cannot decide to have, and find the nearest thing upstream that you
can. What that looks like at each link differs: a division in a funnel, a subtraction across a
schedule, a written test in an eval. The chaining is what the instances share. The arithmetic
is not.

### Project management

The backward pass is what produces the late start and late finish that make a critical path
visible at all; without it there is a sequence of tasks and no way to say which ones have no
slack. The critical path method it belongs to was developed in the late 1950s by Morgan R.
Walker and James E. Kelley,[^cpm-projectmanager] which places the operation firmly in the canon
rather than in anything recent.

### Software testing

Engineering has run the same chain for decades under a different name. In acceptance
test-driven development, team members with different perspectives — customer, development,
testing — collaborate to write acceptance tests in advance of implementing the corresponding
functionality,[^atdd-agile-alliance] created when the requirements are analysed and prior to
coding.[^atdd-wiki] The cycle it inherits from test-driven development opens with a test case
that fails, followed by just enough code to make it pass, then refactoring.[^tdd-wiki] The goal
state is fixed before any implementation exists, and the work runs backward to it.

### AI agents

The same move arrives one era later, which is what makes the eval case legible to anyone who
has written an acceptance test. The advice is to build evals that define planned capabilities
before agents can fulfil them, and then to iterate until the agent performs well[^evals-anthropic]
— the goal state is written down before the thing that has to reach it exists. Put more
bluntly: the eval comes first, before the prompt, before the pipeline, before the model
selection.[^edd-evaldriven] That is the chain the backward pass runs over a project network,
applied to a system nobody could schedule forward because nobody yet knows what it will be able
to do.

Backward chaining applies here as decomposition. From a defined requirement, work back to the
intermediate artefacts it needs, each isolated behind a contract — an interface, a type, an
API. Each task is then smaller, and each has a verifiable condition attached before it starts.
That is traditional engineering applied to agents: problem decomposition, system thinking,
explicit contracts at the boundaries, with the agent executing steps whose intermediate
results can be reviewed.

Where the contract is not yet known, forward work is again the correct method — build enough
of a prototype to derive the contract, then plan backward from it.

## Shown working

The operation is one move, so the way to show it is to run it seven times and let the
differences fall on the arithmetic rather than on the chain. Simple before complex: the early
cases divide, and the later ones stack one chain into the input of another.

### Sales

The funnel is the operation as arithmetic, and the practice has a public name — reverse funnel
math, which starts from the bookings goal and divides back through each stage's conversion
rate until it reaches weekly activity.[^reverse-funnel-insight]

Assume one hundred thousand in revenue, ten thousand per contract, and a three to one
conversion at each stage. Ten contracts requires thirty negotiations, which requires ninety
qualified opportunities, which requires two hundred and seventy companies contacted. Two
further quantities fall out of the same pass: the sales cycle, which fixes how early the
calling has to start, and the lead list, which must exceed the contact count because not every
company is reachable.

Each terminal step is inside the salesperson's control. Lead generation, pricing, the sales
deck and the supporting material are all preparable now, and each exists because a later
milestone requires it. Forward reasoning produces calling activity with no quantity attached
to it.

The ratios themselves come from forward work. A first-time seller has no conversion rate, no
sales cycle length and no price point, and no backward pass can supply them. Twenty calls that
produce four replies and one meeting are a small sample, but they are evidence rather than
guesswork, and a backward pass can start from them. Calling to find out what converts is how
the numbers get made.

### Startup coaching

A startup two weeks from a final is the same chain run against a fixed date. During coaching
for the Grow 2025/26 programme in early 2026, a team's plan was laid out backward from its
terminal node: the finals on 28 January. Working back from there gave pitch-ready, and back
from pitch-ready gave story and slide preparation, and back from that gave market validation,
and back from that gave the prototype. The validation layer ran the same arithmetic out loud —
twenty-seven qualified leads, at 3:1 nine opportunities, at 3:1 three completed customer
interviews — with one node marked as carrying an external dependency, because real customer
exposure is not something the team decides to have.[^virun-plan]

The payoff was that the backward pass overturned the plan the team had. Two more weeks on the
prototype became roughly thirty calls that week, because the arithmetic showed that the
prototype was not the binding constraint on being pitch-ready. Nothing about the team's
judgement was wrong; the plan simply had no operation in it that could have surfaced the
constraint.

### Software engineering

A switch, taken mid-project, is what the transition looks like from the inside. The
markdown-harness work began in forward mode deliberately, and correctly: the goal was not yet
known. A mapping pass ran eight or nine subtasks outward from zero, and each one returned
information that changed what the next one should be. Once the territory was mapped enough, a
prototype was built — and the prototype's job was not to be the prototype. Its configuration
contract and its response shape were harvested from it and fixed as the implementation target.
Everything after that was worked backward to them.[^wayfinder-pass]

This is the case that shows the transition the misconception turns on. Forward mode ran until
it produced a target. Then the mode changed.

### Fundraising

The deck that argues for itself starts from the win rather than from the template. Building a
pitch deck in forward mode means working through a template: here are eight sections, fill in
each one. Backward mode starts from _I win_. Winning means at least one decision maker argues
the case to the others in the room where it is decided, which means knowing who those decision
makers are and what each of them wants — the angel, the VC manager, the non-investor judge.
Only once they are named does it become clear what each slide has to do. The deck falls out of
the goal instead of out of the template.[^axel-deck]

### Founder finance

Break-even is where the date comes first and the number is derived from it. Nono's three
founders were each paying themselves about €35,000, which put overhead at roughly €120,000 a
year. Self-sufficient by month twelve was the outcome. Broken into a monthly cost structure and
run against a transaction-share revenue model, the chain produced a required monthly
transaction volume — and that volume was reachable only on an exponential ramp, which would
have meant halting product development for immediate sales.[^nono-breakeven]

The payoff here runs the other way. The backward pass did not produce a plan; it killed one. It
showed that self-funding was not achievable at that stage, which made an investment strategy
necessary rather than merely preferred. An operation that can only produce plans is a planning
tool. One that can also refuse them is an instrument.

### Software testing

Acceptance tests written before the code are the same chain hardened into a discipline, and the
mechanism is the one defined in the previous Beat: the goal state exists as a written test
before the implementation that has to satisfy it. Engineers in the audience have done this for
twenty years without once calling it backward chaining. That is the point of putting it here.
The operation does not need the name in order to work, but it needs the name in order to
transfer to a domain where nobody has run it yet.

### AI agents

Evals written before the agent are the same move one era later, which is why they belong
directly beneath the acceptance-test case. The starting point is modest: twenty to fifty tasks
drawn from real failures, where two domain experts would independently reach the same pass/fail
verdict.[^evals-anthropic] The grader exists before the agent does.

The caveat belongs in the case rather than in a footnote, because it is what keeps the pairing
honest. The core philosophy matches test-driven development, but treating the two as
one-to-one leads to bottlenecks, high API costs and frustration; because evals are expensive
and slow to run, the discipline rests on high-quality datasets rather than on sheer
volume.[^edd-deepeval] The chain is identical to the one above it. The arithmetic at each link
is harder.

## Where the method stops applying

Backward chaining assumes the outcome is stable enough to plan back from. Every division in the
funnel rests on the number at the end holding still long enough for the arithmetic to mean
something, and every backward pass rests on knowing which node is terminal.

Where the goal itself is unknown — where what is being built has not been decided — there is
nothing to chain back from, and forward exploration is not a lapse but the correct method. The
formal definitions carry the boundary rather than merely permitting it: forward chaining is
data-driven and backward chaining is goal-driven, and which one applies is a property of what
is available, not a ranking of the two methods.[^backward-chaining-wiki]

The measured evidence marks the same edge. The advantage for backward planning appeared on
complex goals; for simple goals the two methods showed no difference at
all.[^reverse-planning-park] A goal small enough to hold in a single view does not need an
operation to decompose it, and running one anyway is ceremony.

## Where the analogy breaks down

The dating analogy has a limit of its own, and it is the more important one. It is an
illustration of agency under uncertainty — that an uncontrollable outcome still has a
controllable first move attached to it. It is not a claim about conversion rates, and the
moment it is read as advice for optimising a funnel of people, it has stopped being the analogy
in this Episode and become something else. The arithmetic belongs to the pipeline. The analogy
contributes only the shape.

## What to do

Nobody in the analogy waits for the perfect moment to say hi, because there is no operation
that produces one. The waiting is forward mode, run past the point where the outcome was
already known — and the plan on your desk is in the same position.

So: open the plan you are working to now, find its last dated milestone, and write one line
underneath it — the nearest measurable thing that milestone needs, and how many of them. If
what you write down still depends on somebody else's decision, the chain has not terminated;
divide once more, and stop when the line names something you could start on Monday without
asking anyone.

That is the whole operation at one link. Everything else is repetition.

### Sales

Take this year's number, divide it by your average deal size, and write the resulting count of
deals on the same page as this week's calendar. The gap between the two numbers is the thing
the plan was hiding.

### AI agents

Before the next agent run, write the pass/fail test that run has to satisfy and save it beside
the prompt. One task, one verdict, written first.

[^backward-chaining-wiki]: The data-driven and goal-driven contrast between the two inference methods, and the consequent-to-antecedent formulation

[^reverse-planning-park]: Five studies on school work, class tests, comprehensive exams and job interviews; the motivation, goal-expectancy and time-pressure mechanisms; and the complex-versus-simple moderator

[^reverse-planning-corrigendum]: Corrected effect size and confidence interval for the goal-pursuit comparison

[^planning-fallacy-hbr]: The widened definition — time, costs and risks underestimated while benefits are overestimated

[^backward-planning-wiese]: Four studies on planning direction and predictions of task completion time

[^reverse-funnel-insight]: The worked division chain from bookings goal down to weekly activity

[^veracode-genai-2025]: The security member of that list only — 45% of code samples failing security tests, and security performance flat regardless of model size. Performance, scalability and availability are not measured by this Source

[^mast-failures]: The three failure categories, and "Disobey Task Specification" under specification and design failures

[^backward-pass-wrike]: Definition of the backward pass, late start and late finish

[^cpm-projectmanager]: Origin and attribution of the critical path method

[^atdd-agile-alliance]: Who collaborates on the acceptance tests, and when

[^atdd-wiki]: Timing relative to requirements analysis and to coding

[^tdd-wiki]: The failing-test, minimal-code, refactor cycle

[^evals-anthropic]: Building evals before the capability exists; the two-expert pass/fail test and the twenty-to-fifty task starting point

[^edd-deepeval]: The one-to-one caveat — bottlenecks, API cost, and dataset quality over volume

[^edd-evaldriven]: The ordering claim — eval before prompt, pipeline and model selection

[^axel-deck]: Slides 8-25 and 13-17

[^nono-breakeven]: Slide 48 — cost structure, transaction-share model, and the required ramp

[^virun-plan]: The backward plan diagram and its validation layer

[^wayfinder-pass]: The mapping pass, and the harvest of the contract from the prototype
