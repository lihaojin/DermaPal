import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


function UploadButton(props){
  const {classes} = props;

  return(
  <div>
  <label htmlFor="raised-button-file">
    <Button
    variant="contained"
    color="default"
    component="span"
    className={classes.button}>
        Upload
        <CloudUploadIcon className={classes.rightIcon} />
    </Button>
  </label>
  </div>
  );
}

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);
