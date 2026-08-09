
# AI Education Platform Design System

## Design Philosophy

Our design system embodies **Bold Educational Innovation** through Neubrutalism aesthetics combined with Plus Jakarta Sans typography. This approach creates a confident, energetic brand presence that stands out in the competitive AI education space while building trust with parents who want the best for their children's technological future.

### Core Principles
- **Bold & Confident**: High contrast, thick borders, and strong shadows demand attention
- **Trustworthy & Professional**: Clean structure and premium typography build credibility
- **Energetic & Engaging**: Vibrant colors and dynamic interactions capture interest
- **Accessible & Clear**: Strong contrast ratios and readable fonts ensure inclusivity

## Color System

### Primary Palette
```css
/* Primary - Warm Coral */
--primary: 14 90% 65%;
--primary-foreground: 0 0% 100%;
--primary-hover: 14 85% 58%;

/* Accent Colors */
--accent-purple: 260 50% 75%;
--accent-yellow: 45 95% 65%;
--accent-blue: 210 75% 70%;
--accent-green: 140 50% 60%;

/* Neutrals */
--background: 0 0% 98%;
--foreground: 0 0% 15%;
--card: 0 0% 100%;
--border: 220 15% 90%;
```

### Tailwind Usage
```tsx
// Primary buttons
<Button className="bg-primary hover:bg-primary-hover">
// Accent backgrounds
<div className="bg-accent-yellow">
// High contrast borders
<div className="border-4 border-foreground">
```

## Typography

### Font Stack: Plus Jakarta Sans
```html
<!-- Google Fonts Import -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Tailwind Configuration
```js
// tailwind.config.ts
fontFamily: {
  'heading': ['Plus Jakarta Sans', 'sans-serif'],
  'body': ['Plus Jakarta Sans', 'sans-serif'],
}
```

### Typography Scale
```tsx
// Headings
<h1 className="font-heading text-5xl font-bold">Main Hero</h1>
<h2 className="font-heading text-3xl font-semibold">Section Headers</h2>
<h3 className="font-heading text-2xl font-semibold">Card Titles</h3>

// Body Text
<p className="font-body text-base">Regular content</p>
<p className="font-body text-sm font-medium">Captions & Labels</p>

// Bold Emphasis (Neubrutalism Style)
<h2 className="font-heading text-3xl font-black uppercase tracking-wide">
  BOLD STATEMENTS
</h2>
```

## Neubrutalism Component Recipes

### 1. Brutalist Button
```tsx
<Button 
  className="
    bg-accent-yellow 
    border-4 
    border-foreground 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    font-black 
    uppercase 
    hover:translate-x-1 
    hover:translate-y-1 
    hover:shadow-none 
    transition-all
  "
>
  GET STARTED!
</Button>
```

### 2. Brutalist Card
```tsx
<Card className="
  border-4 
  border-foreground 
  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
  bg-accent-yellow
">
  <CardHeader>
    <CardTitle className="font-black text-2xl uppercase">
      PREMIUM PLAN
    </CardTitle>
  </CardHeader>
  <CardContent className="
    bg-white 
    border-4 
    border-foreground 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    m-4 
    p-6
  ">
    {/* Content */}
  </CardContent>
</Card>
```

### 3. Brutalist Input
```tsx
<Input 
  className="
    border-4 
    border-foreground 
    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
    font-bold 
    placeholder:font-semibold
    focus:translate-x-1 
    focus:translate-y-1 
    focus:shadow-none 
    transition-all
  " 
  placeholder="ENTER YOUR EMAIL"
/>
```

### 4. Brutalist Badge
```tsx
<Badge className="
  bg-foreground 
  text-background 
  font-black 
  uppercase 
  px-3 
  py-1 
  text-xs 
  border-2 
  border-foreground
">
  NEW!
</Badge>
```

## Shadow System

### Neubrutalism Shadows
```css
/* Tailwind Custom Shadows */
--shadow-brutal-sm: 2px 2px 0px 0px rgba(0,0,0,1);
--shadow-brutal-md: 4px 4px 0px 0px rgba(0,0,0,1);
--shadow-brutal-lg: 8px 8px 0px 0px rgba(0,0,0,1);
--shadow-brutal-xl: 12px 12px 0px 0px rgba(0,0,0,1);
```

### Usage Examples
```tsx
// Small elements
<div className="shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">

// Medium elements (buttons, small cards)
<div className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

// Large elements (main cards, sections)
<div className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
```

## Interactive States

### Hover Animations
```tsx
// Brutal hover effect (signature move)
<Button className="
  hover:translate-x-1 
  hover:translate-y-1 
  hover:shadow-none 
  transition-all 
  duration-150
">

// Scale + Shadow combination
<Card className="
  hover:scale-[1.02] 
  hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
  transition-all 
  duration-200
">
```

### Focus States
```tsx
<Input className="
  focus:translate-x-1 
  focus:translate-y-1 
  focus:shadow-none 
  focus:ring-4 
  focus:ring-primary 
  transition-all
">
```

## Layout Patterns

### Hero Section
```tsx
<section className="bg-accent-yellow border-b-4 border-foreground">
  <div className="container mx-auto px-6 py-16">
    <h1 className="
      font-heading 
      text-6xl 
      font-black 
      uppercase 
      text-foreground 
      mb-6
    ">
      MASTER AI CODING
    </h1>
    <p className="font-body text-xl font-semibold mb-8 max-w-2xl">
      Give your child the ultimate advantage in tomorrow's world with 
      our cutting-edge AI education platform.
    </p>
    <Button className="
      bg-primary 
      border-4 
      border-foreground 
      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
      font-black 
      text-lg 
      px-8 
      py-4
    ">
      START LEARNING NOW!
    </Button>
  </div>
</section>
```

### Pricing Cards Grid
```tsx
<div className="grid md:grid-cols-3 gap-8">
  {plans.map((plan) => (
    <Card key={plan.id} className="
      border-4 
      border-foreground 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      bg-white 
      hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
      hover:scale-[1.02] 
      transition-all
    ">
      <CardHeader className="bg-accent-purple border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase">
          {plan.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-4xl font-black mb-6">
          ${plan.price}<span className="text-lg">/MONTH</span>
        </div>
        {/* Features list */}
      </CardContent>
    </Card>
  ))}
</div>
```

## Form Components

### Contact Form
```tsx
<form className="space-y-6 max-w-md">
  <div>
    <Label className="font-bold text-sm uppercase mb-2 block">
      Parent Name
    </Label>
    <Input className="
      border-4 
      border-foreground 
      shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
      font-semibold
    " />
  </div>
  
  <div>
    <Label className="font-bold text-sm uppercase mb-2 block">
      Child's Age
    </Label>
    <Select>
      <SelectTrigger className="
        border-4 
        border-foreground 
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
        font-semibold
      ">
        <SelectValue placeholder="SELECT AGE" />
      </SelectTrigger>
    </Select>
  </div>
  
  <Button type="submit" className="
    w-full 
    bg-primary 
    border-4 
    border-foreground 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    font-black 
    uppercase
  ">
    BOOK FREE CONSULTATION!
  </Button>
</form>
```

## Responsive Design

### Mobile Adaptations
```tsx
// Reduce border thickness and shadows on mobile
<Card className="
  border-2 md:border-4 
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
  md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
">

// Adjust typography scale
<h1 className="
  text-3xl md:text-5xl lg:text-6xl 
  font-black 
  uppercase
">
```

### Breakpoint Strategy
- **Mobile (sm)**: Lighter brutalism, smaller shadows
- **Tablet (md)**: Standard brutalism effects
- **Desktop (lg+)**: Full brutalism with maximum impact

## Accessibility Standards

### Color Contrast
- All text maintains WCAG AA compliance (4.5:1 minimum)
- Interactive elements have 3:1 contrast minimum
- Focus indicators are highly visible with 4px ring

### Typography Accessibility
```tsx
// Ensure readable font sizes
<p className="text-base md:text-lg">Body text</p>

// Maintain proper heading hierarchy
<h1 className="sr-only">Page Title</h1>
<h2 className="font-heading text-3xl font-black">Visible Section Title</h2>
```

### Interactive Accessibility
```tsx
// Proper focus management
<Button className="
  focus:ring-4 
  focus:ring-primary 
  focus:ring-offset-2 
  focus:outline-none
">

// Screen reader support
<Badge aria-label="New feature available">NEW!</Badge>
```

## Animation Guidelines

### Brutalist Micro-interactions
```css
/* Signature brutalist hover */
.brutal-hover {
  transition: all 150ms ease-out;
}

.brutal-hover:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.brutal-hover:active {
  transform: translate(2px, 2px);
}
```

### Performance Considerations
- Use `transform` for animations (GPU accelerated)
- Limit animations to `opacity`, `transform`, and `box-shadow`
- Respect `prefers-reduced-motion` for accessibility

## Implementation Checklist

### Initial Setup
- [ ] Install Plus Jakarta Sans font
- [ ] Configure Tailwind with custom shadow utilities
- [ ] Set up color variables in CSS
- [ ] Create base component variants

### Component Development
- [ ] Build brutalist button variants
- [ ] Create card component with brutal styling
- [ ] Implement form components with thick borders
- [ ] Add hover animations to interactive elements

### Quality Assurance
- [ ] Test contrast ratios for accessibility
- [ ] Verify responsive behavior on all devices
- [ ] Ensure animations respect reduced motion preferences
- [ ] Validate component consistency across pages

This design system creates a distinctive, memorable brand presence that communicates confidence and innovation while maintaining the trust and professionalism parents expect when choosing their child's AI education platform.
