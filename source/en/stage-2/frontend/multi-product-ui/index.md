# Designing Pages and Buttons with UI Design Guidelines

Many people say "I want the page to look more like Apple" or "I want the buttons to feel more premium," but when they actually start working, they often get stuck on one question:

**What exactly should I reference?**

Staring at screenshots and copying them only teaches you whether something "looks similar." But when you open the design guidelines from Apple, Google, Microsoft, and Atlassian, you realize that what makes them impressive is not their visual style -- it's that **they clearly articulate design problems**: what to highlight first on a page, how to rank buttons, how to emphasize actions. These judgment criteria are the real core.

> Referencing design guidelines is not about making something "look like someone else's work" -- it's about learning how others make design decisions.

:::: info Why learn this now
Design rules have already been trained into models, absorbed as defaults in design tools, and AI can even learn from a few screenshots. But it's still worth understanding where these rules come from and why they were defined this way.
::::

## First, read a few excerpts and feel the difference

If you used to think "design guidelines are just about style," read a few lines from the official sources first.

In everyday team discussions, we often say things like:

- Make a dropdown
- Put a menu here
- Add a few features to the menu bar
- Put two buttons here, one for confirm and one for cancel

That sounds fine, but in major design guidelines, these terms are not vague concepts -- they are broken down in great detail.

| What we casually say | Official source | In short |
| :--- | :--- | :--- |
| "Make a menu" | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` is for triggering actions |
| "Put features in the menu bar" | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | This is the app-level command menu at the top |
| "Make a dropdown" | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` is for picking one value from a list |
| "Also make a dropdown" | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` is for triggering a context-specific command |
| "Can't a menu also be used for filtering?" | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` is not for value selection |
| "Can't a menu be used for navigation?" | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu` is not for primary navigation |
| "Just write OK / Cancel on the buttons" | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | Button labels shouldn't be arbitrary |

> All the quotes in the table are clickable and will take you to the corresponding official page.

This is what strikes people most when they read design guidelines for the first time:

> We often think we're discussing UI, but most of the time we're just communicating with a bunch of vague words.

Apple won't just say "make a menu"; it goes on to distinguish:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent won't just say "dropdown"; it goes on to distinguish:

- `menu`
- `dropdown`
- `select`
- `combobox`

This is why design guidelines are necessary.

They exist not to make pages look more professional, but so that when a team discusses UI, everyone isn't picturing something different.

## What you will learn

1. Why you should look at design guidelines before designing pages and buttons
2. Which parts of Apple, Material, Fluent, and Atlassian guidelines are most worth referencing
3. How to design clear "page hierarchy" and "button hierarchy"
4. How to get AI to reference established guidelines when generating pages and buttons

## 1. Why design guidelines help you build clearer pages

After reading the excerpts above, you'll notice a key point:

**Design guidelines are not icing on the cake -- they start by getting the terminology right.**

Many pages don't look good not because the color palette isn't sophisticated enough, but because the information hierarchy is chaotic.

Many buttons aren't usable not because the border radius is wrong, but because:

- There are too many primary buttons, and users don't know which one to click
- Destructive buttons look the same as normal buttons
- Every button on the page is competing for attention
- Button styles and semantics are inconsistent across different pages

Mature design guidelines exist precisely to solve these problems. They typically define:

| Guideline content | What problem it solves |
| :--- | :--- |
| **Page hierarchy** | Where to look first, where to look next, how to organize information |
| **Visual foundations** | How to unify color, spacing, typography, border radius, shadows |
| **Button hierarchy** | How to distinguish primary, secondary, text, and destructive buttons |
| **State rules** | How to represent hover, focus, disabled, loading states |
| **Interaction semantics** | Which button means "confirm," which means "cancel," which means "more actions" |

So what design guidelines really provide is not a "skin" but a set of **judgment criteria**.

## 2. When referencing major design guidelines, what should you focus on

### 2.1 Reference Apple: Learn to "define things precisely enough"

What's most worth learning from Apple is not just its visual restraint, but how it defines concepts in fine detail.

For what many teams casually call "menu" or "dropdown," Apple breaks it down further:

- `menu`: A set of commands, options, or states
- `menu bar menu`: An app-level command collection
- `pop-up button`: Choose one value
- `pull-down button`: Trigger a command in the current context
- `context menu`: Common actions related to the current object or task

This distinction is crucial because it directly affects:

- Whether the component is for selecting values or triggering actions
- Whether it belongs to a local section of the page or to the app level
- Whether it should persistently display the current selection or only temporarily expand commands

When you start thinking at this level of granularity, the pages you design will suddenly become much clearer.

### 2.2 Reference Apple: Learn page hierarchy and restraint

Apple's Human Interface Guidelines are particularly good for learning two things:

- How to establish clear hierarchy on a page
- How to keep controls explicit without them stealing the spotlight

Apple emphasizes `Hierarchy`, `Harmony`, and `Consistency`. This means when designing a page, you need to answer:

- What is the most important information on the current page
- What is the user's primary task
- Which action should be most prominent, and which should recede

If you reference Apple for page design, focus on:

- Don't make the above-the-fold content too fragmented; focus on core content first
- Use whitespace, font sizes, and grouping to create order, rather than stacking lots of borders
- Don't make all buttons high-emphasis; only key actions should stand out the most

### 2.3 Reference Material: Learn clear page structure

Material Design is great for learning "how pages organize task flows."

Many of its components and layout guidelines are designed to help you clarify:

- Whether a page is for browsing or for executing tasks
- Whether the current page is meant for reading, selecting, or submitting
- Which elements on a page should remain stable and which should respond to context changes

If you reference Material for page design, focus on:

- Clear page sections with well-defined module responsibilities
- Clear division between navigation, content areas, and action areas
- Different button styles corresponding to different action priorities

### 2.4 Reference Fluent: Learn component boundaries and button hierarchy

Fluent 2 is well-suited for admin panels, tool-type products, and complex form systems. What's most worth learning is that it directly tells you "don't mix concepts."

For example, it explicitly states: if you want to "collect information," don't keep using `menu`; instead, consider `select`, `dropdown`, or `combobox`.

This statement is important because it shatters the "they're all basically the same" assumption many people hold.

Fluent 2 also emphasizes:

- Action hierarchy
- Component semantic boundaries
- Clarity in dense information scenarios

If you reference Fluent for button design, focus on:

- `Primary button` for the most important action in the current context
- `Secondary button` for supporting actions
- `Subtle` and `Transparent` low-emphasis buttons for actions that shouldn't compete with the main flow
- The more buttons on a page, the more you need to control visual priority

### 2.5 Reference Atlassian: Learn to systematically manage pages and buttons

The Atlassian Design System is especially suited for situations where "one team builds many pages." It emphasizes:

- Foundations as the shared baseline
- Tokens as a method for unifying visual decisions
- Components as reusable interaction building blocks

If you reference Atlassian for pages and buttons, the most valuable aspects are:

- Turning button size, color, border radius, and spacing into unified rules
- Fixing the rhythm of page layouts
- Making different pages consistent in structural language even when their content differs

## 3. When designing pages, which parts of the guidelines should you reference

When you look at a design system, don't start by asking "does this page look good?" Instead, start by asking the following questions.

### 3.1 At first glance, is the page hierarchy clear

A page typically needs at least three layers:

- **Primary information**: The most important content on the current page
- **Supporting information**: Content that helps explain or supplement
- **Secondary actions**: Actions that shouldn't interfere with the main task

If the three layers aren't differentiated, the page becomes "everything is important," which means "nothing is important."

### 3.2 Does the page layout serve the task rather than just stacking modules

When referencing guidelines, pay special attention to:

- Whether the title area clearly states the page's purpose
- Whether the main content area is organized around the task
- Whether action buttons are placed near related content
- Whether secondary information is appropriately de-emphasized

### 3.3 Do the page actions have clear priorities

Many pages show 6 buttons at a glance, and every one looks like a CTA -- this is a classic case of hierarchy breakdown.

A more reasonable approach is:

- One section typically has only one primary action
- Secondary actions can use outlined, text, or lower-emphasis styles
- Risky actions should not look the same as primary actions

## 4. When designing buttons, which parts of the guidelines should you reference

Buttons are the easiest part to "just throw together," but they're also the part that most reveals whether a design system is mature.

### 4.1 Classify buttons by "semantics" first, then by "style"

Don't start by thinking "blue button or black button." First think about what role this button plays.

Common button roles can be classified as:

| Button type | Purpose | Common style strategy |
| :--- | :--- | :--- |
| **Primary** | The most critical action in the current section | Filled, high contrast, most prominent |
| **Secondary** | Supporting actions | Outlined or lower emphasis |
| **Tertiary / Text** | Minor actions | Text-only or low visual weight |
| **Destructive** | Risky actions like delete, disable, clear | Warning color or explicit risk styling |
| **Icon button** | Local tool actions | Minimal, close to context |

### 4.2 Don't put too many Primary Buttons on one page

This is the most common trap for beginners.

If a page has 4 primary buttons, then there are effectively no primary buttons. The whole point of a primary button is to "tell the user what they should do right now."

You can borrow the common approach used across many design systems:

- One main section typically has only one primary button
- Cancel, back, and close generally shouldn't compete at the same level as confirm
- Additional actions go into secondary buttons or menus

### 4.3 Buttons should communicate state changes

Design guidelines typically spell out button states clearly:

- Default state
- Hover state
- Focus state
- Disabled state
- Loading state
- Destructive state

This matters because a button is not a static image -- it's one of the most frequently triggered controls during user interaction.

### 4.4 Button copy is also part of the design

Button labels aren't just a "copywriting issue" -- they directly affect user comprehension.

For example:

- `Save`
- `Save Changes`
- `Publish Now`
- `Delete Project`
- `Move to Trash`

These labels convey completely different psychological expectations. Mature guidelines typically require button labels to clearly express the action rather than using vague wording.

## 5. A practical page and button design checklist

When designing pages yourself, you can quickly run through this checklist first:

### Page checklist

- Does the page title clearly state the current task
- Is the most important above-the-fold information visible at a glance
- Is the page organized by task flow rather than by whatever came to mind
- Is there only one primary action in any given section
- Is secondary content appropriately de-emphasized

### Button checklist

- Is this button a primary or secondary action
- Why does it deserve to be more prominent than other buttons
- Are there too many primary buttons on the page
- Are destructive actions clearly marked
- Is the button label specific enough

## 6. How to use AI to reference established guidelines for page design

This section is the most practical.

When many people ask AI to design a page, they only say:

```md
Make me a settings page, make it look premium, reference Apple's style
```

This kind of prompt is too vague, and AI usually ends up just imitating "white background, rounded corners, shadows."

For beginners, a more practical approach is not to summarize everything yourself, but to directly paste **key sentences from the official guidelines** to AI.

This has two benefits:

- You don't need to "translate" the design philosophy yourself first
- AI can more easily understand pages and buttons based on official definitions

### 6.1 Example 1: Have AI reference Apple to design a settings page

First, find a sentence from Apple's official text:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

You can paste it directly to AI like this:

```md
Reference this sentence from the Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Help me design an account security settings page.
The page hierarchy should be clear, important information first, and groupings should be tidy.
```

The key here is: you don't need to explain too much yourself; just paste Apple's original words directly.

### 6.2 Example 2: Have AI reference Fluent to design admin panel buttons

First, find a sentence from Fluent's official text:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

You can paste it directly to AI like this:

```md
Reference this sentence from Fluent 2:
"Only use one primary button in a layout..."

Help me design the buttons for a team management admin panel.
The "Add Member" button should be most prominent; Export, Filter, and More Actions should be lower emphasis; the Delete button should stand out separately.
```

This sentence is especially great for beginners because it directly tells AI: don't put too many primary buttons in one area.

### 6.3 Example 3: Have AI reference both page and button guidelines simultaneously

You can also paste two original sentences at once and have AI reference both the page and button guidelines:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Then write it like this:

```md
Reference the following two design guideline excerpts:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Help me design a project detail page.
The page includes project introduction, members, recent activity, and settings entry.
The page hierarchy should be clear, keep only one primary button, and make other buttons less prominent.
```

This approach is especially suitable for beginners because all you need to do is copy the original text and add a couple of sentences about your own requirements.

## 7. How to use AI to reference button guidelines and directly generate button designs

If you just want to start with buttons, you can also directly paste button guideline excerpts.

For example, Atlassian's definition of a button is very brief:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

You can ask AI like this:

```md
Reference this sentence from Atlassian:
"A button triggers an event or action."

Help me design a set of button styles for an admin panel.
I need a primary button, a secondary button, and a delete button. Also tell me where each should be used.
```

This kind of prompt is especially suitable for beginners -- it's basically "paste original text + state your requirements."

## 8. Summary

When designing pages and buttons by referencing UI design guidelines, the most important thing is not "making it look like someone else's work" but learning the following:

1. Use hierarchy to organize pages rather than stacking content
2. Use button ranking to express action priority rather than making all buttons equally eye-catching
3. Use the definitions, boundaries, and judgment criteria from design guidelines to guide your design
4. When having AI reference established guidelines, reference the "principles and structure" rather than just the skin

When you use guidelines this way, you're not just referencing a style -- you're adopting a mature way of thinking about design.

---

## References

The following links are all from official design systems or official documentation:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
