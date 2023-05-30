import React, { FC } from 'react';
import ItemProduct from './ItemProduct';
import { useQuery } from 'react-query';
import { productService } from '../../../services';
import { foodType } from '../../../types';

interface ItemViewProductProps {
  storeOne: boolean;
  storeTwo: boolean;
  storeTree: boolean;
}

const ItemViewProduct: FC<ItemViewProductProps> = ({ storeOne, storeTwo, storeTree }) => {
  const { data: pizzaDay, isLoading: isLoadingPizzaDay } = useQuery('PizzaDay', () => {
    return productService.getPizzaDay();
  });

  const { data: kfc, isLoading: isLoadingKFC } = useQuery('KFC', () => {
    return productService.getKFC();
  });

  const { data: iqPizza, isLoading: isLoadingIQpizza } = useQuery('IQpizza ', () => {
    return productService.getIQpizza();
  });

  return (
    <div className='mt-6 grid space-x-5 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {isLoadingPizzaDay ? (
        <>Loading</>
      ) : storeOne && Array.isArray(pizzaDay) ? (
        pizzaDay.map((product: foodType, id: number) => <ItemProduct key={id} product={product} />)
      ) : (
        <></>
      )}

      {isLoadingIQpizza ? (
        <>Loading</>
      ) : storeTwo && Array.isArray(iqPizza) ? (
        iqPizza.map((product: foodType, id: number) => <ItemProduct key={id} product={product} />)
      ) : (
        <></>
      )}
      {isLoadingKFC ? (
        <>Loading</>
      ) : storeTree && Array.isArray(kfc) ? (
        kfc?.map((product: foodType, id: number) => <ItemProduct key={id} product={product} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemViewProduct;
