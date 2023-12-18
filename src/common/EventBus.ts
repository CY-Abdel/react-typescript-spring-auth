/**
 * eventBus: 
 * C'est un objet qui agit comme un bus d'événements. Cela signifie qu'il facilite la communication entre différentes parties de votre application en permettant à un composant d'envoyer des événements et à d'autres composants de les écouter.
*/
const eventBus = {
  on(event: string, callback: EventListener) {
    document.addEventListener(event, (e) => callback(e));
  },

  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  remove(event: string, callback: EventListener) {
    document.removeEventListener(event, callback);
  }
};

export default eventBus;