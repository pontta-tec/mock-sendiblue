export interface Contact {
  email: string;
  name: string;
}

export interface Attachment {
  url: string;
  content: string;
  name: string;
}

export interface Email {
  id: string;
  moment: string;
  sender: Contact;
  subject: string;
  to: Contact[];
  htmlContent: string;
  tags: string[];
}
