// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý tài khoản',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Quản lý khách sạn',
    path: '/dashboard/hotel',
    icon: icon('ic_blog'),
  },
  {
    title: 'Quản lý phòng',
    path: '/dashboard/room',
    icon: icon('ic_blog'),
  },
  {
    title: 'Quản lý tour',
    path: '/dashboard/tour',
    icon: icon('ic_blog'),
  },
  {
    title: 'Quản lý bình luận',
    path: '/dashboard/review',
    icon: icon('ic_blog'),
  },
  {
    title: 'Quản lý bài viết',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Quản lý hóa đơn',
    path: '/dashboard/bill',
    icon: icon('ic_blog'),
  },
  {
    title: 'Chat',
    path: '/dashboard/chat',
    icon: icon('ic_blog'),
  },
  {
    title: 'Đăng nhập',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
