/**
 * Created by Soup Tang on 2016/5/24.
 */
import React from 'react';
import ClassName from 'classname';

class Element extends React.Component {

    constructor(props) {
        super(props);
    }

    setInlineStyle() {
        return {
            width: this.props.width,
            height: this.props.height,
            left: this.props.left,
            top: this.props.top,
            zIndex: this.props.zIndex,
            textAlign: this.props.controlProps.textAlign,
            color: this.props.controlProps.fontColor,
            fontSize: this.props.controlProps.fontSize,
            animationName: this.props.controlProps.animation,
            animationDuration: this.props.controlProps.duration,
            animationTimingFunction: 'ease',
            animationDelay: this.props.controlProps.delay
        };
    }

    render() {
        return (
            <div className={ClassName('element', this.props.className,this.props.isHide?'hide':'')}
                 style={this.setInlineStyle()}>
                {this.props.children}
            </div>
        )
    }
}

Element.propType = {
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    top: React.PropTypes.string,
    left: React.PropTypes.string,
    value: React.PropTypes.string,
    src: React.PropTypes.string,
    controlProps: React.PropTypes.object,
    isHide: React.PropTypes.bool
};

Element.defaultProps = {
    elements: []
};

module.exports = Element;