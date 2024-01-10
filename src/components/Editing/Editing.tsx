import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItem, deleteItem } from "./redux/actions";
import { Item, RootState } from "./interfaces/types";
import "./editing.css";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export const Editing: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const items = useSelector((state: RootState) => state.editing.items);
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

  return (
    <div className="editing">
      <form className="editing__form">
        <label className="editing__label" htmlFor="name"></label>
        <input
          id="name"
          className="editing__input input-reset"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название"
        />
        <label className="editing__label" htmlFor="price"></label>
        <input
          id="price"
          className="editing__input input-reset"
          type="text"
          value={price.toString()}
          onChange={handlePriceChange}
          placeholder="Введите сумму"
        />
        {!selectedItem ? (
          <div className="editing__wrapper-btn">
            <button className="editing__btn editing__btn-save btn-reset" type="button" onClick={handleAddItem}>
              Сохранить
            </button>
          </div>
        ) : (
          <div className="editing__wrapper-btn">
            <button className="editing__btn editing__btn-save btn-reset" type="button" onClick={handleUpdateItem}>
              Сохранить
            </button>
            <button className="editing__btn editing__btn-cancel btn-reset" type="button" onClick={handleCancel}>
              Отменить
            </button>
          </div>
        )}
      </form>
      {items.length > 0 && (
        <ul className="editing__list list-reset">
          {items.length > 0 && <h2 className="editing__title">Список:</h2>}
          {items.map((item: Item) => (
            <li className="editing__item" key={item.id}>
              {item.name} | {item.price}
              {!selectedItem && (
                <div className="editing__item-wrapper-btn">
                  <button className="editing__item-btn editing__item-btn-edit btn-reset" type="button" onClick={() => handleEditItem(item)}>
                    <MdEdit />
                  </button>
                  <button className="editing__item-btn editing__item-btn-delete btn-reset" type="button" onClick={() => handleDeleteItem(item)}>
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
export default Editing;
