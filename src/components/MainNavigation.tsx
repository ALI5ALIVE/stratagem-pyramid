import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import logo from "@/assets/comply365-logo-white.png";

const navItems = [
  { label: "Platform", href: "/platform", hasDropdown: false },
  { 
    label: "Solutions", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Airlines", href: "/solutions/airlines" },
      { label: "Defense", href: "/solutions/defense" },
      { label: "Rail", href: "/solutions/rail" },
    ]
  },
  { label: "Customers", href: "/homepage-mockup", hasDropdown: false },
  { label: "Resources", href: "/homepage-mockup", hasDropdown: false },
];

const MainNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/homepage-mockup" className="flex items-center">
            <img src={logo} alt="Comply365" className="h-8" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[160px]">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm">
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
