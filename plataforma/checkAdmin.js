import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Ajuste o caminho do seu arquivo de configuração do Firebase

export async function verificarSeEhAdmin() {
  const usuarioAtual = auth.currentUser;

  if (!usuarioAtual) {
    console.log("Nenhum usuário está logado.");
    return false;
  }

  // Busca o documento do usuário logado na coleção 'users'
  const userRef = doc(db, "users", usuarioAtual.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists() && userSnap.data().role === "admin") {
    console.log("Acesso concedido: O usuário é ADMIN!");
    return true;
  } else {
    console.log("Acesso negado: O usuário NÃO é admin.");
    return false;
  }
}