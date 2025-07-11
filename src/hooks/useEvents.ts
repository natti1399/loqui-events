import { useState, useEffect } from 'react';
import { Event } from '../types/Event';
import { parseFrontmatter, generateSlug, isUpcoming } from '../utils/markdownParser';

// Fallback events (current hardcoded events) for development
const fallbackEvents: Event[] = [
  {
    title: "Paint and Sip",
    date: "2025-02-15",
    time: "18:00-21:00",
    location: "Oslo Sentrum",
    price: 450,
    description: "Kom og mal mens du nyter en deilig drink! En perfekt måte å slappe av og møte nye mennesker på.",
    image: "/optimized/20241114_180846.webp",
    stripeLink: "https://buy.stripe.com/example1",
    maxParticipants: 20,
    category: "Creative",
    status: "upcoming",
    shortDescription: "Mal og drikk i hyggelig selskap",
    published: true,
    slug: "paint-and-sip",
    id: "paint-and-sip-2025-02-15"
  },
  {
    title: "Quiz Night",
    date: "2025-02-22",
    time: "19:00-22:00",
    location: "Grünerløkka",
    price: 250,
    description: "Test kunnskapene dine i vår morsomme quiz! Lag team eller bli med på et eksisterende.",
    image: "/optimized/image2.webp",
    stripeLink: "https://buy.stripe.com/example2",
    maxParticipants: 40,
    category: "Quiz",
    status: "upcoming",
    shortDescription: "Morsom quiz med nye venner",
    published: true,
    slug: "quiz-night",
    id: "quiz-night-2025-02-22"
  },
  {
    title: "Game Night",
    date: "2025-03-01",
    time: "18:30-22:00",
    location: "Majorstuen",
    price: 200,
    description: "Brettspill, kortspill og mye latter! Perfekt for alle som elsker spill og sosialisering.",
    image: "/optimized/20240816_190922.webp",
    stripeLink: "https://buy.stripe.com/example3",
    maxParticipants: 25,
    category: "Game Night",
    status: "upcoming",
    shortDescription: "Brettspill og moro",
    published: true,
    slug: "game-night",
    id: "game-night-2025-03-01"
  }
];

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(fallbackEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEventsFromMarkdown = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would fetch markdown files
      // For now, we'll use the fallback events
      // This will be automatically replaced when Netlify CMS creates actual markdown files
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Filter and sort events
      const publishedEvents = fallbackEvents
        .filter(event => event.published)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setEvents(publishedEvents);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventsFromMarkdown();
  }, []);

  // Helper functions
  const getUpcomingEvents = () => {
    return events.filter(event => 
      isUpcoming(event.date) && event.status === 'upcoming'
    );
  };

  const getEventsByCategory = (category: string) => {
    return events.filter(event => event.category === category);
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  return {
    events,
    loading,
    error,
    upcomingEvents: getUpcomingEvents(),
    getEventsByCategory,
    getEventById,
    refetch: loadEventsFromMarkdown
  };
};