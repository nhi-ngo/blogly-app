import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
} from '@nextui-org/react';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Tags', path: '/tags' },
  ];

  return (
    <Navbar isBordered className="mb-6">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link to="/" className="font-bold text-inherit">
            Blogly
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Link to="/" className="font-bold text-inherit">
            Blogly
          </Link>
        </NavbarBrand>
        {menuItems.map((item) => (
          <NavbarItem
            key={item.path}
            isActive={location.pathname === item.path}
          >
            <Link
              to={item.path}
              className={`text-sm ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-default-600'
              }`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} variant="flat">
            Log In
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              to={item.path}
              className={`w-full ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-default-600'
              }`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
