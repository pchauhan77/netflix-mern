import dotenv from 'dotenv';
dotenv.config();

export const mailtrapClientConfig = {
  baseURL: `https://sandbox.api.mailtrap.io/api/send/${process.env.MAILTRAP_INBOX_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

// Define and export the SENDER object
export const SENDER = {
  email: 'netflixclone@demomailtrap.com',
  name: 'Netflix Clone',
};

export const EMAIL_TEMPLATE_IDS = {
  verification_email: 'ccb9bdc6-33d8-4399-a3e3-e527f047188d',
};

export const EMAIL_TEMPLATE_VARIABLES = {
  name: 'User',
  verification_code: '000000',
  company_info_name: 'Netflix Clone',
  company_info_address: 'Noida',
  company_info_city: 'Noida',
  company_info_zip_code: '201301',
  company_info_country: 'India',
};