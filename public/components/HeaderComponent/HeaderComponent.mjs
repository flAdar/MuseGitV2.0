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
        const avatar = this.querySelector('#avatar');

        const user = Application.Modules.FireModule.user;

        if(user){
            this.onUpdate('user',user,[()=>{
                login.classList.remove('show');
                logged.classList.add('show');
                displayName.innerText = user.displayName;
                avatar.src =`../../assets/PNG/64x64/64_${user.photoURL}.png`
            }])
        }else {
            displayName.innerText = '';
            login.classList.add('show');
            logged.classList.remove('show');
        }
    }
}