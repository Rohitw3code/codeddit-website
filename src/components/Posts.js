import React, { Component } from 'react'
import "firebase/compat/firestore";
import firebase from "../Firebase";
import NormalPostItem from './NormalPostItem';

export default class Posts extends Component {


    constructor() {
        super();
        this.state = {
            uniqueId: [],
            items: [],
            user: [],
            loading: true,
            lastId: null
        }
        this.ref = firebase.firestore().collection("posts").orderBy('time', 'desc').limit(4);
        this.userRef = firebase.firestore().collection("users");
    }


    async componentDidMount() {
        this.setState({ loading: true });
        // firebase.firestore().collection("users").get().then((item) => {
        //     const items = item.docs.map((doc) => { doc.data() });
        //     this.setState({ loading: false, user: items });
        //     console.log(items[0]);
        // })

        this.ref.onSnapshot((qs) => {
            qs.forEach((doc) => {
                let idd = {};
                idd["id"] = doc.id;
                let datas = Object.assign({}, idd, doc.data());
                this.userRef.doc(datas.publisherId).get().then((userSnap) => {
                    let userItem = {}
                    userItem["userImage"] = userSnap.data().photoURL;
                    userItem["userName"] = userSnap.data().name;

                    let postItem = Object.assign({}, userItem, doc.data());


                    this.state.items.push(postItem);
                    this.setState({ lastId: doc });
                    this.setState({ loading: false });
                    this.state.uniqueId.push(doc.id);
                })

            });
            this.setState({ user: this.state.items });
        });


    }

    render() {
        let { showAlert } = this.props;
        const loadMore = () => {
            if (!this.state.loading) {
                this.setState({ loading: true });
                this.ref = firebase.firestore().collection("posts").orderBy('time', 'desc').startAfter(this.state.lastId).limit(4);
                let l = this.ref.onSnapshot((qs) => {
                    qs.forEach((doc) => {
                        let idd = {};
                        idd["id"] = doc.id;
                        let datas = Object.assign({}, idd, doc.data());
                        this.userRef.doc(datas.publisherId).get().then((userSnap) => {
                            let userItem = {}
                            userItem["userImage"] = userSnap.data().photoURL;
                            userItem["userName"] = userSnap.data().name;

                            let postItem = Object.assign({}, userItem, doc.data());


                            this.state.items.push(postItem);
                            this.setState({ lastId: doc });
                            this.setState({ loading: false });
                            this.state.uniqueId.push(doc.id);
                        })
                    });
                    l();
                    this.setState({ loading: true, user: this.state.items });
                });
            }
        }

        const loadMoreBtn = () => {
            this.setState({ loading: true });
            this.ref = firebase.firestore().collection("posts").orderBy('time', 'desc').startAfter(this.state.lastId).limit(4);
            let l = this.ref.onSnapshot((qs) => {
                qs.forEach((doc) => {
                    let idd = {};
                    idd["id"] = doc.id;
                    let datas = Object.assign({}, idd, doc.data());
                    this.userRef.doc(datas.publisherId).get().then((userSnap) => {
                        let userItem = {}
                        userItem["userImage"] = userSnap.data().photoURL;
                        userItem["userName"] = userSnap.data().name;

                        let postItem = Object.assign({}, userItem, doc.data());


                        this.state.items.push(postItem);
                        this.setState({ lastId: doc });
                        this.setState({ loading: false });
                        this.state.uniqueId.push(doc.id);
                    })
                });
                l();
                this.setState({ loading: true, user: this.state.items });
            });

        }



        window.onscroll = function () { myFunction() };
        const myFunction = () => {
            if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
                if (!this.state.loading) {
                    // loadMore();
                }
            }
        }


        return (
            <div>
                <h2 className="container mx-2">All Post</h2>
                {this.state.user.map((element) => {
                    return <div className="container" key={element.id}>
                        <NormalPostItem showAlert={showAlert} data={element} />
                    </div>
                })}
                <div className="container mx-5 my-5">
                    <button type="button" onClick={loadMoreBtn} className="btn btn-secondary">Load More</button>
                </div>
            </div>
        )
    }
}
