import React from 'react';
import { Editor } from '@tinymce/tinymce-react';



function RichTextEditor(props) {
    const handleEditorChange = (content, editor) => {
        props.handleContentChange(content);
        console.log('Content was updated:', content);
    }
    // const [editorState, setEditorState] = React.useState(
    //     EditorState.createEmpty(),
    // );
    return (
        <Editor
            apiKey="1r1evnkdk7dm88suupkwpoho4ec179bzk243taxvoklx1psm"
            initialValue="<p>Use this section to describe the job</p>"
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
        />
    )
}

export default RichTextEditor