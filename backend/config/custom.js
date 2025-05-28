/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off plan specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /**************************************************************************
   *                                                                         *
   * The base URL to use during development.                                 *
   *                                                                         *
   * • No trailing slash at the end                                          *
   * • `http://` or `https://` at the beginning.                             *
   *                                                                         *
   * > This is for use in custom logic that builds URLs.                     *
   * > It is particularly handy for building dynamic links in emails,        *
   * > but it can also be used for user-uploaded images, webhooks, etc.      *
   *                                                                         *
   **************************************************************************/
  //baseUrl: 'http://localhost:1337',
  //baseUrl: 'http://localhost:1337',
  baseUrl: "http://ec2-18-188-86-138.us-east-2.compute.amazonaws.com:1337",

  /**************************************************************************
   *                                                                         *
   * Display names/dates for your app                                        *
   *                                                                         *
   * > These are here to make it easier to change out the placeholder        *
   * > platform name, company name, etc. that are displayed all over the     *
   * > app when it's first generated.                                        *
   *                                                                         *
   **************************************************************************/
  platformCopyrightYear: "2021",
  platformName: "GrowHardare Backend",
  platformCompanyName: "Grow Hardware",
  platformCompanyAboutHref: "https://sailsjs.com/about",
  privacyPolicyUpdatedAt: "DATE_PRIVACY_POLICY_LAST_UPDATED",
  termsOfServiceUpdatedAt: "DATE_TERMS_OF_SERVICE_LAST_UPDATED",

  /**************************************************************************
   *                                                                         *
   * The TTL (time-to-live) for various sorts of tokens before they expire.  *
   *                                                                         *
   **************************************************************************/
  passwordResetTokenTTL: 24 * 60 * 60 * 1000, // 24 hours
  emailProofTokenTTL: 24 * 60 * 60 * 1000, // 24 hours

  /**************************************************************************
   *                                                                         *
   * The extended length that browsers should retain the session cookie      *
   * if "Remember Me" was checked while logging in.                          *
   *                                                                         *
   **************************************************************************/
  rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

  /**************************************************************************
   *                                                                         *
   * Automated email configuration                                           *
   *                                                                         *
   * Sandbox Sendgrid credentials for use during development, as well as any *
   * other default plan related to "how" and "where" automated emails    *
   * are sent.                                                               *
   *                                                                         *
   * (https://app.sendgrid.com/plan/api_keys)                            *
   *                                                                         *
   **************************************************************************/
  sendgridSecret:
    "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",
  //--------------------------------------------------------------------------
  // /\  Configure this to enable support for automated emails.
  // ||  (Important for password recovery, verification, contact form, etc.)
  //--------------------------------------------------------------------------

  // The sender that all outgoing emails will appear to come from.
  fromEmailAddress: "no_reply@growhardware.com",
  fromName: "The Huertos Team",

  // Email address for receiving support messages & other correspondences.
  // > If you're using the default privacy policy, this will be referenced
  // > as the contact email of your "data protection officer" for the purpose
  // > of compliance with regulations such as GDPR.
  internalEmailAddress: "growhardware@gmail.com",

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: false,

  /**************************************************************************
   *                                                                         *
   * Billing & payments configuration                                        *
   *                                                                         *
   * (https://dashboard.stripe.com/account/apikeys)                          *
   *                                                                         *
   **************************************************************************/
  // stripePublishableKey: 'pk_test_Zzd814nldl91104qor5911gjald',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for billing features.
  // ||  (Or if you don't need billing, feel free to remove them.)
  //--------------------------------------------------------------------------

  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // …
};
