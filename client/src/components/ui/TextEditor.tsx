import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TinyEditor: React.FC<TinyEditorProps> = ({ value, onChange }) => {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  const handleEditorChange = (_content: string, editor: any) => {
  const plainText = editor.getContent({ format: 'text' });
  onChange(plainText);
};


  return (
    <div className="bg-black" >
      <Editor 
        apiKey={apiKey}
        value={value}
        initialValue="Write here..."
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TinyEditor;
