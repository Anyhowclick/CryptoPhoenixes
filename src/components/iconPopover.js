import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class IconPopover extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <Button color={this.props.color} className={this.props.bg} block size="sm" id={this.props.id} onClick={this.toggle}>
        <img className="descriptImg" src={this.props.image} /> {this.props.displayText}
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.id} toggle={this.toggle}>
          <PopoverHeader className={this.props.headerClass}>{this.props.headerText}</PopoverHeader>
          <PopoverBody>{this.props.bodyText}</PopoverBody>
        </Popover>
      </div>
    );
  }
}