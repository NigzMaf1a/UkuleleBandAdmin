//packages
import { toast } from "react-toastify";

  function oneTwoTesting(){
    toast.info('It is happening!!!!');
  }

  function runEffects(){
    toast.success('One Two Testing');
    oneTwoTesting();
  }

  function profileStyle(){
    toast.warn('Better figure that shit out');
  }

  function closeAllToast(){
    toast.dismiss();
  }

export {runEffects, profileStyle, closeAllToast};