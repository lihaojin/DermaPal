import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './App.css';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

class ResultTabs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      expanded: null,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Description" />
            <Tab label="Causes" />
            <Tab label="Treatments" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>{this.props.AcneDescription}</TabContainer>
          <TabContainer dir={theme.direction}>{this.props.AcneCauses}</TabContainer>
          <TabContainer dir={theme.direction}>
          <div className="tablabels">Treatment Type</div>
          <div>{this.props.AcneTreatments}</div><br />
          <div className="tablabels">Treatment Name</div>
          <div>{this.props.TreatmentName}</div><br />
          <div className="tablabels">Treatment Description</div>
          <div>{this.props.TreatmentDescription}</div>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

ResultTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResultTabs);
