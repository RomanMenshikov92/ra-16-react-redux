import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "./redux/actions";
import { Product, RootState } from "./interfaces/types";
import "./market.css";
import { FaRubleSign } from "react-icons/fa";

export const Market: React.FC = () => {
  const [name, setName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [discount, setDiscount] = useState(false);
  const [discountValue, setDiscountAmount] = useState("0");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const products = useSelector((state: RootState) => state.marketing.products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (discount && oldPrice !== "") {
      const newPriceValue = (Number(oldPrice) * (1 - Number(discountValue) / 100)).toFixed(2);
      setNewPrice(Number(newPriceValue).toFixed(0));
    }
  }, [discount, discountValue, oldPrice]);

  const handleAddProduct = () => {
    if (discount === false) {
      if ((name.trim() === "" || oldPrice.trim() === "") && (file === null || image.trim() === "")) {
        alert("Пожалуйста, введите значения, если продукт без скидки");
        return;
      }
      if (image.trim() === "" && file === null) {
        alert("Пожалуйста, введите значения для изображения URL-ссылки или выберите файл");
        return;
      }
      if (isNaN(Number(oldPrice))) {
        alert("Пожалуйста, введите корректное значение для цен (только цифры)");
        return;
      }
    } else {
      if (
        (name.trim() === "" || oldPrice.trim() === "" || discountValue.trim() === "" || newPrice.trim() === "") &&
        (file === null || image.trim() === "")
      ) {
        alert("Пожалуйста, введите значения, если продукт со скидкой");
        return;
      }
      if (image.trim() === "" && file === null) {
        alert("Пожалуйста, введите значения для изображения URL-ссылки или выберите файл");
        return;
      }
      if (isNaN(Number(discountValue)) || Number(discountValue) < 1 || Number(discountValue) > 100) {
        alert("Пожалуйста, введите корректное значение скидки, должно быть числом от 1 до 100");
        return;
      }
      if (isNaN(Number(oldPrice)) || isNaN(Number(newPrice))) {
        alert("Пожалуйста, введите корректное значение для цен (только цифры)");
        return;
      }
    }

    let newProduct: Product;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newProduct = {
          id: Date.now(),
          name,
          oldPrice,
          newPrice: (Number(newPrice) * (1 - Number(discountValue) / 100)).toFixed(2),
          discount,
          image: reader.result as string,
          discountValue,
        };
        dispatch(addProduct(newProduct));
      };
      reader.readAsDataURL(file);
    } else {
      newProduct = {
        id: Date.now(),
        name,
        oldPrice,
        newPrice: (Number(newPrice) * (1 - Number(discountValue) / 100)).toFixed(2),
        discount,
        image,
        discountValue,
      };
      dispatch(addProduct(newProduct));
    }
    setName("");
    setOldPrice("");
    setNewPrice("");
    setDiscount(false);
    setDiscountAmount("0");
    setImage("");
    setFile(null);
    alert("Успешно добавлен");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setImage(e.target.value);
    }
  };

  return (
    <div className="market">
      <form className="market__form">
        <div className="market__wrapper">
          <label className="market__label" htmlFor="name">
            Название:
          </label>
          <input
            id="name"
            className="market__input input-reset"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите продукт"
            pattern="[A-Za-zА-Яа-яЁё0-9\s]+"
            required
          />
        </div>
        <div className="market__wrapper">
          <label className="market__label" htmlFor="discount">
            Скидка:
          </label>
          <input
            id="discount"
            className="market__input market__input-checkbox input-reset"
            type="checkbox"
            checked={discount}
            onChange={() => setDiscount(!discount)}
          />
          <label className="market__label market__label-discount-value" htmlFor="discountValue"></label>
          <input
            id="discountValue"
            className="market__input market__input-discount input-reset"
            type="number"
            disabled={!discount}
            value={discountValue}
            onChange={(e) => setDiscountAmount(e.target.value)}
          />{" "}
          <span className={`market__span ${!discount ? "market__span-disabled" : ""}`}>%</span>
        </div>
        <div className="market__wrapper">
          {" "}
          <label className="market__label" htmlFor="oldPrice">
            Цена:
          </label>
          <input
            id="oldPrice"
            className="market__input market__input-price  input-reset"
            type="text"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            required
          />{" "}
          руб.
        </div>
        <div className={`market__wrapper ${!discount ? "market__wrapper-disabled" : ""}`}>
          {" "}
          <label className="market__label" htmlFor="newPrice">
            Цена со скидкой:
          </label>
          <input
            id="newPrice"
            className="market__input market__input-price input-reset"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            disabled={!discount}
            required
          />{" "}
          руб.
        </div>
        <div className="market__wrapper">
          <label className="market__label" htmlFor="image">
            Изображение:
          </label>
          <input
            id="image"
            className="market__input input-reset"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Введите URL-картинки"
          />{" "}
          или
          <label htmlFor="market__label-image-file"></label>
          <input
            id="image-file"
            className="market__input market__input-file input-reset"
            value={""}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button className="market__btn btn-reset" type="button" onClick={handleAddProduct}>
          Добавить
        </button>
      </form>
      {products.length > 0 && <h2 className="market__title">Приглядитесь к этим предложениям</h2>}
      {products.length > 0 && (
        <ul className="market__list list-reset">
          {products.map((product: Product) => (
            <li className="market__item" key={product.id}>
              <img className="market__img" src={product.image} alt={product.name} />
              <div className="market__wrapper-price">
                {product.discount === false ? (
                  <>
                    <div className="market__price market__price-bold">
                      {product.oldPrice}
                      <FaRubleSign />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="market__price market__price-bold">
                      {product.newPrice}
                      <FaRubleSign />
                    </div>
                    <div className={`market__price ${product.discount ? "market__price-strikethrough" : ""}`}>
                      {product.oldPrice}
                      <FaRubleSign />
                    </div>
                    <div className="market__discount">{product.discountValue}%</div>
                  </>
                )}
              </div>
              <div className="market__name">{product.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Market;
