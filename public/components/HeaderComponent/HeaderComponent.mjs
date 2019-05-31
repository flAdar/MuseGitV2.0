import Component from "../../modules/Component.mjs";

export default class HeaderComponent extends Component {
    constructor(){
        super();
    }
    onInit(){
        const signout = this.querySelector('#signout');
        signout.onclick = ()=>{
            Application.Modules.FireModule.signOut();
        }
    }
    onSync(){
        const logged =this.querySelector('#logged');
        const login =this.querySelector('#login');
        const displayName = this.querySelector('#displayName');

        const user = Application.Modules.FireModule.user;
        if(user){
            login.classList.remove('show');
            logged.classList.add('show');
            displayName.innerText = user.displayName;
        }else {
            displayName.innerText = '';
            login.classList.add('show');
            logged.classList.remove('show');
        }
    }
}