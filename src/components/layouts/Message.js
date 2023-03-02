import styles from "./Message.module.css";
import { useState, useEffect } from "react";

function Message({ type, msg }) {
  //tipo == mensagem de sucesso ou erro
    
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(!msg){
      setVisible(false)
      return
    }
    setVisible(true)
    const timer = setTimeout(() => { //determinando o tempo que esse alerta deve ficar na tela
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer) //enceramento, dando um retorno
  }, [msg]) //deve estar conectado a mesnagem, porque é algo que vai determina se o component sera visivel ou nao
  return (
    <>
    {visible && ( //permitindo a visualizando so se tiver visible
        <div className={`${styles.message} ${styles[type]}`}><p>{msg}</p></div>
      )}

    </>
  );
}

export default Message;
