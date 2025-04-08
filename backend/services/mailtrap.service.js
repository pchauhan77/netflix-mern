import axios from 'axios';
import { mailtrapClientConfig, SENDER, EMAIL_TEMPLATE_VARIABLES } from '../config/mailtrap.config.js';
import { getCurrentDateTime } from '../helpers/helper.js';

console.log('Mailtrap API Token:', process.env.MAILTRAP_API_TOKEN);

/**
 * Sends a verification email to the Mailtrap sandbox inbox.
 */
export const sendVerificationEmail = async (email, verificationCode) => {
  const payload = {
    from: SENDER,
    to: [{ email }],
    subject: 'Verify Your Email Address',
    html: `
      <h1>Email Verification</h1>
      <p>Thank you for signing up! Please use the following code to verify your email address:</p>
      <h2>${verificationCode}</h2>
      <p>This code will expire in 24 hours.</p>
    `,
  };

  try {
    const response = await axios.post(mailtrapClientConfig.baseURL, payload, {
      headers: mailtrapClientConfig.headers,
    });
    console.log('Verification email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending verification email:', error.response?.data || error.message);
    throw new Error(`Couldn't send verification email: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Sends a welcome email to the specified email address.
 */
export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.welcome_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        name,
      },
    });
    console.log('Welcome email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending welcome email:', error.response?.data || error.message);
    throw new Error(`Couldn't send welcome email: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Sends a password reset email to the specified email address.
 */
export const sendPasswordResetEmail = async (email, url) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.reset_password_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        company_info_website_url: url,
        email,
        signup_timestamp: getCurrentDateTime(),
      },
    });
    console.log('Password reset email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending password reset email:', error.response?.data || error.message);
    throw new Error(`Couldn't send password reset email: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Sends a password reset success email to the specified email address.
 */
export const sendPasswordResetSuccessEmail = async (email) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.reset_password_confirmation_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        email,
        confirmation_timestamp: getCurrentDateTime(),
      },
    });
    console.log('Password reset success email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending password reset success email:', error.response?.data || error.message);
    throw new Error(`Couldn't send password reset success email: ${error.response?.data?.message || error.message}`);
  }
};
