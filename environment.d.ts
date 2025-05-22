declare namespace NodeJS {
  interface ProcessEnv {
    // App
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_FORM_API: string;

    // CMS
    CMS_ENDPOINT: string;
    CMS_WEBSITE_ID: string;
    CMS_REVALIDATE_SECRET: string;

    // Live Chat
    NEXT_PUBLIC_TAWK_PROPERTY_ID: string;
    NEXT_PUBLIC_TAWK_WIDGET_ID: string;

    // Calendly
    NEXT_PUBLIC_CALENDLY_LINK: string;

    // Analytics
    GA_MEASUREMENT_ID: string;
  }
}
