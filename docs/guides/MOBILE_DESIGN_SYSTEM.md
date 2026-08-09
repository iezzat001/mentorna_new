
# Mobile-First Design System for Mentorna® AI Education Platform

## Design Philosophy

The mobile design system for `/mobile` embodies **TikTok-Style Educational Engagement** through full-screen vertical scrolling experiences combined with Neubrutalism aesthetics and Plus Jakarta Sans typography. This approach creates an immersive, addictive user experience that captures the attention of modern parents while maintaining the bold, trustworthy brand presence expected from premium AI education platforms.

### Core Mobile Principles
- **Full-Screen Immersion**: Each section occupies 100vh for maximum visual impact
- **Vertical Scroll Storytelling**: Smooth snap-scroll navigation mimics social media consumption
- **Touch-First Interactions**: All elements optimized for thumb navigation and gestures
- **Video-Centric Content**: Prioritizes visual storytelling over text-heavy layouts
- **Instant Engagement**: Each screen must capture attention within 3 seconds

## Mobile-Specific Color System

### Mobile-Optimized Palette
```css
/* High Contrast for Mobile Readability */
--mobile-primary: 14 90% 65%;
--mobile-primary-dark: 14 85% 55%;
--mobile-accent-yellow: 45 95% 70%;
--mobile-accent-purple: 260 60% 80%;
--mobile-accent-blue: 210 80% 75%;
--mobile-accent-green: 140 60% 65%;

/* Mobile Background Gradients */
--mobile-bg-hero: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
--mobile-bg-story: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%);
--mobile-bg-pricing: linear-gradient(135deg, hsl(var(--accent-yellow)) 0%, hsl(var(--accent-yellow))/80% 100%);
--mobile-bg-newsletter: linear-gradient(135deg, #1e293b 0%, #000000 50%, #374151 100%);
```

### Mobile Usage Examples
```tsx
// Full-screen section backgrounds
<div className="bg-gradient-to-br from-accent-yellow via-accent-yellow/80 to-accent-yellow/60">

// Video overlay gradients
<div className="bg-gradient-to-t from-black/80 via-black/40 to-black/20">

// Dark premium sections
<div className="bg-gradient-to-br from-slate-900 via-black to-slate-800">
```

## Mobile Typography Scale

### Mobile-Optimized Typography
```tsx
// Mobile Hero Titles (Large Impact)
<h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none">

// Mobile Section Headers
<h2 className="text-2xl md:text-3xl font-black uppercase leading-tight">

// Mobile Card Titles  
<h3 className="text-xl md:text-2xl font-bold leading-tight">

// Mobile Body Text (Larger for readability)
<p className="text-base md:text-lg font-medium leading-relaxed">

// Mobile Captions & Labels
<p className="text-sm md:text-base font-semibold">

// Mobile Micro Text
<span className="text-xs font-medium">
```

### Mobile Reading Patterns
- **Scan-friendly**: Use bullet points and short paragraphs
- **Thumb-scrollable**: Ensure line height allows easy reading while scrolling
- **High contrast**: Always maintain WCAG AA standards on mobile backgrounds

## Mobile Layout Patterns

### 1. Full-Screen Hero Section (TikTok Style)
```tsx
<div className="relative h-screen w-full overflow-hidden snap-start">
  {/* Video Background */}
  <video 
    autoPlay 
    muted 
    loop 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="video.mp4" type="video/mp4" />
  </video>
  
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
  
  {/* Top Bar */}
  <div className="relative z-30 flex items-center justify-between p-4 pt-12">
    <div className="font-heading text-white font-light tracking-wide text-xl">
      Mentorna®
    </div>
    <div className="w-8 h-8 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
    </div>
  </div>
  
  {/* Content Layout */}
  <div className="relative z-20 h-full flex">
    {/* Left Content Area (75%) */}
    <div className="flex-1 flex flex-col justify-end p-4 pb-32">
      {/* Profile Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue mr-3" />
        <div>
          <div className="text-white font-semibold text-sm">@Mentorna_Official</div>
          <div className="text-white/70 text-xs">AI Education Platform</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="mb-6">
        <h1 className="text-white text-xl font-bold leading-tight mb-2">
          Your 8-Week Transformation Journey
        </h1>
        <p className="text-white/90 text-base leading-relaxed">
          Launch real products, solve real problems, lead real change.
        </p>
      </div>
      
      {/* CTA */}
      <Button className="w-full bg-white text-black font-bold py-4 rounded-full">
        Join Waiting List 🚀
      </Button>
    </div>
    
    {/* Right Action Bar (25%) */}
    <div className="w-16 flex flex-col items-center justify-end pb-32 pr-2">
      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-6">
        <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  </div>
  
  {/* Progress Bar */}
  <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
    <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
  </div>
</div>
```

### 2. Mobile Story Section
```tsx
<div className="relative h-screen w-full overflow-hidden snap-start">
  {/* Background Video/Image */}
  <div className="absolute inset-0">
    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
      <source src={story.videoUrl} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
  </div>
  
  {/* Mobile Header */}
  <div className="relative z-30 flex items-center justify-between p-4 pt-12">
    <div className="font-heading text-white font-light text-xl">Mentorna®</div>
    <div className="w-8 h-8 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
    </div>
  </div>
  
  {/* Story Content */}
  <div className="relative z-20 h-[calc(100vh-6rem)] flex flex-col justify-end p-4 pb-20">
    {/* Badge */}
    <div className="mb-4">
      <Badge className={`${story.badgeColor} text-foreground font-black uppercase px-3 py-1 text-xs`}>
        {story.badge}
      </Badge>
    </div>
    
    {/* Story Text */}
    <div className="mb-6">
      <h2 className="text-white text-2xl font-black uppercase mb-3 leading-tight">
        {story.name}
      </h2>
      <p className="text-white/90 text-base font-medium leading-relaxed mb-4">
        {story.description}
      </p>
      
      {/* Hashtags */}
      <div className="flex flex-wrap gap-2">
        {story.hashtags.map((tag) => (
          <span key={tag} className="text-accent-blue text-sm">#{tag}</span>
        ))}
      </div>
    </div>
    
    {/* Social Stats */}
    <div className="flex items-center gap-6 text-white/80 text-sm">
      <span>❤️ {story.likes}</span>
      <span>💬 {story.comments}</span>
      <span>📤 {story.shares}</span>
    </div>
  </div>
</div>
```

### 3. Mobile Pricing Section
```tsx
<div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-accent-yellow via-accent-yellow/80 to-accent-yellow/60">
  {/* Mobile Header */}
  <div className="relative z-30 flex items-center justify-between p-4 pt-8">
    <div className="font-heading text-foreground font-light tracking-wide text-lg">
      Mentorna® Program
    </div>
    <div className="w-6 h-6 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-foreground/20 backdrop-blur-sm" />
    </div>
  </div>

  {/* Pricing Content */}
  <div className="relative z-20 flex flex-col h-[calc(100vh-4rem)] p-4">
    {/* Section Title */}
    <div className="text-center mb-4">
      <h2 className="font-black text-lg uppercase text-foreground mb-1 leading-tight">
        Transform Your Child's Future
      </h2>
      <p className="font-body text-sm font-semibold text-foreground/80 leading-tight max-w-sm mx-auto">
        For less than the cost of a few tutoring sessions
      </p>
    </div>

    {/* Pricing Card */}
    <div className="flex-1 flex flex-col min-h-0">
      <Card className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white mb-4 flex-1 flex flex-col">
        {/* Card Header */}
        <CardHeader className="bg-primary border-b-2 border-foreground text-center p-3">
          <Badge className="bg-foreground text-background font-black uppercase px-2 py-0.5 text-xs mb-2">
            LAUNCH SPECIAL
          </Badge>
          <div className="text-2xl font-black text-primary-foreground">$329</div>
          <CardTitle className="font-black text-sm uppercase text-primary-foreground">
            LAUNCH SPECIAL PRICE
          </CardTitle>
        </CardHeader>
        
        {/* Card Content */}
        <CardContent className="p-3 flex-1 flex flex-col">
          {/* Bonus Section */}
          <div className="bg-accent-purple border-2 border-foreground shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] p-2 mb-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-foreground flex-shrink-0" />
              <div>
                <div className="font-black text-xs uppercase text-foreground">💎 BONUS</div>
                <div className="font-body text-xs font-semibold text-foreground leading-tight">
                  First 30 get Digital AI Toolkit ($49)
                </div>
              </div>
            </div>
          </div>
          
          {/* Features would go here */}
        </CardContent>
      </Card>
    </div>

    {/* CTA */}
    <div className="flex-shrink-0">
      <Button className="w-full bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm px-4 py-3 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        <Sparkles className="h-3 w-3 mr-1" />
        SECURE YOUR SPOT NOW!
      </Button>
      <p className="font-body text-xs font-semibold text-foreground/70 mt-2 text-center">
        Limited Time • First 30 Families Only
      </p>
    </div>
  </div>
</div>
```

## Mobile Component Architecture

### Mobile Section Wrapper
```tsx
// Base mobile section component
interface MobileSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  hasVideo?: boolean;
  videoUrl?: string;
}

const MobileSection = ({ children, backgroundColor, hasVideo, videoUrl }: MobileSectionProps) => (
  <div className={`relative h-screen w-full overflow-hidden snap-start ${backgroundColor || ''}`}>
    {hasVideo && (
      <>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
      </>
    )}
    {children}
  </div>
);
```

### Mobile Header Component
```tsx
// Consistent mobile header across all sections
const MobileHeader = ({ title = "Mentorna®", variant = "light" }: { title?: string; variant?: "light" | "dark" }) => (
  <div className="relative z-30 flex items-center justify-between p-4 pt-12">
    <div className={`font-heading font-light tracking-wide text-xl ${variant === "light" ? "text-white" : "text-foreground"}`}>
      {title}
    </div>
    <div className="w-8 h-8 flex items-center justify-center">
      <div className={`w-6 h-6 rounded-full backdrop-blur-sm ${variant === "light" ? "bg-white/20" : "bg-foreground/20"}`} />
    </div>
  </div>
);
```

## Mobile Interaction Patterns

### Scroll Snap Navigation
```css
/* Applied to main container */
.mobile-scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.mobile-scroll-container::-webkit-scrollbar {
  display: none;
}

/* Applied to each section */
.mobile-section {
  scroll-snap-align: start;
  height: 100vh;
  width: 100%;
}
```

### Touch Interactions
```tsx
// Mobile-optimized button sizing
<Button className="
  min-h-[48px] 
  min-w-[48px] 
  touch-manipulation
  active:scale-95
  transition-transform
  duration-150
">

// Mobile gesture indicators
<div className="flex flex-col items-center">
  <div className="w-1 h-8 bg-white/50 rounded-full animate-pulse" />
  <span className="text-white/70 text-xs mt-1">Swipe up</span>
</div>
```

### Mobile Cards & Overlays
```tsx
// Mobile-optimized card with backdrop blur
<div className="
  bg-white/10 
  backdrop-blur-md 
  border-2 
  border-white/30 
  rounded-2xl 
  p-4 
  shadow-[0_8px_32px_rgba(0,0,0,0.3)]
">

// Mobile brutalist card
<Card className="
  border-2 md:border-4 
  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
  md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
">
```

## Mobile-Specific Animations

### Mobile Scroll Animations
```css
/* Smooth mobile scrolling */
@media (max-width: 768px) {
  .mobile-scroll-container {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
}

/* Mobile hover states (touch-friendly) */
@media (hover: none) and (pointer: coarse) {
  .mobile-button:active {
    transform: scale(0.95);
    transition: transform 0.1s ease-out;
  }
}
```

### Mobile Video Controls
```tsx
// Auto-playing video with mobile controls
const [progress, setProgress] = useState(0);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const updateProgress = () => {
    const currentTime = video.currentTime;
    const duration = video.duration;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  video.addEventListener('timeupdate', updateProgress);
  return () => video.removeEventListener('timeupdate', updateProgress);
}, []);

// Progress bar
<div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
  <div 
    className="h-full bg-white transition-all duration-100 ease-linear" 
    style={{ width: `${progress}%` }}
  />
</div>
```

## Mobile Accessibility Standards

### Touch Target Sizes
```tsx
// Minimum 48x48px touch targets
<button className="min-h-[48px] min-w-[48px] p-3">

// Spacing between interactive elements
<div className="space-y-4"> {/* Minimum 16px between targets */}
```

### Mobile Screen Readers
```tsx
// Mobile-optimized ARIA labels
<button aria-label="Join waiting list for AI education program">
  Join Waiting List 🚀
</button>

// Mobile navigation hints
<div role="region" aria-label="Swipe up to continue">
```

### Mobile Color Contrast
```tsx
// High contrast for mobile readability
<div className="bg-black/80 text-white"> {/* 15:1 contrast ratio */}
<div className="bg-accent-yellow text-foreground"> {/* 4.5:1 minimum */}
```

## Mobile Performance Optimization

### Video Loading Strategy
```tsx
// Lazy loading for mobile videos
<video 
  autoPlay={isInView} 
  muted 
  loop 
  playsInline
  preload="metadata"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="video.mp4" type="video/mp4" />
</video>
```

### Mobile Image Optimization
```tsx
// Responsive images for mobile
<img 
  src="image-mobile.jpg"
  srcSet="
    image-mobile-320w.jpg 320w,
    image-mobile-640w.jpg 640w,
    image-mobile-1024w.jpg 1024w
  "
  sizes="100vw"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

## Mobile Testing Guidelines

### Device Testing Matrix
- **iPhone SE (375px)**: Minimum mobile width
- **iPhone 12/13/14 (390px)**: Standard mobile
- **iPhone 12/13/14 Pro Max (428px)**: Large mobile
- **Android (360px-414px)**: Various Android devices

### Mobile-Specific Checks
1. **Thumb Navigation**: All interactive elements reachable with thumb
2. **Scroll Performance**: Smooth 60fps scrolling on all sections
3. **Video Playback**: Auto-play works without user interaction
4. **Touch Feedback**: Visual feedback for all touch interactions
5. **Landscape Mode**: Graceful handling of orientation changes

## Implementation Checklist

### Mobile Section Setup
- [ ] Full-screen height (100vh)
- [ ] Scroll snap alignment
- [ ] Mobile header component
- [ ] Touch-optimized interactions
- [ ] Responsive typography scale

### Mobile Content Optimization
- [ ] Video backgrounds with fallbacks
- [ ] High-contrast text overlays
- [ ] Mobile-optimized card layouts
- [ ] Touch-friendly button sizes
- [ ] Swipe indicators where needed

### Mobile Performance
- [ ] Lazy loading for videos/images
- [ ] Optimized asset sizes
- [ ] Smooth scroll implementation
- [ ] Touch feedback animations
- [ ] Reduced motion preferences

This mobile design system ensures a consistent, engaging, and accessible experience across all mobile devices while maintaining the bold, trustworthy brand presence that parents expect from a premium AI education platform.
