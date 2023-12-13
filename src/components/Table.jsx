export const Table = ({ dataset, createOrder }) => {
  const handleOnClick = e => {
    console.log(e);
    createOrder(e);
  }
  return (
    <div>
      <table>
        <tr>
          <th>id_user_advert</th>
          <th>advert_type</th>
          <th>crypto_from</th>
          <th>crypto_to</th>
          <th>price</th>
          <th>limit</th>
          <th>available</th>
          <th>payment_method</th>
          <th>region</th>
          <th>createdAt</th>

        </tr>
        {dataset.map(item => (
          <tr key={item.id}>
              <td>{item.id_user_advert}</td>
              <td>{item.advert_type}</td>
              <td>{item.crypto_from}</td>
              <td>{item.crypto_to}</td>
              <td>{item.price}</td>
              <td>{item.limit}</td>
              <td>{item.available}</td>
              <td>{item.payment_method}</td>
              <td>{item.region}</td>
              <td>{item.createdAt}</td>
              <td><button type='button' onClick={() => {handleOnClick(item.id)}}>{item.advert_type}</button></td>
          </tr>
        ))}
      </table>
    </div>
  );
};
