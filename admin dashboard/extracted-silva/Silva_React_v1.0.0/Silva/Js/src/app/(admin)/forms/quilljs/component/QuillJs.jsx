import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
const QuillTool = ({
  className
}) => {
  const [editorContent, setEditorContent] = useState(`
    <h1>Hello World</h1>
    <p>This is a simple editable area</p>
    <ol>
      <li>Select a text to reveal the toolbar.</li>
      <li>Edit rich document on-the-fly, so elastic!</li> 
    </ol>
    <p>Preset build with <code>snow</code> theme.</p>
  `);
  return <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} modules={{
    toolbar: [[{
      header: [1, 2, 3, false]
    }], [{
      size: ['small', false, 'large', 'huge']
    }], [{
      list: 'bullet'
    }, {
      list: 'ordered'
    }], ['bold', 'italic', 'underline'], ['link']]
  }} formats={['header', 'size', 'list', 'bold', 'italic', 'underline', 'link']} className={className} style={{
    height: '400px'
  }} />;
};
export default QuillTool;