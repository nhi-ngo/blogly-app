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
    <Navbar className="mb-6">
      <NavbarContent justify="start">
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
    </Navbar>
  );
};

export default NavBar;
