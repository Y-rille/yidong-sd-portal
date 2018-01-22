import * as React from 'react';
// import styles from './BasicLayout.less';

export interface BasicLayoutProps {
}

export default class BasicLayout extends React.Component<BasicLayoutProps, any> {

  static contextTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
