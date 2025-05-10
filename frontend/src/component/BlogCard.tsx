import { Link } from 'react-router-dom';

interface BlogCardProps{
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

const BlogCard = ({authorName , title , content , publishedDate , id} : BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className='border-b-1 border-slate-500 cursor-pointer'>
        <div className='flex gap-2 items-center'>
        <Avatar name={authorName} size={8} />
        <div className='font-semibold'>{authorName}</div>
        <div>.</div>
        <div className='text-slate-500'>{publishedDate}</div>
       </div>
        <div className='text-2xl font-bold mt-2 max-w-4xl'>{title}</div>
        <div className='mt-2 mb-2 font-sans'>{content.substring(0,250) + "..."}</div>
        <div>{Math.round((content.length / 100)*10)} minutes read</div>
    </div> 
    </Link>
  )
}

export default BlogCard

export function Avatar({name , size=4} : {name: string , size: number}){
  return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">{name[0].toUpperCase()}</span>
</div>
}