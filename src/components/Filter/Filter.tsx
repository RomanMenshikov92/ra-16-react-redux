import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItem, deleteItem, filterItem } from "./redux/actions";
import { Item, RootState } from "./interfaces/types";
import "./filter.css";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export const Filter: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const items = useSelector((state: RootState) => {
    if (filterValue.length === 0) {
      return state.filtering.items;
    } else {
      return state.filtering.items.filter((item) => item.name.toLowerCase().includes(filterValue.toLowerCase()));
    }
  });

  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (name.trim() === "" || price.trim() === "") {
      alert("Пожалуйста, введите значения");
      return;
    }
    const newItem: Item = {
      id: Date.now(),
      name,
      price,
    };
    dispatch(addItem(newItem));
    setName("");
    setPrice("");
    alert("Успешно добавлен");
  };

  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setName(item.name);
    setPrice(item.price);
  };

  const handleUpdateItem = () => {
    if (selectedItem) {
      const updatedItem: Item = {
        ...selectedItem,
        name,
        price,
      };
      dispatch(updateItem(updatedItem));
      setSelectedItem(null);
      setName("");
      setPrice("");
    }
  };

  const handleDeleteItem = (item: Item) => {
    dispatch(deleteItem(item.id));
    setName("");
    setPrice("");
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setName("");
    setPrice("");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!/^\d*$/.test(inputValue)) {
      alert("Введите только цифры");
      return;
    }
    setPrice(inputValue);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    dispatch(filterItem(value));
  };

  return (
    <div className="filter">
      <form className="filter__form">
        <div className="filter__form-top">
          <label className="filter__label" htmlFor="name"></label>
          <input
            id="name"
            className="filter__input input-reset"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
          />
          <label className="filter__label" htmlFor="price"></label>
          <input
            id="price"
            className="filter__input input-reset"
            type="text"
            value={price.toString()}
            onChange={handlePriceChange}
            placeholder="Введите сумму"
          />
          {!selectedItem ? (
            <div className="filter__wrapper-btn">
              <button className="filter__btn filter__btn-save btn-reset" type="button" onClick={handleAddItem}>
                Сохранить
              </button>
            </div>
          ) : (
            <div className="filter__wrapper-btn">
              <button className="filter__btn filter__btn-save btn-reset" type="button" onClick={handleUpdateItem}>
                Сохранить
              </button>
              <button className="filter__btn filter__btn-cancel btn-reset" type="button" onClick={handleCancel}>
                Отменить
              </button>
            </div>
          )}
        </div>
        <div className="filter__form-bottom">
          <label className="filter__label" htmlFor="filter"></label>
          <input
            id="filter"
            className="filter__input input-reset"
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Фильтр по названию"
          />
        </div>
      </form>
      {items.length > 0 && (
        <ul className="filter__list list-reset">
          {items.length > 0 && <h2 className="filter__title">Список:</h2>}
          {items.map((item: Item) => (
            <li className="filter__item" key={item.id}>
              {item.name} | {item.price}
              {!selectedItem && (
                <div className="filter__item-wrapper-btn">
                  <button className="filter__item-btn filter__item-btn-edit btn-reset" type="button" onClick={() => handleEditItem(item)}>
                    <MdEdit />
                  </button>
                  <button className="filter__item-btn filter__item-btn-delete btn-reset" type="button" onClick={() => handleDeleteItem(item)}>
                    <TiDelete />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Filter;
