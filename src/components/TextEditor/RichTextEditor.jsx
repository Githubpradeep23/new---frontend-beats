import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte'; 

function BodyTextEditor({ value, setValue }) {

    const [editorValue, setEditorValue] =
      React.useState(RichTextEditor.createValueFromString(value, 'markdown'));

    const handleChange = value => {
      setEditorValue(value);
      setValue(value.toString("markdown"));
    };

    return (
      <RichTextEditor
        value={editorValue}
        onChange={handleChange}
        required
        id="body-text"
        name="bodyText"
        type="string"
        multiline
        variant="filled"
        style={{ minHeight: 410 }}
      />
    );
  }

 export default BodyTextEditor;