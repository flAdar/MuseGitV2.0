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
        if (this.#a_user && this.#a_user['data']) {
            this.onUpdate('a_user', this.#a_user, [this.renderProfile]);
        }
        if (this.#a_user && this.#a_user['projects'] && this.#a_user['projects'].length > 0) {
            this.onUpdate('a_user[\'projects\']', this.#a_user['projects'], [this.renderProjects]);
        }
        if (this.#a_user && this.#a_user['follow'] && this.#a_user['follow'].length > 0) {
            this.onUpdate('a_user[\'follow\']', this.#a_user['follow'], [this.renderFollow]);
        }

    }

    renderProfile() {
        console.log(this.#a_user);
        this.#userInfo.nickname.innerHTML = this.#a_user['data'].displayName;
        this.#userInfo.bio.innerHTML = this.#a_user['data'].Bio;
        this.#userInfo.county.innerHTML = this.#a_user['data'].Country;
        this.#userInfo.city.innerHTML = this.#a_user['data'].City;
        this.#userInfo.cover.src = `../assets/cover/${this.#a_user['data'].CoverURL}.jpg`;
        this.#userInfo.img.src = `../assets/PNG/128x128/128_${this.#a_user['data'].photoURL}.png`;
        const skills = this.querySelector('#skills');
        const genres = this.querySelector('#genres');
        if (skills.children.length !== this.#a_user['data'].Skills.length) {
            skills.innerHTML = '';
            this.#a_user['data'].Skills.forEach((skill) => {
                this.querySelector('#skills').innerHTML += `<span class=\"badge badge-success\">${skill}</span>`;
            });
        }
        if (genres.children.length !== this.#a_user['data'].Genres.length) {
            genres.innerHTML = '';
            this.#a_user['data'].Genres.forEach((genre) => {
                genres.innerHTML += `<span class=\"badge badge-danger\">${genre}</span>`;
            });
        }

    }

    renderFollow() {
        setTimeout(() => {
            console.log(this.#a_user['follow']);
            let _followers = this.querySelector('#followers');
            let _followings = this.querySelector('#followings');

            this.#a_user['follow'].forEach((fol) => {
                let _follow = document.createElement('follow-user');
                _follow.setAttribute('uid', fol['data'].uid);
                _follow.setAttribute('name', fol['data'].displayName);
                _follow.setAttribute('img', fol['data'].photoURL);
                if (fol['type'] === 'follower') {
                    _followers.appendChild(_follow);
                } else if (fol['type'] === 'following') {
                    _followings.appendChild(_follow);
                }
            })

        }, 1000);

    }

    renderProjects() {
        let _projects = this.querySelector(".video-wrap");
        this.#a_user['projects'].forEach(pro => {
            let _project = document.createElement('small-project');
            _project.setAttribute('pid', pro['data'].pid);
            _project.setAttribute('name', pro['data'].PName);
            _project.setAttribute('img', pro['data'].ImgURL);
            _project.setAttribute('star', pro['data'].Stars);
            _projects.appendChild(_project);
        });


    }


}