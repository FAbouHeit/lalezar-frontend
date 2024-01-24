import ReactMarkdown from 'react-markdown';
import Styles from './BlogMD.module.css';
import testText from './text.js'

export default function BlogMD({text}) {
  
return (
    <article className={Styles.textContainer}>
      {/* this is where the texted should be fetched to from the backend */}
      <ReactMarkdown  children = {text || testText} />
    </article>
  )
}
