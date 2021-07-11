import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  SignInWithGoogle: () => Promise<void>;
}

type AuthContextProviderType = {
  children: ReactNode;
}

// faz a criação do context
const AuthContext = createContext({} as AuthContextType);
// export const AuthContext = createContext({} as AuthContextType);

// cria oque vamos colocar dentro do context criado acima
export function AuthContextProvider(props: AuthContextProviderType) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    // identificar se existia um usuário logado antes da página ser recarregada
    const unsubscribe = auth.onAuthStateChanged((userReload) => {
      if (userReload) {
        const { displayName, photoURL, uid } = userReload;

        if (!displayName || !photoURL) {
          throw new Error("Existe informação importante da conta do Google faltando!");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function SignInWithGoogle() {
    // chama o sistema do Firebase para realizar o login
    const provider = new firebase.auth.GoogleAuthProvider();

    // define como realizar o login
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Existe informação importante da conta do Google faltando!");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, SignInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// faz o instanciamento do context
export const UseAuth = () => useContext(AuthContext);
