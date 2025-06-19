declare module 'react-whatsapp-widget' {
  export const WhatsAppWidget: React.ComponentType<{
    phoneNumber: string;
    companyName: string;
    message?: string;
    replyTimeText?: string;
    sendButton?: string;
    avatar?: string;
  }>;
}
