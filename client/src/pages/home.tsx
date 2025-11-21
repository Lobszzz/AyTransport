import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sparkles, Rocket, Zap, Code, Menu } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-6xl">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" data-testid="icon-logo" />
            <span className="text-xl font-bold" data-testid="text-app-name">React Starter</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">Features</a>
            <a href="#getting-started" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-getting-started">Getting Started</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" className="hidden sm:flex" data-testid="button-get-started">
              Get Started
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" data-testid="sheet-mobile-menu">
                <nav className="flex flex-col gap-4 mt-8">
                  <a 
                    href="#features" 
                    className="text-base font-medium text-foreground hover:text-primary transition-colors" 
                    data-testid="link-mobile-features"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="#getting-started" 
                    className="text-base font-medium text-foreground hover:text-primary transition-colors" 
                    data-testid="link-mobile-getting-started"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Getting Started
                  </a>
                  <a 
                    href="#about" 
                    className="text-base font-medium text-foreground hover:text-primary transition-colors" 
                    data-testid="link-mobile-about"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <Button variant="default" className="mt-4" data-testid="button-mobile-get-started">
                    Get Started
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24 max-w-4xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium" data-testid="badge-version">
              <Sparkles className="h-4 w-4" />
              <span>Modern React Starter Template</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="heading-hero">
              Build amazing things with React
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-description">
              A clean, minimal foundation for your next React project. Built with modern best practices and a professional design system ready to be customized.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" data-testid="button-start-building">
                <Rocket className="mr-2 h-5 w-5" />
                Start Building
              </Button>
              <Button variant="outline" size="lg" data-testid="button-view-docs">
                View Docs
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="heading-features">Everything you need to get started</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-description">
              Pre-configured with the tools and patterns you need for modern web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card data-testid="card-feature-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid="icon-feature-1">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle data-testid="text-feature-1-title">Lightning Fast</CardTitle>
                <CardDescription data-testid="text-feature-1-description">
                  Built with Vite for instant hot module replacement and optimized production builds
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-testid="card-feature-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid="icon-feature-2">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle data-testid="text-feature-2-title">TypeScript Ready</CardTitle>
                <CardDescription data-testid="text-feature-2-description">
                  Full TypeScript support with modern tooling for type-safe development
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-testid="card-feature-3">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid="icon-feature-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle data-testid="text-feature-3-title">Beautiful UI Components</CardTitle>
                <CardDescription data-testid="text-feature-3-description">
                  Pre-built components from shadcn/ui with Tailwind CSS for rapid development
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-testid="card-feature-4">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid="icon-feature-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle data-testid="text-feature-4-title">Production Ready</CardTitle>
                <CardDescription data-testid="text-feature-4-description">
                  Optimized build configuration and best practices baked in from day one
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section id="getting-started" className="container mx-auto px-4 py-16 max-w-4xl">
          <Card data-testid="card-getting-started">
            <CardHeader>
              <CardTitle className="text-2xl" data-testid="text-getting-started-title">Quick Start</CardTitle>
              <CardDescription data-testid="text-getting-started-description">Get up and running in seconds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2" data-testid="section-step-1">
                <h3 className="font-semibold text-sm text-muted-foreground" data-testid="text-step-1-heading">Step 1: Customize the design</h3>
                <p className="text-sm" data-testid="text-step-1-description">Edit <code className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">tailwind.config.ts</code> to match your brand colors and styling preferences.</p>
              </div>
              <div className="space-y-2" data-testid="section-step-2">
                <h3 className="font-semibold text-sm text-muted-foreground" data-testid="text-step-2-heading">Step 2: Add your components</h3>
                <p className="text-sm" data-testid="text-step-2-description">Create new pages in <code className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">client/src/pages/</code> and register routes in <code className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">App.tsx</code>.</p>
              </div>
              <div className="space-y-2" data-testid="section-step-3">
                <h3 className="font-semibold text-sm text-muted-foreground" data-testid="text-step-3-heading">Step 3: Build your backend</h3>
                <p className="text-sm" data-testid="text-step-3-description">Add API routes in <code className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">server/routes.ts</code> and define schemas in <code className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">shared/schema.ts</code>.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="about" className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold" data-testid="heading-about">About This Starter</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-about-description">
              This React starter template is designed to help you quickly bootstrap modern web applications. 
              It combines industry-standard tools and best practices in a clean, minimal package that's easy to understand and extend.
            </p>
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="space-y-2" data-testid="section-about-1">
                <h3 className="font-semibold" data-testid="text-about-1-title">Modern Stack</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-about-1-description">
                  Built with the latest versions of React, TypeScript, and Vite for the best developer experience.
                </p>
              </div>
              <div className="space-y-2" data-testid="section-about-2">
                <h3 className="font-semibold" data-testid="text-about-2-title">Best Practices</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-about-2-description">
                  Follows React best practices, component patterns, and accessibility standards out of the box.
                </p>
              </div>
              <div className="space-y-2" data-testid="section-about-3">
                <h3 className="font-semibold" data-testid="text-about-3-title">Easy to Customize</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-about-3-description">
                  Clean code structure and clear documentation make it simple to adapt to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-docs">Documentation</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-github">GitHub</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-community">Community</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
