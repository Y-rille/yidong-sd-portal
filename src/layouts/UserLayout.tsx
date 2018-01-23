import * as React from 'react';
import styles from './UserLayout.less';
export interface UserLayoutProps {

}
export default class UserLayout extends React.PureComponent<UserLayoutProps, any> {
    render() {
        return (
            <div className={styles.container}>
                {this.props.children}
            </div>
        );
    }
}
