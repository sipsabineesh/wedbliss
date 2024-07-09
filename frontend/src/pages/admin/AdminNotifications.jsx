import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminHeader from '../../components/AdminHeader';

export default function AdminNotifications() {
    const {notificationId} = useParams()
    console.log("notificationId in NOTIFICATION PAGE")
    console.log(notificationId)
    const [notification, setNotification] = useState([]);
    const {adminUser} = useSelector(state => state.admin)
    useEffect(() => {
      const fetchNotification = async () => { 
          try {
              const response = await fetch(`/api/admin/getNotification/${notificationId}`);
              const data = await response.json();
              setNotification(data.notification);  
          } catch (error) {
              console.error('Error fetching notification:', error);
          }
      };

      if (adminUser) {
          fetchNotification();
      }
  }, [adminUser, notificationId]);
  
  if (!notification) {
      return <div>Loading...</div>;
  }

  return (
      <>
      <AdminHeader/>
          <h1>Notifications</h1>
          
          <p className="text-black"></p>
          <div className="container">
<div className="row justify-content-center">
  <div className="col-12 col-lg-10 col-xl-8 mx-auto">
      <div className="my-4">
          <strong className="mb-0">Notification</strong>
          <p></p>
          <div className="list-group mb-5 shadow">
              <div className="list-group-item">
                  <div className="row align-items-center">
                      <div className="col">
                          <strong className="mb-0">{notification.title}</strong>
                          <p className="text-muted mb-0">{notification.message}</p>
                      </div>
                  </div>
              </div>
          </div>
          <hr className="my-4" />
      </div>
  </div>
</div>
</div>
      </>
  );
}
