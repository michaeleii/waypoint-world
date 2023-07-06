import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import CityData from "../interfaces/City";

const BASE_URL =
  "https://my-json-server.typicode.com/michaeleii/waypoint-world/";

type useStoreDataReturnType = ReturnType<typeof useStoreData>;

const CitiesContext = createContext<useStoreDataReturnType | null>(null);

interface State {
  cities: CityData[];
  isLoading: boolean;
  currentCity: CityData | null;
  error: string;
}
interface Action {
  type:
    | "cities/loaded"
    | "city/loaded"
    | "city/created"
    | "city/deleted"
    | "rejected";
  payload: any;
}
interface ActionWithoutPayload {
  type: "loading";
}
const intialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state: State, action: Action | ActionWithoutPayload) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
}

function useStoreData() {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    intialState
  );

  const getCity = useCallback(
    async function getCity(id: string) {
      if (Number(id) === currentCity?.id) return;
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    },
    [currentCity?.id]
  );

  async function createCity(newCity: {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: {
      lat: number;
      lng: number;
    };
  }) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id: number) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  return {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
    dispatch,
  };
}

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
    dispatch,
  } = useStoreData();

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, [dispatch]);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
