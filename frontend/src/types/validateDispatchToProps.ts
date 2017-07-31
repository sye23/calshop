import {InputValidate} from './inputValidate';
import {Validate} from './validate'

export interface ValidateDispatchToProps{
    addValidateSuccess: (obj : InputValidate) => void;
    changeValidateSuccess:(obj : InputValidate) =>  void;
    wasValidatedSuccess:(error : boolean) =>  void;
    clickedSuccess: (isClicked: boolean) =>  void;
    removeValidateSuccess: () => void;
}