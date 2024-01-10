import "./App.css";
import { Editing } from "./components/Editing";
import { Filter } from "./components/Filter";
import { Market } from "./components/Market";
import { Provider } from "react-redux";
import configureStoreEditing from "./components/Editing/redux/store";
import configureStoreFilter from "./components/Filter/redux/store";
import configureStoreMarket from "./components/Market/redux/store";

function App() {
  const storeEditing = configureStoreEditing();
  const storeFiltering = configureStoreFilter();
  const storeMarket = configureStoreMarket();
  return (
    <>
      <div className="container">
        <h2 className="title">Задание №1 - Редактирование</h2>
        <Provider store={storeEditing}>
          <Editing></Editing>
        </Provider>
      </div>
      <div className="container">
        <h2 className="title">Задание №2 - Фильтрация</h2>
        <Provider store={storeFiltering}>
          <Filter></Filter>
        </Provider>
      </div>
      <div className="container">
        <h2 className="title">Задание №3 - Маркет</h2>
        <Provider store={storeMarket}>
          <Market></Market>
        </Provider>
      </div>
    </>
  );
}

export default App;
