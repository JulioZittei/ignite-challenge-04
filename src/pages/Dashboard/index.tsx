import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodInput, FoodResponse } from '../../types';
import { FoodsContainer } from './styles';

function Dashboard(): JSX.Element {
  const [foods, setFoods] = useState<FoodResponse[]>([]);
  const [editingFood, setEditingFood] = useState<FoodResponse>({} as FoodResponse);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const loadFoods = async () => {
      const response = await api.get('/foods');
      setFoods(response.data);
    };

    loadFoods();
  }, []);

  const handleAddFood = async (food: FoodInput) => {
    try {
      const foodList = [...foods];
      const responseFood = await api
        .post<FoodResponse>('/foods', {
          ...food,
          available: true,
        })
        .then((response) => response.data);

      foodList.push(responseFood);
      setFoods(foodList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodResponse) => {
    try {
      const foodList = [...foods];
      const foodUpdated = await api
        .put<FoodResponse>(`/foods/${editingFood.id}`, { ...editingFood, ...food })
        .then((response) => response.data);
      const foodsUpdated = foodList.map((f) => (f.id !== foodUpdated.id ? f : foodUpdated));

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    try {
      const foodList = [...foods];
      await api.delete(`/foods/${id}`);

      // const foodsFiltered = foodList.filter((food) => food.id !== id);
      const foodIndex = foodList.findIndex((f) => f.id === id);

      if (foodIndex >= 0) {
        foodList.splice(foodIndex, 1);
        setFoods(foodList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: FoodResponse) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food key={food.id} food={food} handleDelete={handleDeleteFood} handleEditFood={handleEditFood} />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
