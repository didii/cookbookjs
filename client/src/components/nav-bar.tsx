import React from 'react';
import Link from './link';

export interface NavBarProps {}

function NavBar({...props}: NavBarProps) {
  return (
    <ul>
      <li><Link to={{id: 'home', params: {}}}>Home</Link></li>
      <li><Link to={{id: 'about', params: {}}}>About</Link></li>
      <li><Link to={{id: 'recipe', params: {}}}>Recipe</Link></li>
      <li><Link to={{id: 'recipe-detail', params: {id: '243d58f4as3d5'}}}>Recipe Details</Link></li>
    </ul>
  );
}

export default NavBar;
