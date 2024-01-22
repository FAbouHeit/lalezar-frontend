import ReactMarkdown from 'react-markdown';
import Styles from './BlogMD.module.css'

export default function BlogMD({text}) {
    const defaultText = 
    
    `# Hello, this is Markdown content!

    **Bold Text**
    
    *Italic Text*
    
    - List item 1
    - List item 2`

    const othertext = "# Welcome to StackEdit!\n\nHi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.\n\n# Files\n\nStackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**\n\n## Create files and folders\n\nThe file explorer is accessible using the button in the left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.\n\n..."

    const mytext = text
  
return (
    <article className={Styles.textContainer}>
    <ReactMarkdown  children = {text || othertext} />
    {/* <ReactMarkdown className={className}  children = {text || defaultText} /> */}
    {/* <ReactMarkdown className={props.className}  children = {props.markdown || defaultMarkdown} /> */}
    </article>
  )
}
