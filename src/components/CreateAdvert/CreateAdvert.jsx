import { Wrapper, Text, Input, Button, ErrorText } from './CreateAdvert.styled';
import { Formik, ErrorMessage, Field } from 'formik';

import users from '../../json/user.json';
import arverts_type from '../../json/arverts_type.json';
import cryptos from '../../json/cryptos.json';

const initialValues = {
  selectUser: '0',
  selectAdvertType: '0',
  selectCryptoFrom: '0',
  selectCryptoTo: '0',
  price: 0,
  limit: 0,
  available: 0,
};

export const CreateAdvert = ({ onClickCreate }) => {
  const handleOnSubmit = (values, actions) => {
    // const { onClickCreate } = this.props;
    onClickCreate({
      id_user_advert: Number(values.selectUser),
      advert_type: Number(values.selectAdvertType),
      crypto_from: Number(values.selectCryptoFrom),
      crypto_to: Number(values.selectCryptoTo),
      price: values.price,
      limit: values.limit,
      available: values.available,
      payment_method: 0,
      region: 0,
    });
  };

  return (
    // <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={userSchema}>
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
      <Wrapper>
        <div>
          <label htmlFor="selectUser"> Select User: </label>
          <Field name="selectUser" as="select">
            {users.map(item => (
              <option value={item.id}>{item.email}</option>
            ))}
          </Field>
        </div>

        <div>
          <label htmlFor="selectAdvertType">Select type of advert: </label>
          <Field name="selectAdvertType" as="select">
            {arverts_type.map(item => (
              <option value={item.id}>{item.type}</option>
            ))}
          </Field>
        </div>

        <div>
          <label htmlFor="selectCryptoFrom">Select crypto from: </label>
          <Field name="selectCryptoFrom" as="select">
            {cryptos.map(item => (
              <option value={item.id}>{item.mnemo}</option>
            ))}
          </Field>
        </div>

        <div>
          <label htmlFor="selectCryptoTo">Select crypto to: </label>
          <Field name="selectCryptoTo" as="select">
            {cryptos.map(item => (
              <option value={item.id}>{item.mnemo}</option>
            ))}
          </Field>
        </div>

        <div>
          <label htmlFor="price">Enter pricet: </label>
          <Input type="number" name="price" />
        </div>

        <div>
          <label htmlFor="limit">Enter limit: </label>
          <Input type="number" name="limit" />
        </div>

        <div>
          <label htmlFor="available	">Enter available: </label>
          <Input type="number" name="available" />
        </div>

        {/* <ErrorMessage name="name">
          {() => (
            <ErrorText>
              Wrong name: Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer,
              Charles de Batz de Castelmore d'Artagnan
            </ErrorText>
          )}
        </ErrorMessage> */}
        <Button type="Submit">Create</Button>
      </Wrapper>
    </Formik>
  );
};
