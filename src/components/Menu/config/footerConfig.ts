import { FooterLinkType } from '@metaxiz/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: '',
      },
      {
        label: t('Community'),
        href: '',
      },
      {
        label: t('MEXI token'),
        href: '',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: '',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: '',
      },
      {
        label: t('Troubleshooting'),
        href: '',
      },
      {
        label: t('Guides'),
        href: '',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: '',
      },
      {
        label: t('Documentation'),
        href: '',
      },
      {
        label: t('Audits'),
        href: '',
      },
    ],
  },
]
