import Component from "../../modules/Component.mjs";

export default class VisitProfileRoute extends Component {
    #userInfo;
    #user;

    constructor(){
        super();
    }
    onInit(){
        this.#userInfo = {
            nickname: this.querySelector("#name"),
            bio: this.querySelector("#description"),
            img: this.querySelector("#profileImg"),
            cover: this.querySelector("#coverImg"),
            county: this.querySelector("#userCountry"),
            city: this.querySelector("#userCity")
        };
        // Application.Modules.FireModule.queryUser(location.pathname.split('?')[1]);
    }
    onSync(){
        this.#user = Application.Modules.FireModule.a_user;
        this.onUpdate('user',this.#user,[this.renderProfile]);
    }

    renderProfile(){
        this.#userInfo.nickname.innerHTML = this.#user.displayName;
        this.#userInfo.bio.innerHTML = this.#user.Bio;
        this.#userInfo.county.innerHTML = this.#user.Country;
        this.#userInfo.city.innerHTML = this.#user.City;
        const skills = this.querySelector('#skills');
        const genres = this.querySelector('#genres');
        if(skills.children.length !== this.#user.Skills.length){
            skills.innerHTML = '';
            this.#user.Skills.forEach((skill) => {
                this.querySelector('#skills').innerHTML += `<span class=\"badge badge-success\">${skill}</span>`;
            });
        }
        if(genres.children.length !== this.#user.Genres.length) {
            genres.innerHTML = '';
            this.#user.Genres.forEach((genre) => {
                genres.innerHTML += `<span class=\"badge badge-danger\">${genre}</span>`;
            });
        }
    }


}