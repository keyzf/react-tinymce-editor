import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Dialog, DialogTitle, DialogContent, DialogActions, Textfield, Button } from 'react-mdl';
import { Card, CardTitle, CardActions } from 'react-mdl';
import { MdAddAPhoto, MdLanguage } from 'react-icons/lib/md';

const cardStyles = {
  'float'           : 'left',
  'width'           : 256,
  'height'          : 256,
  'backgroundColor' : '#f4f4f4',
  'cursor'  : 'pointer',
};

const actionStyles = {
  'height'  : 52,
  'padding' : 16,
};

const captionStyles = {
  'color'     : '#a4a4a4',
  'fontSize'  : 14,
  'fontWeight': '500',
};

const iconStyles = {
  'position': 'absolute',
  'margin'  : 100,
};

export default React.createClass({
  getInitialState() {
    return {
      'showUrl': false,
    };
  },

  onUploadImage() {
    ReactDOM.findDOMNode(this.refs.file.refs.input).click();
  },

  onAddImage() {
    this.setState({
      'showUrl': true,
    }, () => {
      ReactDOM.findDOMNode(this.refs.src.refs.input).focus();
    });
  },

  onSubmit() {
    this.setState({
      'showUrl': false,
    }, this.props.onSubmit);
  },

  onCancel() {
    this.setState({
      'showUrl': false,
    }, this.props.onCancel);
  },

  render() {
    const { onUploadImage, onAddImage } = this;
    const { showUrl } = this.state;
    const { show, data, onChange } = this.props;
    const { onSubmit, onCancel } = this;

    return (
      <Dialog open={show} style={{ 'width': 600 }}>
        <DialogTitle>Insert/Edit image</DialogTitle>
        <DialogContent>
          <Card shadow={0} style={cardStyles} onClick={onUploadImage}>
            <CardTitle expand />
            <MdAddAPhoto size={60} style={iconStyles} />

            <CardActions style={actionStyles}>
              <span style={captionStyles}>
                Upload an image
              </span>
            </CardActions>
          </Card>

          <Card shadow={0} style={cardStyles} onClick={onAddImage}>
            <CardTitle expand />
            <MdLanguage size={60} style={iconStyles} />

            <CardActions style={actionStyles}>
              <span style={captionStyles}>
                Add an image from the web
              </span>
            </CardActions>
          </Card>

          <Textfield
            style={{ 'display': 'none' }}
            ref="file"
            label=""
            type="file"
            onChange={(e) => onChange('file', e.target.value)}
          />
          <Textfield
            style={{ 'visibility': showUrl ? '' : 'hidden' }}
            ref="src"
            label="Paste a URL:"
            value={data.src}
            onChange={(e) => onChange('src', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onSubmit}>Ok</Button>
          <Button type="button" onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  },

});