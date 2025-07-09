import {
  IconChartHistogram,
  IconLayoutDashboard,
  IconSettings,
  IconBook,
  IconMessages,
  IconNews,
  IconHome,
  IconNotebook,
  IconCloudUp,
  IconLogs,
  IconFileDescription,
  IconColumns3,
} from '@tabler/icons-react'
import {
  IconWorldUpload,
  IconUsers,
  IconRouteAltLeft,
  IconTruck,
  IconBoxSeam,
} from '@tabler/icons-react'
import { IconTools } from '@tabler/icons-react'
export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Journals',
    label: '10',
    href: '',
    icon: <IconNotebook size={18} />,
    sub: [
      {
        title: 'Add Journal Description',
        label: '',
        href: '/journal_update',
        icon: <IconFileDescription size={18} />,
      },
      {
        title: 'Journal List',
        label: '',
        href: '/journal_list',
        icon: <IconLogs size={18} />,
      },
    ],
  },
  {
    title: 'Volumes',
    label: '10',
    href: '',
    icon: <IconColumns3 size={18} />,
    sub: [
      {
        title: 'Add Volumes To Journals',
        label: '',
        href: '/volume_update',
        icon: <IconFileDescription size={18} />,
      },
      {
        title: 'Volumes List',
        label: '',
        href: '/volume_list',
        icon: <IconLogs size={18} />,
      },
    ],
  },
  {
    title: 'Articles',
    label: '10',
    href: '',
    icon: <IconFileDescription size={18} />,
    sub: [
      {
        title: 'Upload Articles',
        label: '',
        href: '/article_update',
        icon: <IconCloudUp size={18} />,
      },
      {
        title: 'Article List',
        label: '',
        href: '/article_list',
        icon: <IconLogs size={18} />,
      },
    ],
  },

  {
    title: 'Journal & Article Manager',
    label: '',
    href: '/upload',
    icon: <IconTools size={18} />,
  },

  {
    title: 'Notifications',
    label: '9',
    href: '/chats',
    icon: <IconMessages size={18} />,
  },

  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
