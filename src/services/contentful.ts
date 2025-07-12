import { createClient } from 'contentful';

// Validate environment variables
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

if (!spaceId || !accessToken) {
  console.error('Missing Contentful environment variables:', {
    spaceId: !!spaceId,
    accessToken: !!accessToken,
    environment
  });
}

const client = createClient({
  space: spaceId,
  environment,
  accessToken,
});

export interface ContentfulEvent {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    date: string;
    location: string;
    stripePaymentLink: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    category: string;
    published: boolean;
  };
}

export const getEvents = async (): Promise<ContentfulEvent[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'event',
      'fields.published': true,
      order: 'fields.date',
    });
    return response.items as ContentfulEvent[];
  } catch (error) {
    return [];
  }
};

export const getEvent = async (id: string): Promise<ContentfulEvent | null> => {
  try {
    const entry = await client.getEntry(id);
    return entry as ContentfulEvent;
  } catch (error) {
    return null;
  }
};

export default client;