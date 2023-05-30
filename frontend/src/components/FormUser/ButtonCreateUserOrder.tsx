import React, { FC } from 'react';

import { useCreateOrder, useCreateUser, useFindUser, useLocalStorageService } from '../../hooks';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { userType } from '../../types';
import { validateFormUser } from '../../helpers';

interface ButtonProps {
  username: string;
  email: string;
  phone: string;
  address: string;
  orderAllRemove: () => void;
  removeChange: () => void;
}

const ButtonCreateUser: FC<ButtonProps> = ({
  username,
  email,
  phone,
  address,
  orderAllRemove,
  removeChange,
}) => {
  const { createUser } = useCreateUser();
  const { findOneUser } = useFindUser();
  const { createOrder } = useCreateOrder();

  const userOrder = useSelector((state: RootState) => state.order.userOrder);

  const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const validate = validateFormUser({ username, phone, email, address });

    if (validate) {
      const { ...user }: userType = await createUser({ username, email, phone, address });

      if (user.user_id) {
        const { ...findUserEmail }: userType[] = await findOneUser({
          username,
          email,
          phone,
          address,
        });
        if (findUserEmail) {
          for (let i = 0; i < userOrder.length; i++) {
            await createOrder({ ...userOrder[i], user_id: Number(findUserEmail[0].user_id) });
            const createOderLocal = await createOrder({
              ...userOrder[i],
              user_id: Number(findUserEmail[0].user_id),
            });
            const localStorageService = new useLocalStorageService();
            localStorageService.setItem('userOrder', { createOderLocal });
          }
        }
        orderAllRemove();
        removeChange();
      }
    }
  };

  return (
    <button
      className='rounded-md bg-cyan-300 px-2.5 py-1.5  w-24 text-lg  text-gray-900 shadow-sm ring-1 ring-inset'
      onClick={(event) => onButtonClick(event)}
    >
      Submit
    </button>
  );
};

export default ButtonCreateUser;
