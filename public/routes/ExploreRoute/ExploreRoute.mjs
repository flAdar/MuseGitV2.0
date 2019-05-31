import Component from "../../modules/Component.mjs";

export default class ExploreRoute extends Component {
    explore_result;
    constructor() {
        super();
    }

    onInit() {
        this._exploreForm = document.getElementById('exploreForm');
        this._exploreForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const form = event.target;
            const result = this.exploreFormHandler(form);
            console.log(result);
            Application.Modules.FireModule.queryFilters(result);

        });
    }

    onSync() {
        this.explore_result = Application.Modules.FireModule.explore_result;
        if (this.explore_result){
            if (this.explore_result.length>0){
                this.onUpdate('explore_result', this.explore_result,[this.creatResult])

            }
        }
    }

    //--> temporary form handler
    exploreFormHandler(form) {
        let result = {};
        for (let i = 0; i < form.length - 1; i++) {

            const input = form[i];
            if (input.localName === 'type') {
                result[input.name] = input.option[selected].value;
            }
            result[input.name] = input.value;
        }
        return result;
    }

    creatResult() {
        let _exploreResult = this.querySelector("#exploreResultUser");
        console.log(this.explore_result);
        for(let res of this.explore_result){
            if (res['type'] === "artist") {
                let artist = {
                    uid: res['data'].uid,
                    name: res['data'].displayName,
                    bio: res['data'].Bio
                };
                console.log(artist);
                // const searchResult = document.createElement("div");
                // searchResult.setAttribute("component-artistResult", '');
                // searchResult.setAttribute("class", "artist");
                // searchResult.setAttribute("uid", artist.uid);
                // searchResult.setAttribute("name", artist.name);
                // searchResult.setAttribute("bio", artist.bio);
                // const searchResult = document.createElement("app-artist");
                // _exploreResult.appendChild(searchResult);

            }
        }

        //console.log(this.explore_result);
        // let exploreResult = document.getElementById("exploreResult");
        // if (type === 'artist') {
        //     let artist = {
        //         uid: doc.id,
        //         name: doc.data()['displayName'],
        //         bio: doc.data()['Bio']
        //     };
        //     const searchResult = document.createElement("div");
        //     searchResult.setAttribute("component-artistResult", '');
        //     searchResult.setAttribute("class", "artist");
        //     searchResult.setAttribute("uid", artist.uid);
        //     searchResult.setAttribute("name", artist.name);
        //     searchResult.setAttribute("bio", artist.bio);
        //     exploreResult.appendChild(searchResult);
        //
        // } else if (type === 'project') {
        //     let project = {
        //         pid: doc.id,
        //         name: doc.data()['PName'],
        //         author: doc.data()['AuthorID'],
        //         stars: doc.data()['Stars']
        //     };
        //     const searchResult = document.createElement("div");
        //     searchResult.setAttribute("class", "project");
        //     searchResult.setAttribute("component-projectResult", '');
        //     searchResult.setAttribute("pid", project.pid);
        //     searchResult.setAttribute("name", project.name);
        //     searchResult.setAttribute("author", project.author);
        //     searchResult.setAttribute("stars", project.stars);
        //     exploreResult.appendChild(searchResult);
        // }
    }

}

