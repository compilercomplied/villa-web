

const _elID = "alert-popup"

export const useAlertPopup = (error:string, elementID:string = _elID) => {

  const displayStyle = error !== null ? "none" : "absolute";

  let el = document.getElementById(elementID);
  el?.style.setProperty("display", displayStyle)

}