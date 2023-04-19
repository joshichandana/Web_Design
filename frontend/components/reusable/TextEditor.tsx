/**
 * File Name: components/reusable/TextEditor.tsx
 * 
 * About: 
 * This file contains the reusable text editor component that can be used
 * Anywhere in the application
 * 
 * Currently this is being used in the individual Incident display page, where the Incident description
 * is displayed
 * 
 * Users can directly place the cursor on the description and continue editing the
 * Incident details
 */

import React from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function TextEditor({text, reportUpdate}:{text:string, reportUpdate: Function}) {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createWithContent(ContentState.createFromText(text) )
  );

  const updateEditorState = (state:EditorState) => {
    
    setEditorState(state);
    reportUpdate(state.getCurrentContent().getPlainText());

  }



  return <Editor editorState={editorState} onChange={updateEditorState} />;
}