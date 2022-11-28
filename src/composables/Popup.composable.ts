import { PopupButton, PopupType } from 'src/enums/Popup.enum';
import BasePopup from 'src/components/BasePopup.vue';
import { Dialog, Loading } from 'quasar';

// by convention, composable function names start with "use"
export function usePopup(
  title: string,
  message: string,
  buttons: PopupButton[],
  popupType?: PopupType
) {
  // state encapsulated and managed by the composable
  const popup = Dialog.create({
    //custom component
    component: BasePopup,
    // props forwarded to your custom component
    componentProps: {
      title,
      message,
      buttons,
      popupType,
    },
  });
  // expose managed state as return value
  return { popup };
}

export function useErrorPopup(
  title: string,
  message: string,
  buttonLabel?: string,
  hideClosePopup?: boolean
) {
  const errorPopup = Dialog.create({
    component: BasePopup,
    componentProps: {
      title,
      message,
      popupType: PopupType.ERROR,
      okButtonLabel: buttonLabel,
      hideClosePopup,
    },
  });
  return { errorPopup };
}

export function useConfirmationPopup(title: string, message: string) {
  const confirmationPopup = Dialog.create({
    component: BasePopup,
    componentProps: {
      title,
      message,
      popupType: PopupType.CONFIRMATION,
    },
  });
  return { confirmationPopup };
}

export function useLoadingPopup() {
  const loadingPopup = Loading;
  return { loadingPopup };
}
