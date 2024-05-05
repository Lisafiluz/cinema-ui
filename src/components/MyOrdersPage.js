import React, { useState, useEffect } from 'react';
import { SERVER_HOST } from '../config';
import Navbar from './Navbar';
import "../styles/Modal.css"

function MyOrdersPage() {
  const [myOrders, setMyOrders] = useState(null);
 // const [formattedDate, setFormattedDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatDetails, setShowSeatDetails] = useState(false);
  const [selectedOrderSeats, setSelectedOrderSeats] = useState([]);


  const jwt = sessionStorage.getItem('jwt');


  useEffect(() => {
    fetch(`${SERVER_HOST}/user/orders`, 
    {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMyOrders(data.entities);
        } else {
          console.error(data.message);
          if (data.status === 401) {
            alert(data.message)
            window.location.href = '/';
          }
        }
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  if (!myOrders) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust the format as per your requirement
  };


  const handleEditOrder = (seats) => {
    setSelectedOrderSeats(seats);
    setShowSeatDetails(true);
  }


  const handleCancelOrder = (orderId) => {
    fetch(`${SERVER_HOST}/order/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        orderId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      window.location.href = '/confirmation';
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
  }

  const handleCancelSeat = (seatId) => {
    fetch(`${SERVER_HOST}/order-seat/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        seatId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      window.location.href = '/confirmation';
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
  }

  const handleSeatDetails = (seats) => {
    setSelectedOrderSeats(seats);
    setShowSeatDetails(true);
  };

  return (
    <div>
        <Navbar />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Movie</th>
              <th>Hall</th>
              <th>Movie Date</th>
              <th>Seats</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.screen.movie.title}</td>
              <td>{order.screen.hall.name}</td>
              <td>{formatDate(order.screen.date)}</td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => handleSeatDetails(order.seats)}>
                  View Seats
                </button>
              </td>
              <td>{order.quantity}</td>
              <td>{formatDate(order.date)}</td>
              <td>
                <div className="btn-group" role="group" aria-label="...">
                  <button type="button" className="btn btn-warning btn-sm" onClick={() =>handleEditOrder(order.seats)}>Edit</button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() =>handleCancelOrder(order.orderId)}>Cancel</button> 
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

        {showSeatDetails && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSeatDetails(false)}>&times;</span>
            <h2>Selected Seats</h2>
            <table className="table modal-table">
              <thead>
                <tr>
                  <th>Seat ID</th>
                  <th>Row</th>
                  <th>Seat Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderSeats.map(seat => (
                  <tr key={seat.seatId}>
                    <td>{seat.seatId}</td>
                    <td>{seat.row}</td>
                    <td>{seat.seatNumber}</td>
                    <td>{seat.status}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-danger btn-sm" onClick={() =>handleCancelSeat(seat.seatId)}>Cancel</button> 
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
           
  );
}

export default MyOrdersPage