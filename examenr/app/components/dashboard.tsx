import Image from 'next/image';
import { FiBox, FiShoppingCart, FiHome, FiInfo } from 'react-icons/fi';
import { SidebarMenuItem } from './SidebarMenuItem';

const menuItems = [
  {
    path: '/',
    icon: <FiHome size={24} />,
    title: 'Inicio',
    subTitle: ''
  },
  {
    path: '/Producto/',
    icon: <FiBox size={24} />,
    title: 'Productos',
    subTitle: ''
  },
  {
    path: '/Carrito',
    icon: <FiShoppingCart size={24} />,
    title: 'Carrito',
    subTitle: ''
  }
];

export const Sidebar = () => {
  return (
    <div
      id="menu"
      className="bg-white border-r border-gray-200 min-h-screen w-64 shadow-md text-gray-800"
    >
      {/* Logo */}
      <div id="logo" className="my-6 px-6 flex items-center">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Logo"
          width={40}
          height={40}
          className="mr-3"
        />
        <h1 className="text-3xl font-extrabold text-indigo-600">Pokedex</h1>
      </div>

      {/* Profile */}
      <div id="profile" className="px-6 py-6 border-t border-b border-gray-100">
        <p className="text-lg font-medium mb-2">Bienvenido:</p>
        <div className="flex items-center space-x-4">
          <Image
            className="rounded-full w-12 h-12"
            src="https://images.unsplash.com/photo-1517686748843-bb360cfc62b3"
            alt="User avatar"
            width={48}
            height={48}
          />
          <span className="text-lg font-bold text-indigo-700">Erick</span>
        </div>
      </div>

      {/* Navigation */}
      <div id="nav" className="w-full px-6 mt-6 space-y-4">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};
