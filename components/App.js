/**
 * Created by Soup Tang on 2016/5/24.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Page from './Page';

class App extends React.Component {

    constructor(props) {
        super(props);
        let pages = localStorage.getItem('h5-by-soup-elements');
        if (pages) {
            pages = JSON.parse(pages).pages;
        }
        else {
            pages = [];
        }
        this.state = {
            index: 0,
            action: null,
            pages: pages
        };
    }

    swipeTopToBottomHandle(e) {
        let index = this.state.index;
        if (index > 0) {
            this.setState({
                action: 'swipeTopToBottom',
                index: index - 1
            });
        }
    }

    swipeBottomToTopHandle(e) {
        let index = this.state.index;
        if (index < this.state.pages.length - 1) {
            this.setState({
                action: 'swipeBottomToTop',
                index: index + 1
            });

        }
    }

    componentDidMount() {
        new window.SwipeEvent(document.body);
        document.body.addEventListener('swipe-top-to-bottom', this.swipeTopToBottomHandle.bind(this));
        document.body.addEventListener('swipe-bottom-to-top', this.swipeBottomToTopHandle.bind(this));
    }

    componentDidUpdate() {
        let self = this;
        if (this.state.action !== null) {
            setTimeout(function () {
                self.setState({
                    action: null
                })
            }, 600)
        }
    }

    render() {
        let self = this;
        let pages = null;
        if (this.state.action !== null) {
            pages = this.state.pages.map(function (page, index) {
                let currentIndex = self.state.index;
                let prevIndex = null;
                if (self.state.action == 'swipeBottomToTop') {
                    prevIndex = currentIndex - 1;
                    if (index === prevIndex) {
                        return <Page elements={page.elementsEntity.elements}
                                     key={index}
                                     className="pt-page-moveToTop"
                                     index={index}
                                     isHide={false}
                                     backgroundColor={page.backgroundColor}
                                     backgroundImage={page.backgroundImage}/>
                    }
                    if (index === currentIndex) {
                        return <Page elements={page.elementsEntity.elements}
                                     key={index}
                                     className="pt-page-moveFromBottom"
                                     index={index}
                                     isCurrent={true}
                                     isHide={false}
                                     backgroundColor={page.backgroundColor}
                                     backgroundImage={page.backgroundImage}/>
                    }
                }
                else if (self.state.action === 'swipeTopToBottom') {
                    prevIndex = currentIndex + 1;
                    if (index === prevIndex) {
                        return <Page elements={page.elementsEntity.elements}
                                     key={index}
                                     className="pt-page-moveToBottom"
                                     index={index}
                                     isHide={false}
                                     backgroundColor={page.backgroundColor}
                                     backgroundImage={page.backgroundImage}/>
                    }
                    if (index === currentIndex) {
                        return <Page elements={page.elementsEntity.elements}
                                     key={index}
                                     className="pt-page-moveFromTop"
                                     index={index}
                                     isCurrent={true}
                                     isHide={false}
                                     backgroundColor={page.backgroundColor}
                                     backgroundImage={page.backgroundImage}/>
                    }
                }
                //其余的页
                return <Page elements={page.elementsEntity.elements}
                             key={index}
                             index={index}
                             isHide={true}
                             backgroundColor={page.backgroundColor}
                             backgroundImage={page.backgroundImage}/>
            });
        }
        else {
            pages = this.state.pages.map(function (page, index) {
                return <Page elements={page.elementsEntity.elements}
                             key={index}
                             index={index}
                             action="render"
                             isCurrent={self.state.index===index}
                             isHide={self.state.index!==index}
                             backgroundColor={page.backgroundColor}
                             backgroundImage={page.backgroundImage}/>
            });
        }
        return (
            <div>{pages}</div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.querySelector('#app')
);

