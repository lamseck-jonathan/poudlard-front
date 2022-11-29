import { Notify } from 'quasar';
import { ToastType } from 'src/enums/ToastType.enum';

// by convention, composable function names start with "use"
export function useToast(title: string, message: string, type: ToastType) {
  // state encapsulated and managed by the composable
  const toast = Notify.create({
    message: title,
    caption: message,
    classes: `neo_toast neo_toast_${type}`,
  });
  // expose managed state as return value
  return { toast };
}
