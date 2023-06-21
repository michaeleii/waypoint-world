import { createContext, useContext, useReducer } from "react";
interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
} | null>(null);

const intialState: State = {
  user: null,
  isAuthenticated: false,
};

interface Action {
  type: "login";
  payload: User;
}

interface ActionWithoutPayload {
  type: "logout";
}

function reducer(state: State, action: Action | ActionWithoutPayload) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return intialState;
    default:
      return state;
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "bbqirstFF$",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    intialState
  );
  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: {
          ...FAKE_USER,
        },
      });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
