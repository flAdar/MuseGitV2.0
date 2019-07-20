import Component from "../../modules/Component.mjs";

export default class DashboardRoute extends Component {
    #user;
    #userInfo;
    constructor(){
        super();
    }

    onInit(){
        this.#userInfo = {
            nickname: this.querySelector("#name"),
            bio: this.querySelector("#description"),
            img: this.querySelector("#profileImg"),
            cover: this.querySelector("#coverImg")
        };

        this.querySelector("#D_profile").addEventListener("click",()=>{
            Application.Modules.RouterModule.redirect("./profile");
        });
        this.querySelector("#D_musespace").addEventListener("click",()=>{
            Application.Modules.RouterModule.redirect("./musespace");
        });
        this.querySelector("#D_explore").addEventListener("click",()=>{
            Application.Modules.RouterModule.redirect("./explore");
        });

    }

    onSync(){
        this.#user = Application.Modules.FireModule.user;
        this.onUpdate('user',this.#user,[this.renderProfile]);

    }

    renderProfile(){
        this.#userInfo.nickname.innerHTML = this.#user.displayName;
        this.#userInfo.bio.innerHTML = this.#user.Bio;
        this.#userInfo.cover.src = `../assets/cover/${this.#user.CoverURL}.jpg`;
        this.#userInfo.img.src = `../assets/PNG/128x128/128_${this.#user.photoURL}.png`;

    }
}