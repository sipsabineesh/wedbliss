import { Link } from 'react-router-dom';

export default function AdminMenu({ isOpen, toggleMenu }) {
  return (
    <>
      <div className="admin-menu">
      <ul className="list-unstyled">
        <li>
          <a href="/" className="menu-item">Dashboard</a>
        </li>
        <li>
          <a href="/" className="menu-item">Users</a>
        </li>
        <li>
          <a href="/" className="menu-item">Settings</a>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
    </>
    
  )
}
