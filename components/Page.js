/**
 * Created by Soup Tang on 2016/5/24.
 */
import React from 'react';
import ClassName from 'classname';
import Element from './Element';
import '../scss/page.scss';

class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.switcher = 'on';
    }

    componentWillReceiveProps(nextProps) {
        this.switcher = 'off';
    }

    componentDidUpdate() {
        let self = this;
        if (this.switcher === 'off') {
            this.switcher = 'on';
            setTimeout(function () {
                self.forceUpdate();
            }, 100);
        }
    }

    style() {
        return {
            backgroundColor: this.props.backgroundColor,
            backgroundImage: this.props.backgroundImage
        }
    }

    buildElementByType(element, index) {
        switch (element.elementType) {
            case 'IMAGE':
                return (
                    <Element width={element.width}
                             height={element.height}
                             top={element.top}
                             left={element.left}
                             isHide={this.props.isHide}
                             controlProps={element.controlProps}
                             key={index}>
                        <img src={element.src}/>
                    </Element>
                );
            case 'TEXT':
                return (
                    <Element width={element.width}
                             height={element.height}
                             top={element.top}
                             left={element.left}
                             isHide={this.props.isHide}
                             controlProps={element.controlProps}
                             key={index}>
                        <p>{element.value}</p>
                    </Element>
                );
            default:
                console.log(element.elementType);
                return null;
        }
    }

    render() {
        let self = this;
        let elements = [];
        //通过action=render防止渲染多次
        if (this.switcher === 'on' && this.props.action === 'render') {
            elements = this.props.elements.map(function (element, index) {
                return self.buildElementByType(element, index);
            });
        }
        return (
            <div
                style={this.style()}
                className={ClassName(this.props.className,'page','page-'+this.props.index,this.props.isCurrent?'page-current':'',this.props.isHide?'hide':'')}>
                <div className="wrap">
                    {elements}
                    <img className="move-icon-up"
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAcBAMAAADRt/HEAAAAKlBMVEUAAAD///////////////////////////////////////////////////+Gu8ovAAAADXRSTlMA+c02EvDkTiSADZ5k8IEGGQAAAIlJREFUKM91y7EJg1AYhdFbWIQMkEwRSFbICpkjYJkylTtY2Fi7gp0LKFjJ20X4ufCE73n6o4Nr+1fZO31UVD3S+jwpyYklObHcnFDm3zcSy11NJJZaFycUObHIiSUnFCcWJhcmF6RcmFyYXJBQnHJhckHKhal3YeqiMC0aozDNekVh2lRNKhnqHY3RcTc9DuipAAAAAElFTkSuQmCC"/>
                </div>
            </div>
        )
    }
}

Page.propType = {
    index: React.PropTypes.number,
    className: React.PropTypes.string,
    isHide: React.PropTypes.string,
    isCurrent: React.PropTypes.bool,
    elements: React.PropTypes.array
};

Page.defaultProps = {
    elements: []
};

module.exports = Page;