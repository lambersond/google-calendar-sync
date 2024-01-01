import { Document } from '../types'

export const PRIVACY_POLICY: Document = {
  effectiveDate: 'December 24, 2023',
  lastUpdated: 'December 31, 2023',
  title: 'Privacy Policy',
  content: [
    {
      title: 'Introduction',
      content: [
        'This privacy policy (the "Policy") describes how Google Calendar Sync ("we," "us," or "our") collects, uses, and shares personal information when you use our single-page web application (the "App").',
      ],
    },
    {
      title: 'Information We Collect',
      content: [
        "Calendar Data: When you sync your calendars with the App, your events are stored locally in your browser's local storage.",
        'We do not store your calendar data on our servers.',
      ],
    },
    {
      title: 'Your Information',
      content: [
        'We do not share your calendar data with third parties.',
        'We do not sell your calendar data.',
      ],
    },
    {
      title: 'Security',
      content: [
        'We take security measures to protect your information. However, no security measures are perfect, and we cannot guarantee the security of your information.',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may change this Policy from time to time. If we do, we will let you know by revising the date at the top of the policy.',
        'If we make a change to this policy that, in our sole discretion, is material, we will provide you with additional notice.',
        'We encourage you to review the Policy whenever you access the App or otherwise interact with us to stay informed about our information practices and the choices available to you.',
      ],
    },
  ],
}
