
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DesignShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-heading text-5xl font-bold text-foreground">
            Design System Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspired by modern mental health platforms - vibrant, accessible, and user-friendly components
          </p>
        </div>

        {/* Typography Section */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold">Typography Options</h2>
          <p className="text-muted-foreground text-lg">Choose the perfect font that conveys professionalism, warmth, and innovation for your AI education platform</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Option 1: Inter (Modern & Clean) */}
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Inter, sans-serif' }}>Option 1: Inter</CardTitle>
                  <Badge className="bg-accent-blue text-foreground">Modern</Badge>
                </div>
                <CardDescription>Clean, professional, and highly readable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                <h3 className="text-2xl font-bold text-primary">Empower Your Child's Future with AI</h3>
                <p className="text-muted-foreground">
                  Our cutting-edge curriculum combines creativity with technology, 
                  giving your child the skills they need to thrive in tomorrow's world.
                </p>
                <div className="text-sm font-medium">Perfect for: Professional communication, clear readability</div>
              </CardContent>
            </Card>

            {/* Option 2: Poppins (Friendly & Approachable) */}
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Option 2: Poppins</CardTitle>
                  <Badge className="bg-accent-green text-foreground">Friendly</Badge>
                </div>
                <CardDescription>Warm, approachable, and contemporary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <h3 className="text-2xl font-bold text-primary">Empower Your Child's Future with AI</h3>
                <p className="text-muted-foreground">
                  Our cutting-edge curriculum combines creativity with technology, 
                  giving your child the skills they need to thrive in tomorrow's world.
                </p>
                <div className="text-sm font-medium">Perfect for: Parent-friendly communication, warm feeling</div>
              </CardContent>
            </Card>

            {/* Option 3: Space Grotesk (Futuristic & Tech) */}
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Option 3: Space Grotesk</CardTitle>
                  <Badge className="bg-accent-purple text-foreground">Futuristic</Badge>
                </div>
                <CardDescription>Tech-forward, distinctive, and innovative</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <h3 className="text-2xl font-bold text-primary">Empower Your Child's Future with AI</h3>
                <p className="text-muted-foreground">
                  Our cutting-edge curriculum combines creativity with technology, 
                  giving your child the skills they need to thrive in tomorrow's world.
                </p>
                <div className="text-sm font-medium">Perfect for: Tech branding, futuristic appeal</div>
              </CardContent>
            </Card>

            {/* Option 4: Plus Jakarta Sans (Elegant & Versatile) */}
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Option 4: Plus Jakarta Sans</CardTitle>
                  <Badge className="bg-accent-yellow text-foreground">Elegant</Badge>
                </div>
                <CardDescription>Sophisticated, versatile, and premium feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <h3 className="text-2xl font-bold text-primary">Empower Your Child's Future with AI</h3>
                <p className="text-muted-foreground">
                  Our cutting-edge curriculum combines creativity with technology, 
                  giving your child the skills they need to thrive in tomorrow's world.
                </p>
                <div className="text-sm font-medium">Perfect for: Premium positioning, elegant branding</div>
              </CardContent>
            </Card>

            {/* Option 5: Outfit (Bold & Contemporary) */}
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Outfit, sans-serif' }}>Option 5: Outfit</CardTitle>
                  <Badge className="bg-gradient-primary text-white">Bold</Badge>
                </div>
                <CardDescription>Strong, confident, and attention-grabbing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <h3 className="text-2xl font-bold text-primary">Empower Your Child's Future with AI</h3>
                <p className="text-muted-foreground">
                  Our cutting-edge curriculum combines creativity with technology, 
                  giving your child the skills they need to thrive in tomorrow's world.
                </p>
                <div className="text-sm font-medium">Perfect for: Strong brand presence, confident messaging</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-accent-purple/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-3 text-primary">Typography Recommendation</h3>
              <p className="text-muted-foreground">
                For an AI education platform targeting parents, I recommend <strong>Poppins</strong> or <strong>Plus Jakarta Sans</strong>. 
                Both convey professionalism while maintaining warmth and approachability - essential for building trust with parents 
                who want the best for their children's future in technology.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary Buttons</CardTitle>
                <CardDescription>Main action buttons with coral/orange theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Join now</Button>
                <Button size="lg" className="w-full">Get started today</Button>
                <Button size="sm" className="w-full">Learn more</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secondary Buttons</CardTitle>
                <CardDescription>Alternative action buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="secondary" className="w-full">Book a session</Button>
                <Button variant="outline" className="w-full">Contact us</Button>
                <Button variant="ghost" className="w-full">Cancel</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Variants</CardTitle>
                <CardDescription>Colorful accent buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="gradient" className="w-full">Premium feature</Button>
                <Button variant="purple" className="w-full">Purple accent</Button>
                <Button variant="yellow" className="w-full">Yellow accent</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Therapy Sessions</CardTitle>
                  <Badge className="bg-accent-green text-foreground">Active</Badge>
                </div>
                <CardDescription>
                  Connect with licensed therapists for personalized mental health support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next session:</span>
                    <span className="font-medium">Tomorrow, 2:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Therapist:</span>
                    <span className="font-medium">Dr. Sarah Johnson</span>
                  </div>
                  <Button className="w-full mt-4">Join session</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Peer Support</CardTitle>
                  <Badge className="bg-accent-blue text-foreground">8 online</Badge>
                </div>
                <CardDescription>
                  Connect with fellow students facing similar challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Join group discussions, share experiences, and support each other
                  </div>
                  <Button variant="secondary" className="w-full">Browse groups</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Wellness Tools</CardTitle>
                  <Badge className="bg-accent-yellow text-foreground">New</Badge>
                </div>
                <CardDescription>
                  Guided meditations, mood tracking, and self-care resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Access evidence-based tools for daily wellness
                  </div>
                  <Button variant="purple" className="w-full">Explore tools</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dropdowns & Forms */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold">Interactive Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menus</CardTitle>
                <CardDescription>Clean, accessible dropdown components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select your school</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Choose your institution
                        <span className="ml-2">▼</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-card border border-border shadow-design-md">
                      <DropdownMenuLabel>Universities</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Binghamton University</DropdownMenuItem>
                      <DropdownMenuItem>UC San Diego</DropdownMenuItem>
                      <DropdownMenuItem>Williams College</DropdownMenuItem>
                      <DropdownMenuItem>The George Washington University</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Other institution</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Clean input fields and form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@university.edu"
                    className="rounded-xl border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your full name"
                    className="rounded-xl border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <Button className="w-full mt-4">Create account</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-3">
              <div className="h-16 bg-primary rounded-xl shadow-design-sm"></div>
              <div className="text-center">
                <p className="font-medium text-sm">Primary</p>
                <p className="text-xs text-muted-foreground">Coral Orange</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-16 bg-accent-purple rounded-xl shadow-design-sm"></div>
              <div className="text-center">
                <p className="font-medium text-sm">Purple</p>
                <p className="text-xs text-muted-foreground">Soft Lavender</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-16 bg-accent-yellow rounded-xl shadow-design-sm"></div>
              <div className="text-center">
                <p className="font-medium text-sm">Yellow</p>
                <p className="text-xs text-muted-foreground">Bright Gold</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-16 bg-accent-blue rounded-xl shadow-design-sm"></div>
              <div className="text-center">
                <p className="font-medium text-sm">Blue</p>
                <p className="text-xs text-muted-foreground">Calm Sky</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-16 bg-accent-green rounded-xl shadow-design-sm"></div>
              <div className="text-center">
                <p className="font-medium text-sm">Green</p>
                <p className="text-xs text-muted-foreground">Fresh Mint</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-16 bg-gradient-primary rounded-xl shadow-design-sm"></div>
              <div className="text-center">
                <p className="font-medium text-sm">Gradient</p>
                <p className="text-xs text-muted-foreground">Warm Blend</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignShowcase;
