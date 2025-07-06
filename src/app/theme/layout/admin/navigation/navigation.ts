export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  allowedRoles?: string[];
  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
        allowedRoles: ['superuser', 'receptionist']
      }
    ]
  },
  {
    id: 'forms',
    title: 'Data Display',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/users',
        classes: 'nav-item',
        icon: 'feather icon-users',
        allowedRoles: ['superuser']
      },
      {
        id: 'devices',
        title: 'Devices',
        type: 'item',
        url: '/devices',
        classes: 'nav-item',
        icon: 'feather icon-layers',
        allowedRoles: ['superuser', 'administrator']
      },
      {
        id: 'visitors',
        title: 'Visitors',
        type: 'item',
        url: '/visitors',
        classes: 'nav-item',
        icon: 'feather icon-user',
        allowedRoles: ['superuser', 'receptionist']
      }
    ]
  }
];
