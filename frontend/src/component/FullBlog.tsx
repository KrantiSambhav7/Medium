import Appbar from './Appbar'
import { Avatar } from './BlogCard';


interface Blog{
  title: string;
  content: string;
  author: {
    email: string;
  };
  id: string;
}

const FullBlog = ({blog} : {blog: Blog} ) => {
  return (
    <div>
      <Appbar />
        <div className='grid grid-cols-12 px-10 h-full'>
          <div className='grid-cols-8 col-start-1 col-span-8 '>
            <div><h1 className='text-5xl font-bold'>{blog.title}</h1></div>
            <div className='mt-6 ml-2'><h2 className='text-lg font-light'>{blog.content}</h2></div> 
          </div>
          <div className='grid-cols-4 col-span-4 col-start-10'>
            <h1 className='text-xl font-semibold mb-4'>Author</h1>
            <div className='flex gap-4 items-center'>
              <Avatar name={blog.author.email[0].toUpperCase()} size={8}/>
              <div>
                <h1 className='text-lg font-semibold'>{blog.author.email}</h1>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FullBlog