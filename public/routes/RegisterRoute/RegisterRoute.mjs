import Component from "../../modules/Component.mjs";

export default class RegisterRoute extends Component {
    constructor(){
        super();
    }
    onInit(){
        const signup = this.querySelector("#signup");
        signup.addEventListener('submit',(event)=>{
            event.preventDefault();
            const form = event.target;
            const result = Application.Modules.FormsModule.formHandler(form);
            Application.Modules.FireModule.RegisterEmailAndPassword(result);
        });
    }
}