import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import ClassificationFilter from './filters/ClassificationFilter.jsx';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import {
  Colors,
  Spacing,
  Typography,
} from 'material-ui/lib/styles';
import zIndex from 'material-ui/lib/styles/zIndex';
import UserAction from '../actions/user';

const SelectableList = SelectableContainerEnhance(List);

const AppLeftNav = React.createClass({

  propTypes: {
    docked: React.PropTypes.bool.isRequired,
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeLeftNav: React.PropTypes.func.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
  },

  handleRequestChangeLink(event, value) {
    window.location = value;
  },

  handleTouchTapHeader() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  },

  getStyles() {
    return {
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: Typography.textFullWhite,
        lineHeight: `${Spacing.desktopKeylineIncrement}px`,
        fontWeight: Typography.fontWeightLight,
        backgroundColor: Colors.cyan500,
        paddingLeft: Spacing.desktopGutter,
        marginBottom: 8,
      },
    };
  },

  render() {
    const {
      location,
      docked,
      onRequestChangeLeftNav,
      onRequestChangeList,
      open,
      style,
      user,
      updateUser,
    } = this.props;

    const {
      prepareStyles,
    } = this.context.muiTheme;

    const styles = this.getStyles();

    return (
      <LeftNav
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeLeftNav}
        containerStyle={{zIndex: zIndex.leftNav - 100}}
      >
        <div style={prepareStyles(styles.logo)} onTouchTap={this.handleTouchTapHeader}>
          Satch #
        </div>
        <SelectableList
          valueLink={{value: location.pathname, requestChange: onRequestChangeList}}
        >
          <ListItem primaryText="Магазины " value="/stores" />
          <ListItem primaryText="Новости" value="/news" />
        </SelectableList>
        <Divider />
        <ClassificationFilter location={location} />
        <Divider />
        {user && <ListItem
          primaryText="Выйти"
          onTouchTap={() => {
              updateUser(null);
              this.handleTouchTapHeader();
            }
          } />
        }
        <SelectableList
          valueLink={{value: '', requestChange: this.handleRequestChangeLink}}
        >
          {!user && <ListItem primaryText="Войти " value="/login" /> }
        </SelectableList>
      </LeftNav>
    );
  },
});

export default connect(
  state => (
    {
      query: state.router.location.query,
      user: state.user,
    }
  ),
  Object.assign({ pushState }, UserAction)
)(AppLeftNav);
