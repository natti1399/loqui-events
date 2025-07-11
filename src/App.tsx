import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Menu, X, Calendar, Phone, Mail, MapPin, Clock, CreditCard, ArrowRight, Users, Heart, Star, Instagram } from 'lucide-react';
import { getEvents, ContentfulEvent } from './services/contentful';
import { formatEventDate } from './utils/markdownParser';

// Mastercard icon component
const MastercardIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="9" cy="12" r="6" fill="#EB001B"/>
    <circle cx="15" cy="12" r="6" fill="#F79E1B"/>
    <path d="M12 7.5c1.24 1.42 2 3.27 2 5.25s-.76 3.83-2 5.25c-1.24-1.42-2-3.27-2-5.25s.76-3.83 2-5.25z" fill="#FF5F00"/>
  </svg>
);

// Custom icons for social media
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Proper dynamic imports for code splitting
const LazyImage = lazy(() => import('./components/LazyImage'));
const SocialIcons = lazy(() => import('./components/SocialIcons'));
const PaymentIcons = lazy(() => import('./components/PaymentIcons'));



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [events, setEvents] = useState<ContentfulEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from Contentful
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const contentfulEvents = await getEvents();
        setEvents(contentfulEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Kunne ikke laste events fra Contentful');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter upcoming events
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.fields.date);
    return eventDate >= new Date();
  }).sort((a, b) => new Date(a.fields.date).getTime() - new Date(b.fields.date).getTime());

  // Debug: Log to console to check if component is mounting
  console.log('App component mounted', { events, upcomingEvents, loading, error });

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins scroll-smooth">
      {/* JSON-LD Schema for Events */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Loqui Events",
          "description": "Loqui Events arrangerer sosiale og inkluderende aktiviteter for deg som vil få nye venner og minner for livet.",
          "url": "https://loquievents.com",
          "logo": "https://loquievents.com/optimized/Loqui events logo.webp",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+47-45-11-76-51",
            "contactType": "customer service",
            "email": "sandrahodds@loquievents.com"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Oslo",
            "addressCountry": "NO"
          },
          "sameAs": [
            "https://instagram.com/loquievents",
            "https://www.tiktok.com/@loqui.oslo",
            "https://www.facebook.com/loquievent"
          ],
          "event": [
            {
              "@type": "Event",
              "name": "Sterk og Selvsikker",
              "description": "Er du klar for å føle deg sterk, trygg og badass – sammen med andre jenter? Vi gir deg den beste måten å slippe ut damp, møte nye folk og få en pause fra hverdagen.",
              "startDate": "2025-01-25T15:00:00+01:00",
              "location": {
                "@type": "Place",
                "name": "Mudo Gym Carl Berner",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Oslo",
                  "addressCountry": "NO"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Loqui Events"
              }
            },
            {
              "@type": "Event",
              "name": "Paint & Sip: Vennskap & Vin",
              "description": "En sosial og kreativ kveld hvor du maler ditt eget kunstverk mens du nyter et glass vin. Kom alene eller med en venn – vi legger opp til nye bekjentskaper og god stemning.",
              "startDate": "2025-02-10T18:00:00+01:00",
              "location": {
                "@type": "Place",
                "name": "Loqui Studio",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Oslo",
                  "addressCountry": "NO"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Loqui Events"
              }
            }
          ]
        })}
      </script>
      {/* Header - Enhanced with glassmorphism */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 20 ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100' : 'bg-white/90 backdrop-blur-lg'
      } hover:shadow-lg`} role="banner">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo - Enhanced */}
            <div className="flex items-center space-x-3 opacity-0 animate-fade-in group cursor-pointer">
              <div className="relative">
                <Suspense fallback={<div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 animate-pulse"></div>}>
                  <LazyImage 
                    src="/optimized/Loqui events logo.webp" 
                    alt="Loqui Events - Social events and activities in Oslo" 
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                  />
                </Suspense>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                Loqui Events
              </span>
            </div>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden md:flex space-x-8 lg:space-x-10" role="navigation" aria-label="Main navigation">
              {[
                { name: 'Hjem', id: 'hjem' },
                { name: 'Kommende Events', id: 'events' },
                { name: 'Om oss', id: 'om-oss' },
                { name: 'Arranger event', id: 'book-event' },
                { name: 'Kontakt', id: 'kontakt' }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in py-2 px-1 group hover:bg-purple-50 rounded-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Social Icons - Enhanced */}
            <div className="hidden md:flex items-center space-x-2 opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <Suspense fallback={<div className="flex space-x-2"><div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div><div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div><div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div></div>}>
                <SocialIcons />
              </Suspense>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 hover:scale-105"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 animate-slide-down bg-white/95 backdrop-blur-xl">
              <div className="px-2 py-6 space-y-1">
                {[
                  { name: 'Hjem', id: 'hjem' },
                  { name: 'Kommende Events', id: 'events' },
                  { name: 'Om oss', id: 'om-oss' },
                  { name: 'Arranger event', id: 'book-event' },
                  { name: 'Kontakt', id: 'kontakt' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium py-4 px-6 rounded-xl hover:bg-purple-50 transition-all duration-300 hover:scale-105"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex space-x-4 pt-4 px-6 border-t border-gray-100 mt-4">
                  {[
                    { href: "https://instagram.com/loquievents", icon: Instagram },
                    { href: "https://www.tiktok.com/@loqui.oslo", icon: TikTokIcon },
                    { href: "https://www.facebook.com/loquievent", icon: FacebookIcon }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-purple-600 transition-all duration-300 p-3 rounded-xl hover:bg-purple-50 hover:scale-110"
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main role="main">
        {/* Hero Section - Enhanced with modern gradient and floating elements */}
        <section id="hjem" className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-18 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <LazyImage 
            src="https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Group of diverse young people laughing and socializing together at a fun social event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-600/70 to-pink-600/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-pulse hover:scale-110 transition-transform duration-500" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-300/15 rounded-full blur-lg animate-pulse hover:scale-110 transition-transform duration-500" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-300/10 rounded-full blur-lg animate-pulse hover:scale-110 transition-transform duration-500" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-1/3 right-1/5 w-28 h-28 bg-blue-300/10 rounded-full blur-xl animate-pulse hover:scale-110 transition-transform duration-500" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Enhanced Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="mb-6 opacity-0 animate-fade-in-up">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
              <Heart size={16} className="mr-2 text-pink-300" />
              Møt nye venner i Oslo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Møt nye mennesker –<br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              på en gøyal måte
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 sm:mb-12 max-w-4xl mx-auto font-light opacity-0 animate-fade-in-up leading-relaxed" style={{ animationDelay: '400ms' }}>
            Loqui Events arrangerer sosiale og inkluderende aktiviteter<br className="hidden sm:block" />
            for deg som vil få nye venner og minner for livet.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:gap-6 justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <button
              onClick={() => scrollToSection('events')}
              className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg flex items-center justify-center space-x-2 border border-purple-500/50"
            >
              <Calendar size={20} />
              <span>Se kommende events</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <a 
              href="https://instagram.com/loquievents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/80 text-white font-semibold rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10 text-base sm:text-lg text-center flex items-center justify-center space-x-2"
            >
              <Instagram size={20} />
              <span>Følg oss på Instagram</span>
            </a>
          </div>


        </div>
        </section>

        {/* Events Section - Enhanced with modern cards */}
        <section id="events" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4 opacity-0 animate-fade-in-up">
              <Calendar size={16} className="mr-2" />
              Kommende aktiviteter
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Kommende Events
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Bli med på våre neste aktiviteter og møt fantastiske nye mennesker
            </p>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Kunne ikke laste events: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Prøv igjen
              </button>
            </div>
          )}
          
          {/* Dynamic Events Grid */}
          {!loading && !error && (
            <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {upcomingEvents.slice(0, 4).map((event, index) => {
                const getCategoryColor = (category: string) => {
                  switch (category.toLowerCase()) {
                    case 'creative': return { bg: 'from-pink-50', border: 'bg-pink-100 text-pink-700', icon: 'from-pink-500 to-purple-600' };
                    case 'quiz': return { bg: 'from-blue-50', border: 'bg-blue-100 text-blue-700', icon: 'from-blue-500 to-purple-600' };
                    case 'game night': return { bg: 'from-green-50', border: 'bg-green-100 text-green-700', icon: 'from-green-500 to-purple-600' };
                    default: return { bg: 'from-purple-50', border: 'bg-purple-100 text-purple-700', icon: 'from-purple-500 to-purple-600' };
                  }
                };
                
                const colors = getCategoryColor(event.fields.category);
                
                return (
                  <div 
                    key={event.sys.id} 
                    className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up hover:scale-105 relative overflow-hidden" 
                    style={{ animationDelay: `${600 + index * 200}ms` }}
                  >
                    {/* Card Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full ${colors.border} text-sm font-medium`}>
                          <Users size={14} className="mr-1" />
                          {event.fields.category}
                        </span>
                        <div className={`w-12 h-12 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center`}>
                          {event.fields.category.toLowerCase() === 'creative' ? <Star size={20} className="text-white" /> : <Heart size={20} className="text-white" />}
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-purple-600 hover:text-purple-700 transition-colors duration-300 mb-4">
                        {event.fields.title}
                      </h3>
                      
                      <div className="space-y-2 text-gray-600 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-purple-500" />
                          <p className="font-semibold text-base">{formatEventDate(event.fields.date)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-purple-500" />
                          <p className="text-base">{event.fields.location}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed text-base mb-8">
                        {event.fields.description}
                      </p>
                      
                      <a 
                        href={event.fields.stripePaymentLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-base flex items-center justify-center space-x-2 group"
                      >
                        <CreditCard size={18} />
                        <span>KJØP BILLETT</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                );
              })}
              
              {/* Show message if no upcoming events */}
              {upcomingEvents.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ingen kommende events</h3>
                  <p className="text-gray-600">Nye events kommer snart! Følg oss på sosiale medier for oppdateringer.</p>
                </div>
              )}
            </div>
          )}
        </div>
        </section>

        {/* About Section - Enhanced with modern layout */}
        <section id="om-oss" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-pink-100 to-transparent rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="space-y-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:space-y-0 items-center">
            <div className="opacity-0 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                <Heart size={16} className="mr-2" />
                Vår historie
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Hvem er vi?
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg sm:text-xl">
                  Loqui Events er skapt for deg som vil utvide vennekretsen på en gøyal måte. Vi arrangerer kreative, sosiale og inkluderende aktiviteter for voksne som ønsker å bli kjent med nye mennesker.
                </p>
                
                <p className="text-lg sm:text-xl">
                  Jeg heter Sandra og startet Loqui fordi jeg selv vet hvor vanskelig det kan være å finne nye venner som voksen. Nå vil jeg gjøre det lettere for deg.
                </p>

                <div className="pt-6">
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Vår misjon</p>
                      <p className="text-gray-600">Å skape meningsfulle forbindelser mellom mennesker i Oslo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 relative">
                  <LazyImage 
                    src="/optimized/Portrett bilde, Sandra.webp"
                    alt="Sandra, founder and CEO of Loqui Events, smiling warmly in a professional portrait"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">Sandra</div>
                    <div className="text-sm text-gray-600">Grunnlegger</div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-80"></div>
                <div className="absolute -bottom-2 -left-8 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
                <div className="absolute -top-8 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Our Events Gallery - Enhanced */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4 opacity-0 animate-fade-in-up">
              <Star size={16} className="mr-2" />
              Våre aktiviteter
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Våre Events
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Tidligere og kommende aktiviteter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                image: "/optimized/20241114_180846.webp",
                title: "Paint and Sip",
                delay: "600ms",
                color: "from-purple-500 to-pink-500",
                alt: "Participants enjoying a creative Paint and Sip event, painting while socializing"
              },
              {
                image: "/optimized/image2.webp",
                title: "Quiz Night",
                delay: "800ms",
                color: "from-blue-500 to-purple-500",
                alt: "Group of friends having fun at a quiz night event, laughing and competing"
              },
              {
                image: "/optimized/20240816_190922.webp",
                title: "Game night",
                delay: "1000ms",
                color: "from-pink-500 to-yellow-500",
                alt: "People playing board games and socializing at a fun game night event"
              }
            ].map((event, index) => (
              <div key={index} className="group text-center opacity-0 animate-fade-in-up" style={{ animationDelay: event.delay }}>
                <div className="relative h-48 sm:h-56 lg:h-64 bg-gray-200 rounded-3xl mb-6 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:shadow-purple-500/20">
                  <LazyImage 
                    src={event.image}
                    alt={event.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Subtle overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors duration-300">
                  {event.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* Host an Event Section */}
        <section id="book-event" className="form-section py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/65 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 opacity-0 animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Arranger event med oss
              </h2>
              <p className="text-lg text-gray-700/70 max-w-2xl mx-auto">
                Har du en idé for et event? Vi hjelper deg med å planlegge og arrangere uforglemmelige opplevelser for din gruppe eller bedrift.
              </p>
            </div>

            <form name="booking" method="POST" data-netlify="true" className="space-y-6">
              <input type="hidden" name="form-name" value="booking" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company / Your name */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrift / Ditt navn *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md focus:scale-105"
                    placeholder="Skriv inn bedriftsnavn eller ditt navn"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-post *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md focus:scale-105"
                    placeholder="din@epost.no"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Desired date / period */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Ønsket dato / periode
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md focus:scale-105"
                    placeholder="f.eks. 15. mars 2025 eller mars 2025"
                  />
                </div>

                {/* Estimated attendees */}
                <div>
                  <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimert antall deltakere
                  </label>
                  <input
                    type="number"
                    id="attendees"
                    name="attendees"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md focus:scale-105"
                    placeholder="20"
                  />
                </div>
              </div>

              {/* Event type */}
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type event
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md focus:scale-105"
                >
                  <option value="">Velg type event</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Social Mixer">Social Mixer</option>
                  <option value="Fitness Event">Fitness Event</option>
                  <option value="Other">Annet</option>
                </select>
              </div>

              {/* Message / requirements */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Melding / krav
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none hover:border-purple-300 hover:shadow-md focus:scale-105"
                  placeholder="Fortell oss mer om ditt event, spesielle ønsker eller krav..."
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 text-lg flex items-center justify-center space-x-2 mx-auto active:scale-95"
                >
                  <span>Send forespørsel</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
        </section>

        {/* Contact Section - Enhanced */}
        <section id="kontakt" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4 opacity-0 animate-fade-in-up">
              <Phone size={16} className="mr-2" />
              Ta kontakt
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Kontakt
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
                {/* Email */}
                <div className="group bg-gradient-to-br from-purple-50 to-white p-6 rounded-3xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">E-post</p>
                  <a 
                    href="mailto:sandrahodds@loquievents.com" 
                    className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-all duration-200 break-all leading-tight"
                  >
                    sandrahodds@loquievents.com
                  </a>
                </div>

                {/* Phone */}
                <div className="group bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Telefon</p>
                  <a 
                    href="tel:+4745117651" 
                    className="text-base font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200"
                  >
                    45 11 76 51
                  </a>
                </div>

                {/* Location */}
                <div className="group bg-gradient-to-br from-green-50 to-white p-6 rounded-3xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Lokasjon</p>
                  <p className="text-base font-semibold text-green-600">Oslo, Norge</p>
                </div>

                {/* Opening Hours */}
                <div className="group bg-gradient-to-br from-orange-50 to-white p-6 rounded-3xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Åpningstider</p>
                  <p className="text-base font-semibold text-orange-600">Man–Søn 09:30–18:00</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <p className="text-lg font-medium text-gray-700 mb-6">Følg oss for å se bilder og videoer fra tidligere events!</p>
                <div className="flex justify-center space-x-4">
                  {[
                    { href: "https://instagram.com/loquievents", icon: Instagram, color: "from-pink-500 to-purple-500", label: "Instagram" },
                    { href: "https://www.tiktok.com/@loqui.oslo", icon: TikTokIcon, color: "from-gray-800 to-gray-900", label: "TikTok" },
                    { href: "https://www.facebook.com/loquievent", icon: FacebookIcon, color: "from-blue-500 to-blue-600", label: "Facebook" }
                  ].map((social, index) => (
                    <a 
                      key={social.label}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`group w-14 h-14 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:rotate-3 active:scale-95`}
                      aria-label={social.label}
                    >
                      <social.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </main>

      {/* Footer - Enhanced */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16 relative overflow-hidden" role="contentinfo">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center space-y-8">
            {/* Enhanced Logo */}
            <div className="flex items-center justify-center space-x-4 group">
              <div className="relative">
                <LazyImage 
                  src="/optimized/Loqui events logo.webp" 
                  alt="Loqui Events - Social events and activities in Oslo" 
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover transition-all duration-300 group-hover:scale-110 shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Loqui Events
              </span>
            </div>

            {/* Copyright Text */}
            <div className="text-center text-gray-400">
              <p className="text-base sm:text-lg">&copy; 2025 Loqui AS</p>
            </div>

            {/* Enhanced Payment Icons */}
            <div className="border-t border-gray-700 pt-8">
              <p className="text-sm sm:text-base text-gray-400 mb-6">Betalingsmetoder</p>
              <div className="flex justify-center space-x-4 sm:space-x-6">
                {/* Vipps */}
                 <div className="group bg-white rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                   <img 
                     src="/vipps icon.webp" 
                     alt="Vipps payment method accepted" 
                     className="w-7 h-7 object-contain"
                     loading="lazy"
                   />
                 </div>
                
                {/* Visa */}
                 <div className="group bg-white rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                   <img 
                     src="/visa.svg" 
                     alt="Visa credit card payment accepted" 
                     className="w-7 h-7 object-contain"
                   />
                 </div>
                
                {/* Mastercard */}
                <div className="group bg-white rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <MastercardIcon size={28} />
                </div>
                
                {/* Apple Pay */}
                <div className="group bg-white rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <LazyImage 
                    src="/optimized/Apple_Pay-Logo.wine.webp" 
                    alt="Apple Pay mobile payment accepted" 
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;