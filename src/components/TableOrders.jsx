// import users from '../json/user.json';
import cryptos from '../json/cryptos.json';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const TableOrders = ({ dataset, createOrder, users }) => {
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    const getStatuses = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/orders/statuses/all`);
        setStatuses(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getStatuses();
  }, []);

  console.log('TableOrders', users);

  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>id_advert</th>
          <th>user_advert</th>
          <th>user_client</th>
          <th>crypto_from</th>
          <th>crypto_to</th>
          <th>price</th>
          <th>amount</th>
          <th>status</th>
          <th>createdAt</th>
          <th>updatedAt</th>
        </tr>
        {dataset.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.id_advert}</td>
            <td>{users[item.id_user_advert].email}</td>
            <td>{users[item.id_user_client].email}</td>
            <td>{cryptos[item.crypto_from].mnemo}</td>
            <td>{cryptos[item.crypto_to].mnemo}</td>
            <td>{item.price}</td>
            <td>{item.amount}</td>
            <td>{statuses.length > 0 ? statuses[item.status] : item.status}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
