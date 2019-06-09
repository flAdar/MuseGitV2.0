import Component from "../../modules/Component.mjs";

export default class VisitProfileRoute extends Component {
    #userInfo;
    #a_user;

    constructor() {
        super();
    }

    onInit() {
        this.#userInfo = {
            nickname: this.querySelector("#name"),
            bio: this.querySelector("#description"),
            img: this.querySelector("#profileImg"),
            cover: this.querySelector("#coverImg"),
            county: this.querySelector("#userCountry"),
            city: this.querySelector("#userCity")
        };
        Application.Modules.FireModule.queryUser(location.search.split('?')[1]);
    }

    onSync() {
        this.#a_user = Application.Modules.FireModule.a_user;
        this.onUpdate('a_user', this.#a_user, [this.renderProfile]);

    }

    renderProfile() {
        
        this.#userInfo.nickname.innerHTML = this.#a_user.displayName;
        this.#userInfo.bio.innerHTML = this.#a_user.Bio;
        this.#userInfo.county.innerHTML = this.#a_user.Country;
        this.#userInfo.city.innerHTML = this.#a_user.City;
        const skills = this.querySelector('#skills');
        const genres = this.querySelector('#genres');
        if (skills.children.length !== this.#a_user.Skills.length) {
            skills.innerHTML = '';
            this.#a_user.Skills.forEach((skill) => {
                this.querySelector('#skills').innerHTML += `<span class=\"badge badge-success\">${skill}</span>`;
            });
        }
        if (genres.children.length !== this.#a_user.Genres.length) {
            genres.innerHTML = '';
            this.#a_user.Genres.forEach((genre) => {
                genres.innerHTML += `<span class=\"badge badge-danger\">${genre}</span>`;
            });
        }
    }


}