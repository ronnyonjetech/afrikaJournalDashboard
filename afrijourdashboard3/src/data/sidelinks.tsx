// import {
//   // IconChartHistogram,
//   IconLayoutDashboard,
//   // IconSettings,
//   // IconBook,
//   // IconMessages,
//   // IconNews,
//   // IconHome,
//   IconNotebook,
//   IconCloudUp,
//   IconLogs,
//   IconFileDescription,
//   IconColumns3,
// } from '@tabler/icons-react'
// // import {
// //   IconWorldUpload,
// //   IconUsers,
// //   IconRouteAltLeft,
// //   IconTruck,
// //   IconBoxSeam,
// // } from '@tabler/icons-react'
// import { IconTools } from '@tabler/icons-react'
// export interface NavLink {
//   title: string
//   label?: string
//   href: string
//   icon: JSX.Element
// }

// export interface SideLink extends NavLink {
//   sub?: NavLink[]
// }

// export const sidelinks: SideLink[] = [
//   {
//     title: 'Dashboard',
//     label: '',
//     href: '/',
//     icon: <IconLayoutDashboard size={18} />,
//   },
//   {
//     title: 'Journals',
//     label: '10',
//     href: '',
//     icon: <IconNotebook size={18} />,
//     sub: [
//       {
//         title: 'Add Journal Description',
//         label: '',
//         href: '/journal_update',
//         icon: <IconFileDescription size={18} />,
//       },
//       {
//         title: 'Journal List',
//         label: '',
//         href: '/journal_list',
//         icon: <IconLogs size={18} />,
//       },
//     ],
//   },
//   {
//     title: 'Volumes',
//     label: '10',
//     href: '',
//     icon: <IconColumns3 size={18} />,
//     sub: [
//       {
//         title: 'Add Volumes To Journals',
//         label: '',
//         href: '/volume_update',
//         icon: <IconFileDescription size={18} />,
//       },
//       {
//         title: 'Volumes List',
//         label: '',
//         href: '/volume_list',
//         icon: <IconLogs size={18} />,
//       },
//     ],
//   },
//   {
//     title: 'Articles',
//     label: '10',
//     href: '',
//     icon: <IconFileDescription size={18} />,
//     sub: [
//       {
//         title: 'Upload Articles',
//         label: '',
//         href: '/article_update',
//         icon: <IconCloudUp size={18} />,
//       },
//       {
//         title: 'Article List',
//         label: '',
//         href: '/article_list',
//         icon: <IconLogs size={18} />,
//       },
//     ],
//   },

//   // {
//   //   title: 'Journal & Article Manager',
//   //   label: '',
//   //   href: '/upload',
//   //   icon: <IconTools size={18} />,
//   // },

//   // {
//   //   title: 'Notifications',
//   //   label: '9',
//   //   href: '/chats',
//   //   icon: <IconMessages size={18} />,
//   // },

//   // {
//   //   title: 'Settings',
//   //   label: '',
//   //   href: '/settings',
//   //   icon: <IconSettings size={18} />,
//   // },
// ]



import {
  IconLayoutDashboard,
  IconNotebook,
  IconCloudUp,
  IconLogs,
  IconFileDescription,
  IconColumns3,
} from '@tabler/icons-react';
import { BASE_URL } from '../config';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

// ✅ Helper to get auth tokens
const getAuthTokens = (): { access: string; refresh: string } | null => {
  const tokens = localStorage.getItem('authTokens');
  return tokens ? JSON.parse(tokens) : null;
};

// ✅ Fetch user counts from API
export const fetchUserCounts = async () => {
  const authTokens = getAuthTokens();
  const token = authTokens?.access;

  if (!token) {
    console.error('No auth token found');
    return { journals: 0, volumes: 0, articles: 0 };
  }

  try {
    const response = await fetch(`${BASE_URL}/journal_api/api/user-counts/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        journals: data.journals || 0,
        volumes: data.volumes || 0,
        articles: data.articles || 0,
      };
    } else {
      console.error('Failed to fetch user counts:', response.status);
      return { journals: 0, volumes: 0, articles: 0 };
    }
  } catch (error) {
    console.error('Error fetching user counts:', error);
    return { journals: 0, volumes: 0, articles: 0 };
  }
};

// ✅ Build sidelinks dynamically with counts
export const getSideLinks = (counts: { journals: number; volumes: number; articles: number }): SideLink[] => [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Journals',
    label: counts.journals.toString(),
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
    label: counts.volumes.toString(),
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
    label: counts.articles.toString(),
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
];
